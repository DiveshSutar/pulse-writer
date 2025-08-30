import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Menu, 
  X, 
  PenTool, 
  Home, 
  User, 
  Settings,
  HelpCircle,
  Shield 
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/my-blogs", label: "My Blogs", icon: User },
    { to: "/create", label: "Create Blog", icon: PenTool },
    { to: "/admin", label: "Admin Dashboard", icon: Shield },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-primary/80">
            <span className="text-lg font-bold text-primary-foreground">D</span>
          </div>
          <span className="hidden font-bold text-xl text-gradient sm:inline-block">
            Devnovate
          </span>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="mx-6 hidden flex-1 md:flex">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search blogs, authors, tags..."
              className="pl-8"
            />
          </div>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex md:items-center md:space-x-1">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "nav-link flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md",
                isActive(to) 
                  ? "active text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          ))}
        </div>

        {/* Help & Settings */}
        <div className="flex items-center space-x-2 ml-4">
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-4 w-4" />
          </Button>
          <Link to="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden ml-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t md:hidden">
          <div className="container py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search blogs..."
                className="pl-8"
              />
            </div>
            
            {/* Mobile Links */}
            <div className="flex flex-col space-y-2">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-md",
                    isActive(to)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};