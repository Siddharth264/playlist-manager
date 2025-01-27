import { TypeVideo } from "@/types/types";
import { t } from "@/utils/translationUtil";
import { Checkbox } from "@/components/ui/checkbox";

type VideoItemProps = {
  video: TypeVideo;
  selected?: boolean;
  onSelect?: (checked: boolean) => void;
};

export const VideoItem = ({ video, selected = false, onSelect }: VideoItemProps) => (
  <div className="flex items-center space-x-4 p-3 hover:bg-gray-100/5 rounded-lg transition-colors">
    {/* Thumbnail */}
    <div className="relative w-24 aspect-video rounded-md overflow-hidden bg-gray-800 flex-shrink-0">
      <img
        src={video.thumbnail || "/assests/Thumbnails/Images/tn1.png"}
        alt={video.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded text-xs">
        {video.duration}
      </div>
    </div>

    {/* Content */}
    <div className="flex-1 min-w-0">
      <div className="font-medium truncate">{video.title}</div>
      <div className="text-sm text-gray-400 mt-1">
        {t("videoPanel.productsAttached", { count: video.productsCount })}
      </div>
    </div>

    {/* Checkbox */}
    <div className="flex-shrink-0">
      <Checkbox
        checked={selected}
        onCheckedChange={onSelect}
        className="data-[state=checked]:bg-blue-500"
      />
    </div>
  </div>
);