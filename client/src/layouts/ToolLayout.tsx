import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface ToolLayoutProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const ToolLayout: React.FC<ToolLayoutProps> = ({
  title,
  description,
  icon,
  children,
}) => {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Tool Header */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl opacity-60 pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>

        <Link
          to="/tools"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary-600 mb-6 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1.5" /> Back to Tools
        </Link>

        <div className="flex items-start space-x-5 relative z-10">
          {icon && (
            <div className="w-14 h-14 bg-gradient-to-br from-primary-50 text-primary-600 to-primary-100/50 rounded-2xl flex items-center justify-center shrink-0 border border-primary-100/50 shadow-sm">
              {React.cloneElement(icon as React.ReactElement<any>, {
                size: 28,
              })}
            </div>
          )}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-2">
              {title}
            </h1>
            <p className="text-gray-600 max-w-2xl leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Tool Main Content Area */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm min-h-[400px]">
        {children}
      </div>
    </div>
  );
};

export default ToolLayout;
