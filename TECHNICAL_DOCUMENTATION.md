# ALTVORA Tech Dashboard - Documentação Técnica

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Tecnologias](#tecnologias)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Banco de Dados](#banco-de-dados)
6. [Configuração](#configuração)
7. [API e Serviços](#api-e-serviços)
8. [Componentes](#componentes)
9. [Autenticação](#autenticação)
10. [Deploy](#deploy)
11. [Desenvolvimento](#desenvolvimento)

---

## 🎯 Visão Geral

O ALTVORA Tech Dashboard é uma aplicação web moderna para gerenciamento de projetos e tarefas, desenvolvida com React 18, Vite e Supabase. A aplicação oferece uma interface intuitiva e responsiva para criação, edição e acompanhamento de projetos e suas respectivas tarefas.

### Funcionalidades Principais

- **Autenticação Completa**: Login, cadastro e gerenciamento de sessão
- **Dashboard Interativo**: Visão geral com estatísticas em tempo real
- **CRUD de Projetos**: Criação, edição, visualização e exclusão
- **Sistema de Tarefas**: Gerenciamento de tarefas por projeto
- **Interface Responsiva**: Design adaptável para desktop e mobile
- **Notificações**: Feedback visual para todas as ações

---

## 🏗️ Arquitetura

### Padrão Arquitetural

- **Frontend**: SPA (Single Page Application) com React
- **Backend**: BaaS (Backend as a Service) com Supabase
- **Banco de Dados**: PostgreSQL (via Supabase)
- **Autenticação**: JWT (via Supabase Auth)

### Fluxo de Dados

```
User Interface (React)
    ↓
Custom Hooks (useAuth)
    ↓
Services (supabaseClient)
    ↓
Supabase API
    ↓
PostgreSQL Database
```

---

## 🚀 Tecnologias

### Frontend

| Tecnologia      | Versão  | Propósito               |
| --------------- | ------- | ----------------------- |
| React           | 19.1.0  | Biblioteca UI           |
| Vite            | 6.3.5   | Build tool e dev server |
| Tailwind CSS    | 3.4.17  | Framework CSS           |
| React Router    | 7.6.1   | Roteamento              |
| Lucide React    | 0.511.0 | Ícones                  |
| React Hot Toast | 2.5.2   | Notificações            |

### Backend & Infraestrutura

| Tecnologia        | Versão | Propósito             |
| ----------------- | ------ | --------------------- |
| Supabase          | 2.49.8 | Backend as a Service  |
| PostgreSQL        | -      | Banco de dados        |
| Supabase Auth     | -      | Autenticação          |
| Supabase Realtime | -      | Updates em tempo real |

### Desenvolvimento

| Tecnologia   | Versão  | Propósito         |
| ------------ | ------- | ----------------- |
| ESLint       | 9.25.0  | Linting           |
| PostCSS      | 8.5.4   | Processamento CSS |
| Autoprefixer | 10.4.21 | Prefixos CSS      |

---

## 📁 Estrutura do Projeto

```
altvoratech-dash/
├── public/                     # Arquivos estáticos
├── src/
│   ├── components/            # Componentes reutilizáveis
│   │   ├── AuthForm.jsx      # Formulário de autenticação
│   │   ├── Footer.jsx        # Rodapé da aplicação
│   │   ├── Navbar.jsx        # Barra de navegação
│   │   ├── ProjectCard.jsx   # Card de projeto
│   │   ├── SupabaseSetup.jsx # Tela de configuração
│   │   ├── TaskItem.jsx      # Item de tarefa
│   │   └── index.js          # Exportações centralizadas
│   ├── hooks/                # Custom hooks
│   │   └── useAuth.jsx       # Hook de autenticação
│   ├── pages/                # Páginas da aplicação
│   │   ├── Dashboard.jsx     # Dashboard principal
│   │   ├── NewProject.jsx    # Criação de projetos
│   │   └── ProjectDetails.jsx # Detalhes do projeto
│   ├── services/             # Serviços externos
│   │   └── supabaseClient.js # Cliente do Supabase
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Ponto de entrada
│   └── index.css            # Estilos globais
├── .env.example             # Exemplo de variáveis de ambiente
├── .gitignore              # Arquivos ignorados pelo Git
├── eslint.config.js        # Configuração do ESLint
├── index.html              # Template HTML
├── package.json            # Dependências e scripts
├── postcss.config.js       # Configuração do PostCSS
├── README.md               # Documentação básica
├── supabase-setup.sql      # Script de setup do banco
├── tailwind.config.js      # Configuração do Tailwind
└── vite.config.js          # Configuração do Vite
```

---

## 🗄️ Banco de Dados

### Esquema do Banco

#### Tabela: `projects`

```sql
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'Planned' CHECK (status IN ('Planned', 'In Progress', 'Paused', 'Completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

#### Tabela: `tasks`

```sql
CREATE TABLE public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    done BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

### Relacionamentos

- `projects.user_id` → `auth.users.id` (1:N)
- `tasks.project_id` → `projects.id` (1:N)

### Índices

- `projects_user_id_idx`: Otimiza consultas por usuário
- `projects_status_idx`: Otimiza filtros por status
- `tasks_project_id_idx`: Otimiza consultas de tarefas por projeto

### Row Level Security (RLS)

Todas as tabelas possuem políticas RLS que garantem que usuários só acessem seus próprios dados.

---

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Gera build de produção
npm run preview      # Visualiza build de produção

# Qualidade de Código
npm run lint         # Executa linting do código
```

### Configuração do Supabase

1. **Criar Projeto**: Acesse [supabase.com](https://supabase.com) e crie um novo projeto
2. **Executar SQL**: Execute o script `supabase-setup.sql` no SQL Editor
3. **Obter Credenciais**: Copie URL e chave anônima em Settings → API
4. **Configurar .env**: Adicione as credenciais no arquivo `.env`

---

## 🔌 API e Serviços

### Serviço de Projetos (`projectsService`)

#### `getProjects()`

Retorna todos os projetos do usuário autenticado.

```javascript
const projects = await projectsService.getProjects();
```

#### `createProject(project)`

Cria um novo projeto.

```javascript
const newProject = await projectsService.createProject({
  title: 'Meu Projeto',
  description: 'Descrição do projeto',
  status: 'Planned',
});
```

#### `updateProject(id, updates)`

Atualiza um projeto existente.

```javascript
const updatedProject = await projectsService.updateProject(projectId, {
  title: 'Novo Título',
  status: 'In Progress',
});
```

#### `deleteProject(id)`

Exclui um projeto.

```javascript
await projectsService.deleteProject(projectId);
```

### Serviço de Tarefas (`tasksService`)

#### `getTasks(projectId)`

Retorna todas as tarefas de um projeto.

```javascript
const tasks = await tasksService.getTasks(projectId);
```

#### `createTask(task)`

Cria uma nova tarefa.

```javascript
const newTask = await tasksService.createTask({
  project_id: projectId,
  title: 'Nova Tarefa',
  done: false,
});
```

#### `updateTask(id, updates)`

Atualiza uma tarefa.

```javascript
const updatedTask = await tasksService.updateTask(taskId, {
  title: 'Título Atualizado',
  done: true,
});
```

#### `deleteTask(id)`

Exclui uma tarefa.

```javascript
await tasksService.deleteTask(taskId);
```

---

## 🧩 Componentes

### Componentes de Layout

#### `Navbar`

Barra de navegação principal com logo, navegação e botão de logout.

#### `Footer`

Rodapé com informações de copyright e links.

### Componentes de Autenticação

#### `AuthForm`

Formulário unificado para login e cadastro com validação.

#### `ProtectedRoute`

HOC para proteção de rotas que requer autenticação.

#### `PublicRoute`

HOC para rotas públicas que redireciona usuários autenticados.

### Componentes de Projeto

#### `ProjectCard`

Card que exibe informações do projeto com ações (ver, editar, excluir).

**Props:**

- `project`: Objeto do projeto
- `onEdit`: Função para editar projeto
- `onDelete`: Função para excluir projeto

#### `TaskItem`

Item de tarefa com edição inline e marcação de conclusão.

**Props:**

- `task`: Objeto da tarefa
- `onUpdate`: Função para atualizar tarefa
- `onDelete`: Função para excluir tarefa

### Componentes de Configuração

#### `SupabaseSetup`

Tela de configuração inicial quando variáveis de ambiente não estão definidas.

---

## 🔐 Autenticação

### Hook `useAuth`

O hook personalizado `useAuth` gerencia todo o estado de autenticação:

```javascript
const { user, loading, signIn, signUp, signOut } = useAuth();
```

**Retorna:**

- `user`: Objeto do usuário autenticado ou `null`
- `loading`: Estado de carregamento da autenticação
- `signIn(email, password)`: Função para login
- `signUp(email, password)`: Função para cadastro
- `signOut()`: Função para logout

### Fluxo de Autenticação

1. **Login/Cadastro**: Usuário fornece email e senha
2. **Validação**: Supabase valida credenciais
3. **Token JWT**: Supabase retorna token de acesso
4. **Persistência**: Token é armazenado automaticamente
5. **Proteção**: Rotas protegidas verificam token

### Proteção de Rotas

```javascript
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

---

## 🚀 Deploy

### Vercel (Recomendado)

1. **Conectar Repositório**

   - Faça login no [Vercel](https://vercel.com)
   - Conecte seu repositório GitHub

2. **Configurar Variáveis de Ambiente**

   ```
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=sua_chave_anonima
   ```

3. **Deploy Automático**
   - Deploy automático a cada push na branch main
   - Preview deployments para pull requests

### Netlify

1. **Build Settings**

   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Environment Variables**
   - Adicione as mesmas variáveis do Vercel

### Outras Plataformas

O projeto é compatível com qualquer plataforma que suporte aplicações estáticas:

- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront
- DigitalOcean App Platform

---

## 💻 Desenvolvimento

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no Supabase

### Setup Local

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/altvoratech-dash.git
cd altvoratech-dash

# 2. Instale dependências
npm install

# 3. Configure variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas credenciais

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

### Estrutura de Desenvolvimento

#### Padrões de Código

- **ESLint**: Configurado com regras para React e hooks
- **Prettier**: Formatação automática (recomendado)
- **Conventional Commits**: Para mensagens de commit consistentes

#### Organização de Arquivos

```
src/
├── components/     # Componentes reutilizáveis
├── hooks/         # Custom hooks
├── pages/         # Páginas/rotas da aplicação
├── services/      # Serviços e APIs
└── utils/         # Funções utilitárias (futuro)
```

#### Convenções de Nomenclatura

- **Componentes**: PascalCase (`ProjectCard.jsx`)
- **Hooks**: camelCase com prefixo `use` (`useAuth.jsx`)
- **Serviços**: camelCase (`supabaseClient.js`)
- **Constantes**: UPPER_SNAKE_CASE

### Debugging

#### Logs do Supabase

```javascript
// Habilitar logs detalhados
const supabase = createClient(url, key, {
  auth: {
    debug: true,
  },
});
```

#### React DevTools

- Instale a extensão React DevTools
- Use para inspecionar componentes e estado

#### Network Tab

- Monitore requisições para Supabase
- Verifique headers de autenticação

### Performance

#### Otimizações Implementadas

- **Code Splitting**: Rotas carregadas sob demanda
- **Lazy Loading**: Componentes carregados quando necessário
- **Memoização**: Uso de `useMemo` e `useCallback` quando apropriado
- **Índices de Banco**: Otimização de consultas

#### Métricas de Performance

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Bundle Size**: < 500KB (gzipped)

---

## 🧪 Testes

### Estratégia de Testes

#### Testes Unitários

- Componentes isolados
- Hooks customizados
- Funções utilitárias

#### Testes de Integração

- Fluxos de autenticação
- CRUD de projetos e tarefas
- Navegação entre páginas

#### Testes E2E (Futuro)

- Fluxos completos de usuário
- Testes de regressão

### Configuração de Testes (Futuro)

```bash
# Instalar dependências de teste
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom

# Executar testes
npm run test
```

---

## 📊 Monitoramento

### Métricas de Aplicação

#### Supabase Dashboard

- Número de usuários ativos
- Consultas por segundo
- Latência de API
- Uso de storage

#### Vercel Analytics (se usando Vercel)

- Page views
- Unique visitors
- Performance metrics
- Geographic distribution

### Error Tracking

#### Implementação Futura

```javascript
// Sentry ou similar
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'YOUR_DSN_HERE',
});
```

---

## 🔧 Troubleshooting

### Problemas Comuns

#### 1. Erro de Variáveis de Ambiente

**Sintoma**: Tela de configuração do Supabase aparece
**Solução**: Verificar se `.env` existe e contém as variáveis corretas

#### 2. Erro de Autenticação

**Sintoma**: Usuário não consegue fazer login
**Solução**:

- Verificar se RLS está configurado corretamente
- Confirmar se as políticas de segurança estão ativas

#### 3. Erro de CORS

**Sintoma**: Requisições bloqueadas pelo navegador
**Solução**: Configurar domínios permitidos no Supabase

#### 4. Build Falha

**Sintoma**: `npm run build` falha
**Solução**:

- Verificar se todas as dependências estão instaladas
- Confirmar se não há erros de TypeScript/ESLint

### Logs e Debug

#### Habilitar Logs Detalhados

```javascript
// No supabaseClient.js
const supabase = createClient(url, key, {
  auth: {
    debug: process.env.NODE_ENV === 'development',
  },
});
```

#### Console do Navegador

- Verificar erros no console
- Monitorar requisições na aba Network
- Usar React DevTools para inspecionar estado

---

## 📚 Recursos Adicionais

### Documentação Oficial

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/docs)
- [React Router](https://reactrouter.com/)

### Comunidade

- [React Discord](https://discord.gg/react)
- [Supabase Discord](https://discord.supabase.com/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/react)

### Ferramentas Úteis

- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👥 Contribuição

### Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Contribuição

- Siga as convenções de código existentes
- Adicione testes para novas funcionalidades
- Atualize a documentação quando necessário
- Use Conventional Commits para mensagens

---

**Desenvolvido com ❤️ pela ALTVORA Group**
