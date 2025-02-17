import { expose } from 'comlink';
import { supabase } from '../utils/client';
import type { CustomNode } from '../shared/types/editor/node';

export type WorkerApi = {
  loadNodesFromServer: (pageId: number) => Promise<CustomNode[]>;
  saveNodesToServer: (params: {
    pageId: number;
    nodes: CustomNode[];
  }) => Promise<void>;
};

const workerApi: WorkerApi = {
  async loadNodesFromServer(pageId: number) {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('markup_json')
        .eq('id', pageId)
        .single();
      if (error) return [];
      if (!data || !data.markup_json) return [];

      return JSON.parse(data.markup_json);
    } catch (error) {
      console.error('Failed to load or parse notes from server', error);
      return [];
    }
  },

  async saveNodesToServer({
    pageId,
    nodes,
  }: {
    pageId: number;
    nodes: CustomNode[];
  }) {
    const markup_json = JSON.stringify(nodes);
    const { error } = await supabase
      .from('notes')
      .update({ markup_json })
      .eq('id', pageId);
    if (error) throw error;
  },
};

expose(workerApi);
