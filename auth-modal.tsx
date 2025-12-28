import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'register';
  onLogin: (user: any) => void;
}

export function AuthModal({ isOpen, onClose, initialMode, onLogin }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { toast } = useToast();

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'login') {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        toast({
          title: "Welcome back!",
          description: `Successfully logged in as ${user.name}`,
        });
        onLogin(user);
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password",
        });
      }
    } else {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find((u: any) => u.email === formData.email)) {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: "Email already exists",
        });
        return;
      }

      if (formData.password.length < 6) {
        toast({
          variant: "destructive",
          title: "Invalid password",
          description: "Password must be at least 6 characters",
        });
        return;
      }

      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      toast({
        title: "Account created!",
        description: "Welcome to ZipVert Convert",
      });
      onLogin(newUser);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {mode === 'login' 
              ? 'Sign in to access your conversion history' 
              : 'Join ZipVert to save your history'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {mode === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="Enter your name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Enter your password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required 
            />
          </div>

          <Button type="submit" className="w-full text-lg py-6 mt-4">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>

          <div className="text-center text-sm text-muted-foreground mt-4">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <span 
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-primary hover:underline cursor-pointer font-semibold"
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </span>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
