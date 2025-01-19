import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProjects, getPages, createProjectAndPage } from '../../shared/api/sideBar/projectsService';
import { RootState } from '../index';  

interface Project {
  id: number;
  email: string;
  date_of_creation: string;
  date_of_change: string;
  project_name: string;
  isRemoved: boolean;
}

interface Page {
  id: number;
  project_id: number;
  title: string;
  markup_json: string;
  isRemoved: boolean;
}

interface TreeItem {
  name: string;
  type: 'dropdown' | 'link' | 'action';   
  link?: string;
  action?: string;
  icon?: string;
  items?: TreeItem[];  
  id?: number;
}

interface PagesState {
  tree: TreeItem[];  
  loading: boolean;
  error: string | null;
  projectData: { name: string; dateOfChange: string }[];  
}

const initialState: PagesState = {
  tree: [],
  loading: false,
  error: null,
  projectData: [],
};

export const fetchTreeData = createAsyncThunk<
  { projectsData: Project[]; pagesData: Page[] }, 
  void, 
  { state: RootState }
>(
  'pages/fetchTreeData',
  async () => {
    const projectsData = await getProjects();
    const pagesData = await getPages();

    return { projectsData, pagesData }; 
  }
);

export const getCardData = createAsyncThunk<
  { projectData: { name: string; dateOfChange: string }[] }, 
  void, 
  { state: RootState }
>(
  'pages/getCardData',
  async () => {
    const projectsData = await getProjects();
    
    const projectData = projectsData.map((project: Project) => ({
      name: project.project_name,
      dateOfChange: project.date_of_change,
    }));

    return { projectData };
  }
);

export const createNewProjectAndPage = createAsyncThunk<
  { project: Project; page: Page },
  string,
  { state: RootState }
>(
  'pages/createNewProjectAndPage',
  async (projectName: string) => {
    const result = await createProjectAndPage(projectName);
    return result;
  }
);

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTreeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTreeData.fulfilled, (state, action) => {
        state.loading = false;
        const { projectsData, pagesData } = action.payload;

        const treeStructure: TreeItem[] = projectsData.map((project: Project) => ({
          name: project.project_name,
          type: 'dropdown',  
          link: `/${project.id}`,
          id: project.id,
          items: pagesData
            .filter((page: Page) => page.project_id === project.id)
            .map((page: Page) => ({
              name: page.title,
              type: 'link',   
              link: `/pages/${page.id}`,
              id: page.id,
            })),
        }));

        state.tree = [
          { name: 'Главная', type: 'link', link: '/main' },
          { name: 'Корзина', type: 'link', link: '/trash' },
          { name: 'Создать проект', type: 'action', action: 'create', icon: 'plus' },
          ...treeStructure,
        ];
      })
      .addCase(fetchTreeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при загрузке данных';
      })
      .addCase(getCardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCardData.fulfilled, (state, action) => {
        state.loading = false;
        state.projectData = action.payload.projectData;
      })     
      .addCase(getCardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при загрузке данных';
      })
      .addCase(createNewProjectAndPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewProjectAndPage.fulfilled, (state, action) => {
        state.loading = false;
        const { project, page } = action.payload;
        
        const newTreeItem: TreeItem = {
          name: project.project_name,
          type: 'dropdown',
          link: `/${project.id}`,
          id: project.id,
          items: [{
            name: page.title,
            type: 'link',
            link: `/${project.id}?page=${page.id}`,
            id: page.id,
          }],
        };
        
        state.tree.push(newTreeItem);
        
        state.projectData.push({
          name: project.project_name,
          dateOfChange: project.date_of_change,
        });
      })
      .addCase(createNewProjectAndPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при создании нового проекта и страницы';
      });
  },
});

export default pagesSlice.reducer;

