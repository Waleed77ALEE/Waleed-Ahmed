import React, { useState, useEffect } from 'react';
import {
  productStore,
  ExtendedProductItem,
  AdminOrder
} from '../services/productStore';
import { PlatformLogo } from './PlatformLogo';
import {
  loadUserWallet,
  getAllUserWallets,
  adminCreditUserWallet,
  adminApproveTopupRequest,
  adminRejectTopupRequest,
  subscribeWallet,
  UserWallet
} from '../services/walletStore';
import {
  X,
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  BarChart3,
  Globe,
  Database,
  Lock,
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Star,
  CheckCircle2,
  Search,
  Download,
  Upload,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Check,
  Copy,
  Tag,
  DollarSign,
  Clock,
  Layers,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Wallet,
  Users,
  Coins,
  UserCheck
} from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  // Authentication & Passcode
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('wka_admin_authed') === 'true';
  });
  const [passcode, setPasscode] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'products' | 'categories' | 'orders' | 'wallets' | 'seo' | 'database'
  >('dashboard');

  // Store State Sync
  const [products, setProducts] = useState<ExtendedProductItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);

  // User Wallets State
  const [userWallets, setUserWallets] = useState<UserWallet[]>([]);
  const [selectedUserIdForCredit, setSelectedUserIdForCredit] = useState<string>('');
  const [creditAmountInput, setCreditAmountInput] = useState<string>('50');
  const [creditNoteInput, setCreditNoteInput] = useState<string>('');
  const [creditMsg, setCreditMsg] = useState<string>('');

  // Search & Filters in Products
  const [productSearch, setProductSearch] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Product Edit / Add Form Modal State
  const [isProductFormOpen, setIsProductFormOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Partial<ExtendedProductItem> | null>(null);

  // Category Add State
  const [newCategoryName, setNewCategoryName] = useState<string>('');

  // Backup Import JSON State
  const [importJsonInput, setImportJsonInput] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    const syncState = () => {
      setProducts(productStore.getProducts(true));
      setCategories(productStore.getCategories());
      setOrders(productStore.getOrders());
      setUserWallets(getAllUserWallets());
    };

    syncState();
    const unsubscribeProduct = productStore.subscribe(syncState);
    const unsubscribeWallet = subscribeWallet(() => {
      setUserWallets(getAllUserWallets());
    });

    return () => {
      unsubscribeProduct();
      unsubscribeWallet();
    };
  }, [isOpen]);

  const handleManualCreditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(creditAmountInput);
    if (!selectedUserIdForCredit || isNaN(amt) || amt <= 0) return;

    adminCreditUserWallet(selectedUserIdForCredit, amt, creditNoteInput || 'Manual Admin Top-Up Credit');
    setUserWallets(getAllUserWallets());
    setCreditMsg(`Successfully added +$${amt.toFixed(2)} to user wallet!`);
    setCreditNoteInput('');
    setTimeout(() => setCreditMsg(''), 4000);
  };

  const handleApproveTopup = (userId: string, txId: string) => {
    const success = adminApproveTopupRequest(userId, txId);
    if (success) {
      setUserWallets(getAllUserWallets());
      setCreditMsg('Top-Up request approved & funds credited!');
      setTimeout(() => setCreditMsg(''), 4000);
    }
  };

  const handleRejectTopup = (userId: string, txId: string) => {
    const success = adminRejectTopupRequest(userId, txId);
    if (success) {
      setUserWallets(getAllUserWallets());
    }
  };

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'Alee772002') {
      setIsAuthenticated(true);
      localStorage.setItem('wka_admin_authed', 'true');
      setAuthError('');
    } else {
      setAuthError('Invalid Admin Passcode.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('wka_admin_authed');
  };

  // Product CRUD
  const handleOpenAddProduct = () => {
    setEditingProduct({
      title: '',
      category: categories[0] || 'AI Subscriptions',
      subCategory: 'General',
      price: 15,
      discountPrice: undefined,
      currency: 'USD',
      delivery: 'Instant Delivery (10-30 Mins)',
      description: '',
      features: ['Verified High Quality', 'Full Period Warranty', '24/7 Dedicated Support'],
      icon: 'Sparkles',
      featured: false,
      badge: 'Popular',
      stockStatus: 'In Stock',
      status: 'Active',
      displayOrder: products.length + 1,
      seoTitle: '',
      seoDescription: ''
    });
    setIsProductFormOpen(true);
  };

  const handleOpenEditProduct = (prod: ExtendedProductItem) => {
    setEditingProduct({ ...prod });
    setIsProductFormOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.title) return;

    if (editingProduct.id) {
      productStore.updateProduct(editingProduct.id, editingProduct);
    } else {
      productStore.addProduct(editingProduct);
    }

    setIsProductFormOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete product "${title}"?`)) {
      productStore.deleteProduct(id);
    }
  };

  const handleToggleStatus = (id: string) => {
    productStore.toggleProductStatus(id);
  };

  // Category CRUD
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    productStore.addCategory(newCategoryName);
    setNewCategoryName('');
  };

  const handleDeleteCategory = (catName: string) => {
    if (confirm(`Delete category "${catName}"? Products assigned to it won't be deleted.`)) {
      productStore.deleteCategory(catName);
    }
  };

  // Order Status update
  const handleOrderStatusChange = (orderId: string, status: AdminOrder['status']) => {
    productStore.updateOrderStatus(orderId, status);
  };

  // Export / Import
  const handleDownloadBackup = () => {
    const dataStr = productStore.exportDataJSON();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wka_portfolio_products_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = () => {
    if (!importJsonInput.trim()) return;
    const ok = productStore.importDataJSON(importJsonInput);
    if (ok) {
      alert('Products & Categories dataset imported successfully!');
      setImportJsonInput('');
    } else {
      alert('Invalid JSON format. Please check the backup content.');
    }
  };

  // Metrics calculation
  const totalProductsCount = products.length;
  const activeProductsCount = products.filter((p) => p.status !== 'Hidden').length;
  const featuredProductsCount = products.filter((p) => p.featured).length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  // Filtered product list
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
      (p.subCategory && p.subCategory.toLowerCase().includes(productSearch.toLowerCase()));

    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Active' && p.status !== 'Hidden') ||
      (statusFilter === 'Hidden' && p.status === 'Hidden');

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>Product &amp; Store Management Portal</span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono border border-cyan-500/30">
                  v2.5 Admin
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Future-proof CRUD panel for products, categories, orders &amp; automated SEO
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Challenge if not logged in */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 shadow-xl shadow-cyan-950/50">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Store Management Access</h3>
            <p className="text-xs text-slate-400 max-w-md mb-6">
              Enter admin security passcode to manage marketplace products, categories, orders, and automated SEO configuration.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-3">
              <input
                type="password"
                placeholder="Enter admin passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
                autoFocus
              />
              {authError && <p className="text-xs text-rose-400 font-medium">{authError}</p>}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold shadow-lg hover:opacity-90 transition-opacity"
              >
                Authenticate Portal
              </button>
              <span className="text-[11px] text-slate-500 mt-2">
                Protected Admin Access Portal
              </span>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Tabs */}
            <aside className="w-full md:w-56 bg-slate-950/60 border-b md:border-b-0 md:border-r border-slate-800 p-3 flex md:flex-col gap-1 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                  activeTab === 'products'
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Package className="w-4 h-4" />
                  <span>Products</span>
                </span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 font-mono">
                  {totalProductsCount}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('categories')}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                  activeTab === 'categories'
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <FolderTree className="w-4 h-4" />
                  <span>Categories</span>
                </span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 font-mono">
                  {categories.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Orders</span>
                </span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 font-mono">
                  {orders.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('wallets')}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                  activeTab === 'wallets'
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-black'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Wallet className="w-4 h-4 text-emerald-400" />
                  <span>Users &amp; Wallets</span>
                </span>
                {(() => {
                  const pendingCount = userWallets.reduce(
                    (acc, w) => acc + w.transactions.filter((t) => t.status === 'Pending').length,
                    0
                  );
                  return (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                        pendingCount > 0 ? 'bg-amber-500/20 text-amber-400 font-bold animate-pulse' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {pendingCount > 0 ? `${pendingCount} Req` : userWallets.length}
                    </span>
                  );
                })()}
              </button>

              <button
                onClick={() => setActiveTab('seo')}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-colors ${
                  activeTab === 'seo'
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>SEO &amp; Sitemap</span>
              </button>

              <button
                onClick={() => setActiveTab('database')}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-colors ${
                  activeTab === 'database'
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <Database className="w-4 h-4" />
                <span>Backup &amp; Migration</span>
              </button>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
              {/* TAB 1: DASHBOARD */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* KPI Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Total Products</p>
                        <h3 className="text-2xl font-black text-white mt-1">{totalProductsCount}</h3>
                        <p className="text-[11px] text-cyan-400 mt-1">{activeProductsCount} Active on Website</p>
                      </div>
                      <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                        <Package className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Total Orders</p>
                        <h3 className="text-2xl font-black text-white mt-1">{orders.length}</h3>
                        <p className="text-[11px] text-emerald-400 mt-1">Verified &amp; Direct WhatsApp</p>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Recorded Volume</p>
                        <h3 className="text-2xl font-black text-white mt-1">${totalRevenue}</h3>
                        <p className="text-[11px] text-amber-400 mt-1">Payoneer &amp; Binance Pay</p>
                      </div>
                      <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Categories</p>
                        <h3 className="text-2xl font-black text-white mt-1">{categories.length}</h3>
                        <p className="text-[11px] text-purple-400 mt-1">Auto-rendered Filters</p>
                      </div>
                      <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                        <FolderTree className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions & Status */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span>Instant Product Deployment Engine</span>
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Any new product added here is instantly published to the website marketplace, search index, canonical tags, and JSON-LD structured data.
                      </p>
                    </div>

                    <button
                      onClick={handleOpenAddProduct}
                      className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg flex items-center gap-2 shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Product</span>
                    </button>
                  </div>

                  {/* Recent Products Preview */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                      Recently Managed Products
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {products.slice(0, 6).map((prod) => (
                        <div
                          key={prod.id}
                          className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="font-bold text-white max-w-[180px] truncate">{prod.title}</div>
                            <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                              <span className="text-cyan-400 font-mono">${prod.price}</span>
                              <span>•</span>
                              <span>{prod.category}</span>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${
                              prod.status === 'Hidden'
                                ? 'bg-slate-800 text-slate-400'
                                : 'bg-emerald-500/20 text-emerald-400'
                            }`}
                          >
                            {prod.status === 'Hidden' ? 'Hidden' : 'Active'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PRODUCTS MANAGER */}
              {activeTab === 'products' && (
                <div className="space-y-4">
                  {/* Top Toolbar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                      <div className="relative flex-1 sm:w-60">
                        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          placeholder="Search products..."
                          value={productSearch}
                          onChange={(e) => setProductSearch(e.target.value)}
                          className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>

                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none"
                      >
                        <option value="All">All Categories</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>

                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none"
                      >
                        <option value="All">All Statuses</option>
                        <option value="Active">Active Only</option>
                        <option value="Hidden">Hidden Only</option>
                      </select>
                    </div>

                    <button
                      onClick={handleOpenAddProduct}
                      className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Create Product</span>
                    </button>
                  </div>

                  {/* Products Table */}
                  <div className="border border-slate-800 rounded-xl overflow-x-auto bg-slate-950/40">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                        <tr>
                          <th className="p-3">Product Title</th>
                          <th className="p-3">Category</th>
                          <th className="p-3">Price</th>
                          <th className="p-3">Delivery</th>
                          <th className="p-3">Stock</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {filteredProducts.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="p-6 text-center text-slate-500">
                              No products found matching filters.
                            </td>
                          </tr>
                        ) : (
                          filteredProducts.map((prod) => (
                            <tr key={prod.id} className="hover:bg-slate-900/60 transition-colors">
                              <td className="p-3 font-semibold text-white">
                                <div className="flex items-center gap-2.5">
                                  <PlatformLogo title={prod.title} category={prod.category} subCategory={prod.subCategory} id={prod.id} className="w-5 h-5 shrink-0" />
                                  <span>{prod.title}</span>
                                  {prod.featured && (
                                    <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold">
                                      Featured
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="p-3 text-slate-400">{prod.category}</td>
                              <td className="p-3 font-mono text-cyan-400 font-bold">
                                ${prod.price}
                                {prod.discountPrice && (
                                  <span className="text-[10px] text-slate-500 line-through ml-1">
                                    ${prod.discountPrice}
                                  </span>
                                )}
                              </td>
                              <td className="p-3 text-slate-400 max-w-[120px] truncate">{prod.delivery}</td>
                              <td className="p-3">
                                <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300">
                                  {prod.stockStatus || 'In Stock'}
                                </span>
                              </td>
                              <td className="p-3">
                                <button
                                  onClick={() => handleToggleStatus(prod.id)}
                                  className={`px-2 py-0.5 text-[10px] font-bold rounded-full flex items-center gap-1 ${
                                    prod.status === 'Hidden'
                                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  }`}
                                >
                                  {prod.status === 'Hidden' ? (
                                    <>
                                      <EyeOff className="w-3 h-3" /> Hidden
                                    </>
                                  ) : (
                                    <>
                                      <Eye className="w-3 h-3" /> Active
                                    </>
                                  )}
                                </button>
                              </td>
                              <td className="p-3 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <button
                                    onClick={() => handleOpenEditProduct(prod)}
                                    className="p-1.5 rounded-lg bg-slate-800 text-cyan-400 hover:bg-slate-700"
                                    title="Edit Product"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProduct(prod.id, prod.title)}
                                    className="p-1.5 rounded-lg bg-slate-800 text-rose-400 hover:bg-rose-950"
                                    title="Delete Product"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: CATEGORIES MANAGER */}
              {activeTab === 'categories' && (
                <div className="space-y-6">
                  {/* Add New Category Form */}
                  <form
                    onSubmit={handleAddCategory}
                    className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row gap-3"
                  >
                    <input
                      type="text"
                      placeholder="Enter new category name (e.g. AI Subscriptions, Software, Accounts)"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors shrink-0"
                    >
                      + Add Category
                    </button>
                  </form>

                  {/* Existing Categories List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {categories.map((cat) => {
                      const count = products.filter((p) => p.category === cat).length;
                      return (
                        <div
                          key={cat}
                          className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                        >
                          <div>
                            <h4 className="text-sm font-bold text-white">{cat}</h4>
                            <p className="text-xs text-slate-400 mt-0.5">{count} assigned products</p>
                          </div>
                          <button
                            onClick={() => handleDeleteCategory(cat)}
                            className="p-2 rounded-lg bg-slate-900 text-slate-500 hover:text-rose-400 transition-colors"
                            title="Delete category"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 4: ORDERS */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <div className="border border-slate-800 rounded-xl overflow-x-auto bg-slate-950/40">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                        <tr>
                          <th className="p-3">Order ID</th>
                          <th className="p-3">Customer</th>
                          <th className="p-3">Items</th>
                          <th className="p-3">Total</th>
                          <th className="p-3">Payment Method</th>
                          <th className="p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {orders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-slate-900/60">
                            <td className="p-3 font-mono font-bold text-cyan-400">{ord.id}</td>
                            <td className="p-3">
                              <div className="font-bold text-white">{ord.customerName}</div>
                              <div className="text-[10px] text-slate-500">{ord.customerEmail}</div>
                            </td>
                            <td className="p-3">
                              {ord.items.map((i, idx) => (
                                <div key={idx} className="text-[11px] text-slate-300">
                                  {i.quantity}x {i.title}
                                </div>
                              ))}
                            </td>
                            <td className="p-3 font-mono font-bold text-emerald-400">${ord.totalAmount}</td>
                            <td className="p-3 text-slate-400">{ord.paymentMethod}</td>
                            <td className="p-3">
                              <select
                                value={ord.status}
                                onChange={(e) =>
                                  handleOrderStatusChange(ord.id, e.target.value as AdminOrder['status'])
                                }
                                className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-bold text-white focus:outline-none"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Verified">Verified</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB: USERS & WALLETS MANAGEMENT */}
              {activeTab === 'wallets' && (
                <div className="space-y-6 text-xs text-slate-300">
                  {/* Top Notification / Alert */}
                  {creditMsg && (
                    <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span>{creditMsg}</span>
                      </span>
                    </div>
                  )}

                  {/* Header Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-400 font-medium font-bold">Registered Accounts</p>
                        <h3 className="text-2xl font-black text-white mt-1">{userWallets.length} Users</h3>
                        <p className="text-[11px] text-emerald-400 mt-1">Wallet Accounts Active</p>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                        <Users className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-400 font-medium font-bold">Pending Top-Up Requests</p>
                        <h3 className="text-2xl font-black text-amber-400 mt-1">
                          {userWallets.reduce(
                            (acc, w) => acc + w.transactions.filter((t) => t.status === 'Pending').length,
                            0
                          )}
                        </h3>
                        <p className="text-[11px] text-amber-400/80 mt-1">Requires Admin Review</p>
                      </div>
                      <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                        <Coins className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-400 font-medium font-bold">Total Store Wallet Funds</p>
                        <h3 className="text-2xl font-black font-mono text-emerald-400 mt-1">
                          ${userWallets.reduce((acc, w) => acc + w.balance, 0).toFixed(2)} USD
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-1">User Balances in System</p>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                        <Wallet className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  {/* Section 1: Admin Add / Credit Wallet Amount Form */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-slate-950 to-teal-950/30 border border-emerald-500/30 space-y-4 shadow-xl">
                    <div className="flex items-center gap-2">
                      <Plus className="w-5 h-5 text-emerald-400" />
                      <h3 className="text-sm font-extrabold text-white">Direct Admin Top-Up / Credit Balance</h3>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      Verified customer payment via Binance, Payoneer, Card, or JazzCash? Select the registered user and credit their wallet balance directly.
                    </p>

                    <form onSubmit={handleManualCreditSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1">
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Select Registered User</label>
                        <select
                          value={selectedUserIdForCredit}
                          onChange={(e) => setSelectedUserIdForCredit(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-bold focus:outline-none focus:border-emerald-500"
                          required
                        >
                          <option value="">-- Choose User Account --</option>
                          {userWallets.map((w) => (
                            <option key={w.userId} value={w.userId}>
                              {w.userEmail || w.userName || w.userId} (${w.balance.toFixed(2)} balance)
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Amount ($ USD)</label>
                        <input
                          type="number"
                          step="0.01"
                          min="1"
                          value={creditAmountInput}
                          onChange={(e) => setCreditAmountInput(e.target.value)}
                          placeholder="50.00"
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs font-mono font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                          required
                        />
                      </div>

                      <div className="flex items-end">
                        <button
                          type="submit"
                          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-black text-xs hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Coins className="w-4 h-4" />
                          <span>Add Balance</span>
                        </button>
                      </div>

                      <div className="sm:col-span-4">
                        <input
                          type="text"
                          value={creditNoteInput}
                          onChange={(e) => setCreditNoteInput(e.target.value)}
                          placeholder="Optional Payment Note / Transaction Ref (e.g. Verified Binance Pay #948271)"
                          className="w-full bg-slate-900/60 border border-slate-800/80 rounded-xl p-2 text-[11px] text-slate-300 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </form>
                  </div>

                  {/* Section 2: Pending User Top-Up Requests */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span>Pending Payment Verification Requests</span>
                      </h3>
                    </div>

                    {userWallets.flatMap((w) =>
                      w.transactions
                        .filter((t) => t.status === 'Pending')
                        .map((t) => ({ user: w, tx: t }))
                    ).length === 0 ? (
                      <div className="p-6 text-center rounded-2xl bg-slate-950 border border-slate-800 text-slate-500 font-medium">
                        No pending top-up requests at the moment. All payment verifications are clear.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {userWallets
                          .flatMap((w) =>
                            w.transactions
                              .filter((t) => t.status === 'Pending')
                              .map((t) => ({ user: w, tx: t }))
                          )
                          .map(({ user: w, tx }) => (
                            <div
                              key={tx.id}
                              className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-white">{w.userEmail || w.userName || w.userId}</span>
                                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                                    Pending Review
                                  </span>
                                </div>
                                <div className="text-[11px] text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
                                  <span>Method: <strong className="text-slate-200">{tx.paymentMethod}</strong></span>
                                  <span>Ref: <strong className="text-emerald-400 font-mono">{tx.referenceId}</strong></span>
                                  <span>Submitted: {new Date(tx.createdAt).toLocaleTimeString()}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-between sm:justify-end">
                                <span className="text-xl font-black font-mono text-emerald-400">+${tx.amount.toFixed(2)} USD</span>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleApproveTopup(w.userId, tx.id)}
                                    className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-colors flex items-center gap-1 cursor-pointer"
                                  >
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>Approve &amp; Credit</span>
                                  </button>
                                  <button
                                    onClick={() => handleRejectTopup(w.userId, tx.id)}
                                    className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-rose-900/60 text-rose-400 font-bold text-xs transition-colors cursor-pointer"
                                  >
                                    Reject
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Section 3: All Registered User Wallets */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-cyan-400" />
                      <span>All Registered User Wallets</span>
                    </h3>

                    {userWallets.length === 0 ? (
                      <div className="p-6 text-center rounded-2xl bg-slate-950 border border-slate-800 text-slate-500 font-medium">
                        No registered users found in the system yet.
                      </div>
                    ) : (
                      <div className="border border-slate-800 rounded-2xl overflow-x-auto bg-slate-950">
                        <table className="w-full text-left text-xs text-slate-300">
                          <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                            <tr>
                              <th className="p-3">User Email / ID</th>
                              <th className="p-3">Current Balance</th>
                              <th className="p-3">Transactions</th>
                              <th className="p-3">Last Activity</th>
                              <th className="p-3 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60">
                            {userWallets.map((w) => (
                              <tr key={w.userId} className="hover:bg-slate-900/40">
                                <td className="p-3 font-bold text-white">
                                  {w.userEmail || w.userName || w.userId}
                                  <div className="text-[10px] font-mono text-slate-500 font-normal">{w.userId}</div>
                                </td>
                                <td className="p-3 font-mono font-black text-emerald-400 text-sm">
                                  ${w.balance.toFixed(2)} USD
                                </td>
                                <td className="p-3 text-slate-400">{w.transactions.length} records</td>
                                <td className="p-3 text-slate-500 text-[11px]">
                                  {new Date(w.lastUpdated).toLocaleDateString()}
                                </td>
                                <td className="p-3 text-right">
                                  <button
                                    onClick={() => {
                                      setSelectedUserIdForCredit(w.userId);
                                      setCreditAmountInput('50');
                                    }}
                                    className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 text-[11px] font-bold transition-all cursor-pointer"
                                  >
                                    + Add Amount
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 5: SEO AUTOMATION */}
              {activeTab === 'seo' && (
                <div className="space-y-6 text-xs text-slate-300">
                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Globe className="w-4 h-4 text-cyan-400" />
                      <span>Automated Product SEO &amp; Schema Generator</span>
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      All products managed in this portal automatically generate Schema.org ItemList &amp; Product JSON-LD structured metadata on page load, optimizing Google Rich Results and image sitemaps.
                    </p>
                    <div className="p-3 rounded-lg bg-slate-900 font-mono text-[11px] text-cyan-300 border border-slate-800">
                      https://waleedkhanafridi.online/sitemap.xml
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: BACKUP & MIGRATION */}
              {activeTab === 'database' && (
                <div className="space-y-6 text-xs">
                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Database className="w-4 h-4 text-cyan-400" />
                      <span>JSON Data Backup &amp; Database Import</span>
                    </h3>
                    <p className="text-slate-400">
                      Export your entire product catalog, categories, and orders as a single JSON file or import a backup.
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={handleDownloadBackup}
                        className="px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold flex items-center gap-2 shadow-md hover:bg-cyan-400"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Catalog JSON</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm('Reset store data to default catalog? Custom changes will be cleared.')) {
                            productStore.resetToDefaults();
                          }
                        }}
                        className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold flex items-center gap-2 hover:bg-rose-950 hover:text-rose-300 transition-colors"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Reset Store Defaults</span>
                      </button>
                    </div>

                    <div className="pt-4 border-t border-slate-800 space-y-2">
                      <label className="font-bold text-slate-200">Import Product JSON Backup:</label>
                      <textarea
                        rows={4}
                        placeholder="Paste exported JSON string here..."
                        value={importJsonInput}
                        onChange={(e) => setImportJsonInput(e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono focus:outline-none"
                      />
                      <button
                        onClick={handleImportBackup}
                        className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Restore / Import JSON</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        )}
      </div>

      {/* SUB-MODAL: ADD / EDIT PRODUCT FORM */}
      {isProductFormOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/90 backdrop-blur-lg overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingProduct.id ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setIsProductFormOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Product Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. OpenAI ChatGPT Plus (1 Month)"
                    value={editingProduct.title || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Category *</label>
                  <select
                    value={editingProduct.category || categories[0]}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Price ($ USD) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingProduct.price || 15}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Discount Price (Optional)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.discountPrice || ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        discountPrice: e.target.value ? parseFloat(e.target.value) : undefined
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Delivery Time</label>
                  <input
                    type="text"
                    placeholder="Instant Delivery (10-30 Mins)"
                    value={editingProduct.delivery || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, delivery: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detailed description of subscription / account / growth package..."
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Stock Status</label>
                  <select
                    value={editingProduct.stockStatus || 'In Stock'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stockStatus: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Limited Stock">Limited Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Popular / Badge Label</label>
                  <input
                    type="text"
                    placeholder="e.g. Popular, Best Seller, Verified"
                    value={editingProduct.badge || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(editingProduct.featured)}
                    onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                    className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
                  />
                  <span className="text-slate-300 font-semibold">Mark as Featured Product</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.status !== 'Hidden'}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, status: e.target.checked ? 'Active' : 'Hidden' })
                    }
                    className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-emerald-500 focus:ring-0"
                  />
                  <span className="text-slate-300 font-semibold">Active on Marketplace</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsProductFormOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold shadow-lg"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
