import { ArrowLeft, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import SimpleTaskList from '../components/SimpleTaskList';
import { projectsService, tasksService } from '../services/supabaseClient';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  useEffect(() => {
    if (id) {
      loadProjectData();
    }
  }, [id]);

  const loadProjectData = async () => {
    try {
      setLoading(true);
      // Load project data
      const projects = await projectsService.getProjects();
      const projectData = projects.find((p) => p.id === id);

      if (!projectData) {
        setProject(null);
        setTasks([]);
        return;
      }

      // Load tasks data
      const tasksData = await tasksService.getTasks(id);

      setProject(projectData);
      setTasks(tasksData);
    } catch (error) {
      console.error('Error loading project data:', error);
      toast.error('Erro ao carregar dados do projeto');
      setProject(null);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      setIsAddingTask(true);
      const newTask = await tasksService.createTask({
        project_id: id,
        title: newTaskTitle.trim(),
        done: false,
      });

      setTasks([newTask, ...tasks]);
      setNewTaskTitle('');
      toast.success('Tarefa adicionada com sucesso!');
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Erro ao adicionar tarefa');
    } finally {
      setIsAddingTask(false);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const updatedTask = await tasksService.updateTask(taskId, updates);
      setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
      toast.success('Tarefa atualizada com sucesso!');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Erro ao atualizar tarefa');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await tasksService.deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
      toast.success('Tarefa excluída com sucesso!');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Erro ao excluir tarefa');
    }
  };

  // handleReorderTasks temporarily removed - will be re-enabled with drag & drop

  const getStatusColor = (status) => {
    switch (status) {
      case 'Planned':
        return 'bg-gray-100 text-gray-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.done).length;
    const pending = total - completed;
    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending, completionRate };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-32 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Projeto não encontrado
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            O projeto que você está procurando não existe.
          </p>
          <Link to="/dashboard" className="btn-primary">
            Voltar ao Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const stats = getTaskStats();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar ao Dashboard
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {project.title}
              </h1>
              <div className="flex items-center space-x-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    project.status
                  )}`}>
                  {project.status}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Criado em{' '}
                  {new Date(project.created_at).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </div>

          {project.description && (
            <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">
              {project.description}
            </p>
          )}
        </div>

        {/* Task Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total de Tarefas
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-green-600">
              {stats.completed}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Concluídas
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-blue-600">
              {stats.pending}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Pendentes
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-purple-600">
              {stats.completionRate}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Progresso
            </div>
          </div>
        </div>

        {/* Add Task Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Adicionar Nova Tarefa
          </h2>
          <form onSubmit={handleAddTask} className="flex gap-3">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Digite o título da tarefa..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              maxLength={200}
              disabled={isAddingTask}
            />
            <button
              type="submit"
              disabled={!newTaskTitle.trim() || isAddingTask}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed">
              {isAddingTask ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Plus className="h-4 w-4" />
              )}
              <span>Adicionar</span>
            </button>
          </form>
        </div>

        {/* Tasks List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Lista de Tarefas ({tasks.length})
          </h2>

          <SimpleTaskList
            tasks={tasks}
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
