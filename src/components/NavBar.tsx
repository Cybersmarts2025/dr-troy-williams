
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import MobileMenu from './navigation/MobileMenu'; // Fixed import statement
import { cn } from "@/lib/utils";
import { GlobalSearch } from './GlobalSearch';

import { useAuth } from "@/contexts/AuthContext";
import { UserCircle, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const NavLinks = () => (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          cn(
            "text-sm font-medium transition-colors hover:text-blue-600",
            isActive ? "text-blue-600" : "text-gray-600"
          )
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          cn(
            "text-sm font-medium transition-colors hover:text-blue-600",
            isActive ? "text-blue-600" : "text-gray-600"
          )
        }
      >
        About
      </NavLink>
      <NavLink
        to="/books"
        className={({ isActive }) =>
          cn(
            "text-sm font-medium transition-colors hover:text-blue-600",
            isActive ? "text-blue-600" : "text-gray-600"
          )
        }
      >
        Publications
      </NavLink>
      <NavLink
        to="/press"
        className={({ isActive }) =>
          cn(
            "text-sm font-medium transition-colors hover:text-blue-600",
            isActive ? "text-blue-600" : "text-gray-600"
          )
        }
      >
        Press & Media
      </NavLink>
      <NavLink
        to="/blog"
        className={({ isActive }) =>
          cn(
            "text-sm font-medium transition-colors hover:text-blue-600",
            isActive ? "text-blue-600" : "text-gray-600"
          )
        }
      >
        Blog
      </NavLink>
    </>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="font-bold text-red-600 text-xl md:text-2xl">
            Dr. Troy Williams
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLinks />
          
          {user ? (
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
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-500 cursor-pointer flex items-center gap-2"
                  onClick={() => signOut()}
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
          )}
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-500 hover:text-gray-800"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <MobileMenu onClose={closeMobileMenu}>
          {user ? (
            <div className="px-5 py-2 border-t border-gray-100">
              <div className="flex flex-col gap-2">
                <div className="text-sm text-gray-500">{user.email}</div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center justify-center gap-2 text-red-500"
                  onClick={() => {
                    signOut();
                    closeMobileMenu();
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          ) : (
            <div className="px-5 py-2 border-t border-gray-100">
              <Link to="/auth" className="w-full" onClick={closeMobileMenu}>
                <Button variant="outline" size="sm" className="w-full">
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </MobileMenu>
      )}
    </header>
  );
};

export default NavBar;
