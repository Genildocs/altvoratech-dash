import { AlertCircle, Check, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import Footer from './Footer';

const SupabaseSetup = () => {
  const [copied, setCopied] = useState(false);

  const envTemplate = `# Supabase Configuration
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_aqui`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(envTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex-shrink-0">
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Configuração do Supabase Necessária
                </h1>
                <p className="text-gray-600">
                  Configure suas credenciais do Supabase para continuar
                </p>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  1. Acesse o Supabase Dashboard
                </h3>
                <p className="text-gray-600 mb-3">
                  Vá para o dashboard do Supabase e crie um novo projeto ou
                  acesse um existente.
                </p>
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
                  <span>Abrir Supabase Dashboard</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              {/* Step 2 */}
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  2. Obtenha suas Credenciais
                </h3>
                <p className="text-gray-600 mb-3">
                  No seu projeto, vá em <strong>Settings → API</strong> e copie:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>
                    <strong>Project URL</strong> (para VITE_SUPABASE_URL)
                  </li>
                  <li>
                    <strong>anon public key</strong> (para
                    VITE_SUPABASE_ANON_KEY)
                  </li>
                </ul>
              </div>

              {/* Step 3 */}
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  3. Configure o Banco de Dados
                </h3>
                <p className="text-gray-600 mb-3">
                  Execute o script SQL no <strong>SQL Editor</strong> do
                  Supabase:
                </p>
                <div className="bg-gray-100 rounded-lg p-3">
                  <code className="text-sm text-gray-800">
                    Arquivo: supabase-setup.sql (na raiz do projeto)
                  </code>
                </div>
              </div>

              {/* Step 4 */}
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  4. Crie o arquivo .env
                </h3>
                <p className="text-gray-600 mb-3">
                  Crie um arquivo{' '}
                  <code className="bg-gray-100 px-2 py-1 rounded">.env</code> na
                  raiz do projeto com o seguinte conteúdo:
                </p>

                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <button
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors"
                    title="Copiar para clipboard">
                    {copied ? (
                      <Check className="h-4 w-4 text-green-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    <code>{envTemplate}</code>
                  </pre>
                </div>
              </div>

              {/* Step 5 */}
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  5. Reinicie o Servidor
                </h3>
                <p className="text-gray-600 mb-3">
                  Após criar o arquivo .env, reinicie o servidor de
                  desenvolvimento:
                </p>
                <div className="bg-gray-100 rounded-lg p-3">
                  <code className="text-sm text-gray-800">npm run dev</code>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900">
                    Importante
                  </h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Nunca compartilhe suas chaves do Supabase publicamente. O
                    arquivo .env já está no .gitignore para sua segurança.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SupabaseSetup;
