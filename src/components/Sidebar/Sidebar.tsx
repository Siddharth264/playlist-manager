import { ChevronLeft, ChevronRight } from 'lucide-react';
import { t, TranslationKey } from '@/utils/translationUtil';

type SidebarProps = {
    isCollapsed: boolean;
    onToggle: () => void;
}

export const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const navItems = [
    'revenue', 'shoppableVideo', 'story', 'liveCommerce',
    'playlistManager', 'oneClickPost', 'calendar', 'hireInfluencer'
  ];

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-gray-900 border-r border-gray-800 flex flex-col transition-all`}>
      <button
        onClick={onToggle}
        className="p-2 hover:bg-gray-800 rounded-lg self-end m-2"
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
      
      <nav className="space-y-2 p-4">
        {navItems.map((item) => (
          <button
            key={item}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              !isCollapsed && item === 'playlistManager' ? 'bg-blue-600' : 'opacity-50'
            }`}
            disabled={item !== 'playlistManager'}
          >
            {!isCollapsed && t('navigation.' + item as TranslationKey)}
          </button>
        ))}
      </nav>
    </div>
  );
};