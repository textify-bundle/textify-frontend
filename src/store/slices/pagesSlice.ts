import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProjects, getPages } from '../../shared/api/sideBar/projectsService';
import { RootState } from '../index';  

interface Project {
  id: number;
  project_name: string;
  owner?: string;

}

interface Page {
  id: number;
  title: string;
  project_id: number;
}

interface PagesState {
  tree: any[];
  loading: boolean;
  error: string | null;
}

const initialState: PagesState = {
  tree: [],
  loading: false,
  error: null,
};

export const fetchTreeData = createAsyncThunk<
  { projectsData: Project[]; pagesData: Page[]; userEmail: string }, 
  void, 
  { state: RootState } 
>(
  'pages/fetchTreeData',
  async (_, thunkAPI) => {
    
    const userEmail = thunkAPI.getState().auth.user?.email || 'example@mail.ru';

    
    const projectsData = await getProjects();
    const pagesData = await getPages();

    return { projectsData, pagesData, userEmail }; 
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
        const { projectsData, pagesData, userEmail } = action.payload;
        const filteredProjects = projectsData.filter((project: Project) => project.owner === userEmail);

        const treeStructure = filteredProjects.map((project: Project) => {
          const projectPages = pagesData.filter((page: Page) => page.project_id === project.id);

          return {
            name: project.project_name,
            type: 'dropdown',
            link: `/project/${project.id}`,
            items: projectPages.map((page: Page) => ({
              name: page.title,
              type: 'link',
              link: `/project/${project.id}/page/${page.id}`,
            })),
          };
        });

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
      });
  },
});

export default pagesSlice.reducer;
