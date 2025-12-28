import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FORMATS, ConversionType } from "@/lib/constants";
import { CloudUpload, File as FileIcon, X, ArrowLeftRight, Download, CheckCircle, RefreshCcw, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ConverterProps {
  initialType?: ConversionType;
}

export function Converter({ initialType = 'image' }: ConverterProps) {
  const [type, setType] = useState<ConversionType>(initialType);
  const [fromFormat, setFromFormat] = useState(FORMATS[initialType].from[0]);
  const [toFormat, setToFormat] = useState(FORMATS[initialType].to[0]);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'converting' | 'completed'>('idle');
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleTypeChange = (newType: ConversionType) => {
    setType(newType);
    setFromFormat(FORMATS[newType].from[0]);
    setToFormat(FORMATS[newType].to[0]);
    setFile(null);
    setStatus('idle');
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (selectedFile: File) => {
    if (selectedFile.size > 100 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Maximum file size is 100MB",
      });
      return;
    }
    setFile(selectedFile);
    setStatus('idle');
    setProgress(0);
  };

  const handleConvert = async () => {
    if (!file) return;

    setStatus('converting');
    setProgress(0);

    // Simulate conversion steps
    const steps = [
      { p: 20, t: 500 },
      { p: 45, t: 800 },
      { p: 70, t: 600 },
      { p: 90, t: 400 },
      { p: 100, t: 300 },
    ];

    for (const step of steps) {
      await new Promise(r => setTimeout(r, step.t));
      setProgress(step.p);
    }

    setStatus('completed');
    toast({
      title: "Conversion Complete",
      description: "Your file is ready to download",
    });
  };

  const handleDownload = () => {
    if (!file) return;
    
    // Create a blob from the original file (simulation)
    // In a real app, this would be the converted file from backend/worker
    const blob = new Blob([file], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    const originalName = file.name.split('.').slice(0, -1).join('');
    a.href = url;
    a.download = `${originalName}_converted.${toFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const swapFormats = () => {
    // Check if both formats exist in both lists (intersection) before swapping
    // Usually conversion is directional, so swapping might pick first available
    const oldFrom = fromFormat;
    const oldTo = toFormat;
    
    // Simple logic: just set them, but if not available in dropdown, it will default
    setFromFormat(oldTo);
    setToFormat(oldFrom);
  };

  return (
    <div id="converter" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">File Converter</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {(Object.keys(FORMATS) as ConversionType[]).map((t) => (
              <Button
                key={t}
                variant={type === t ? "default" : "outline"}
                onClick={() => handleTypeChange(t)}
                className="min-w-[100px] capitalize"
              >
                {t}
              </Button>
            ))}
          </div>
        </div>

        <Card className="p-8 shadow-xl bg-white border-0">
          {/* Format Selection */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-end mb-8">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600">From Format</label>
              <Select value={fromFormat} onValueChange={setFromFormat}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FORMATS[type].from.map(f => (
                    <SelectItem key={f} value={f}>{f.toUpperCase()}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              size="icon" 
              variant="ghost" 
              className="rounded-full h-12 w-12 bg-slate-100 hover:bg-slate-200 mb-0.5 md:mx-auto"
              onClick={swapFormats}
            >
              <ArrowLeftRight className="h-5 w-5 text-primary" />
            </Button>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600">To Format</label>
              <Select value={toFormat} onValueChange={setToFormat}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FORMATS[type].to.map(f => (
                    <SelectItem key={f} value={f}>{f.toUpperCase()}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Upload Area */}
          {!file && (
            <div
              className={`
                border-3 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer
                ${dragActive ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-primary/50 hover:bg-slate-50'}
              `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                ref={fileInputRef}
                type="file" 
                className="hidden" 
                onChange={(e) => e.target.files && handleFile(e.target.files[0])}
              />
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <CloudUpload className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">Drag & Drop Your File Here</h3>
              <p className="text-slate-500 mb-6">or click to browse from your computer</p>
              <Button variant="secondary">Choose File</Button>
              <p className="text-xs text-slate-400 mt-4">Maximum: 100 MB</p>
            </div>
          )}

          {/* File Processing Area */}
          {file && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <FileIcon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold truncate">{file.name}</h4>
                  <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                {status !== 'converting' && status !== 'completed' && (
                  <Button variant="destructive" size="icon" onClick={() => setFile(null)} className="rounded-full h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {status === 'converting' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Converting...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2.5" />
                </div>
              )}

              {status === 'idle' && (
                <Button onClick={handleConvert} className="w-full text-lg h-14">
                  Convert Now
                </Button>
              )}

              {status === 'completed' && (
                <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-col items-center gap-2 text-green-600 mb-6">
                    <CheckCircle className="h-16 w-16" />
                    <h3 className="text-2xl font-bold text-slate-900">Conversion Successful!</h3>
                  </div>

                  <div className="grid gap-4">
                    <Button onClick={handleDownload} className="w-full text-lg h-14 bg-green-600 hover:bg-green-700">
                      <Download className="mr-2 h-5 w-5" />
                      Download File
                    </Button>
                    <Button variant="outline" onClick={() => { setFile(null); setStatus('idle'); }} className="w-full">
                      <RefreshCcw className="mr-2 h-4 w-4" />
                      Convert Another File
                    </Button>
                  </div>

                  {/* Guest Promo */}
                  {!localStorage.getItem('currentUser') && (
                    <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-2 bg-amber-100 rounded-full text-amber-600">
                          <Star className="h-6 w-6 fill-current" />
                        </div>
                        <h4 className="font-bold text-slate-900">Want to save this conversion?</h4>
                        <p className="text-slate-600 text-sm">Create a free account to access your conversion history anytime!</p>
                        <Button variant="secondary" className="text-amber-700 bg-amber-100 hover:bg-amber-200 border-amber-200">
                          Sign Up - It's Free
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
