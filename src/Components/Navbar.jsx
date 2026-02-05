import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard, MessageSquare, Globe } from "lucide-react"; // Globe icon add kiya
import { Button } from "@/Components/ui/button";
import { useTranslation } from 'react-i18next';

const publicLinks = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Services", path: "/services" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "Contact", path: "/contact" },
  { name: "About", path: "/about" },
];

const adminLinks = [
  { name: "Manage Projects", path: "/addproject", icon: <LayoutDashboard className="h-4 w-4 mr-2" /> },
  { name: "Messages", path: "/admin-messages", icon: <MessageSquare className="h-4 w-4 mr-2" /> },
];

export function Navbar({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation(); // Translation hook

  const handleLogout = () => {
    localStorage.clear();
    if (setUser) setUser(null);
    navigate("/");
    setIsOpen(false);
  };

  // Language change function
  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const currentLinks = user?.is_superuser ? adminLinks : publicLinks;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container-narrow mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link 
            to="/" 
            className="font-serif text-xl md:text-2xl font-semibold text-foreground"
          >
            Lucky Interior {user?.is_superuser && <span className="text-xs bg-primary text-white px-2 py-1 rounded ml-2">Admin</span>}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-6">
              {currentLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`flex items-center text-sm font-medium transition-colors link-underline ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.icon && link.icon}
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Language Dropdown Desktop */}
            <div className="flex items-center gap-2 border-l pl-6 border-border">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <select 
                onChange={changeLanguage} 
                value={i18n.language}
                className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
              </select>
            </div>

            {user?.is_superuser && (
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleLogout}
                className="ml-4"
              >
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <ul className="flex flex-col gap-4">
              {currentLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`flex items-center py-2 text-base font-medium transition-colors ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon && link.icon}
                    {link.name}
                  </Link>
                </li>
              ))}
              
              {/* Language Switcher Mobile */}
              <li className="pt-4 border-t border-border">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-muted-foreground flex items-center">
                    <Globe className="h-4 w-4 mr-2" /> {i18n.language === 'hi' ? 'भाषा चुनें' : 'Select Language'}
                  </span>
                  <select 
                    onChange={changeLanguage} 
                    value={i18n.language}
                    className="bg-secondary px-3 py-1 rounded-md text-sm font-medium"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिंदी</option>
                  </select>
                </div>
              </li>

              {user?.is_superuser && (
                <li className="pt-2 border-t border-border">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full py-2 text-red-500 font-medium"
                  >
                    <LogOut className="h-5 w-5 mr-2" /> Logout Admin
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}