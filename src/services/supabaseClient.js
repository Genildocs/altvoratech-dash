import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(`
❌ Variáveis de ambiente do Supabase não configuradas!

📋 Para resolver:
1. Crie um arquivo .env na raiz do projeto
2. Adicione suas credenciais do Supabase:
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=sua_chave_anonima
3. Reinicie o servidor (npm run dev)

🔗 Obtenha suas credenciais em: https://supabase.com/dashboard
`);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database helper functions
export const projectsService = {
  // Get all projects for the current user
  async getProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Create a new project
  async createProject(project) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          ...project,
          user_id: user.id,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update a project
  async updateProject(id, updates) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete a project
  async deleteProject(id) {
    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (error) throw error;
  },
};

export const tasksService = {
  // Get all tasks for a project
  async getTasks(projectId) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Create a new task
  async createTask(task) {
    const { data, error } = await supabase
      .from('tasks')
      .insert([task])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update a task
  async updateTask(id, updates) {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete a task
  async deleteTask(id) {
    const { error } = await supabase.from('tasks').delete().eq('id', id);

    if (error) throw error;
  },

  // Update task order (temporarily disabled - requires sort_order column)
  async updateTaskOrder(taskId, newOrder) {
    // TODO: Add sort_order column to tasks table in Supabase
    console.log(
      'Task reordering temporarily disabled - sort_order column needed'
    );
    return true;
  },

  // Bulk update task orders (temporarily disabled - requires sort_order column)
  async updateTasksOrder(updates) {
    // TODO: Add sort_order column to tasks table in Supabase
    console.log(
      'Task reordering temporarily disabled - sort_order column needed'
    );
    return true;
  },
};
