import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span>© {currentYear}</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              ALTVORA
            </span>
            <span>- Todos os direitos reservados</span>
          </div>

          {/* Made with love */}
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Desenvolvido com</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>pela equipe</span>
            <span className="font-semibold text-primary-600">ALTVORA</span>
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              ALTVORATECH DASH - Sistema de Gerenciamento de Projetos
            </div>
            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <span>v2.0.0</span>
              <span>•</span>
              <span>React + Supabase</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer as default };
