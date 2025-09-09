import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  Settings, 
  LogOut,
  Home
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const adminItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Resources", url: "/admin/resources", icon: FileText },
  { title: "Collections", url: "/admin/collections", icon: FolderOpen },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/admin/dashboard") {
      return currentPath === path || currentPath === "/admin";
    }
    return currentPath.startsWith(path);
  };

  const getNavClass = (path: string) => {
    return isActive(path) 
      ? "bg-primary-foreground/20 text-primary-foreground font-medium" 
      : "hover:bg-primary-foreground/10 text-primary-foreground/80 hover:text-primary-foreground";
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-primary elevation-4 border-r-0">
        {/* Logo/Brand */}
        <div className="spacing-md">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-primary-foreground flex items-center justify-center elevation-2">
              <span className="text-h3 text-primary">LH</span>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-h3 text-primary-foreground">Lead Hero</span>
                <span className="text-caption text-primary-foreground/80">Admin Panel</span>
              </div>
            )}
          </div>
        </div>

        <Separator className="bg-primary-foreground/20" />

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary-foreground/60 text-overline">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${getNavClass(item.url)}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span className="text-body">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="bg-primary-foreground/20" />

        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary-foreground/60 text-overline">Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/" 
                    className="flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 hover:bg-primary-foreground/10 text-primary-foreground/80 hover:text-primary-foreground"
                  >
                    <Home className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && <span className="text-body">View Site</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Actions */}
        <div className="mt-auto spacing-md">
          <Button 
            variant="ghost" 
            size={isCollapsed ? "sm" : "default"}
            className="w-full justify-start text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="ml-3 text-body">Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}