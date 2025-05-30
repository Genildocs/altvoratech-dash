# 📚 Guia de Melhores Práticas - ALTVORA Design System

## 📋 **Índice**
1. [Princípios de Design](#princípios-de-design)
2. [Melhores Práticas de Código](#melhores-práticas-de-código)
3. [Performance e Otimização](#performance-e-otimização)
4. [Acessibilidade](#acessibilidade)
5. [Troubleshooting](#troubleshooting)
6. [Checklist de Qualidade](#checklist-de-qualidade)

---

## 🎨 **Princípios de Design**

### **1. Consistência Visual**
```jsx
// ✅ BOM: Usar classes padronizadas
<button className="btn-primary">Ação</button>

// ❌ RUIM: Estilos inline inconsistentes
<button style={{backgroundColor: '#3b82f6', padding: '8px 16px'}}>Ação</button>
```

### **2. Hierarquia Clara**
```jsx
// ✅ BOM: Hierarquia bem definida
<div>
  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Título Principal</h1>
  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Subtítulo</h2>
  <p className="text-gray-600 dark:text-gray-400">Texto do corpo</p>
</div>

// ❌ RUIM: Hierarquia confusa
<div>
  <h3 className="text-2xl">Título</h3>
  <h1 className="text-lg">Subtítulo</h1>
</div>
```

### **3. Espaçamento Consistente**
```jsx
// ✅ BOM: Usar escala de espaçamento do Tailwind
<div className="space-y-4">  {/* 16px */}
  <div className="mb-6">    {/* 24px */}
    <div className="p-8">   {/* 32px */}

// ❌ RUIM: Valores arbitrários
<div style={{marginBottom: '17px', padding: '13px'}}>
```

---

## 💻 **Melhores Práticas de Código**

### **1. Estrutura de Componentes**
```jsx
// ✅ BOM: Componente bem estruturado
import { useState } from 'react';
import { cn } from '../utils/cn';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  loading = false,
  className,
  ...props 
}) => {
  return (
    <button
      className={cn(
        'btn-base', // classe base
        `btn-${variant}`, // variante
        `btn-${size}`, // tamanho
        loading && 'opacity-50 cursor-not-allowed',
        className // customizações
      )}
      disabled={loading}
      {...props}
    >
      {loading ? <LoadingSpinner /> : children}
    </button>
  );
};

export default Button;
```

### **2. Gerenciamento de Estado**
```jsx
// ✅ BOM: Estado local para UI, contexto para dados globais
const Component = () => {
  const [isOpen, setIsOpen] = useState(false); // UI state
  const { user } = useAuth(); // Global state
  const { isDark } = useTheme(); // Global state
  
  return (
    <div className={cn('component', isDark && 'dark-variant')}>
      {/* content */}
    </div>
  );
};
```

### **3. Hooks Customizados**
```jsx
// ✅ BOM: Lógica reutilizável em hooks
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};
```

### **4. Tratamento de Erros**
```jsx
// ✅ BOM: Error boundaries e tratamento adequado
const ErrorBoundary = ({ children, fallback }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error) => {
      console.error('Error caught by boundary:', error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return fallback || <ErrorState onRetry={() => setHasError(false)} />;
  }

  return children;
};
```

---

## ⚡ **Performance e Otimização**

### **1. Lazy Loading**
```jsx
// ✅ BOM: Componentes lazy
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Projects = lazy(() => import('./pages/Projects'));

const App = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/projects" element={<Projects />} />
    </Routes>
  </Suspense>
);
```

### **2. Memoização**
```jsx
// ✅ BOM: Memoizar componentes pesados
import { memo, useMemo, useCallback } from 'react';

const ExpensiveComponent = memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: heavyCalculation(item)
    }));
  }, [data]);

  const handleUpdate = useCallback((id, updates) => {
    onUpdate(id, updates);
  }, [onUpdate]);

  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} data={item} onUpdate={handleUpdate} />
      ))}
    </div>
  );
});
```

### **3. Otimização de Bundle**
```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['lucide-react', 'react-hot-toast']
        }
      }
    }
  }
};
```

---

## ♿ **Acessibilidade**

### **1. Navegação por Teclado**
```jsx
// ✅ BOM: Suporte completo a teclado
const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const handleTab = (e) => {
      // Trap focus dentro do modal
      const focusableElements = modal.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTab);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
    };
  }, [isOpen, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="modal"
    >
      {children}
    </div>
  );
};
```

### **2. ARIA Labels e Roles**
```jsx
// ✅ BOM: Labels e roles apropriados
<button
  aria-label="Fechar modal"
  aria-expanded={isOpen}
  onClick={onClose}
>
  <X className="h-5 w-5" />
</button>

<nav role="navigation" aria-label="Menu principal">
  <ul role="menubar">
    <li role="none">
      <a role="menuitem" href="/dashboard">Dashboard</a>
    </li>
  </ul>
</nav>

<div role="status" aria-live="polite">
  {loading ? 'Carregando...' : 'Dados carregados'}
</div>
```

### **3. Contraste e Legibilidade**
```css
/* ✅ BOM: Contraste adequado (WCAG AA) */
.text-primary {
  color: #111827; /* Contraste 16.75:1 */
}

.dark .text-primary {
  color: #ffffff; /* Contraste 21:1 */
}

/* ✅ BOM: Focus visível */
.focus-visible {
  @apply outline-none ring-2 ring-primary-500 ring-offset-2;
}
```

---

## 🔧 **Troubleshooting**

### **1. Dark Mode não Funciona**
```javascript
// Problema: Classes dark: não aplicadas
// Solução: Verificar configuração do Tailwind
module.exports = {
  darkMode: 'class', // ← Deve estar configurado
  // ...
}

// Problema: Tema não persiste
// Solução: Verificar localStorage
useEffect(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setIsDark(savedTheme === 'dark');
  }
}, []);
```

### **2. Estilos não Aplicados**
```javascript
// Problema: Classes Tailwind não funcionam
// Solução: Verificar content no tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ← Incluir todos os arquivos
  ],
  // ...
}
```

### **3. Performance Lenta**
```jsx
// Problema: Re-renders desnecessários
// Solução: Usar React.memo e useCallback
const Component = memo(({ data, onUpdate }) => {
  const handleUpdate = useCallback((id) => {
    onUpdate(id);
  }, [onUpdate]);

  return <div>{/* content */}</div>;
});
```

### **4. Hydration Errors (SSR)**
```jsx
// Problema: Diferenças entre servidor e cliente
// Solução: Usar useEffect para código client-side
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return null; // ou skeleton
}

return <ClientOnlyComponent />;
```

---

## ✅ **Checklist de Qualidade**

### **Antes de Fazer Deploy**
- [ ] **Funcionalidade**
  - [ ] Todas as funcionalidades testadas
  - [ ] Formulários validados
  - [ ] Estados de loading/error implementados
  - [ ] Navegação funcionando

- [ ] **Design**
  - [ ] Dark mode funcionando em todos os componentes
  - [ ] Responsividade testada (mobile, tablet, desktop)
  - [ ] Espaçamentos consistentes
  - [ ] Tipografia hierárquica

- [ ] **Performance**
  - [ ] Bundle size otimizado
  - [ ] Imagens otimizadas
  - [ ] Lazy loading implementado
  - [ ] Memoização onde necessário

- [ ] **Acessibilidade**
  - [ ] Navegação por teclado
  - [ ] Screen reader friendly
  - [ ] Contraste adequado
  - [ ] Focus visível

- [ ] **Código**
  - [ ] Sem console.logs em produção
  - [ ] Error boundaries implementados
  - [ ] Tratamento de erros adequado
  - [ ] Código documentado

### **Testes Recomendados**
```javascript
// Teste de componente
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../hooks/useTheme';
import Button from '../components/ui/Button';

test('renders button with correct styles', () => {
  render(
    <ThemeProvider>
      <Button variant="primary">Click me</Button>
    </ThemeProvider>
  );
  
  const button = screen.getByRole('button');
  expect(button).toHaveClass('btn-primary');
});

// Teste de dark mode
test('applies dark mode classes', () => {
  render(
    <ThemeProvider>
      <div className="bg-white dark:bg-gray-800">Content</div>
    </ThemeProvider>
  );
  
  // Simular toggle de tema
  // Verificar se classes dark: são aplicadas
});
```

---

## 📊 **Métricas de Qualidade**

### **Performance Targets**
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: < 500KB (gzipped)

### **Acessibilidade Targets**
- **WCAG Level**: AA
- **Contraste Mínimo**: 4.5:1
- **Keyboard Navigation**: 100%
- **Screen Reader**: Compatível

### **Browser Support**
- **Chrome**: Últimas 2 versões
- **Firefox**: Últimas 2 versões
- **Safari**: Últimas 2 versões
- **Edge**: Últimas 2 versões

---

*Seguindo estas práticas, você garantirá que sua implementação do ALTVORA Design System seja robusta, acessível e performática.*
