# 🚀 ALTVORATECH DASH - Project Manager

Um painel simples e eficiente para gerenciar projetos pessoais com autenticação, to-do lists e interface moderna.

## ✨ Funcionalidades

- 🔐 **Autenticação completa** (Login/Registro via Supabase)
- 📋 **Gerenciamento de Projetos** (CRUD completo)
- ✅ **Sistema de Tarefas** (To-do lists por projeto)
- 📊 **Dashboard com estatísticas**
- 📱 **Interface responsiva** (Mobile-first)
- 🎨 **Design moderno** (Tailwind CSS v3)
- ⚡ **Performance otimizada** (React 18 + Vite)

## 🛠️ Stack Tecnológica

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS v3
- **Routing**: React Router DOM
- **Auth & Database**: Supabase
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Deploy**: Vercel Ready

## 🚀 Setup Rápido

### 1. Clone e instale dependências

```bash
git clone <repository-url>
cd altvoratech-dash
npm install
```

### 2. Configure o Supabase

1. Crie uma conta no [Supabase](https://supabase.com)
2. Crie um novo projeto
3. Vá em Settings > API para obter as chaves
4. Copie `.env.example` para `.env` e configure:

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
```

### 3. Configure o banco de dados

Execute os seguintes comandos SQL no Supabase SQL Editor:

```sql
-- Criar tabela de projetos
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'Planned',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de tarefas
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  done BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança para projetos
CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas de segurança para tarefas
CREATE POLICY "Users can view tasks of own projects" ON tasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = tasks.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert tasks in own projects" ON tasks
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = tasks.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update tasks in own projects" ON tasks
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = tasks.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete tasks in own projects" ON tasks
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = tasks.project_id
      AND projects.user_id = auth.uid()
    )
  );
```

### 4. Execute o projeto

```bash
npm run dev
```

Acesse `http://localhost:5173` no seu navegador.

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── AuthForm.jsx    # Formulário de login/registro
│   ├── Navbar.jsx      # Barra de navegação
│   ├── ProjectCard.jsx # Card de projeto
│   └── TaskItem.jsx    # Item de tarefa
├── hooks/              # Custom hooks
│   └── useAuth.js      # Hook de autenticação
├── pages/              # Páginas da aplicação
│   ├── Dashboard.jsx   # Dashboard principal
│   ├── ProjectDetails.jsx # Detalhes do projeto
│   └── NewProject.jsx  # Criar novo projeto
├── services/           # Serviços e APIs
│   └── supabaseClient.js # Cliente Supabase
├── App.jsx            # Componente principal
└── main.jsx           # Entry point
```

## 🎯 Como Usar

1. **Cadastro/Login**: Acesse a aplicação e crie sua conta
2. **Dashboard**: Visualize todos os seus projetos e estatísticas
3. **Criar Projeto**: Clique em "Novo Projeto" para adicionar um projeto
4. **Gerenciar Tarefas**: Entre em um projeto para adicionar e gerenciar tarefas
5. **Acompanhar Progresso**: Use as estatísticas para acompanhar seu progresso

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente no dashboard do Vercel
3. Deploy automático a cada push

### Outras plataformas

O projeto é compatível com Netlify, Railway, e outras plataformas que suportam aplicações React.

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique a documentação do Supabase
2. Confira se as variáveis de ambiente estão corretas
3. Abra uma issue no repositório

---

**Desenvolvido com ❤️ para a ALTVORATECH HUB**
