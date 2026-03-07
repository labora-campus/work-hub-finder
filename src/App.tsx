import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Search from "./pages/Search";
import CafeProfile from "./pages/CafeProfile";
import MyQR from "./pages/MyQR";
import Auth from "./pages/Auth";
import Panel from "./pages/Panel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/buscar" element={<Search />} />
          <Route path="/cafeteria/:id" element={<CafeProfile />} />
          <Route path="/mi-qr" element={<MyQR />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/panel" element={<Panel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
