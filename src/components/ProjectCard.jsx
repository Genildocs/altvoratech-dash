import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MoreVertical, Edit, Trash2, Eye, Calendar, Clock } from 'lucide-react'

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false)

  const getStatusColor = (status) => {
    switch (status) {
      case 'Planned':
        return 'bg-gray-100 text-gray-800'
      case 'In Progress':
        return 'bg-blue-100 text-blue-800'
      case 'Paused':
        return 'bg-yellow-100 text-yellow-800'
      case 'Completed':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Planned':
        return <Calendar className="h-3 w-3" />
      case 'In Progress':
        return <Clock className="h-3 w-3" />
      case 'Paused':
        return <Clock className="h-3 w-3" />
      case 'Completed':
        return <div className="h-3 w-3 bg-green-600 rounded-full" />
      default:
        return <Calendar className="h-3 w-3" />
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const handleEdit = () => {
    setShowMenu(false)
    onEdit(project)
  }

  const handleDelete = () => {
    setShowMenu(false)
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      onDelete(project.id)
    }
  }

  return (
    <div className="card hover:shadow-md transition-shadow duration-200 relative">
      {/* Menu dropdown */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <MoreVertical className="h-5 w-5 text-gray-500" />
        </button>
        
        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
            <div className="py-1">
              <Link
                to={`/project/${project.id}`}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setShowMenu(false)}
              >
                <Eye className="h-4 w-4 mr-2" />
                Ver Detalhes
              </Link>
              <button
                onClick={handleEdit}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Project content */}
      <div className="pr-8">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {project.title}
          </h3>
        </div>

        <div className="flex items-center mb-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {getStatusIcon(project.status)}
            <span className="ml-1">{project.status}</span>
          </span>
        </div>

        {project.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {project.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Criado em {formatDate(project.created_at)}
          </span>
          
          <Link
            to={`/project/${project.id}`}
            className="btn-primary text-sm py-1.5 px-3"
          >
            Ver Projeto
          </Link>
        </div>
      </div>

      {/* Click outside to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  )
}

export default ProjectCard
