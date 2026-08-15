import React, { useState, useEffect } from 'react';
import { 
  X, CheckSquare, Square, Plus, Trash2, Database, 
  Sparkles, Code2, Copy, Check, RefreshCw, AlertCircle, 
  CheckCircle2, Tag, Calendar, ListTodo, Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  supabase, 
  SupabaseTodo, 
  fetchTodosSupabase, 
  createTodoSupabase, 
  toggleTodoSupabase, 
  deleteTodoSupabase 
} from '../lib/supabase';

interface TodoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
}

export const TodoManagerModal: React.FC<TodoManagerModalProps> = ({
  isOpen,
  onClose,
  userId
}) => {
  const [todos, setTodos] = useState<SupabaseTodo[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [activeTab, setActiveTab] = useState<'tasks' | 'code' | 'sql'>('tasks');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const sqlSchema = `-- Run this in Supabase SQL Editor to create the 'todos' table:
CREATE TABLE IF NOT EXISTS public.todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  is_complete BOOLEAN DEFAULT false,
  priority TEXT DEFAULT 'medium',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;

-- Allow public read & write access
CREATE POLICY "Allow public read access to todos" ON public.todos
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on todos" ON public.todos
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on todos" ON public.todos
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete on todos" ON public.todos
  FOR DELETE USING (true);`;

  const codeSnippet = `import { supabase } from '../lib/supabase';

// 1. Fetch Todos
const { data: todos, error } = await supabase
  .from('todos')
  .select('*')
  .order('created_at', { ascending: false });

// 2. Insert a new Todo
const { data: newTodo, error: insertError } = await supabase
  .from('todos')
  .insert([{
    title: 'Complete project milestone',
    is_complete: false,
    priority: 'high'
  }])
  .select('*')
  .single();

// 3. Toggle Completion
await supabase
  .from('todos')
  .update({ is_complete: true })
  .eq('id', todoId);`;

  const loadTodos = async () => {
    setLoading(true);
    try {
      const data = await fetchTodosSupabase();
      setTodos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadTodos();
    }
  }, [isOpen]);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const created = await createTodoSupabase(newTitle, newPriority, userId);
      setTodos(prev => [created, ...prev]);
      setNewTitle('');
      setStatusMsg({ type: 'success', text: 'Task saved to Supabase successfully' });
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to save task' });
      setTimeout(() => setStatusMsg(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggle = async (todo: SupabaseTodo) => {
    const nextStatus = !todo.is_complete;
    setTodos(prev => prev.map(t => t.id === todo.id ? { ...t, is_complete: nextStatus } : t));
    await toggleTodoSupabase(todo.id, nextStatus);
  };

  const handleDelete = async (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
    await deleteTodoSupabase(id);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const filteredTodos = todos.filter(t => {
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'active' ? !t.is_complete :
      t.is_complete;

    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const completedCount = todos.filter(t => t.is_complete).length;
  const activeCount = todos.filter(t => !t.is_complete).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Top Glow Accent */}
        <div className="absolute top-0 left-1/4 w-96 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ListTodo className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">Supabase Task & Todo Hub</h2>
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                  <Database className="w-3 h-3" /> Live
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Direct query access to <code className="text-emerald-300 font-mono">.from('todos')</code> with real-time state sync
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadTodos}
              disabled={loading}
              title="Refresh from Supabase"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-700"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-800 bg-slate-900/50">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'tasks'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ListTodo className="w-4 h-4" />
            <span>Tasks ({todos.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'code'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Supabase JS Code</span>
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'sql'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>SQL Schema Migration</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          {statusMsg && (
            <div className={`mb-4 p-3 rounded-2xl text-xs font-bold flex items-center gap-2 ${
              statusMsg.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'
            }`}>
              {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span>{statusMsg.text}</span>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="space-y-5">
              {/* Add Todo Form */}
              <form onSubmit={handleAddTodo} className="flex flex-col sm:flex-row items-center gap-2.5 p-2 bg-slate-950/60 border border-slate-800 rounded-2xl">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Add a new task (e.g., Integrate Supabase Auth webhook)..."
                  className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none"
                />
                
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <select
                    value={newPriority}
                    onChange={(e: any) => setNewPriority(e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-xs text-slate-300 font-bold rounded-xl px-2.5 py-2 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>

                  <button
                    type="submit"
                    disabled={!newTitle.trim() || isSubmitting}
                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 text-xs font-black rounded-xl transition-all shadow-lg shadow-emerald-500/20 shrink-0 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </form>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-1.5 bg-slate-950/40 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      filter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    All ({todos.length})
                  </button>
                  <button
                    onClick={() => setFilter('active')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      filter === 'active' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Active ({activeCount})
                  </button>
                  <button
                    onClick={() => setFilter('completed')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      filter === 'completed' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Completed ({completedCount})
                  </button>
                </div>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter tasks..."
                  className="w-full sm:w-48 bg-slate-950/40 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Task Items List */}
              <div className="space-y-2 pt-1">
                {loading ? (
                  <div className="py-12 text-center text-slate-400 flex flex-col items-center gap-3">
                    <RefreshCw className="w-6 h-6 animate-spin text-emerald-400" />
                    <span className="text-xs font-medium">Querying Supabase database...</span>
                  </div>
                ) : filteredTodos.length === 0 ? (
                  <div className="py-12 text-center border-2 border-dashed border-slate-800 rounded-2xl p-6">
                    <CheckSquare className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-sm font-bold text-slate-300">No tasks found</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {searchQuery ? 'Try matching a different keyword' : 'Add your first task above to save directly to Supabase'}
                    </p>
                  </div>
                ) : (
                  filteredTodos.map((todo) => {
                    const priorityColor = 
                      todo.priority === 'high' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      todo.priority === 'low' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      'bg-amber-500/10 text-amber-400 border-amber-500/20';

                    return (
                      <div
                        key={todo.id}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                          todo.is_complete 
                            ? 'bg-slate-950/30 border-slate-800/60 opacity-60' 
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0 pr-3">
                          <button
                            onClick={() => handleToggle(todo)}
                            className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer shrink-0"
                          >
                            {todo.is_complete ? (
                              <CheckSquare className="w-5 h-5 text-emerald-400" />
                            ) : (
                              <Square className="w-5 h-5" />
                            )}
                          </button>
                          
                          <div className="min-w-0 flex-1">
                            <p className={`text-sm font-medium truncate ${
                              todo.is_complete ? 'line-through text-slate-500' : 'text-white'
                            }`}>
                              {todo.title}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-500">
                              <span className={`px-2 py-0.2 rounded-md border font-bold uppercase tracking-wider ${priorityColor}`}>
                                {todo.priority || 'medium'}
                              </span>
                              <span>•</span>
                              <span>{todo.created_at ? new Date(todo.created_at).toLocaleDateString() : 'Recent'}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDelete(todo.id)}
                          title="Delete task"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">JavaScript / TypeScript SDK Snippet</h3>
                  <p className="text-xs text-slate-400">Ready to drop into any component or backend handler</p>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white rounded-xl border border-slate-700 transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>

              <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
                <pre>{codeSnippet}</pre>
              </div>
            </div>
          )}

          {activeTab === 'sql' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Supabase PostgreSQL DDL Table Script</h3>
                  <p className="text-xs text-slate-400">Paste into Supabase Dashboard &gt; SQL Editor to deploy</p>
                </div>
                <button
                  onClick={handleCopySql}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white rounded-xl border border-slate-700 transition-colors cursor-pointer"
                >
                  {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSql ? 'Copied' : 'Copy SQL'}</span>
                </button>
              </div>

              <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
                <pre>{sqlSchema}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer Summary */}
        <div className="p-4 px-6 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Supabase Client Active</span>
          </div>
          <span className="text-[11px] text-slate-500">
            {completedCount} of {todos.length} completed
          </span>
        </div>
      </motion.div>
    </div>
  );
};
