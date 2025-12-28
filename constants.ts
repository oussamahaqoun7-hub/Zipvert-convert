export const FORMATS = {
  image: {
    from: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp'],
    to: ['jpg', 'png', 'webp', 'gif', 'pdf']
  },
  pdf: {
    from: ['pdf'],
    to: ['jpg', 'png', 'txt']
  },
  document: {
    from: ['txt', 'docx', 'doc', 'rtf'],
    to: ['pdf', 'txt', 'docx']
  },
  excel: {
    from: ['xlsx', 'xls', 'csv'],
    to: ['xlsx', 'csv', 'txt', 'json']
  }
};

export type ConversionType = keyof typeof FORMATS;

export const FEATURES = [
  {
    icon: "Zap",
    title: "Lightning Fast",
    description: "Convert files in seconds - No waiting, no limitations"
  },
  {
    icon: "Shield",
    title: "100% Secure",
    description: "Your files are processed locally - complete privacy guaranteed"
  },
  {
    icon: "Smartphone",
    title: "Works Anywhere",
    description: "Perfect on desktop, tablet, and mobile devices"
  },
  {
    icon: "Infinity",
    title: "Unlimited & Free",
    description: "Convert as many files as you want - no account needed"
  },
  {
    icon: "FileOutput",
    title: "50+ Formats",
    description: "Support for all popular file formats and more"
  },
  {
    icon: "History",
    title: "Conversion History",
    description: "Sign up to save and track all your conversions",
    badge: "PRO"
  }
];

export const QUICK_LINKS = [
  { type: 'image', from: 'jpg', to: 'png', label: 'JPG to PNG', icon: 'Image' },
  { type: 'image', from: 'png', to: 'jpg', label: 'PNG to JPG', icon: 'Image' },
  { type: 'pdf', from: 'pdf', to: 'jpg', label: 'PDF to JPG', icon: 'FileText' },
  { type: 'pdf', from: 'pdf', to: 'txt', label: 'PDF to Text', icon: 'FileText' },
  { type: 'image', from: 'jpg', to: 'pdf', label: 'Image to PDF', icon: 'FileImage' },
  { type: 'excel', from: 'xlsx', to: 'csv', label: 'Excel to CSV', icon: 'FileSpreadsheet' },
  { type: 'excel', from: 'csv', to: 'xlsx', label: 'CSV to Excel', icon: 'Table' },
  { type: 'document', from: 'txt', to: 'pdf', label: 'Text to PDF', icon: 'FileType' },
  { type: 'document', from: 'docx', to: 'pdf', label: 'Word to PDF', icon: 'FileType2' },
  { type: 'image', from: 'webp', to: 'png', label: 'WEBP to PNG', icon: 'Image' },
  { type: 'image', from: 'png', to: 'webp', label: 'PNG to WEBP', icon: 'Image' },
  { type: 'excel', from: 'xlsx', to: 'json', label: 'Excel to JSON', icon: 'FileCode' },
];
