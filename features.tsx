import { FEATURES, QUICK_LINKS } from "@/lib/constants";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";

export function Features() {
  return (
    <>
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose ZipVert Convert?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We provide the best file conversion experience with premium features available to everyone for free.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, idx) => {
              const Icon = (LucideIcons as any)[feature.icon];
              return (
                <div key={idx} className="group p-8 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-slate-200 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    {Icon && <Icon className="h-8 w-8" />}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                    {feature.title}
                    {feature.badge && (
                      <span className="text-xs bg-amber-500 text-white px-2 py-1 rounded-full font-bold">
                        {feature.badge}
                      </span>
                    )}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About & Stats */}
      <section id="about" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">About ZipVert Convert</h2>
              <div className="space-y-4 text-lg text-slate-600">
                <p>
                  ZipVert Convert is a powerful, free online file conversion tool that supports over 50 different file formats. Whether you need to convert PDF documents to Word, compress images, extract audio from videos, or convert spreadsheets, we've got you covered.
                </p>
                <p className="font-semibold text-slate-900">
                  No registration required! Start converting immediately.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                {[
                  { label: "Supported Formats", value: "50+" },
                  { label: "Free Forever", value: "100%" },
                  { label: "Always Available", value: "24/7" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-2xl">⚡</span> 
                Quick Access - Popular Conversions
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {QUICK_LINKS.map((link, i) => {
                  const Icon = (LucideIcons as any)[link.icon];
                  return (
                    <a 
                      key={i} 
                      href="#converter"
                      className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 hover:border-primary hover:bg-blue-50/50 hover:text-primary transition-all group"
                    >
                      {Icon && <Icon className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />}
                      <span className="font-medium text-sm">{link.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
