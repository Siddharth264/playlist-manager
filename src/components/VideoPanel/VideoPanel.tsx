/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypePlayList, TypeVideo } from '@/types/types';
import { VideoItem } from './VideoItem';
import { t } from '@/utils/translationUtil';
import { CircleX } from 'lucide-react';
import { useEffect, useState } from 'react';
type VideoPanelProps = {
    setSelectedPlaylist: React.Dispatch<React.SetStateAction<TypePlayList>>;
    playlistId: string;
    playListName: string;
}
export const VideoPanel = ({ setSelectedPlaylist, playlistId, playListName}: VideoPanelProps) => {

  const [videoList, setVideoList] = useState<TypeVideo[]>([]);

  useEffect(() => {
    const fetchVideoList = async () => {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${playlistId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      const data = await response.json();
      const formattedData = data.items.map((item: any) => {
        return {
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          duration: item.snippet.publishedAt,
          productsCount: 0,
          thumbnail: item.snippet.thumbnails.high.url,
        };
      });
      setVideoList(formattedData);
    };
    fetchVideoList();
  }, [playlistId]);


  return (
  <div className="w-80 border-l border-gray-800 p-4 overflow-y-auto">
    <CircleX onClick={()=>setSelectedPlaylist({} as TypePlayList)} className='float-right cursor-pointer'/>
    <div className="space-y-4">
      <div>
        <h3 className="text-lg mb-2">{t('videoPanel.thumbnailTitle')}</h3>
        <input
          type="text"
          value={playListName}
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
          {videoList?.length>0 && videoList.map((video) => (
            <VideoItem key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  </div>
)
};
