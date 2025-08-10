"use client";

import { useState } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { Loader2 } from "lucide-react";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { user, isLoading, error } = useAdminAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Loading admin panel...
          </p>
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-2">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }

  // If on login page, show login without sidebar/header
  if (location.pathname === "/admin/login" || location.pathname === "/admin/") {
    // If user is already authenticated, redirect to dashboard
    if (user) {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Outlet />
      </div>
    );
  }

  // For protected routes, check authentication
  if (!user) {
    // If there's an error (like access denied), redirect to login
    return <Navigate to="/admin/login" replace />;
  }

  // Authenticated user accessing protected routes
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
