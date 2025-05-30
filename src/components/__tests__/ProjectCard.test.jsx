import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ProjectCard from '../ProjectCard'

// Mock project data
const mockProject = {
  id: '1',
  title: 'Test Project',
  description: 'This is a test project description',
  status: 'In Progress',
  created_at: '2024-01-01T00:00:00.000Z'
}

// Wrapper component for router
const RouterWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
)

describe('ProjectCard', () => {
  const mockOnEdit = vi.fn()
  const mockOnDelete = vi.fn()

  beforeEach(() => {
    mockOnEdit.mockClear()
    mockOnDelete.mockClear()
  })

  it('renders project information correctly', () => {
    render(
      <RouterWrapper>
        <ProjectCard 
          project={mockProject} 
          onEdit={mockOnEdit} 
          onDelete={mockOnDelete} 
        />
      </RouterWrapper>
    )

    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('This is a test project description')).toBeInTheDocument()
    expect(screen.getByText('In Progress')).toBeInTheDocument()
    expect(screen.getByText('Ver Projeto')).toBeInTheDocument()
  })

  it('shows menu when clicking on menu button', () => {
    render(
      <RouterWrapper>
        <ProjectCard 
          project={mockProject} 
          onEdit={mockOnEdit} 
          onDelete={mockOnDelete} 
        />
      </RouterWrapper>
    )

    // Click on menu button
    const menuButton = screen.getByRole('button')
    fireEvent.click(menuButton)

    // Check if menu items appear
    expect(screen.getByText('Ver Detalhes')).toBeInTheDocument()
    expect(screen.getByText('Editar')).toBeInTheDocument()
    expect(screen.getByText('Excluir')).toBeInTheDocument()
  })

  it('calls onEdit when edit button is clicked', () => {
    render(
      <RouterWrapper>
        <ProjectCard 
          project={mockProject} 
          onEdit={mockOnEdit} 
          onDelete={mockOnDelete} 
        />
      </RouterWrapper>
    )

    // Open menu and click edit
    const menuButton = screen.getByRole('button')
    fireEvent.click(menuButton)
    
    const editButton = screen.getByText('Editar')
    fireEvent.click(editButton)

    expect(mockOnEdit).toHaveBeenCalledWith(mockProject)
  })

  it('shows correct status color for different statuses', () => {
    const completedProject = { ...mockProject, status: 'Completed' }
    
    render(
      <RouterWrapper>
        <ProjectCard 
          project={completedProject} 
          onEdit={mockOnEdit} 
          onDelete={mockOnDelete} 
        />
      </RouterWrapper>
    )

    const statusBadge = screen.getByText('Completed')
    expect(statusBadge).toHaveClass('bg-green-100', 'text-green-800')
  })
})
