import { useState } from 'react';
import { TopBar } from './components/Topbar/TopBar';
import { Sidebar } from './components/Sidebar/Sidebar';
import { PlaylistCard } from './components/Playlist/PlaylistCard';
import { VideoPanel } from './components/VideoPanel/VideoPanel';
import { mockPlaylists, mockVideos } from './data/mockData';
import { t } from './utils/translationUtil';
import { TypePlayList } from './types/types';

const Layout = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<TypePlayList>({} as TypePlayList);

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!isSidebarCollapsed)}
        />

        <div className="flex-1 overflow-hidden flex">
          <div className="flex-1 p-6 overflow-y-auto">
            <h2 className="text-2xl mb-6">{t('playlist.title')}</h2>
            <div className="grid grid-cols-3 gap-6">
              {mockPlaylists.map((playlist) => (
                <PlaylistCard
                  key={playlist.id}
                  playlist={playlist}
                  onClick={() => setSelectedPlaylist(playlist)}
                />
              ))}
            </div>
          </div>

          {selectedPlaylist?.id && <VideoPanel videos={mockVideos} setSelectedPlaylist={setSelectedPlaylist}/>}
        </div>
      </div>
    </div>
  );
};

export default Layout;