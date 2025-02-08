import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProjects, getPages } from '../../shared/api/sideBar/projectsService';
import { RootState } from '../index';  

interface Project {
  id: number;
  project_name: string;
  owner?: string;
  date_of_change?: Date
  isRemoved?: boolean
}

interface Page {
  id: number;
  title: string;
  project_id: number;
}

interface TreeItem {
  name: string;
  type: 'dropdown' | 'link' | 'action';   
  link?: string;
  action?: string;
  icon?: string;
  items?: TreeItem[];  
}

interface PagesState {
  tree: TreeItem[];  
  loading: boolean;
  error: string | null;
  projectData: { name: string; dateOfChange: Date | undefined; isRemoved: boolean | undefined }[];  
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
  { projectData: { name: string; dateOfChange: Date | undefined; isRemoved: boolean | undefined }[] }, 
  void, 
  { state: RootState }
>(
  'pages/getCardData',
  async () => {
    const projectsData = await getProjects();
    
    const projectData = projectsData.map((project: Project) => ({
      name: project.project_name,
      dateOfChange: project.date_of_change,
      isRemoved: project.isRemoved,
    }));

    return { projectData };
  }
)


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
          link: `/project/${project.id}`,
          items: pagesData
            .filter((page: Page) => page.project_id === project.id)
            .map((page: Page) => ({
              name: page.title,
              type: 'link',   
              link: `/project/${project.id}/page/${page.id}`,
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
  },
});

export default pagesSlice.reducer;
