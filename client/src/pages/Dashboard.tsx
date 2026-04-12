import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Globe, Palette, Search, ArrowRight, Fingerprint, FileJson, Code, Lock, Cpu, Image, Plane, Activity, Clock, Key, Calculator } from 'lucide-react';

const categorizedTools = [
  {
    "category": "Legacy Tools",
    "items": [
      {
        "id": "resume",
        "name": "Resume Maker",
        "description": "Build an elegant ATS-friendly resume",
        "icon": <FileText />,
        "path": "resume-builder",
        "component": "ResumeBuilder"
      },
      {
        "id": "ats",
        "name": "ATS Resume Checker",
        "description": "Score your resume against job descriptions",
        "icon": <Search />,
        "path": "ats",
        "component": "AtsChecker"
      },
      {
        "id": "portfolio",
        "name": "Portfolio Generator",
        "description": "Generate a public portfolio page",
        "icon": <Globe />,
        "path": "portfolio",
        "component": "PortfolioGenerator"
      }
    ]
  },
  {
    "category": "🧠 AI Tools",
    "items": [
      {
        "id": "ai-text",
        "name": "AI Text Generator",
        "description": "Blogs, captions, emails",
        "icon": <Cpu />,
        "path": "ai-text-generator",
        "component": "AiTextGenerator"
      },
      {
        "id": "ai-image",
        "name": "AI Image Generator",
        "description": "Simple prompt → image",
        "icon": <Image />,
        "path": "ai-image-generator",
        "component": "AiImageGenerator"
      },
      {
        "id": "ai-code",
        "name": "AI Code Generator",
        "description": "Generate or explain code",
        "icon": <Code />,
        "path": "ai-code-generator",
        "component": "AiCodeGenerator"
      },
      {
        "id": "ai-resume",
        "name": "AI Resume Bullet",
        "description": "Upgrade your ATS tool",
        "icon": <FileText />,
        "path": "ai-resume-improver",
        "component": "AiResumeImprover"
      },
      {
        "id": "ai-travel",
        "name": "AI Travel Itinerary",
        "description": "Fits your travel domain",
        "icon": <Plane />,
        "path": "ai-travel-itinerary",
        "component": "AiTravelItinerary"
      }
    ]
  },
  {
    "category": "👨‍💻 Developer Tools",
    "items": [
      {
        "id": "json-format",
        "name": "JSON Formatter",
        "description": "Validate and format JSON securely",
        "icon": <FileJson />,
        "path": "json-formatter",
        "component": "JsonFormatter"
      },
      {
        "id": "uuid-gen",
        "name": "UUID Generator",
        "description": "Generate random UUID v4 strings instantly",
        "icon": <Fingerprint />,
        "path": "uuid-generator",
        "component": "UuidGenerator"
      },
      {
        "id": "css-formatter",
        "name": "CSS Formatter",
        "description": "Minify or prettify CSS instantly",
        "icon": <Code />,
        "path": "css-formatter",
        "component": "CssFormatter"
      },
      {
        "id": "html-jsx",
        "name": "HTML ↔ JSX",
        "description": "Convert HTML code to React JSX",
        "icon": <Code />,
        "path": "html-jsx-converter",
        "component": "HtmlJsxConverter"
      },
      {
        "id": "jwt-decode",
        "name": "JWT Decoder",
        "description": "Decode JSON Web Tokens securely",
        "icon": <Lock />,
        "path": "jwt-decoder",
        "component": "JwtDecoder"
      },
      {
        "id": "base-enc",
        "name": "Base Encoder",
        "description": "Encode or Decode Base64 efficiently",
        "icon": <Code />,
        "path": "base-encoder",
        "component": "BaseEncoder"
      },
      {
        "id": "code-snap",
        "name": "Code Snippet Gen",
        "description": "Create beautiful shareable code images",
        "icon": <FileText />,
        "path": "code-snippet-generator",
        "component": "CodeSnippetGenerator"
      },
      {
        "id": "diff",
        "name": "Diff Checker",
        "description": "Compare text and find differences",
        "icon": <FileText />,
        "path": "diff-checker",
        "component": "DiffChecker"
      },
      {
        "id": "regex",
        "name": "Regex Tester",
        "description": "Test regular expressions",
        "icon": <Code />,
        "path": "regex-tester",
        "component": "RegexTester"
      },
      {
        "id": "url-enc",
        "name": "URL Encoder/Decoder",
        "description": "Encode or decode URLs securely",
        "icon": <Globe />,
        "path": "url-encoder",
        "component": "UrlEncoder"
      },
      {
        "id": "sql-form",
        "name": "SQL Formatter",
        "description": "Format and beautify SQL queries",
        "icon": <Code />,
        "path": "sql-formatter",
        "component": "SqlFormatter"
      },
      {
        "id": "api-test",
        "name": "API Request Tester",
        "description": "Mini Postman right in your browser",
        "icon": <Activity />,
        "path": "api-tester",
        "component": "ApiTester"
      },
      {
        "id": "cron-gen",
        "name": "Cron Job Generator",
        "description": "Generate cron schedules effortlessly",
        "icon": <Clock />,
        "path": "cron-generator",
        "component": "CronGenerator"
      }
    ]
  },
  {
    "category": "📄 Document Tools",
    "items": [
      {
        "id": "img-comp",
        "name": "Image Compressor",
        "description": "VERY important - Local Image compression",
        "icon": <Image />,
        "path": "image-compressor",
        "component": "ImageCompressor"
      },
      {
        "id": "img-pdf",
        "name": "Image to PDF",
        "description": "Convert images to PDF locally",
        "icon": <FileText />,
        "path": "image-to-pdf",
        "component": "ImageToPdf"
      },
      {
        "id": "word-pdf",
        "name": "Word ↔ PDF",
        "description": "Convert Word and PDF files easily",
        "icon": <FileText />,
        "path": "word-to-pdf",
        "component": "WordToPdf"
      },
      {
        "id": "file-size",
        "name": "File Size Reducer",
        "description": "Instantly reduce file sizes securely",
        "icon": <Activity />,
        "path": "file-size-reducer",
        "component": "FileSizeReducer"
      },
      {
        "id": "ocr",
        "name": "OCR (Image → Text)",
        "description": "Extract text locally from images",
        "icon": <FileText />,
        "path": "ocr",
        "component": "OcrTool"
      },
      {
        "id": "esign",
        "name": "eSign Tool",
        "description": "Simple signature overlay for PDFs",
        "icon": <FileText />,
        "path": "esign-tool",
        "component": "EsignTool"
      }
    ]
  },
  {
    "category": "🔐 Security Tools",
    "items": [
      {
        "id": "pass-str",
        "name": "Password Strength",
        "description": "Analyze the security of your passwords",
        "icon": <Lock />,
        "path": "password-strength",
        "component": "PasswordStrength"
      },
      {
        "id": "secure-notes",
        "name": "Secure Notes",
        "description": "Store encrypted notes locally",
        "icon": <Lock />,
        "path": "secure-notes",
        "component": "SecureNotes"
      },
      {
        "id": "hash-gen",
        "name": "Hash Generator",
        "description": "Generate MD5, SHA256 hashes instantly",
        "icon": <Fingerprint />,
        "path": "hash-generator",
        "component": "HashGenerator"
      },
      {
        "id": "ip-lookup",
        "name": "IP Lookup Tool",
        "description": "Discover fast geolocation IP data",
        "icon": <Globe />,
        "path": "ip-lookup",
        "component": "IpLookup"
      },
      {
        "id": "token-gen",
        "name": "Random Token Gen",
        "description": "Generate strong random tokens",
        "icon": <Key />,
        "path": "random-token-generator",
        "component": "RandomTokenGenerator"
      }
    ]
  },
  {
    "category": "🌐 Web & SEO Tools",
    "items": [
      {
        "id": "meta-gen",
        "name": "Meta Tag Generator",
        "description": "Generate SEO friendly HTML meta tags",
        "icon": <Globe />,
        "path": "meta-tag-generator",
        "component": "MetaTagGenerator"
      },
      {
        "id": "sitemap-gen",
        "name": "Sitemap Generator",
        "description": "Create dynamic XML sitemaps",
        "icon": <Globe />,
        "path": "sitemap-generator",
        "component": "SitemapGenerator"
      },
      {
        "id": "robots-gen",
        "name": "Robots.txt Generator",
        "description": "Quickly create robots.txt files",
        "icon": <FileText />,
        "path": "robots-generator",
        "component": "RobotsGenerator"
      },
      {
        "id": "keyword-test",
        "name": "Keyword Density",
        "description": "Check keyword density instantly",
        "icon": <Activity />,
        "path": "keyword-density",
        "component": "KeywordDensity"
      },
      {
        "id": "og-preview",
        "name": "Open Graph Preview",
        "description": "Preview open graph meta tags",
        "icon": <Globe />,
        "path": "open-graph-preview",
        "component": "OpenGraphPreview"
      }
    ]
  },
  {
    "category": "🎨 Design & UI Tools",
    "items": [
      {
        "id": "gradient-gen",
        "name": "Gradient Generator",
        "description": "Create and copy beautiful CSS gradients",
        "icon": <Palette />,
        "path": "gradient-generator",
        "component": "GradientGenerator"
      },
      {
        "id": "box-shadow",
        "name": "Box Shadow Gen",
        "description": "Visualize and generate CSS shadow code",
        "icon": <Palette />,
        "path": "box-shadow-generator",
        "component": "BoxShadowGenerator"
      },
      {
        "id": "svg-opt",
        "name": "SVG Optimizer",
        "description": "Compress and clean SVG vectors",
        "icon": <Image />,
        "path": "svg-optimizer",
        "component": "SvgOptimizer"
      },
      {
        "id": "glassmorphism",
        "name": "Glassmorphism",
        "description": "Generate beautiful glassmorphism CSS",
        "icon": <Palette />,
        "path": "glassmorphism-generator",
        "component": "GlassmorphismGenerator"
      },
      {
        "id": "tw-gen",
        "name": "Tailwind Component",
        "description": "Tailwind CSS Component Generator",
        "icon": <Code />,
        "path": "tailwind-generator",
        "component": "TailwindGenerator"
      },
      {
        "id": "favicon",
        "name": "Favicon Generator",
        "description": "Convert PNG/JPG to Favicon icons",
        "icon": <Image />,
        "path": "favicon-generator",
        "component": "FaviconGenerator"
      }
    ]
  },
  {
    "category": "📊 Business & Prod",
    "items": [
      {
        "id": "invoice",
        "name": "Invoice Generator",
        "description": "Extremely fast invoice generator 🔥",
        "icon": <FileText />,
        "path": "invoice-generator",
        "component": "InvoiceGenerator"
      },
      {
        "id": "expense",
        "name": "Expense Tracker",
        "description": "Simple local expense tracking",
        "icon": <Activity />,
        "path": "expense-tracker",
        "component": "ExpenseTracker"
      },
      {
        "id": "gst",
        "name": "GST / VAT Calc",
        "description": "Lightning fast GST/VAT calculation 🇦🇪",
        "icon": <Calculator />,
        "path": "gst-calculator",
        "component": "GstCalculator"
      },
      {
        "id": "currency",
        "name": "Currency Converter",
        "description": "Live real-time currency conversion",
        "icon": <Globe />,
        "path": "currency-converter",
        "component": "CurrencyConverter"
      },
      {
        "id": "timezone",
        "name": "Time Zone Converter",
        "description": "Convert and sync global timezones",
        "icon": <Clock />,
        "path": "time-zone-converter",
        "component": "TimeZoneConverter"
      },
      {
        "id": "meeting-notes",
        "name": "Meeting Notes Gen",
        "description": "Generate structured meeting notes",
        "icon": <FileText />,
        "path": "meeting-notes-generator",
        "component": "MeetingNotesGenerator"
      }
    ]
  },
  {
    "category": "🔢 Daily Utilities",
    "items": [
      {
        "id": "unit-conv",
        "name": "Unit Converter",
        "description": "Length, weight, temp, and more",
        "icon": <Activity />,
        "path": "unit-converter",
        "component": "UnitConverter"
      },
      {
        "id": "age-calc",
        "name": "Age Calculator",
        "description": "Precision age calculator",
        "icon": <Calculator />,
        "path": "age-calculator",
        "component": "AgeCalculator"
      },
      {
        "id": "emi-calc",
        "name": "EMI / Loan Calc",
        "description": "Instant EMI and Loan Calculator",
        "icon": <Calculator />,
        "path": "emi-calculator",
        "component": "EmiCalculator"
      },
      {
        "id": "percent-calc",
        "name": "Percentage Calc",
        "description": "Standard percentage calculations",
        "icon": <Calculator />,
        "path": "percentage-calculator",
        "component": "PercentageCalculator"
      },
      {
        "id": "name-picker",
        "name": "Random Name Picker",
        "description": "Fair random name spinner",
        "icon": <Fingerprint />,
        "path": "random-name-picker",
        "component": "RandomNamePicker"
      }
    ]
  },
  {
    "category": "📱 Social Tools",
    "items": [
      {
        "id": "ascii",
        "name": "ASCII Art Generator",
        "description": "Turn text into stylish ASCII art",
        "icon": <FileText />,
        "path": "ascii-art-generator",
        "component": "AsciiArtGenerator"
      },
      {
        "id": "fancy",
        "name": "Fancy Text Gen",
        "description": "Transform text into unicode fonts",
        "icon": <FileText />,
        "path": "fancy-text-generator",
        "component": "FancyTextGenerator"
      },
      {
        "id": "hashtag",
        "name": "Hashtag Generator",
        "description": "Social media hashtag generator",
        "icon": <Globe />,
        "path": "hashtag-generator",
        "component": "HashtagGenerator"
      },
      {
        "id": "yt-title",
        "name": "YouTube Optimizer",
        "description": "Title/Description Generator",
        "icon": <Globe />,
        "path": "youtube-title-generator",
        "component": "YoutubeOptimizer"
      },
      {
        "id": "ig-bio",
        "name": "Instagram Bio Gen",
        "description": "Craft perfect Instagram bios",
        "icon": <Globe />,
        "path": "instagram-bio-generator",
        "component": "InstagramBioGenerator"
      },
      {
        "id": "link-in-bio",
        "name": "Link-in-Bio Builder",
        "description": "Mini link-in-bio builder",
        "icon": <Globe />,
        "path": "link-in-bio-builder",
        "component": "LinkInBioBuilder"
      }
    ]
  }
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <section className="bg-white rounded-[3rem] p-10 border border-primary-50 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary-100 rounded-full blur-[100px] opacity-70 pointer-events-none group-hover:bg-primary-200 transition-colors duration-1000"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold mb-6 border border-primary-100">
            <span className="w-2 h-2 rounded-full bg-primary-600 animate-pulse"></span>
            <span>Over 40 Utilities Now Live</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Welcome to <span className="text-primary-600">Z1 Tools Dashboard</span>
          </h1>
          <p className="text-gray-500 text-lg mb-8 font-medium">
            Your comprehensive suite for deep development utilities, precise design helpers, AI magic, productivity, and document engineering.
          </p>
          <div className="flex space-x-4">
            <Link to="/tools/json-formatter" className="px-6 py-3 bg-primary-600 text-white font-bold rounded-full shadow-xl shadow-primary-600/20 hover:shadow-primary-600/40 hover:-translate-y-0.5 transition-all">Start Exploring</Link>
          </div>
        </div>
      </section>

      <div className="space-y-12 pb-20">
        {categorizedTools.map((section) => (
          <div key={section.category} className="space-y-6">
            <div className="flex items-center space-x-4">
               <h2 className="text-2xl font-black text-gray-900 tracking-tight">{section.category}</h2>
               <div className="px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-600 text-[11px] font-extrabold tracking-wider border border-primary-100">
                 {section.items.length} MODULES
               </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {section.items.map((tool) => (
                <Link key={tool.id} to={'/tools/' + tool.path} className="group bg-white hover:bg-primary-50 border border-primary-50 hover:border-primary-200 rounded-[2rem] p-6 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-white border border-primary-50 rounded-2xl flex items-center justify-center text-primary-600 group-hover:scale-110 transition-all shadow-sm">
                        {React.cloneElement(tool.icon as React.ReactElement<any>, { size: 22 })}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary-700 transition-colors">{tool.name}</h3>
                    <p className="text-sm text-gray-500 font-medium leading-snug">{tool.description}</p>
                  </div>
                  <div className="mt-8 flex items-center text-sm font-bold text-primary-600 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                    Launch <ArrowRight size={16} className="ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Dashboard;