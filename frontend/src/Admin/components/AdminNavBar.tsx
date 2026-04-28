import { useNavigate } from 'react-router-dom';
import { Bell, Search, Settings, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import Logo from '../../assets/logojci.png'

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

type AdminNavbarProps = {
  adminName: string;
  notificationsCount?: number;
};

interface DecodedToken {
  id: string;
  username: string;
  role: string;
}

export default function AdminNavbar({ adminName, notificationsCount = 3 }: AdminNavbarProps) {
  const navigate = useNavigate();
  const decodedToken = jwtDecode(Cookies.get('authToken')) as DecodedToken;
  
  


  const handleLogout = () => {
    Cookies.remove('authToken');
    navigate('/admin/login');
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-6">
        
          <div className="grid h-16 w-16 place-items-center rounded-xl ">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="leading-tight">
            <h1 className="text-sm font-semibold text-slate-900">Admin</h1>
            <p className="text-xs text-slate-500">Dashboard</p>
          </div>
        

        <div className="hidden flex-1 md:block">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input type="search" placeholder="Rechercher..." className="bg-white pl-9" />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center p-0 text-[11px]">
              {notificationsCount}
            </Badge>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-10 gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/api/placeholder/32/32" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>

                <div className="hidden text-left md:block">
                  <p className="text-sm font-medium leading-none">{decodedToken?.username}</p>
                  <p className="text-xs text-slate-500">{decodedToken?.role}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/admin/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Paramètres
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}