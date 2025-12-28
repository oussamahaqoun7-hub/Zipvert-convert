import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">ZipVert</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              The fastest and most reliable free file converter. No registration required - Start converting immediately!
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <div className="flex flex-col gap-3 text-slate-400">
              <a href="#home" className="hover:text-white transition-colors">Home</a>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#converter" className="hover:text-white transition-colors">Converter</a>
              <a href="#about" className="hover:text-white transition-colors">About Us</a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6">Popular</h3>
            <div className="flex flex-col gap-3 text-slate-400">
              <a href="#converter" className="hover:text-white transition-colors">JPG to PNG</a>
              <a href="#converter" className="hover:text-white transition-colors">PDF to JPG</a>
              <a href="#converter" className="hover:text-white transition-colors">Excel to CSV</a>
              <a href="#converter" className="hover:text-white transition-colors">Word to PDF</a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6">Socials</h3>
            <div className="flex gap-4">
              {['Twitter', 'Facebook', 'Instagram', 'Github'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current rounded-sm" /> 
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center text-slate-500">
          <p>&copy; 2025 ZipVert Convert. All rights reserved. | No registration required - Convert freely!</p>
        </div>
      </div>
    </footer>
  );
}
