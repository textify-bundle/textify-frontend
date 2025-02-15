import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProjects, getPages, createProjectAndPage, createPage, deletePage, getProjectsForCards, restoreProject as restoreProjectApi } from '../../shared/api/sideBar/projectsService';
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
  projectData: { id: number; name: string; dateOfChange: string; isRemoved: boolean | undefined }[];
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
>('pages/fetchTreeData', async () => {
  const projectsData = await getProjects();
  const pagesData = await getPages();
  return { projectsData, pagesData };
});

export const getCardData = createAsyncThunk<
  {
    projectData: { name: string; dateOfChange: string; isRemoved?: boolean }[];
  },
  void,
  { state: RootState }
>('pages/getCardData', async () => {
  const projectsData = await getProjects();

  const projectData = projectsData.map((project: Project) => ({
    name: project.project_name,
    dateOfChange: project.date_of_change,
    isRemoved: project.isRemoved,
  }));

  return { projectData };
});

export const getCardDataForCards = createAsyncThunk<
  { projectData: { id: number; name: string; dateOfChange: string; isRemoved: boolean }[] },
  void,
  { state: RootState }
>(
  'pages/getCardDataForCards',
  async () => {
    const projectsData = await getProjectsForCards();

    const projectData = projectsData.map((project: Project) => ({
      id: project.id,
      name: project.project_name,
      dateOfChange: new Date(project.date_of_change).toISOString(),
      isRemoved: project.isRemoved,
    }));

    return { projectData };
  }
);


export const restoreProject = createAsyncThunk<
  void,
  number,
  { state: RootState }
>(
  'pages/restoreProject',
  async (projectId: number) => {
    await restoreProjectApi(projectId);
  }
);

export const createNewProjectAndPage = createAsyncThunk<
  { project: Project; page: Page },
  string,
  { state: RootState }
>('pages/createNewProjectAndPage', async (projectName: string) => {
  const result = await createProjectAndPage(projectName);
  return result;
});

export const createNewPage = createAsyncThunk<
  Page,
  { projectId: number; title: string },
  { state: RootState }
>('pages/createNewPage', async ({ projectId, title }) => {
  const result = await createPage(projectId, title);
  return result;
});

export const removePageFromTree = createAsyncThunk<
  number,
  number,
  { state: RootState }
>('pages/removePageFromTree', async (pageId) => {
  await deletePage(pageId);
  return pageId;
});

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

        const treeStructure: TreeItem[] = projectsData.map((project) => ({
          name: project.project_name,
          type: 'dropdown',
          link: `/${project.id}`,
          id: project.id,
          items: pagesData
            .filter((page) => page.project_id === project.id)
            .map((page) => ({
              name: page.title,
              type: 'link',
              link: `/${project.id}?page=${page.id}`,
              id: page.id,
            })),
        }));

        state.tree = [
          { name: 'Главная', type: 'link', link: '/main' },
          { name: 'Корзина', type: 'link', link: '/trash' },
          {
            name: 'Создать проект',
            type: 'action',
            action: 'create',
            icon: 'plus',
          },
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
      .addCase(restoreProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(restoreProject.fulfilled, (state, action) => {
        state.loading = false;
        const projectId = action.meta.arg;
        const project = state.projectData.find(project => project.id === projectId);
        if (project) {
          project.isRemoved = false;
        }
      })
      .addCase(restoreProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при восстановлении проекта';
      })
      .addCase(getCardDataForCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCardDataForCards.fulfilled, (state, action) => {
        state.loading = false;
        state.projectData = action.payload.projectData;
        console.log("Updated Project Data for Cards:", state.projectData);
      })
      .addCase(getCardDataForCards.rejected, (state, action) => {
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
          items: [
            {
              name: page.title,
              type: 'link',
              link: `/${project.id}?page=${page.id}`,
              id: page.id,
            },
          ],
        };
      
        state.tree.push(newTreeItem);
      
        state.projectData.push({
          id: project.id,
          name: project.project_name,
          dateOfChange: project.date_of_change,
          isRemoved: project.isRemoved,
        });
      })
      .addCase(createNewProjectAndPage.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          'Ошибка при создании нового проекта и страницы';
      })
      .addCase(createNewPage.fulfilled, (state, action) => {
        state.loading = false;
        const newPage = action.payload;
        const projectIndex = state.tree.findIndex(
          (item) => item.id === newPage.project_id,
        );
        if (projectIndex !== -1) {
          state.tree[projectIndex].items = state.tree[projectIndex].items || [];
          state.tree[projectIndex].items.push({
            name: newPage.title,
            type: 'link',
            link: `/${newPage.project_id}?page=${newPage.id}`,
            id: newPage.id,
          });
        }
      })
      .addCase(createNewPage.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Ошибка при создании новой страницы';
      })
      .addCase(removePageFromTree.fulfilled, (state, action) => {
        state.loading = false;
        const pageId = action.payload;
        state.tree = state.tree.map((project) => {
          if (project.items) {
            project.items = project.items.filter((page) => page.id !== pageId);
          }
          return project;
        });
      })
      .addCase(removePageFromTree.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при удалении страницы';
      });
      
  },
});

export default pagesSlice.reducer;
