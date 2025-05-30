# ALTVORA Tech Dashboard

Dashboard moderno para gerenciamento de projetos e tarefas, desenvolvido com React, Vite e Supabase.

## 🚀 Tecnologias

- **React 18** - Biblioteca para interfaces de usuário
- **Vite** - Build tool e dev server
- **Tailwind CSS 3** - Framework CSS utilitário
- **Supabase** - Backend as a Service (autenticação e banco de dados)
- **React Router** - Roteamento
- **Lucide React** - Ícones
- **React Hot Toast** - Notificações
- **@dnd-kit** - Drag & drop para tarefas

## 📋 Funcionalidades

### V1 - Core Features

- ✅ **Autenticação** - Login e cadastro de usuários
- ✅ **Dashboard** - Visão geral dos projetos
- ✅ **Gerenciamento de Projetos** - CRUD completo
- ✅ **Tarefas** - Sistema de tarefas por projeto
- ✅ **Interface Responsiva** - Design adaptável
- ✅ **Notificações** - Feedback visual para ações

### V2 - Enhanced Features 🆕

- ✅ **Dark Mode Toggle** - Tema escuro/claro com persistência
- ✅ **Drag & Drop** - Reordenação de tarefas por arrastar e soltar
- ✅ **Busca Melhorada** - Interface aprimorada com dark mode
- ✅ **Filtros Avançados** - Sistema de filtros estilizado

## 🛠️ Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/altvoratech-dash.git
   cd altvoratech-dash
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure o Supabase**

   - Crie um projeto no [Supabase](https://supabase.com)
   - Execute o script SQL em `supabase-setup.sql`
   - Crie um arquivo `.env` na raiz:

   ```env
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
   ```

4. **Execute o projeto**
   ```bash
   npm run dev
   ```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── AuthForm.jsx    # Formulário de autenticação
│   ├── Footer.jsx      # Rodapé
│   ├── Navbar.jsx      # Barra de navegação
│   ├── ProjectCard.jsx # Card de projeto
│   ├── SupabaseSetup.jsx # Setup do Supabase
│   ├── TaskItem.jsx    # Item de tarefa
│   └── index.js        # Exportações centralizadas
├── hooks/              # Custom hooks
│   └── useAuth.jsx     # Hook de autenticação
├── pages/              # Páginas da aplicação
│   ├── Dashboard.jsx   # Dashboard principal
│   ├── NewProject.jsx  # Criação de projetos
│   └── ProjectDetails.jsx # Detalhes do projeto
├── services/           # Serviços externos
│   └── supabaseClient.js # Cliente do Supabase
├── App.jsx            # Componente principal
└── main.jsx           # Ponto de entrada
```

## 🎨 Design System

O projeto utiliza um design system baseado em:

- **Cores primárias**: Azul (#3B82F6)
- **Tipografia**: Inter (via Tailwind)
- **Componentes**: Baseados em Tailwind CSS 3
- **Ícones**: Lucide React

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza build de produção
- `npm run lint` - Executa linting do código

## 🚀 Deploy

O projeto está configurado para deploy no Vercel:

1. **Conecte seu repositório** ao Vercel
2. **Configure as variáveis de ambiente**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. **Deploy automático** a cada push

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte, entre em contato através do email: suporte@altvora.com

---

Desenvolvido com ❤️ pela equipe **ALTVORA**
