import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface ServiceBreadcrumbsProps {
  currentServiceName?: string;
}

export const ServiceBreadcrumbs: React.FC<ServiceBreadcrumbsProps> = ({ currentServiceName }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-400 py-4 px-4 sm:px-6 max-w-7xl mx-auto border-b border-slate-800/60 mb-8" aria-label="Breadcrumb">
      <Link to="/" className="flex items-center hover:text-cyan-400 transition-colors">
        <Home className="w-4 h-4 mr-1" />
        <span>Home</span>
      </Link>
      <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
      <Link to="/services" className="hover:text-cyan-400 transition-colors">
        Services
      </Link>
      {currentServiceName && (
        <>
          <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
          <span className="text-cyan-400 font-medium truncate max-w-[200px] sm:max-w-none">
            {currentServiceName}
          </span>
        </>
      )}
    </nav>
  );
};
