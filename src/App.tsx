import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import Resource from "./pages/Resource";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import Resources from "./pages/admin/Resources";
import ResourceForm from "./pages/admin/ResourceForm";
import Collections from "./pages/admin/Collections";
import Settings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";
import { AdminLayout } from "./components/layouts/AdminLayout";
import { PublicLayout } from "./components/layouts/PublicLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="leadhero-ui-theme">
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout><Index /></PublicLayout>} />
            <Route path="/categories/:slug" element={<PublicLayout><CategoryPage /></PublicLayout>} />
            <Route path="/resources/:slug" element={<PublicLayout><Resource /></PublicLayout>} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Admin Routes - Protected */}
            <Route path="/admin" element={<ProtectedRoute><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/resources" element={<ProtectedRoute><AdminLayout><Resources /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/resources/new" element={<ProtectedRoute><AdminLayout><ResourceForm /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/resources/:id" element={<ProtectedRoute><AdminLayout><ResourceForm /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/collections" element={<ProtectedRoute><AdminLayout><Collections /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute><AdminLayout><Settings /></AdminLayout></ProtectedRoute>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
