import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { Converter } from "@/components/converter/converter-main";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Converter />
      </main>
      <Footer />
    </div>
  );
}
