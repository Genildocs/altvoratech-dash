import { useState } from 'react'
import { supabase } from '../services/supabaseClient'
import { Eye, EyeOff, RefreshCw } from 'lucide-react'

const DebugInfo = () => {
  const [showDetails, setShowDetails] = useState(false)
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState(null)

  const testConnection = async () => {
    setTesting(true)
    setTestResult(null)
    
    try {
      console.log('🔍 Testando conexão com Supabase...')
      
      // Teste básico de conexão
      const { data, error } = await supabase.auth.getSession()
      
      if (error) {
        throw error
      }
      
      setTestResult({
        success: true,
        message: 'Conexão com Supabase funcionando!',
        details: {
          url: import.meta.env.VITE_SUPABASE_URL,
          hasSession: !!data.session,
          timestamp: new Date().toISOString()
        }
      })
      
      console.log('✅ Teste de conexão bem-sucedido')
    } catch (error) {
      console.error('❌ Erro no teste de conexão:', error)
      setTestResult({
        success: false,
        message: 'Erro na conexão com Supabase',
        error: error.message,
        details: {
          url: import.meta.env.VITE_SUPABASE_URL,
          timestamp: new Date().toISOString()
        }
      })
    } finally {
      setTesting(false)
    }
  }

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Debug Supabase</h3>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            {showDetails ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {showDetails && (
          <div className="space-y-3 text-xs">
            {/* URL Status */}
            <div>
              <span className="font-medium text-gray-700">URL:</span>
              <div className={`mt-1 p-2 rounded ${supabaseUrl ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {supabaseUrl ? (
                  <span className="font-mono">{supabaseUrl}</span>
                ) : (
                  'Não configurado'
                )}
              </div>
            </div>

            {/* Key Status */}
            <div>
              <span className="font-medium text-gray-700">Chave:</span>
              <div className={`mt-1 p-2 rounded ${supabaseKey ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {supabaseKey ? (
                  <span className="font-mono">{supabaseKey.substring(0, 20)}...</span>
                ) : (
                  'Não configurado'
                )}
              </div>
            </div>

            {/* Test Connection */}
            <div>
              <button
                onClick={testConnection}
                disabled={testing || !supabaseUrl || !supabaseKey}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {testing ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                <span>Testar Conexão</span>
              </button>
            </div>

            {/* Test Result */}
            {testResult && (
              <div className={`p-2 rounded text-xs ${
                testResult.success 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                <div className="font-medium mb-1">{testResult.message}</div>
                {testResult.error && (
                  <div className="text-xs opacity-75">{testResult.error}</div>
                )}
                <div className="text-xs opacity-75 mt-1">
                  {testResult.details.timestamp}
                </div>
              </div>
            )}

            {/* Environment Info */}
            <div className="pt-2 border-t border-gray-200">
              <div className="text-gray-600">
                <div>Mode: {import.meta.env.MODE}</div>
                <div>Dev: {import.meta.env.DEV ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DebugInfo
