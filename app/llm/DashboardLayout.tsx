import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Bell, 
  User, 
  HelpCircle,
  ChevronLeft,
  Home,
  Shield,
  Activity,
  AlertTriangle,
  BarChart2,
  Settings,
  Command
} from 'lucide-react';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/llm' },
    { id: 'security', label: 'Security Rules', icon: Shield, path: '/llm/security' },
    { id: 'monitoring', label: 'Realtime Monitoring', icon: Activity, path: '/llm/monitoring' },
    { id: 'incidents', label: 'Incidents', icon: AlertTriangle, path: '/llm/incidents' },
    // { id: 'analytics', label: 'Analytics', icon: BarChart2, path: '/llm/analytics' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/llm/settings' }
  ];

  const currentPage = navItems.find(item => pathname === item.path)?.label || 'Dashboard';

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar with improved dark mode contrast */}
      <aside className={cn(
        "border-r transition-all duration-300 bg-card",
        isSidebarCollapsed ? "w-16" : "w-64"
      )}>
        {/* Logo Area with better dark mode visibility */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          {!isSidebarCollapsed && (
            <span className="text-lg font-semibold text-foreground">LLM Security</span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-accent text-foreground"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            <ChevronLeft className={cn(
              "transition-transform",
              isSidebarCollapsed ? "rotate-180" : ""
            )} />
          </Button>
        </div>

        {/* Navigation Items with dark mode specific styling */}
        <nav className="p-2 space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={pathname === item.path ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                pathname === item.path 
                  ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                !isSidebarCollapsed && "justify-start"
              )}
              onClick={() => handleNavigation(item.path)}
            >
              <item.icon className="h-4 w-4" />
              {!isSidebarCollapsed && (
                <span className="ml-3">{item.label}</span>
              )}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar with dark mode improvements */}
        <header className="h-16 border-b border-border bg-card px-4 flex items-center justify-between">
          <div className="flex items-center text-muted-foreground">
            <span className="font-medium">LLM Security</span>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <span className="text-foreground font-medium">
              {currentPage}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="w-64 justify-start text-muted-foreground border-border"
              onClick={() => setIsCommandOpen(true)}
            >
              <Command className="mr-2 h-4 w-4" />
              Search...
              <CommandShortcut>⌘K</CommandShortcut>
            </Button>

            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent">
                    <Bell className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    New alert detected
                    <Badge variant="destructive" className="ml-2">New</Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    System update available
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent">
                <HelpCircle className="h-4 w-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-accent">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatar.png" />
                      <AvatarFallback>US</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Pages">
              {navItems.map((item) => (
                <CommandItem 
                  key={item.id}
                  onSelect={() => {
                    handleNavigation(item.path);
                    setIsCommandOpen(false);
                  }}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>

        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;