import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Auth from './pages/Auth';
import AuthCallback from './pages/AuthCallback';
const Landing = React.lazy(() => import('./pages/Landing'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const ResumeBuilder = React.lazy(() => import('./pages/ResumeBuilder'));
const AtsChecker = React.lazy(() => import('./pages/AtsChecker'));
const PortfolioGenerator = React.lazy(() => import('./pages/Portfolio'));
const AiTextGenerator = React.lazy(() => import('./pages/tools/AiTextGenerator'));
const AiImageGenerator = React.lazy(() => import('./pages/tools/AiImageGenerator'));
const AiCodeGenerator = React.lazy(() => import('./pages/tools/AiCodeGenerator'));
const AiResumeImprover = React.lazy(() => import('./pages/tools/AiResumeImprover'));
const AiTravelItinerary = React.lazy(() => import('./pages/tools/AiTravelItinerary'));
const JsonFormatter = React.lazy(() => import('./pages/tools/JsonFormatter'));
const UuidGenerator = React.lazy(() => import('./pages/tools/UuidGenerator'));
const CssFormatter = React.lazy(() => import('./pages/tools/CssFormatter'));
const HtmlJsxConverter = React.lazy(() => import('./pages/tools/HtmlJsxConverter'));
const JwtDecoder = React.lazy(() => import('./pages/tools/JwtDecoder'));
const BaseEncoder = React.lazy(() => import('./pages/tools/BaseEncoder'));
const CodeSnippetGenerator = React.lazy(() => import('./pages/tools/CodeSnippetGenerator'));
const DiffChecker = React.lazy(() => import('./pages/tools/DiffChecker'));
const RegexTester = React.lazy(() => import('./pages/tools/RegexTester'));
const UrlEncoder = React.lazy(() => import('./pages/tools/UrlEncoder'));
const SqlFormatter = React.lazy(() => import('./pages/tools/SqlFormatter'));
const ApiTester = React.lazy(() => import('./pages/tools/ApiTester'));
const CronGenerator = React.lazy(() => import('./pages/tools/CronGenerator'));
const ImageCompressor = React.lazy(() => import('./pages/tools/ImageCompressor'));
const ImageToPdf = React.lazy(() => import('./pages/tools/ImageToPdf'));
const WordToPdf = React.lazy(() => import('./pages/tools/WordToPdf'));
const FileSizeReducer = React.lazy(() => import('./pages/tools/FileSizeReducer'));
const OcrTool = React.lazy(() => import('./pages/tools/OcrTool'));
const EsignTool = React.lazy(() => import('./pages/tools/EsignTool'));
const PasswordStrength = React.lazy(() => import('./pages/tools/PasswordStrength'));
const SecureNotes = React.lazy(() => import('./pages/tools/SecureNotes'));
const HashGenerator = React.lazy(() => import('./pages/tools/HashGenerator'));
const IpLookup = React.lazy(() => import('./pages/tools/IpLookup'));
const RandomTokenGenerator = React.lazy(() => import('./pages/tools/RandomTokenGenerator'));
const MetaTagGenerator = React.lazy(() => import('./pages/tools/MetaTagGenerator'));
const SitemapGenerator = React.lazy(() => import('./pages/tools/SitemapGenerator'));
const RobotsGenerator = React.lazy(() => import('./pages/tools/RobotsGenerator'));
const KeywordDensity = React.lazy(() => import('./pages/tools/KeywordDensity'));
const OpenGraphPreview = React.lazy(() => import('./pages/tools/OpenGraphPreview'));
const GradientGenerator = React.lazy(() => import('./pages/tools/GradientGenerator'));
const BoxShadowGenerator = React.lazy(() => import('./pages/tools/BoxShadowGenerator'));
const SvgOptimizer = React.lazy(() => import('./pages/tools/SvgOptimizer'));
const GlassmorphismGenerator = React.lazy(() => import('./pages/tools/GlassmorphismGenerator'));
const TailwindGenerator = React.lazy(() => import('./pages/tools/TailwindGenerator'));
const FaviconGenerator = React.lazy(() => import('./pages/tools/FaviconGenerator'));
const InvoiceGenerator = React.lazy(() => import('./pages/tools/InvoiceGenerator'));
const ExpenseTracker = React.lazy(() => import('./pages/tools/ExpenseTracker'));
const GstCalculator = React.lazy(() => import('./pages/tools/GstCalculator'));
const CurrencyConverter = React.lazy(() => import('./pages/tools/CurrencyConverter'));
const TimeZoneConverter = React.lazy(() => import('./pages/tools/TimeZoneConverter'));
const MeetingNotesGenerator = React.lazy(() => import('./pages/tools/MeetingNotesGenerator'));
const UnitConverter = React.lazy(() => import('./pages/tools/UnitConverter'));
const AgeCalculator = React.lazy(() => import('./pages/tools/AgeCalculator'));
const EmiCalculator = React.lazy(() => import('./pages/tools/EmiCalculator'));
const PercentageCalculator = React.lazy(() => import('./pages/tools/PercentageCalculator'));
const RandomNamePicker = React.lazy(() => import('./pages/tools/RandomNamePicker'));
const AsciiArtGenerator = React.lazy(() => import('./pages/tools/AsciiArtGenerator'));
const FancyTextGenerator = React.lazy(() => import('./pages/tools/FancyTextGenerator'));
const HashtagGenerator = React.lazy(() => import('./pages/tools/HashtagGenerator'));
const YoutubeOptimizer = React.lazy(() => import('./pages/tools/YoutubeOptimizer'));
const InstagramBioGenerator = React.lazy(() => import('./pages/tools/InstagramBioGenerator'));
const LinkInBioBuilder = React.lazy(() => import('./pages/tools/LinkInBioBuilder'));

const App: React.FC = () => {
  return (
    <Router>
      <React.Suspense fallback={<div className="flex items-center justify-center h-screen bg-white text-primary-600 font-bold tracking-widest text-sm uppercase">Loading Z1 Tools...</div>}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Auth type="login" />} />
          <Route path="/register" element={<Auth type="register" />} />
          <Route path="/auth-callback" element={<AuthCallback />} />
          <Route path="/tools" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/tools/resume-builder" element={<MainLayout><ResumeBuilder /></MainLayout>} />
          <Route path="/tools/ats" element={<MainLayout><AtsChecker /></MainLayout>} />
          <Route path="/tools/portfolio" element={<MainLayout><PortfolioGenerator /></MainLayout>} />
          <Route path="/tools/ai-text-generator" element={<MainLayout><AiTextGenerator /></MainLayout>} />
          <Route path="/tools/ai-image-generator" element={<MainLayout><AiImageGenerator /></MainLayout>} />
          <Route path="/tools/ai-code-generator" element={<MainLayout><AiCodeGenerator /></MainLayout>} />
          <Route path="/tools/ai-resume-improver" element={<MainLayout><AiResumeImprover /></MainLayout>} />
          <Route path="/tools/ai-travel-itinerary" element={<MainLayout><AiTravelItinerary /></MainLayout>} />
          <Route path="/tools/json-formatter" element={<MainLayout><JsonFormatter /></MainLayout>} />
          <Route path="/tools/uuid-generator" element={<MainLayout><UuidGenerator /></MainLayout>} />
          <Route path="/tools/css-formatter" element={<MainLayout><CssFormatter /></MainLayout>} />
          <Route path="/tools/html-jsx-converter" element={<MainLayout><HtmlJsxConverter /></MainLayout>} />
          <Route path="/tools/jwt-decoder" element={<MainLayout><JwtDecoder /></MainLayout>} />
          <Route path="/tools/base-encoder" element={<MainLayout><BaseEncoder /></MainLayout>} />
          <Route path="/tools/code-snippet-generator" element={<MainLayout><CodeSnippetGenerator /></MainLayout>} />
          <Route path="/tools/diff-checker" element={<MainLayout><DiffChecker /></MainLayout>} />
          <Route path="/tools/regex-tester" element={<MainLayout><RegexTester /></MainLayout>} />
          <Route path="/tools/url-encoder" element={<MainLayout><UrlEncoder /></MainLayout>} />
          <Route path="/tools/sql-formatter" element={<MainLayout><SqlFormatter /></MainLayout>} />
          <Route path="/tools/api-tester" element={<MainLayout><ApiTester /></MainLayout>} />
          <Route path="/tools/cron-generator" element={<MainLayout><CronGenerator /></MainLayout>} />
          <Route path="/tools/image-compressor" element={<MainLayout><ImageCompressor /></MainLayout>} />
          <Route path="/tools/image-to-pdf" element={<MainLayout><ImageToPdf /></MainLayout>} />
          <Route path="/tools/word-to-pdf" element={<MainLayout><WordToPdf /></MainLayout>} />
          <Route path="/tools/file-size-reducer" element={<MainLayout><FileSizeReducer /></MainLayout>} />
          <Route path="/tools/ocr" element={<MainLayout><OcrTool /></MainLayout>} />
          <Route path="/tools/esign-tool" element={<MainLayout><EsignTool /></MainLayout>} />
          <Route path="/tools/password-strength" element={<MainLayout><PasswordStrength /></MainLayout>} />
          <Route path="/tools/secure-notes" element={<MainLayout><SecureNotes /></MainLayout>} />
          <Route path="/tools/hash-generator" element={<MainLayout><HashGenerator /></MainLayout>} />
          <Route path="/tools/ip-lookup" element={<MainLayout><IpLookup /></MainLayout>} />
          <Route path="/tools/random-token-generator" element={<MainLayout><RandomTokenGenerator /></MainLayout>} />
          <Route path="/tools/meta-tag-generator" element={<MainLayout><MetaTagGenerator /></MainLayout>} />
          <Route path="/tools/sitemap-generator" element={<MainLayout><SitemapGenerator /></MainLayout>} />
          <Route path="/tools/robots-generator" element={<MainLayout><RobotsGenerator /></MainLayout>} />
          <Route path="/tools/keyword-density" element={<MainLayout><KeywordDensity /></MainLayout>} />
          <Route path="/tools/open-graph-preview" element={<MainLayout><OpenGraphPreview /></MainLayout>} />
          <Route path="/tools/gradient-generator" element={<MainLayout><GradientGenerator /></MainLayout>} />
          <Route path="/tools/box-shadow-generator" element={<MainLayout><BoxShadowGenerator /></MainLayout>} />
          <Route path="/tools/svg-optimizer" element={<MainLayout><SvgOptimizer /></MainLayout>} />
          <Route path="/tools/glassmorphism-generator" element={<MainLayout><GlassmorphismGenerator /></MainLayout>} />
          <Route path="/tools/tailwind-generator" element={<MainLayout><TailwindGenerator /></MainLayout>} />
          <Route path="/tools/favicon-generator" element={<MainLayout><FaviconGenerator /></MainLayout>} />
          <Route path="/tools/invoice-generator" element={<MainLayout><InvoiceGenerator /></MainLayout>} />
          <Route path="/tools/expense-tracker" element={<MainLayout><ExpenseTracker /></MainLayout>} />
          <Route path="/tools/gst-calculator" element={<MainLayout><GstCalculator /></MainLayout>} />
          <Route path="/tools/currency-converter" element={<MainLayout><CurrencyConverter /></MainLayout>} />
          <Route path="/tools/time-zone-converter" element={<MainLayout><TimeZoneConverter /></MainLayout>} />
          <Route path="/tools/meeting-notes-generator" element={<MainLayout><MeetingNotesGenerator /></MainLayout>} />
          <Route path="/tools/unit-converter" element={<MainLayout><UnitConverter /></MainLayout>} />
          <Route path="/tools/age-calculator" element={<MainLayout><AgeCalculator /></MainLayout>} />
          <Route path="/tools/emi-calculator" element={<MainLayout><EmiCalculator /></MainLayout>} />
          <Route path="/tools/percentage-calculator" element={<MainLayout><PercentageCalculator /></MainLayout>} />
          <Route path="/tools/random-name-picker" element={<MainLayout><RandomNamePicker /></MainLayout>} />
          <Route path="/tools/ascii-art-generator" element={<MainLayout><AsciiArtGenerator /></MainLayout>} />
          <Route path="/tools/fancy-text-generator" element={<MainLayout><FancyTextGenerator /></MainLayout>} />
          <Route path="/tools/hashtag-generator" element={<MainLayout><HashtagGenerator /></MainLayout>} />
          <Route path="/tools/youtube-title-generator" element={<MainLayout><YoutubeOptimizer /></MainLayout>} />
          <Route path="/tools/instagram-bio-generator" element={<MainLayout><InstagramBioGenerator /></MainLayout>} />
          <Route path="/tools/link-in-bio-builder" element={<MainLayout><LinkInBioBuilder /></MainLayout>} />
        </Routes>
      </React.Suspense>
    </Router>
  );
};
export default App;