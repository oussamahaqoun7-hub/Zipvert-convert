import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-24 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" 
        style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left animate-in slide-in-from-left duration-700">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Convert Your Files <br/>
              <span className="text-blue-200">in a Flash</span> with ZipVert
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto lg:mx-0">
              The fastest and most reliable file converter - No registration required! 
              Sign up to save your conversion history.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg h-14 px-8 shadow-lg transition-transform hover:-translate-y-1" asChild>
                <a href="#converter">
                  <ArrowDown className="mr-2 h-5 w-5" />
                  Start Converting Now
                </a>
              </Button>
            </div>
          </div>

          <div className="hidden lg:block relative h-[400px] animate-in slide-in-from-right duration-700 delay-200">
            {/* Floating Cards Animation */}
            {[
              { icon: 'PDF', top: '0', left: '10%' },
              { icon: 'DOCX', top: '10%', right: '10%' },
              { icon: 'JPG', bottom: '10%', left: '20%' },
              { icon: 'MP4', bottom: '20%', right: '20%' }
            ].map((item, i) => (
              <div 
                key={item.icon}
                className="absolute bg-white text-blue-600 p-6 rounded-2xl shadow-2xl font-bold text-2xl flex items-center justify-center w-24 h-24"
                style={{
                  top: item.top,
                  left: item.left,
                  right: item.right,
                  bottom: item.bottom,
                  animation: `float 6s ease-in-out infinite ${i * 1.5}s`
                }}
              >
                {item.icon}
              </div>
            ))}
            
            {/* Center Circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-inner">
                <span className="text-4xl">⚡</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
}
