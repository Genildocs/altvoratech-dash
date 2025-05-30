# 🎨 ALTVORA Design System & Layout Documentation

## 📋 **Índice**

1. [Configuração Base](#configuração-base)
2. [Sistema de Cores](#sistema-de-cores)
3. [Tipografia](#tipografia)
4. [Componentes Base](#componentes-base)
5. [Layout Patterns](#layout-patterns)
6. [Dark Mode](#dark-mode)
7. [Responsividade](#responsividade)
8. [Animações](#animações)

---

## ⚙️ **Configuração Base**

### **Tailwind CSS Config**

```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Habilita dark mode via classe
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
    },
  },
};
```

### **CSS Global**

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Componentes customizados */
@layer components {
  .btn-primary {
    @apply bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2;
  }

  .btn-secondary {
    @apply bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-md transition-colors;
  }

  .input-field {
    @apply w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500;
  }

  .card {
    @apply bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6;
  }
}
```

---

## 🎨 **Sistema de Cores**

### **Paleta Principal**

```css
/* Light Mode */
--bg-primary: #ffffff        /* bg-white */
--bg-secondary: #f9fafb      /* bg-gray-50 */
--bg-tertiary: #f3f4f6       /* bg-gray-100 */

--text-primary: #111827      /* text-gray-900 */
--text-secondary: #6b7280    /* text-gray-600 */
--text-tertiary: #9ca3af     /* text-gray-500 */

--border-primary: #e5e7eb    /* border-gray-200 */
--border-secondary: #d1d5db  /* border-gray-300 */

/* Dark Mode */
--bg-primary-dark: #1f2937   /* bg-gray-800 */
--bg-secondary-dark: #111827 /* bg-gray-900 */
--bg-tertiary-dark: #374151  /* bg-gray-700 */

--text-primary-dark: #ffffff /* text-white */
--text-secondary-dark: #d1d5db /* text-gray-300 */
--text-tertiary-dark: #9ca3af  /* text-gray-400 */

--border-primary-dark: #374151 /* border-gray-700 */
--border-secondary-dark: #4b5563 /* border-gray-600 */
```

### **Cores de Status**

```css
/* Success */
--success-bg: #dcfce7        /* bg-green-100 */
--success-text: #166534      /* text-green-800 */
--success-border: #bbf7d0    /* border-green-200 */

/* Warning */
--warning-bg: #fef3c7        /* bg-yellow-100 */
--warning-text: #92400e      /* text-yellow-800 */
--warning-border: #fde68a    /* border-yellow-200 */

/* Error */
--error-bg: #fee2e2          /* bg-red-100 */
--error-text: #991b1b        /* text-red-800 */
--error-border: #fecaca      /* border-red-200 */

/* Info */
--info-bg: #dbeafe           /* bg-blue-100 */
--info-text: #1e40af         /* text-blue-800 */
--info-border: #bfdbfe       /* border-blue-200 */
```

---

## 📝 **Tipografia**

### **Hierarquia de Títulos**

```css
/* H1 - Página Principal */
.heading-1 {
  @apply text-3xl font-bold text-gray-900 dark:text-white;
}

/* H2 - Seções */
.heading-2 {
  @apply text-2xl font-semibold text-gray-900 dark:text-white;
}

/* H3 - Subsections */
.heading-3 {
  @apply text-lg font-semibold text-gray-900 dark:text-white;
}

/* Body Text */
.body-text {
  @apply text-sm text-gray-600 dark:text-gray-400;
}

/* Small Text */
.small-text {
  @apply text-xs text-gray-500 dark:text-gray-500;
}
```

### **Pesos de Fonte**

- **font-light** (300): Textos secundários
- **font-normal** (400): Texto padrão
- **font-medium** (500): Labels, botões
- **font-semibold** (600): Subtítulos
- **font-bold** (700): Títulos principais

---

## 🧩 **Componentes Base**

### **Botões**

```jsx
// Botão Primário
<button className="btn-primary">
  Ação Principal
</button>

// Botão Secundário
<button className="btn-secondary">
  Ação Secundária
</button>

// Botão de Ícone
<button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
  <Icon className="h-5 w-5" />
</button>
```

### **Cards**

```jsx
// Card Básico
<div className="card">
  <h3 className="heading-3 mb-4">Título do Card</h3>
  <p className="body-text">Conteúdo do card...</p>
</div>

// Card com Hover
<div className="card hover:shadow-md transition-shadow cursor-pointer">
  Conteúdo...
</div>

// Card de Estatística
<div className="card text-center">
  <div className="text-2xl font-bold text-gray-900 dark:text-white">
    {valor}
  </div>
  <div className="text-sm text-gray-600 dark:text-gray-400">
    {label}
  </div>
</div>
```

### **Inputs**

```jsx
// Input Básico
<input
  type="text"
  className="input-field"
  placeholder="Digite aqui..."
/>

// Input com Ícone
<div className="relative">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <Icon className="h-5 w-5 text-gray-400" />
  </div>
  <input
    type="text"
    className="input-field pl-10"
    placeholder="Com ícone..."
  />
</div>

// Select/Dropdown
<select className="input-field">
  <option>Opção 1</option>
  <option>Opção 2</option>
</select>
```

### **Badges/Status**

```jsx
// Badge de Status
<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
  Concluído
</span>

// Badge com Ícone
<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
  <Icon className="h-3 w-3 mr-1" />
  Status
</span>
```

---

## 📐 **Layout Patterns**

### **Container Principal**

```jsx
// Layout Base da Aplicação
<div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
  <Navbar />
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {children}
  </main>
  <Footer />
</div>
```

### **Grid Layouts**

```jsx
// Grid Responsivo de Cards
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <Card key={item.id} {...item} />
  ))}
</div>

// Grid de Estatísticas
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {stats.map(stat => (
    <StatCard key={stat.label} {...stat} />
  ))}
</div>
```

### **Flexbox Layouts**

```jsx
// Header com Título e Ações
<div className="flex items-center justify-between mb-6">
  <h1 className="heading-1">Título da Página</h1>
  <button className="btn-primary">Nova Ação</button>
</div>

// Lista com Ações
<div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
  <div className="flex-1">
    <h3 className="font-medium">Item</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">Descrição</p>
  </div>
  <div className="flex items-center space-x-2">
    <button>Editar</button>
    <button>Excluir</button>
  </div>
</div>
```

### **Sidebar Layout**

```jsx
// Layout com Sidebar (se necessário)
<div className="flex h-screen bg-gray-50 dark:bg-gray-900">
  <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
    <nav className="p-4">{/* Navigation items */}</nav>
  </aside>
  <main className="flex-1 overflow-auto">
    <div className="p-8">{/* Main content */}</div>
  </main>
</div>
```

---

## 🌙 **Dark Mode Implementation**

### **Hook de Tema**

```jsx
// src/hooks/useTheme.jsx
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return (
      saved === 'dark' ||
      (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
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

### **Toggle de Tema**

```jsx
// Componente Toggle
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
};
```

### **Padrões Dark Mode**

```css
/* Sempre usar as classes dark: junto com as light */
.element {
  @apply bg-white dark:bg-gray-800
         text-gray-900 dark:text-white
         border-gray-200 dark:border-gray-700;
}

/* Transições suaves */
.element {
  @apply transition-colors duration-200;
}

/* Hover states */
.element {
  @apply hover:bg-gray-100 dark:hover:bg-gray-700;
}
```

---

## 📱 **Responsividade**

### **Breakpoints Tailwind**

```css
/* sm: 640px */
/* md: 768px */
/* lg: 1024px */
/* xl: 1280px */
/* 2xl: 1536px */
```

### **Padrões Responsivos**

```jsx
// Grid Responsivo
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

// Padding Responsivo
<div className="px-4 sm:px-6 lg:px-8">

// Texto Responsivo
<h1 className="text-2xl sm:text-3xl lg:text-4xl">

// Flex Responsivo
<div className="flex flex-col sm:flex-row items-start sm:items-center">

// Esconder/Mostrar em Breakpoints
<div className="hidden md:block">Desktop only</div>
<div className="block md:hidden">Mobile only</div>
```

### **Mobile First Approach**

```jsx
// Sempre começar com mobile e expandir
<div className="
  w-full           /* Mobile: full width */
  sm:w-auto        /* Small: auto width */
  lg:w-1/2         /* Large: half width */

  p-4              /* Mobile: padding 4 */
  sm:p-6           /* Small: padding 6 */
  lg:p-8           /* Large: padding 8 */

  text-sm          /* Mobile: small text */
  sm:text-base     /* Small: base text */
  lg:text-lg       /* Large: large text */
">
```

---

## ✨ **Animações e Transições**

### **Transições Básicas**

```css
/* Cores */
.transition-colors {
  transition: color, background-color, border-color 150ms ease-in-out;
}

/* Todas as propriedades */
.transition-all {
  transition: all 150ms ease-in-out;
}

/* Sombras */
.transition-shadow {
  transition: box-shadow 150ms ease-in-out;
}

/* Transform */
.transition-transform {
  transition: transform 150ms ease-in-out;
}
```

### **Hover Effects**

```jsx
// Card com Hover
<div className="card hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

// Botão com Hover
<button className="btn-primary hover:scale-105 transition-transform">

// Ícone com Hover
<Icon className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
```

### **Loading States**

```jsx
// Spinner
<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>

// Pulse (skeleton)
<div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-4 w-full"></div>

// Bounce
<div className="animate-bounce">Loading...</div>
```

### **Micro-interações**

```jsx
// Fade in
<div className="opacity-0 animate-fade-in">

// Slide in
<div className="transform translate-x-full animate-slide-in">

// Scale in
<div className="transform scale-0 animate-scale-in">
```

---

## 🎯 **Padrões de Uso**

### **Estrutura de Página Típica**

```jsx
const PageTemplate = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="heading-1">Título da Página</h1>
          <button className="btn-primary">Ação Principal</button>
        </div>
        <p className="body-text mt-2">Descrição da página</p>
      </div>

      {/* Stats/Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="card text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="card">
        <h2 className="heading-2 mb-4">Conteúdo Principal</h2>
        {/* Content here */}
      </div>
    </div>
  );
};
```

### **Lista com Ações**

```jsx
const ListItem = ({ item, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 dark:text-white">
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {item.description}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onEdit(item.id)}
          className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded transition-colors">
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="p-1 text-red-600 hover:text-red-700 rounded transition-colors">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
```

---

## 🔧 **Componentes Específicos**

### **Navbar**

```jsx
const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              ALTVORA
            </h1>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};
```

### **Footer**

```jsx
const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2025 altvora group. Todos os direitos reservados.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2 sm:mt-0">
            Dashboard V2.1
          </p>
        </div>
      </div>
    </footer>
  );
};
```

### **Modal/Dialog**

```jsx
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};
```

### **Toast/Notification**

```jsx
// Usando react-hot-toast
import toast from 'react-hot-toast';

// Success
toast.success('Operação realizada com sucesso!');

// Error
toast.error('Erro ao realizar operação');

// Loading
const loadingToast = toast.loading('Carregando...');
// Depois: toast.dismiss(loadingToast);

// Custom styling
toast.success('Sucesso!', {
  style: {
    background: isDark ? '#374151' : '#ffffff',
    color: isDark ? '#ffffff' : '#111827',
  },
});
```

### **Dropdown Menu**

```jsx
const DropdownMenu = ({ trigger, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
        {trigger}
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-md last:rounded-b-md">
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
```

---

## 📊 **Padrões de Estado**

### **Loading States**

```jsx
// Skeleton Loading
const SkeletonCard = () => (
  <div className="card animate-pulse">
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
    <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
  </div>
);

// Loading Spinner
const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div
      className={`animate-spin rounded-full border-b-2 border-primary-600 ${sizeClasses[size]}`}
    />
  );
};
```

### **Empty States**

```jsx
const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="text-center py-12">
    <Icon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />
    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
    {action && <button className="btn-primary">{action.label}</button>}
  </div>
);
```

### **Error States**

```jsx
const ErrorState = ({ error, onRetry }) => (
  <div className="text-center py-12">
    <div className="bg-red-100 dark:bg-red-900/20 rounded-full p-3 w-16 h-16 mx-auto mb-4">
      <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
      Algo deu errado
    </h3>
    <p className="text-gray-600 dark:text-gray-400 mb-6">
      {error?.message || 'Ocorreu um erro inesperado'}
    </p>
    <button onClick={onRetry} className="btn-primary">
      Tentar Novamente
    </button>
  </div>
);
```

---

## 🎨 **Utilitários e Helpers**

### **Classes Utilitárias Customizadas**

```css
/* Truncate text */
.truncate-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Scroll customizado */
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

### **Helpers JavaScript**

```javascript
// Utilitários de classe
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Formatação de data
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('pt-BR');
};

// Formatação de status
export const getStatusColor = (status) => {
  const colors = {
    Planned: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    'In Progress':
      'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    Paused:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    Completed:
      'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  };
  return colors[status] || colors['Planned'];
};

// Debounce para busca
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
```

---

## 📋 **Checklist de Implementação**

### **Setup Inicial**

- [ ] Instalar Tailwind CSS
- [ ] Configurar dark mode no tailwind.config.js
- [ ] Adicionar classes customizadas no CSS global
- [ ] Implementar ThemeProvider e useTheme hook
- [ ] Configurar react-hot-toast

### **Componentes Base**

- [ ] Criar componentes de botão (btn-primary, btn-secondary)
- [ ] Implementar input-field customizado
- [ ] Criar componente de card base
- [ ] Implementar navbar com toggle de tema
- [ ] Criar footer responsivo

### **Layout e Estrutura**

- [ ] Definir container principal da aplicação
- [ ] Implementar grid responsivo para cards
- [ ] Criar padrões de página (header + content)
- [ ] Implementar estados de loading/empty/error

### **Dark Mode**

- [ ] Testar todos os componentes em ambos os temas
- [ ] Verificar contraste e legibilidade
- [ ] Implementar transições suaves
- [ ] Testar persistência da preferência

### **Responsividade**

- [ ] Testar em diferentes breakpoints
- [ ] Verificar navegação mobile
- [ ] Testar interações touch
- [ ] Validar acessibilidade

---

## 🚀 **Próximos Passos para Replicação**

1. **Copiar configuração base** (Tailwind, CSS global)
2. **Implementar sistema de tema** (ThemeProvider, useTheme)
3. **Criar componentes base** (botões, inputs, cards)
4. **Definir layout principal** (navbar, main, footer)
5. **Implementar padrões de página** (headers, grids, listas)
6. **Adicionar estados** (loading, empty, error)
7. **Testar responsividade** e dark mode
8. **Documentar variações** específicas do projeto

---

_Este design system garante consistência visual e facilita a replicação em outros projetos da ALTVORA. Todos os padrões foram testados e validados no ALTVORA Tech Dashboard V2.1._
