import { TypePlayList } from '@/types/types';
import { MoreVertical } from 'lucide-react';
import { t } from '@/utils/translationUtil';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';

type PlaylistCardProps = {
  playlist: TypePlayList;
  index: number;
  onClick: () => void;
  movePlaylist: (dragIndex: number, hoverIndex: number) => void;
};

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const PlaylistCard = ({ playlist, index, onClick, movePlaylist }: PlaylistCardProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'PLAYLIST',
    item: { type: 'PLAYLIST', id: playlist.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: 'PLAYLIST',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset?.y || 0) - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      movePlaylist(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`relative rounded-lg overflow-hidden aspect-video bg-gray-800 
        hover:ring-2 hover:ring-blue-500 group transition-transform
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        ${isDragging ? 'scale-105' : 'scale-100'}`}
      data-handler-id={handlerId}
    >
      <img
        src={playlist.thumbnail || "/Thumbnails/Images/img1.jpg"}
        alt={t('playlist.defaultName')}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      
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
};