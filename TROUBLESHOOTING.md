# 🔧 Guia de Resolução de Problemas - ALTVORATECH DASH

## ❌ Erro 400 (Bad Request) no Login

### **Possíveis Causas e Soluções:**

#### 1. **Banco de Dados Não Configurado**
**Sintoma:** Erro 400 ao tentar fazer login/cadastro
**Solução:**
1. Acesse o Supabase Dashboard
2. Vá em **SQL Editor**
3. Execute o script `supabase-setup.sql` completo
4. Verifique se as tabelas foram criadas

#### 2. **Autenticação Não Habilitada**
**Sintoma:** Erro 400 com mensagem sobre autenticação
**Solução:**
1. No Supabase Dashboard, vá em **Authentication > Settings**
2. Verifique se **Enable email confirmations** está configurado conforme necessário
3. Configure **Site URL** para `http://localhost:5173` (desenvolvimento)

#### 3. **Políticas de Segurança (RLS) Mal Configuradas**
**Sintoma:** Erro 400 ou 403 após login
**Solução:**
1. Verifique se o RLS está habilitado nas tabelas
2. Execute novamente as políticas do script SQL
3. Teste com um usuário admin primeiro

#### 4. **Email Não Confirmado**
**Sintoma:** Login falha mesmo com credenciais corretas
**Solução:**
1. Verifique se o email foi confirmado
2. No Supabase Dashboard, vá em **Authentication > Users**
3. Confirme o email manualmente se necessário

#### 5. **Configuração de Email Provider**
**Sintoma:** Erro ao enviar emails de confirmação
**Solução:**
1. Configure um provedor de email no Supabase
2. Ou desabilite confirmação de email para testes

### **Passos de Debug:**

#### 1. **Verificar Configuração Básica**
```bash
# Verificar se as variáveis estão corretas
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY
```

#### 2. **Testar Conexão**
- Use o componente DebugInfo (canto inferior direito)
- Clique em "Testar Conexão"
- Verifique o console do navegador

#### 3. **Verificar Tabelas no Supabase**
```sql
-- Verificar se as tabelas existem
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Verificar políticas RLS
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
```

#### 4. **Verificar Usuários**
- Vá em **Authentication > Users** no Supabase
- Verifique se o usuário existe e está confirmado

#### 5. **Logs do Supabase**
- Vá em **Logs** no Supabase Dashboard
- Verifique logs de autenticação e API

### **Script SQL Completo para Verificação:**

```sql
-- 1. Verificar se as tabelas existem
SELECT 'projects' as table_name, COUNT(*) as exists 
FROM information_schema.tables 
WHERE table_name = 'projects' AND table_schema = 'public'
UNION ALL
SELECT 'tasks' as table_name, COUNT(*) as exists 
FROM information_schema.tables 
WHERE table_name = 'tasks' AND table_schema = 'public';

-- 2. Verificar RLS
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename IN ('projects', 'tasks');

-- 3. Verificar políticas
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public' AND tablename IN ('projects', 'tasks');

-- 4. Testar criação de projeto (substitua USER_ID)
-- INSERT INTO projects (user_id, title, description, status) 
-- VALUES ('USER_ID_AQUI', 'Teste', 'Projeto de teste', 'Planned');
```

### **Configurações Recomendadas do Supabase:**

#### **Authentication Settings:**
- **Enable email confirmations:** OFF (para desenvolvimento)
- **Enable phone confirmations:** OFF
- **Site URL:** `http://localhost:5173`
- **Redirect URLs:** `http://localhost:5173/**`

#### **Database Settings:**
- **Row Level Security:** ON para ambas as tabelas
- **Realtime:** OFF (não necessário para este projeto)

### **Comandos de Debug no Console:**

```javascript
// Testar conexão direta
const { data, error } = await supabase.auth.getSession()
console.log('Session:', data, error)

// Testar signup
const { data, error } = await supabase.auth.signUp({
  email: 'test@example.com',
  password: 'password123'
})
console.log('SignUp:', data, error)

// Testar signin
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'test@example.com',
  password: 'password123'
})
console.log('SignIn:', data, error)
```

### **Contato para Suporte:**

Se o problema persistir:
1. Verifique os logs do console do navegador
2. Verifique os logs do Supabase Dashboard
3. Teste com um projeto Supabase novo
4. Verifique se a região do Supabase está acessível

---

**💡 Dica:** Use o componente DebugInfo no canto inferior direito da tela para diagnósticos rápidos!
