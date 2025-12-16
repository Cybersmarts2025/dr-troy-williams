
import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserAccountProps {
  isMobile?: boolean;
  onMobileClose?: () => void;
}

const UserAccount = ({ isMobile = false, onMobileClose }: UserAccountProps) => {
  const { user, signOut, isAdmin, userRole } = useAuth();

  const handleSignOut = () => {
    signOut();
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  if (isMobile) {
    return user ? (
      <div className="px-5 py-2 border-t border-gray-100">
        <div className="flex flex-col gap-2">
          <div className="text-sm text-gray-500">{user.email}</div>
          {isAdmin && (
            <div className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-md text-center">
              Admin
            </div>
          )}
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center justify-center gap-2 text-red-500"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    ) : (
      <div className="px-5 py-2 border-t border-gray-100">
        <Link to="/auth" className="w-full" onClick={onMobileClose}>
          <Button variant="outline" size="sm" className="w-full">
            Sign In
          </Button>
        </Link>
      </div>
    );
  }

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2 gap-2">
          <UserCircle className="h-4 w-4" />
          Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="text-sm">
          {user.email}
        </DropdownMenuItem>
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs text-red-600 font-medium">
              Admin Access
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-red-500 cursor-pointer flex items-center gap-2"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Link to="/auth">
      <Button variant="outline" size="sm">
        Sign In
      </Button>
    </Link>
  );
};

export default UserAccount;
