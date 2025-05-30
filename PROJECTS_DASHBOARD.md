## Documento para o projeto de TODO LIST E DASHBOARD dos ativos da ALTVORATECH HUB

## 🚀 ALTOVORATECH DASH — Simple Project Manager with Supabase Auth

---

## 🎯 **Objetivo**

Um **painel simples de gerenciamento de projetos pessoais** com:

✅ Login e cadastro (via Supabase Auth)
✅ Lista de projetos (cada um com título, descrição, status)
✅ Cada projeto com To-Do list (tarefas: adicionar, editar, marcar como concluído)
✅ Interface limpa e simples (Vite + React + Tailwind)
✅ Subir facilmente no Vercel
✅ Servir como painel central para **gerenciar todos os teus projetos (Blueprint, Orbis, Artemis, etc.)**

---

## 🛠️ **Stack**

| Layer      | Tech                           |
| ---------- | ------------------------------ |
| Frontend   | React 18 + Vite                |
| Styling    | Tailwind CSS                   |
| Auth       | Supabase Auth (Email/Password) |
| Database   | Supabase (Postgres)            |
| Deployment | Vercel                         |

---

## 🗂️ **Estrutura de Páginas**

```
src/
├── components/
│   ├── ProjectCard.jsx
│   ├── TaskItem.jsx
│   ├── Navbar.jsx
│   ├── AuthForm.jsx
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx  <-- Home após login
│   ├── ProjectDetails.jsx  <-- Página de cada projeto
├── hooks/
│   ├── useAuth.js
├── services/
│   ├── supabaseClient.js
├── App.jsx
└── main.jsx
```

---

## 🖥️ **Layout (Fluxo de telas)**

---

### 1️⃣ **Login / Register**

```
+---------------------------+
|  LOGIN / REGISTER         |
+---------------------------+
| Email                     |
| Password                  |
| [ Login ]  [ Register ]   |
+---------------------------+
```

**Após login → redireciona para Dashboard**

---

### 2️⃣ **Dashboard (Home)**

```
Navbar (Logout | + Add Project)

+-----------------------+
| Project: Blueprint    |
| Status: In Progress   |
| [ View Details ]      |
+-----------------------+

+-----------------------+
| Project: Orbis        |
| Status: Paused        |
| [ View Details ]      |
+-----------------------+

... (list of projects)
```

---

### 3️⃣ **Project Details (To-do List por projeto)**

```
Navbar (Back to Dashboard | Logout)

Project: Blueprint
Description: Personal dev blog + Rust API

[ Add Task ]

To-Do List:

[ ] Finalizar API Posts
[ ] Finalizar layout v1
[✔️] Medium article cross-link
[ ] SEO basic setup

(Tasks editable, deletable, can mark done)
```

---

## 📚 **Features mínimas (MVP)**

✅ Autenticação (Email/Password — Supabase)
✅ CRUD de Projetos (title, description, status: Planned / In Progress / Paused / Completed)
✅ CRUD de Tarefas (title, done/not done) para cada projeto
✅ Visual simples (clean, dev-friendly)
✅ Deploy simples (Vercel)

---

## 🗄️ **Estrutura das tabelas no Supabase**

### `projects`

| Field       | Type                                              |
| ----------- | ------------------------------------------------- |
| id          | uuid (PK)                                         |
| user_id     | uuid (FK → auth.users)                            |
| title       | text                                              |
| description | text                                              |
| status      | text (Planned / In Progress / Paused / Completed) |
| created_at  | timestamp                                         |

---

### `tasks`

| Field      | Type                    |
| ---------- | ----------------------- |
| id         | uuid (PK)               |
| project_id | uuid (FK → projects.id) |
| title      | text                    |
| done       | boolean                 |
| created_at | timestamp               |

---

## ⚙️ **Roteiro para criar o projeto (setup básico)**

```bash
# 1️⃣ Criar projeto Vite
npm create vite@latest projects-dashboard -- --template react

# 2️⃣ Instalar deps
cd projects-dashboard
npm install
npm install @supabase/supabase-js
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3️⃣ Configurar Tailwind no index.css
# (Adicionar basic Tailwind config)

# 4️⃣ Criar Supabase Client
# src/services/supabaseClient.js
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
export const supabase = createClient(supabaseUrl, supabaseKey);
```

---

## 🏃 **Fluxo de uso**

1️⃣ Login/Register
2️⃣ Dashboard com lista de projetos
3️⃣ Clicar em projeto → ver/editar to-do list daquele projeto
4️⃣ Marcar tarefas como concluídas → organização do ecossistema

---

## 🔧 **Melhorias e Considerações Técnicas**

### **Validações de Formulários**

- **Projetos**: Título obrigatório (min 3 chars), descrição opcional (max 500 chars)
- **Tarefas**: Título obrigatório (min 1 char, max 200 chars)
- **Auth**: Email válido, senha min 6 chars
- **Feedback visual**: Mensagens de erro em tempo real

### **Estados de Loading e UX**

- **Skeleton loaders** para listas de projetos e tarefas
- **Spinners** em botões durante ações (salvar, deletar)
- **Debounce** em campos de busca (300ms)
- **Optimistic updates** para melhor UX

### **Tratamento de Erros**

- **Toast notifications** para feedback de ações
- **Fallback UI** para erros de conexão
- **Retry automático** para falhas de rede
- **Logs estruturados** para debugging

### **Responsividade**

- **Mobile-first** design
- **Breakpoints**: sm (640px), md (768px), lg (1024px)
- **Navigation**: Hamburger menu no mobile
- **Touch-friendly**: Botões min 44px

### **Performance**

- **Lazy loading** de componentes
- **Memoização** de componentes pesados
- **Paginação** para listas grandes (20 itens/página)
- **Cache** de dados do Supabase

---

## 🧪 **Estratégia de Testes**

### **Testes Unitários** (Vitest + Testing Library)

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

- **Componentes**: ProjectCard, TaskItem, AuthForm
- **Hooks**: useAuth, useProjects, useTasks
- **Utils**: Validações, formatações

### **Testes de Integração**

- **Fluxos completos**: Login → Dashboard → Projeto → Tarefas
- **CRUD operations**: Criar/editar/deletar projetos e tarefas
- **Auth flow**: Login/logout/register

### **Testes E2E** (Playwright - opcional)

- **User journeys** críticos
- **Cross-browser** testing

---

## 🔐 **Segurança e Boas Práticas**

### **Supabase Security**

- **Row Level Security (RLS)** habilitado
- **Políticas**: Usuários só veem seus próprios dados
- **Environment variables** para chaves sensíveis

### **Frontend Security**

- **Sanitização** de inputs
- **Validação** client-side + server-side
- **HTTPS** obrigatório em produção

---

## 📱 **Funcionalidades Futuras (Roadmap)**

### **V2 - Melhorias**

- **Drag & drop** para reordenar tarefas
- **Filtros** por status de projeto
- **Busca** global por projetos/tarefas
- **Dark mode** toggle

### **V3 - Avançado**

- **Colaboração** (compartilhar projetos)
- **Notificações** push
- **Relatórios** de produtividade
- **Integração** com GitHub/GitLab

---

## ⚙️ **Setup Completo do Projeto**

```bash
# 1️⃣ Criar projeto Vite
npm create vite@latest altvoratech-dash -- --template react

# 2️⃣ Instalar dependências principais
cd altvoratech-dash
npm install

# 3️⃣ Instalar Supabase
npm install @supabase/supabase-js

# 4️⃣ Instalar Tailwind CSS v3
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

# 5️⃣ Instalar dependências adicionais
npm install react-router-dom react-hot-toast lucide-react

# 6️⃣ Instalar dependências de desenvolvimento
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

---

# 🚀 **Resumo**

✅ **Foco total**: centralizar tudo que você tem pra gerenciar **(Blueprint, Orbis, Artemis, DeployWise, etc.)**
✅ Interface minimalista (React + Tailwind v3)
✅ Facinho de subir no Vercel
✅ Autenticação e dados salvos no Supabase → acessível de qualquer lugar
✅ **Código robusto** com validações, testes e tratamento de erros
✅ **UX otimizada** com loading states e responsividade
✅ **Segurança** implementada com RLS e boas práticas

---
