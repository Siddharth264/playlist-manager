import { TypePlayList } from '@/types/types';
import { MoreVertical } from 'lucide-react';
import { t } from '@/utils/translationUtil';

type PlaylistCardProps = {
  playlist: TypePlayList;
  onClick: () => void;
};

export const PlaylistCard = ({ playlist, onClick }: PlaylistCardProps) => (
  <button
    onClick={onClick}
    className="relative rounded-lg overflow-hidden aspect-video bg-gray-800 hover:ring-2 hover:ring-blue-500 group"
  >
    {/* Background Image */}
    <img
      src={playlist.thumbnail || "/Thumbnails/Images/img1.jpg"}
      alt={t('playlist.defaultName')}
      className="absolute inset-0 w-full h-full object-cover"
    />
    
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
    
    {/* Content */}
    <div className="absolute inset-0 flex flex-col justify-between p-4">
      <div className="flex justify-between items-start">
        <span className="bg-blue-500 px-2 py-1 rounded-lg text-sm text-white">
          {t('playlist.defaultName')}
        </span>
        <div className="p-1 rounded-full hover:bg-white/10 transition-colors">
          <MoreVertical size={20} className="text-white" />
        </div>
      </div>
      
      <div className="flex items-center space-x-2 text-sm text-white">
        <span>{t('playlist.videoCount', { count: playlist.videoCount })}</span>
      </div>
    </div>
  </button>
);