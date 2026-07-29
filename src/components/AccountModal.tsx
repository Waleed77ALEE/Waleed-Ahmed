import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  User,
  ShoppingBag,
  Save,
  LogOut,
  CheckCircle2,
  Package,
  Shield,
  Loader2,
  MessageSquare,
  LayoutDashboard,
  FolderGit2,
  Download,
  FileText,
  Clock,
  Printer,
  ExternalLink,
  Lock,
  ChevronRight,
  Sparkles,
  Check,
  AlertCircle
} from 'lucide-react';
import { UserProfile, SupabaseOrder, fetchUserOrders, upsertProfile } from '../lib/supabase';
import { ClientProject, Deliverable, ClientInvoice } from '../types';
import { loadClientProjects, triggerFileDownload, printInvoice } from '../services/clientDashboardStore';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  profile: UserProfile | null;
  onProfileUpdate: () => void;
  onSignOut: () => void;
  whatsappNumber: string;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  user,
  profile,
  onProfileUpdate,
  onSignOut,
  whatsappNumber
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects' | 'deliverables' | 'invoices' | 'orders' | 'profile'>('dashboard');
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [whatsapp, setWhatsapp] = useState(profile?.whatsapp || '');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [orders, setOrders] = useState<SupabaseOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Client Dashboard State
  const [projects, setProjects] = useState<ClientProject[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setWhatsapp(profile.whatsapp || '');
    }
  }, [profile]);

  useEffect(() => {
    if (isOpen && user) {
      loadOrders();
      const loadedProj = loadClientProjects(user.id, user.email || 'client@example.com');
      setProjects(loadedProj);
      if (loadedProj.length > 0 && !selectedProjectId) {
        setSelectedProjectId(loadedProj[0].id);
      }
    }
  }, [isOpen, user]);

  const loadOrders = async () => {
    if (!user) return;
    setLoadingOrders(true);
    const data = await fetchUserOrders(user.id);
    setOrders(data);
    setLoadingOrders(false);
  };

  const selectedProject = useMemo(() => {
    return projects.find((p) => p.id === selectedProjectId) || projects[0] || null;
  }, [projects, selectedProjectId]);

  // All deliverables across projects
  const allDeliverables = useMemo(() => {
    return projects.flatMap((p) => p.deliverables || []);
  }, [projects]);

  // All invoices across projects
  const allInvoices = useMemo(() => {
    return projects.flatMap((p) => p.invoices || []);
  }, [projects]);

  // Dashboard Stats
  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const completedProjects = projects.filter((p) => p.status === 'Completed' || p.status === 'Deliverables Ready').length;
    const totalDeliverables = allDeliverables.length;
    const totalInvoiced = allInvoices.reduce((acc, inv) => acc + inv.amount, 0);
    const totalPaid = allInvoices.filter((inv) => inv.status === 'PAID').reduce((acc, inv) => acc + inv.amount, 0);
    const balanceDue = totalInvoiced - totalPaid;

    return {
      totalProjects,
      completedProjects,
      totalDeliverables,
      totalInvoiced,
      totalPaid,
      balanceDue
    };
  }, [projects, allDeliverables, allInvoices]);

  if (!isOpen) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setSaveSuccess(false);

    const updated: UserProfile = {
      id: user.id,
      email: user.email || '',
      full_name: fullName,
      whatsapp: whatsapp
    };

    const success = await upsertProfile(updated);
    setSaving(false);
    if (success) {
      setSaveSuccess(true);
      onProfileUpdate();
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Decorative background blur */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title & Security Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 border border-cyan-400/30 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-cyan-500/20">
              {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'C'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-white tracking-tight">{profile?.full_name || 'Client Dashboard'}</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-cyan-500/20 border border-cyan-500/30 text-cyan-300">
                  Verified Client
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-bold text-slate-300">Client Portal Encrypted</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 border-b border-slate-800 scrollbar-none">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                : 'bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                : 'bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Projects & Status</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-mono">
              {projects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('deliverables')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'deliverables'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                : 'bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Deliverables</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-mono">
              {allDeliverables.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'invoices'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                : 'bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Invoices & Billing</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-mono">
              {allInvoices.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                : 'bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                : 'bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>
        </div>

        {/* TAB 1: CLIENT DASHBOARD OVERVIEW */}
        <div className="overflow-y-auto flex-1 pr-1 custom-scrollbar">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Summary Metric Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-slate-950/70 border border-slate-800/90 rounded-2xl p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-semibold">Active Projects</span>
                    <FolderGit2 className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-2xl font-black text-white font-mono">{stats.totalProjects}</span>
                    <span className="text-[10px] text-emerald-400 block font-semibold mt-0.5">
                      {stats.completedProjects} Ready / Completed
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950/70 border border-slate-800/90 rounded-2xl p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-semibold">Deliverables</span>
                    <Download className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-2xl font-black text-white font-mono">{stats.totalDeliverables}</span>
                    <span className="text-[10px] text-cyan-400 block font-semibold mt-0.5">Instant Download Ready</span>
                  </div>
                </div>

                <div className="bg-slate-950/70 border border-slate-800/90 rounded-2xl p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-semibold">Total Paid</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-2xl font-black text-emerald-400 font-mono">${stats.totalPaid}</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Verified via Crypto/Bank</span>
                  </div>
                </div>

                <div className="bg-slate-950/70 border border-slate-800/90 rounded-2xl p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-semibold">Balance Due</span>
                    <FileText className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-2xl font-black text-amber-400 font-mono">${stats.balanceDue}</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      {stats.balanceDue === 0 ? 'Fully Paid' : 'Due upon next milestone'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Primary Active Project Banner */}
              {selectedProject && (
                <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/30 rounded-3xl p-5 sm:p-6 relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 p-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {selectedProject.status}
                    </span>
                  </div>

                  <div className="max-w-2xl">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 font-mono">
                      {selectedProject.category} • Lead Engineer: {selectedProject.leadEngineer}
                    </span>
                    <h4 className="text-lg sm:text-xl font-extrabold text-white mt-1 mb-3">
                      {selectedProject.title}
                    </h4>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 mb-4">
                      <div className="flex justify-between text-xs text-slate-300 font-bold">
                        <span>Project Completion Progress</span>
                        <span className="text-cyan-400 font-mono">{selectedProject.progressPercentage}%</span>
                      </div>
                      <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-500 shadow-sm"
                          style={{ width: `${selectedProject.progressPercentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Quick Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {selectedProject.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 text-[10px] font-semibold bg-slate-900 text-slate-300 rounded-md border border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setActiveTab('projects')}
                        className="px-4 py-2 text-xs font-bold rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
                      >
                        <span>View Milestones & Timeline</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setActiveTab('deliverables')}
                        className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Download Deliverables ({selectedProject.deliverables?.length || 0})</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Deliverables Download Shortcuts */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Download className="w-4 h-4 text-cyan-400" />
                    <span>Recent Client Deliverables</span>
                  </h4>
                  <button
                    onClick={() => setActiveTab('deliverables')}
                    className="text-xs text-cyan-400 hover:underline font-semibold"
                  >
                    View All ({allDeliverables.length})
                  </button>
                </div>

                <div className="space-y-2">
                  {allDeliverables.slice(0, 3).map((del) => (
                    <div
                      key={del.id}
                      className="p-3 sm:p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold shrink-0">
                          {del.fileType.toUpperCase()}
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-white">{del.title}</h5>
                          <p className="text-[11px] text-slate-400 font-mono">
                            {del.fileName} • {del.fileSize} • {del.version}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => triggerFileDownload(del)}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold hover:bg-emerald-500/30 transition-all flex items-center justify-center gap-1.5 shrink-0"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download File</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Support & Consultation Box */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold text-white">Need Project Revisions or Custom Scope Changes?</h5>
                    <p className="text-[11px] text-slate-400">
                      Direct WhatsApp access to lead developer Waleed Khan Afridi for immediate updates.
                    </p>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${(whatsappNumber || '+923416860077').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-1.5 shrink-0"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-slate-950" />
                  <span>WhatsApp Lead Developer</span>
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS & MILESTONES */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {/* Project Selector Dropdown / Pills */}
              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-xs font-bold text-slate-300">Select Active Project:</span>
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-500 font-semibold cursor-pointer max-w-xs"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              {selectedProject ? (
                <div className="space-y-6">
                  {/* Project Details Card */}
                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-[11px] font-bold text-cyan-400 uppercase font-mono">{selectedProject.category}</span>
                        <h4 className="text-lg font-bold text-white mt-0.5">{selectedProject.title}</h4>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {selectedProject.status}
                        </span>
                        <span className="text-sm font-black text-white font-mono">${selectedProject.totalBudget} USD</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-500 block">Start Date</span>
                        <span className="font-bold text-white font-mono">{selectedProject.startDate}</span>
                      </div>
                      <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-500 block">Est. Completion</span>
                        <span className="font-bold text-cyan-300 font-mono">{selectedProject.estimatedCompletion}</span>
                      </div>
                      <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-500 block">Lead Engineer</span>
                        <span className="font-bold text-white">{selectedProject.leadEngineer}</span>
                      </div>
                      <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-500 block">Payment Status</span>
                        <span className="font-bold text-emerald-400 font-mono">
                          ${selectedProject.paidAmount} / ${selectedProject.totalBudget} Paid
                        </span>
                      </div>
                    </div>

                    {/* Repository & Live Links */}
                    {(selectedProject.repositoryUrl || selectedProject.previewUrl) && (
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
                        {selectedProject.repositoryUrl && (
                          <a
                            href={selectedProject.repositoryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:text-white hover:border-cyan-500 transition-all flex items-center gap-1.5"
                          >
                            <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
                            <span>GitHub Source Repository</span>
                            <ExternalLink className="w-3 h-3 text-slate-500" />
                          </a>
                        )}
                        {selectedProject.previewUrl && (
                          <a
                            href={selectedProject.previewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:text-white hover:border-cyan-500 transition-all flex items-center gap-1.5"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Live Development Preview</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Milestones & Timeline */}
                  <div>
                    <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span>Project Milestones & Live Status Tracker</span>
                    </h4>

                    <div className="space-y-3 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-800">
                      {selectedProject.milestones.map((milestone, idx) => (
                        <div
                          key={milestone.id}
                          className="relative pl-10 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                        >
                          {/* Timeline dot icon */}
                          <div
                            className={`absolute left-3 top-4 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                              milestone.status === 'Completed'
                                ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                                : milestone.status === 'In Progress'
                                ? 'bg-cyan-500 text-slate-950 border-cyan-400 animate-pulse'
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}
                          >
                            {milestone.status === 'Completed' ? <Check className="w-3 h-3" /> : idx + 1}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="text-xs font-bold text-white">{milestone.title}</h5>
                              <span
                                className={`px-2 py-0.2 rounded-md text-[10px] font-bold ${
                                  milestone.status === 'Completed'
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : milestone.status === 'In Progress'
                                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                    : 'bg-slate-800 text-slate-400'
                                }`}
                              >
                                {milestone.status}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1">{milestone.description}</p>
                          </div>

                          {milestone.completedDate && (
                            <span className="text-[10px] text-slate-500 font-mono shrink-0">
                              Completed: {milestone.completedDate}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center bg-slate-950 rounded-2xl border border-slate-800 p-8">
                  <FolderGit2 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <p className="text-sm font-bold text-white">No Active Projects Selected</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: DELIVERABLES CENTER */}
          {activeTab === 'deliverables' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-cyan-300">Deliverable Download Center</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    All source code packages, design tokens, and technical documentation are cryptographically verified.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 text-emerald-400 font-mono text-xs font-bold border border-slate-800">
                  {allDeliverables.length} Deliverables
                </span>
              </div>

              {allDeliverables.length === 0 ? (
                <div className="py-12 text-center bg-slate-950 rounded-2xl border border-slate-800 p-8">
                  <Download className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <p className="text-sm font-bold text-white">No Deliverables Ready Yet</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Deliverable files will be uploaded here as project milestones are completed.
                  </p>
                </div>
              ) : (
                allDeliverables.map((del) => (
                  <div
                    key={del.id}
                    className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-3 hover:border-slate-700 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-extrabold text-xs shrink-0">
                          {del.fileType.toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="text-xs sm:text-sm font-bold text-white">{del.title}</h5>
                            <span className="px-2 py-0.2 rounded-md text-[10px] bg-slate-900 border border-slate-800 text-cyan-400 font-mono font-bold">
                              {del.version}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                            {del.fileName} • {del.fileSize} • Uploaded {del.uploadedAt}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => triggerFileDownload(del)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-xs font-bold hover:from-emerald-400 hover:to-teal-400 transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 shrink-0"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Deliverable</span>
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] text-slate-500 gap-2">
                      <span className="font-mono truncate max-w-md" title={del.securityHash}>
                        SHA-256: <strong className="text-slate-400">{del.securityHash}</strong>
                      </span>
                      <span className="text-emerald-400 font-semibold">✓ Verified Clean & Safe</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 4: INVOICES & BILLING */}
          {activeTab === 'invoices' && (
            <div className="space-y-6">
              {/* Billing Summary Banner */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Billing Summary</span>
                  <div className="flex items-center gap-4 mt-1">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Total Billed</span>
                      <span className="text-lg font-black text-white font-mono">${stats.totalInvoiced}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Total Paid</span>
                      <span className="text-lg font-black text-emerald-400 font-mono">${stats.totalPaid}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Due Balance</span>
                      <span className="text-lg font-black text-amber-400 font-mono">${stats.balanceDue}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${(whatsappNumber || '+923416860077').replace(/[^0-9]/g, '')}?text=Hi%20Waleed,%20I%20have%20a%20question%20regarding%20my%20invoice.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-emerald-400 hover:bg-slate-800 transition-all flex items-center gap-1.5 shrink-0"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-emerald-400" />
                  <span>Billing Inquiry on WhatsApp</span>
                </a>
              </div>

              {/* Invoices List */}
              <div className="space-y-3">
                {allInvoices.length === 0 ? (
                  <div className="py-12 text-center bg-slate-950 rounded-2xl border border-slate-800 p-8">
                    <FileText className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                    <p className="text-sm font-bold text-white">No Invoices Issued Yet</p>
                  </div>
                ) : (
                  allInvoices.map((inv) => (
                    <div
                      key={inv.id}
                      className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-3 hover:border-slate-700 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black font-mono text-cyan-400">{inv.invoiceNumber}</span>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                                inv.status === 'PAID'
                                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                  : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                              }`}
                            >
                              {inv.status}
                            </span>
                          </div>
                          <h5 className="text-xs font-bold text-white mt-1">{inv.projectTitle}</h5>
                          <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                            Issued: {inv.issueDate} • Due: {inv.dueDate}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-center">
                          <span className="text-base font-black font-mono text-white">${inv.amount.toFixed(2)} USD</span>
                          <button
                            onClick={() => printInvoice(inv, user?.email || 'client@example.com')}
                            className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-cyan-300 hover:bg-slate-800 transition-all flex items-center gap-1.5"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Print / PDF</span>
                          </button>
                        </div>
                      </div>

                      {/* Line items summary */}
                      <div className="space-y-1">
                        {inv.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded-xl">
                            <span>{item.description}</span>
                            <span className="font-mono text-slate-300 font-semibold">${item.total.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      {inv.notes && (
                        <p className="text-[10px] text-emerald-400/90 font-mono bg-emerald-500/5 p-2 rounded-xl border border-emerald-500/10">
                          ✓ {inv.notes}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 5: ORDER HISTORY */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {loadingOrders ? (
                <div className="py-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                  <span>Fetching orders from Supabase...</span>
                </div>
              ) : orders.length === 0 ? (
                <div className="py-12 text-center bg-slate-950/60 rounded-2xl border border-slate-800/80 p-8">
                  <Package className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <p className="text-sm font-bold text-white">No Orders Found Yet</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                    When you order AI subscriptions, social growth services, or custom web development from our marketplace, your order details will appear here.
                  </p>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-xs font-bold font-mono text-cyan-400">Order #{order.order_number}</span>
                        <p className="text-[10px] text-slate-500">
                          {order.created_at ? new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recently'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          order.status === 'Completed'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                        }`}>
                          {order.status}
                        </span>
                        <span className="text-sm font-black font-mono text-white">${order.total_amount?.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Order Items List */}
                    <div className="space-y-1.5">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs text-slate-300 bg-slate-900/60 p-2 rounded-xl">
                          <div>
                            <span className="font-semibold text-white">{item.title}</span>
                            <span className="text-[10px] text-slate-500 block">{item.delivery}</span>
                          </div>
                          <div className="text-right font-mono">
                            <span>x{item.quantity}</span> — <span className="text-cyan-300 font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* WhatsApp Direct Assistance & Binance TxID */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-slate-800/60">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Payment: {order.payment_method}</span>
                        {order.binance_tx_id && (
                          <span className="text-[10px] text-amber-300 font-mono block">
                            Binance TxID: <strong>{order.binance_tx_id}</strong>
                          </span>
                        )}
                        {order.payment_proof && (
                          <span className="text-[10px] text-emerald-400 font-bold block">
                            ✓ Payment Proof Uploaded
                          </span>
                        )}
                      </div>

                      <a
                        href={`https://wa.me/${(whatsappNumber || '+923416860077').replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold hover:bg-emerald-500/20 transition-all shrink-0"
                      >
                        <MessageSquare className="w-3 h-3 fill-emerald-400" />
                        <span>Order Support</span>
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 6: PROFILE DETAILS */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Email Address (Read Only)</label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-2.5 px-4 text-xs text-slate-400 cursor-not-allowed font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Waleed Khan Afridi"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">WhatsApp Number</label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+92 341 6860077"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                />
              </div>

              {saveSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Profile updated in Supabase database!</span>
                </div>
              )}

              <button
                type="submit"
                disabled={saving}
                className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Profile Changes</span>
              </button>
            </form>
          )}
        </div>

        {/* Footer Actions & Security Seal */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Supabase TLS 1.3 & RLS Protected</span>
          </div>

          <button
            onClick={() => {
              onSignOut();
              onClose();
            }}
            className="px-3.5 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-all flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

