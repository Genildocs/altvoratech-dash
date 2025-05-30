import { CheckCircle } from 'lucide-react';
import TaskItem from './TaskItem';

const SimpleTaskList = ({ tasks, onUpdate, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Nenhuma tarefa ainda
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Adicione sua primeira tarefa para começar a organizar este projeto.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default SimpleTaskList;
