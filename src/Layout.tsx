/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TopBar } from "./components/Topbar/TopBar";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { PlaylistCard } from "./components/Playlist/PlaylistCard";
import { VideoPanel } from "./components/VideoPanel/VideoPanel";
import { t } from "./utils/translationUtil";
import { TypePlayList } from "./types/types";
import { Button } from "./components/ui/button";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";

const Layout = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<TypePlayList>(
    {} as TypePlayList
  );
  const [playlists, setPlaylists] = useState<TypePlayList[]>([] as TypePlayList[]);
  const clientId =
    "209540518210-cjbpt9m41oflliog8itfr437n6f429qb.apps.googleusercontent.com";

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "https://www.googleapis.com/auth/youtube.readonly",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const movePlaylist = (dragIndex: number, hoverIndex: number) => {
    const newPlaylists = [...playlists];
    const [draggedItem] = newPlaylists.splice(dragIndex, 1);
    newPlaylists.splice(hoverIndex, 0, draggedItem);
    setPlaylists(newPlaylists);
  };

  const onSuccess = async (res: any) => {
    const accessToken = res.accessToken;
    localStorage.setItem("accessToken", accessToken);
    const getUserPlayList = await fetch(
      "https://www.googleapis.com/youtube/v3/playlists?part=snippet&part=contentDetails&mine=true",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const playListData = await getUserPlayList.json();
    const formattedPlayListData = playListData.items.map((item: any) => {
      return {
        id: item.id,
        name: item.snippet.localized.title,
        thumbnail: item.snippet.thumbnails.high.url,
        videoCount: item.contentDetails.itemCount,
        playListId: item.id,
      };
    });

    setPlaylists(formattedPlayListData);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-900 text-white">
        <TopBar />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!isSidebarCollapsed)}
          />

          <div className="flex-1 overflow-hidden flex">
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl mb-6">{t("playlist.title")}</h2>
                <Button>
                  {" "}
                  <GoogleLogin
                    clientId={clientId}
                    buttonText="Import From Youtube"
                    onSuccess={onSuccess}
                    onFailure={() => console.log("Login Failed")}
                    cookiePolicy={"single_host_origin"}
                    isSignedIn={true}
                  />
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {playlists?.length>0 && playlists.map((playlist, index) => (
                  <PlaylistCard
                    key={playlist.id}
                    index={index}
                    playlist={playlist}
                    onClick={() => setSelectedPlaylist(playlist)}
                    movePlaylist={movePlaylist}
                  />
                ))}
              </div>
            </div>

            {selectedPlaylist?.id && (
              <VideoPanel
                playlistId={selectedPlaylist.id}
                setSelectedPlaylist={setSelectedPlaylist}
                playListName={selectedPlaylist.name}
              />
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Layout;
