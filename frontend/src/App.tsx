import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";

import Layout from "@/components/layout/Layout";
import AdminLayout from "./Admin/components/layout/AdminLayout";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import EventsPage from "./pages/EventsPage";
import ProjectsPage from "./pages/ProjectsPage";
import TeamPage from "./pages/TeamPage";
import NewsPage from "./pages/NewsPage";
import GalleryPage from "./pages/GalleryPage";
import PartnersPage from "./pages/PartnersPage";
import JoinPage from "./pages/JoinPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

import Login from "./Admin/Auth/login";
import Home from "./Admin/pages/home";
import Member from "./Admin/pages/Member";
import AdminEvents from "./Admin/pages/event";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/join" element={<JoinPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>

            {/* Admin */}
            <Route element={<AdminLayout />}>
              <Route path="/admin/home" element={<Home />} />
              <Route path="/admin/members" element={<Member />} />
              <Route path="/admin/events" element={<AdminEvents />} />
            </Route>

            <Route path="/admin/login" element={<Login />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;