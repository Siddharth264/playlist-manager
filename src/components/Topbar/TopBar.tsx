import { Bell } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { UserMenu } from "./UserMenu";
import { t } from "@/utils/translationUtil";

export const TopBar = () => {
  const userName = localStorage.getItem("loggedInUser")||"";
  return (
    <div className="h-16 border-b border-gray-800 flex items-center justify-between px-4">
      <div className="flex items-center">
        <div className="text-2xl font-bold mr-8">{t("appName")}</div>
      </div>

      <div className="flex items-center space-x-4">
        <SearchBar placeholder={t("search.placeholder")} />
        <button className="bg-blue-600 px-4 py-2 rounded-lg">
          {t("buttons.supportRequest")}
        </button>
        <button className="border border-blue-600 px-4 py-2 rounded-lg">
          {t("buttons.productTour")}
        </button>
        <Bell size={20} className="text-gray-400" />
        <UserMenu userName={userName}/>
      </div>
    </div>
  );
};
