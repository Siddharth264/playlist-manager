import { ChevronRight, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

type UserMenuProps = {
  userName: string;
};
export const UserMenu = ({ userName }: UserMenuProps) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-red-500" />
        <span>{userName}</span>
        <ChevronRight size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem  onClick={handleLogout}>
          <LogOut className="mr-2" size={16}/>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
