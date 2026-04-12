import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Copy, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface AiSuggestionsProps {
  data: any;
  onClose: () => void;
}

const AiSuggestions: React.FC<AiSuggestionsProps> = ({ data, onClose }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card bg-primary-600 text-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4">
        <button onClick={onClose} className="text-white/60 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg">AI Power-ups</h3>
          <p className="text-white/70 text-sm">Click to copy suggestions</p>
        </div>
      </div>

      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20">
        {Object.entries(data).map(([section, suggestion]: [string, any]) => (
          <div key={section} className="space-y-3">
            <h4 className="font-bold uppercase text-xs tracking-widest text-white/50">{section}</h4>
            <div 
              onClick={() => copyToClipboard(suggestion.rewrite || suggestion)}
              className="p-4 bg-white/10 rounded-xl hover:bg-white/15 cursor-pointer transition-colors border border-white/10 group"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium">Suggested Rewrite</span>
                <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm text-white/90 leading-relaxed italic">
                "{suggestion.rewrite || suggestion}"
              </p>
            </div>
            
            {suggestion.keywords && suggestion.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {suggestion.keywords.map((kw: string) => (
                  <span key={kw} className="text-[10px] px-2 py-0.5 bg-white/10 rounded border border-white/5 text-white/80">
                    +{kw}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AiSuggestions;
