// domain/habitat.service.ts
import { createClient } from '../lib/supabase/client';
import { HabitatNode } from './habitat.types';

const supabase = createClient();

export const habitatService = {
  // Traer nodo por ID
  async getNodeById(id: string): Promise<HabitatNode | null> {
    const { data, error } = await supabase
      .from('habitat')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error en getNodeById:', error);
      return null;
    }
    return data;
  },

  // Traer hijos de un nodo
  async getChildren(parentId: string): Promise<HabitatNode[]> {
    const { data, error } = await supabase
      .from('habitat')
      .select('*')
      .eq('parent_id', parentId);
    
    if (error) {
      console.error('Error en getChildren:', error);
      return []; // Devolvemos un array vacío si falla, para no romper la UI
    }
    return data || [];
  }
};
