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

  // Traer hijos de un nodo (o nodos raíz si parentId es null)
  async getChildren(parentId: string | null): Promise<HabitatNode[]> {
    let query = supabase.from('habitat').select('*');

    if (parentId === null) {
      query = query.is('parent_id', null);
    } else {
      query = query.eq('parent_id', parentId);
    }

    const { data, error } = await query;
    
    if (error) {
      console.error('Error en getChildren:', error);
      return []; // Devolvemos un array vacío si falla, para no romper la UI
    }
    return data || [];
  }
};
