
import { supabase } from '../../../utils/client';

interface Project {
  id: number;
  project_name: string;
}

interface Page {
  id: number;
  title: string;
  project_id: number;
}

export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }
  return data || [];
};

export const getPages = async (): Promise<Page[]> => {
  const { data, error } = await supabase
    .from('notes')
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
