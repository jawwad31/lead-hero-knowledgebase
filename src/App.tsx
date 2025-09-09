import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Index /></PublicLayout>} />
          <Route path="/categories/:slug" element={<PublicLayout><CategoryPage /></PublicLayout>} />
          <Route path="/resources/:id" element={<PublicLayout><Resource /></PublicLayout>} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/resources" element={<AdminLayout><Resources /></AdminLayout>} />
          <Route path="/admin/resources/new" element={<AdminLayout><ResourceForm /></AdminLayout>} />
          <Route path="/admin/resources/:id" element={<AdminLayout><ResourceForm /></AdminLayout>} />
          <Route path="/admin/collections" element={<AdminLayout><Collections /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><Settings /></AdminLayout>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
