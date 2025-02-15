import { supabase } from '../../../utils/client';

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

export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('isRemoved', false);

  if (error) {
    throw new Error(error.message);
  }
  return data || [];
};

export const getPages = async (): Promise<Page[]> => {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('isRemoved', false);

  if (error) {
    throw new Error(error.message);
  }
  return data || [];
};


export const getProjectsForCards = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }
  return data || [];
};


export const getUserEmail = async (): Promise<string | null> => {
  const { data: userData } = await supabase.auth.getUser();
  return userData?.user?.email || null;
};

export const restoreProject = async (projectId: number): Promise<void> => {
  const { error } = await supabase
    .from('projects')
    .update({ isRemoved: false })
    .eq('id', projectId);

  if (error) {
    throw new Error(error.message);
  }
};


export const createProjectAndPage = async (
  projectName: string,
): Promise<{ project: Project; page: Page }> => {
  const userEmail = await getUserEmail();
  if (!userEmail) {
    throw new Error('Пользователь не авторизован');
  }

  const now = new Date().toISOString();

  const { data: project, error: projectError } = await supabase
    .from('projects')
    .insert({
      email: userEmail,
      date_of_creation: now,
      date_of_change: now,
      project_name: projectName,
      isRemoved: false
    })
    .select()
    .single();

  if (projectError) {
    throw new Error(`Ошибка при создании проекта: ${projectError.message}`);
  }

  const { data: page, error: pageError } = await supabase
    .from('notes')
    .insert({
      project_id: project.id,
      title: 'Без названия',
      markup_json: '{}',
      isRemoved: false
    })
    .select()
    .single();

  if (pageError) {
    throw new Error(`Ошибка при создании страницы: ${pageError.message}`);
  }

  return { project, page };
};

