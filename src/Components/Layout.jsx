import { Navbar } from "./Navbar";
import { Footer } from "./footer";
import { WhatsAppButton } from "./WhatsAppButton";

// user aur setUser props yahan receive karein
export function Layout({ children, user, setUser }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 🚀 user data ko Navbar mein pass karein */}
      <Navbar user={user} setUser={setUser} />
      
      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      
      {/* Footer aur WhatsApp button normal hi rahenge */}
      <Footer />
      <WhatsAppButton />
    </div>
  );
}