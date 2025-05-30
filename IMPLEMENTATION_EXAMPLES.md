# 🛠️ Exemplos Práticos de Implementação - ALTVORA Design System

## 📋 **Índice**
1. [Setup Completo](#setup-completo)
2. [Estrutura de Projeto](#estrutura-de-projeto)
3. [Implementação Passo a Passo](#implementação-passo-a-passo)
4. [Exemplos de Páginas](#exemplos-de-páginas)
5. [Componentes Reutilizáveis](#componentes-reutilizáveis)

---

## ⚙️ **Setup Completo**

### **1. Instalação de Dependências**
```bash
# Dependências principais
npm install react react-dom react-router-dom

# Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Ícones e UI
npm install lucide-react react-hot-toast

# Opcional: Drag & Drop
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities @dnd-kit/modifiers
```

### **2. Configuração Tailwind (tailwind.config.js)**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### **3. CSS Global (src/index.css)**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed;
  }
  
  .btn-secondary {
    @apply bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2;
  }
  
  .btn-ghost {
    @apply text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 font-medium py-2 px-4 rounded-md transition-colors;
  }
  
  .input-field {
    @apply w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors;
  }
  
  .card {
    @apply bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors;
  }
  
  .card-hover {
    @apply card hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer;
  }
}

/* Scrollbar customizado */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e0;
  border-radius: 3px;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #4a5568;
}
```

---

## 📁 **Estrutura de Projeto**

```
src/
├── components/
│   ├── ui/                    # Componentes base
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Card.jsx
│   │   ├── Modal.jsx
│   │   └── index.js
│   ├── layout/                # Layout components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Sidebar.jsx
│   │   └── Layout.jsx
│   ├── common/                # Componentes comuns
│   │   ├── LoadingSpinner.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ErrorState.jsx
│   │   └── ThemeToggle.jsx
│   └── features/              # Componentes específicos
│       ├── ProjectCard.jsx
│       ├── TaskItem.jsx
│       └── UserMenu.jsx
├── hooks/
│   ├── useTheme.jsx
│   ├── useDebounce.jsx
│   └── useLocalStorage.jsx
├── utils/
│   ├── cn.js                  # Class name utility
│   ├── formatters.js          # Date, currency formatters
│   └── constants.js           # App constants
├── styles/
│   └── globals.css
└── pages/
    ├── Dashboard.jsx
    ├── Projects.jsx
    └── Settings.jsx
```

---

## 🚀 **Implementação Passo a Passo**

### **Passo 1: Theme Provider**
```jsx
// src/hooks/useTheme.jsx
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

### **Passo 2: Componentes Base**
```jsx
// src/components/ui/Button.jsx
import { cn } from '../../utils/cn';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  ...props 
}) => {
  const baseClasses = 'font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
  };
  
  const sizes = {
    sm: 'py-1 px-2 text-sm',
    md: 'py-2 px-4',
    lg: 'py-3 px-6 text-lg',
  };

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
```

```jsx
// src/components/ui/Card.jsx
import { cn } from '../../utils/cn';

const Card = ({ children, hover = false, className, ...props }) => {
  return (
    <div
      className={cn(
        'card',
        hover && 'card-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
```

### **Passo 3: Layout Principal**
```jsx
// src/components/layout/Layout.jsx
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
          },
        }}
      />
    </div>
  );
};

export default Layout;
```

### **Passo 4: App Principal**
```jsx
// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
```

---

## 📄 **Exemplos de Páginas**

### **Dashboard Page**
```jsx
// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { Plus, BarChart3, Users, Calendar } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setStats({
        totalProjects: 12,
        activeProjects: 8,
        completedTasks: 156,
        teamMembers: 5
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Visão geral dos seus projetos e atividades
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <Card className="text-center">
          <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.totalProjects}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total de Projetos
          </div>
        </Card>

        <Card className="text-center">
          <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.activeProjects}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Projetos Ativos
          </div>
        </Card>

        <Card className="text-center">
          <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.completedTasks}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Tarefas Concluídas
          </div>
        </Card>

        <Card className="text-center">
          <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.teamMembers}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Membros da Equipe
          </div>
        </Card>
      </div>

      {/* Recent Projects */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Projetos Recentes
        </h2>
        <div className="space-y-4">
          {/* Lista de projetos aqui */}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
```

---

## 🧩 **Componentes Reutilizáveis**

### **Loading Spinner**
```jsx
// src/components/common/LoadingSpinner.jsx
const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  return (
    <div className={`animate-spin rounded-full border-b-2 border-primary-600 ${sizes[size]} ${className}`} />
  );
};

export default LoadingSpinner;
```

### **Empty State**
```jsx
// src/components/common/EmptyState.jsx
const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  action 
}) => (
  <div className="text-center py-12">
    {Icon && <Icon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />}
    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
      {description}
    </p>
    {action && (
      <Button onClick={action.onClick}>
        {action.label}
      </Button>
    )}
  </div>
);

export default EmptyState;
```

### **Utility Functions**
```javascript
// src/utils/cn.js
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// src/utils/formatters.js
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('pt-BR');
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

// src/utils/constants.js
export const STATUS_COLORS = {
  'Planned': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  'Paused': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  'Completed': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
};

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};
```

---

*Estes exemplos fornecem uma base sólida para implementar o ALTVORA Design System em qualquer projeto React.*
