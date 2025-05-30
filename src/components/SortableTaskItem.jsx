import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Check, Edit2, GripVertical, Trash2, X } from 'lucide-react';
import { useState } from 'react';

const SortableTaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleToggleDone = () => {
    onUpdate(task.id, { done: !task.done });
  };

  const handleSaveEdit = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      onUpdate(task.id, { title: editTitle.trim() });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4
        transition-all duration-200 hover:shadow-md
        ${isDragging ? 'opacity-50 shadow-lg scale-105' : ''}
        ${task.done ? 'opacity-75' : ''}
      `}>
      <div className="flex items-center space-x-3">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-grab active:cursor-grabbing p-1"
          title="Arrastar para reordenar">
          <GripVertical className="h-4 w-4" />
        </button>

        {/* Checkbox */}
        <button
          onClick={handleToggleDone}
          className={`
            flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
            ${
              task.done
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 dark:border-gray-600 hover:border-green-400'
            }
          `}>
          {task.done && <Check className="h-3 w-3" />}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleKeyPress}
                onBlur={handleSaveEdit}
                className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <button
                onClick={handleSaveEdit}
                className="p-1 text-green-600 hover:text-green-700"
                title="Salvar">
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={handleCancelEdit}
                className="p-1 text-red-600 hover:text-red-700"
                title="Cancelar">
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span
                className={`
                  text-sm font-medium truncate
                  ${
                    task.done
                      ? 'line-through text-gray-500 dark:text-gray-400'
                      : 'text-gray-900 dark:text-white'
                  }
                `}>
                {task.title}
              </span>

              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  title="Editar tarefa">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                  title="Excluir tarefa">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Task metadata */}
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 ml-8">
        Criada em {new Date(task.created_at).toLocaleDateString('pt-BR')}
      </div>
    </div>
  );
};

export default SortableTaskItem;
