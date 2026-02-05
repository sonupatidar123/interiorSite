import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/Components/ui/toaster";
import { Toaster as Sonner } from "@/Components/ui/sonnar";
import { TooltipProvider } from "@/Components/ui/tooltip";
import { Layout } from "./Components/Layout";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AddProject from "./pages/AddProject";
import AdminLogin from "./pages/Adminlogin";
import AdminMessages from "./pages/Adminmessages";

import { api } from "./api";


const queryClient = new QueryClient();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Check login session on refresh
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("me/")
      .then((res) => {
        // Sirf superuser (admin) ko hi access dena hai
        if (res.data.is_superuser) {
          setUser(res.data);
        } else {
          localStorage.clear();
          setUser(null);
        }
      })
      .catch(() => {
        localStorage.clear();
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="font-serif text-lg text-muted-foreground">Verifying Lucky Interior Admin...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          {/* ✅ Important: Layout ko user aur setUser dono pass kiye hain */}
          <Layout user={user} setUser={setUser}> 
            <Routes>
              {/* 🌍 Public Routes (Sab dekh sakte hain) */}
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/services" element={<Services />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />

              {/* 🔑 Admin Login Route */}
              <Route
                path="/admin-login"
                element={
                  user ? <Navigate to="/admin-messages" replace /> : <AdminLogin onLogin={setUser} />
                }
              />

              {/* 🛡️ Protected Admin Routes (Sirf login ke baad) */}
              <Route
                path="/admin-messages"
                element={
                  user ? <AdminMessages /> : <Navigate to="/admin-login" replace />
                }
              />
              
              <Route
                path="/addproject"
                element={
                  user ? <AddProject /> : <Navigate to="/admin-login" replace />
                }
              />

              {/* 🚫 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}