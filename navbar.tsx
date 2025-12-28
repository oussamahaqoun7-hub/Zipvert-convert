import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Zap, User, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AuthModal } from "@/components/auth/auth-modal";

export function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('currentUser');
      setUser(null);
    }
  };

  const openAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
            <User className="h-4 w-4" />
            <span>{user ? `Welcome, ${user.name}` : 'Guest Mode'}</span>
          </div>

          <div className="flex items-center gap-2">
            {!user ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => openAuth('login')} className="text-white hover:text-white hover:bg-white/20 border border-white/40">
                  Sign In
                </Button>
                <Button size="sm" variant="secondary" onClick={() => openAuth('register')} className="bg-white text-primary hover:bg-white/90">
                  Sign Up
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:text-white hover:bg-white/20 border border-white/40 gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <Zap className="h-8 w-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
              <div className="flex flex-col leading-none">
                <span className="font-bold text-xl text-primary">ZipVert</span>
                <span className="text-xs text-muted-foreground font-medium">Convert</span>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-medium">
            <a href="#home" className="text-foreground/80 hover:text-primary transition-colors">Home</a>
            <a href="#features" className="text-foreground/80 hover:text-primary transition-colors">Features</a>
            <a href="#converter" className="text-foreground/80 hover:text-primary transition-colors">Converter</a>
            <a href="#about" className="text-foreground/80 hover:text-primary transition-colors">About</a>
          </nav>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 mt-8">
                  <a href="#home" className="text-lg font-medium">Home</a>
                  <a href="#features" className="text-lg font-medium">Features</a>
                  <a href="#converter" className="text-lg font-medium">Converter</a>
                  <a href="#about" className="text-lg font-medium">About</a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialMode={authMode}
        onLogin={(u) => {
          setUser(u);
          setIsAuthOpen(false);
        }}
      />
    </>
  );
}
