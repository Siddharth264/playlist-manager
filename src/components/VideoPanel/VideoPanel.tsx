import { TypePlayList, TypeVideo } from '@/types/types';
import { VideoItem } from './VideoItem';
import { t } from '@/utils/translationUtil';
import { CircleX } from 'lucide-react';
type VideoPanelProps = {
    videos: TypeVideo[];
    setSelectedPlaylist: React.Dispatch<React.SetStateAction<TypePlayList>>;
}
export const VideoPanel = ({ videos, setSelectedPlaylist}: VideoPanelProps) => (
  <div className="w-80 border-l border-gray-800 p-4 overflow-y-auto">
    <CircleX onClick={()=>setSelectedPlaylist({} as TypePlayList)} className='float-right cursor-pointer'/>
    <div className="space-y-4">
      <div>
        <h3 className="text-lg mb-2">{t('videoPanel.thumbnailTitle')}</h3>
        <input
          type="text"
          value={t('videoPanel.thumbnailPlaceholder')}
          className="w-full bg-gray-800 rounded-lg px-4 py-2"
        />
      </div>
      
      <div>
        <h3 className="text-lg mb-2">{t('videoPanel.videoStatus')}</h3>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input type="radio" name="status" defaultChecked />
            <span>{t('videoPanel.status.active')}</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="status" />
            <span>{t('videoPanel.status.inactive')}</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-lg mb-2">{t('videoPanel.productList')}</h3>
        <div className="space-y-4">
          {videos.map((video) => (
            <VideoItem key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  </div>
);
