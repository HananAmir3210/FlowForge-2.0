"use client";

import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Receipt,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/hooks/useAdminAuth";

interface AdminSidebarProps {
  isOpen: boolean;
}

const AdminSidebar = ({ isOpen }: AdminSidebarProps) => {
  const location = useLocation();
  const { logout } = useAdminAuth();

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "Subscriptions",
      href: "/admin/subscriptions",
      icon: CreditCard,
    },
    {
      name: "Transactions",
      href: "/admin/transactions",
      icon: Receipt,
    },
    // {
    //   name: "Settings",
    //   href: "/admin/settings",
    //   icon: Settings,
    // },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out flex flex-col",
        isOpen ? "w-64" : "w-16"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-primary" />
          {isOpen && (
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Admin Panel
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {isOpen && <span className="ml-3">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className={cn(
            "w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20",
            !isOpen && "justify-center"
          )}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {isOpen && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
