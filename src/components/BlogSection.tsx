import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Search,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Tag,
  Share2,
  Check,
  X,
  ChevronRight,
  HelpCircle,
  Sparkles,
  ExternalLink,
  MessageSquare,
  FileText
} from 'lucide-react';
import { BLOG_ARTICLES, BlogArticle } from '../data/blogData';

interface BlogSectionProps {
  onNavigateContact?: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onNavigateContact }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(BLOG_ARTICLES.map((a) => a.category)));
    return ['All', ...cats];
  }, []);

  // Filter articles based on category and search
  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter((article) => {
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleCopyShareLink = (slug: string) => {
    const url = `${window.location.origin}/#blog-${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="blog" className="py-20 bg-slate-950 relative overflow-hidden text-slate-100">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Knowledge Center &amp; Engineering Articles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 flex items-center justify-center gap-3 flex-wrap">
            <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 shrink-0" />
            <span>Technical Insights, SEO &amp; <span className="bg-gradient-to-r from-cyan-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">Web Engineering</span></span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            In-depth engineering masterclasses, Google AdSense optimization checklists, WordPress technical guides, and full-stack performance blueprints authored by Waleed Khan Afridi.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-xl">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-amber-500 text-slate-950 shadow-md font-bold'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, SEO, React..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Article Cards Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800/80">
            <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No Articles Found</h3>
            <p className="text-slate-400 text-xs">Try adjusting your search query or selecting a different category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map((article) => (
              <motion.article
                key={article.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/40 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col group cursor-pointer"
                onClick={() => setActiveArticle(article)}
              >
                {/* Image Banner */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-cyan-500/90 text-slate-950 shadow-md">
                    {article.category}
                  </span>
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-950/80 backdrop-blur-md text-slate-300 border border-white/10 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-amber-400" />
                        {article.publishedDate}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 mb-2 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Tags & Action */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-800/80 text-slate-400 border border-slate-700/60"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-slate-300">{article.author.name}</span>
                      </span>
                      <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {/* Full Article Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/90 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative my-auto"
            >
              {/* Modal Sticky Header Bar */}
              <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-xl px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {activeArticle.category}
                  </span>
                  <span className="text-xs text-slate-400 hidden sm:inline">• {activeArticle.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyShareLink(activeArticle.slug)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied Link!' : 'Share'}</span>
                  </button>
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Article Content Container */}
              <div className="p-6 sm:p-10 space-y-8">
                {/* Hero Banner & Title */}
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-4">
                    {activeArticle.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pb-6 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <img
                        src={activeArticle.author.avatar}
                        alt={activeArticle.author.name}
                        className="w-8 h-8 rounded-full border border-cyan-500/40 object-cover"
                      />
                      <div>
                        <div className="text-slate-200 font-bold">{activeArticle.author.name}</div>
                        <div className="text-[10px] text-slate-400">{activeArticle.author.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-auto text-slate-400 text-xs">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        {activeArticle.publishedDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        {activeArticle.readTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Feature Image */}
                <div className="rounded-2xl overflow-hidden max-h-96 w-full bg-slate-950 border border-slate-800">
                  <img
                    src={activeArticle.image}
                    alt={activeArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Table of Contents Box */}
                {activeArticle.tableOfContents && activeArticle.tableOfContents.length > 0 && (
                  <div className="bg-slate-950/80 p-5 sm:p-6 rounded-2xl border border-cyan-500/20">
                    <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-cyan-400" />
                      Table of Contents
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                      {activeArticle.tableOfContents.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                          <ChevronRight className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Article Main Body HTML */}
                <div
                  className="prose prose-invert max-w-none prose-headings:text-white prose-headings:font-bold prose-p:text-slate-300 prose-p:leading-relaxed prose-li:text-slate-300 prose-strong:text-cyan-300 text-sm sm:text-base space-y-6"
                  dangerouslySetInnerHTML={{ __html: activeArticle.content }}
                />

                {/* FAQs Section */}
                {activeArticle.faqs && activeArticle.faqs.length > 0 && (
                  <div className="pt-8 border-t border-slate-800 space-y-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-amber-400" />
                      Frequently Asked Questions
                    </h3>
                    <div className="space-y-3">
                      {activeArticle.faqs.map((faq, idx) => (
                        <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                          <h4 className="text-sm font-bold text-cyan-300 mb-1">Q: {faq.question}</h4>
                          <p className="text-xs sm:text-sm text-slate-300">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Call To Action Banner */}
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/40 border border-cyan-500/30 text-center space-y-4 shadow-xl">
                  <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Need Custom Web Development or SEO Results?
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">
                    Let’s build your high-converting, lightning-fast platform or optimize your site for maximum Google Rankings. Contact Waleed Khan Afridi for direct engineering support.
                  </p>
                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setActiveArticle(null);
                        if (onNavigateContact) onNavigateContact();
                      }}
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg hover:scale-105 transition-transform cursor-pointer flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Contact Waleed Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
