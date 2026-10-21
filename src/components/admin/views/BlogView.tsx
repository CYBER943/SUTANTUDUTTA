import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  EyeOff, 
  X, 
  Loader2,
  AlertTriangle,
  BookOpen
} from 'lucide-react';
import { adminApi } from '../../../services/adminApi';
import { toast } from 'sonner';

interface BlogViewProps {
  posts: any[];
  onRefresh: () => void;
  openCreateOnMount?: boolean;
}

const CATEGORIES = ["AI", "Web Development", "Vibe Coding", "Learning", "Projects", "Productivity"];

export default function BlogView({ posts, onRefresh, openCreateOnMount }: BlogViewProps) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(!!openCreateOnMount);
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('AI');
  const [readTime, setReadTime] = useState('5 min read');
  const [image, setImage] = useState('');
  const [published, setPublished] = useState(true);

  const openCreateModal = () => {
    setEditingPost(null);
    setTitle('');
    setExcerpt('');
    setContent('');
    setCategory('AI');
    setReadTime('5 min read');
    setImage('https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&q=80&w=800');
    setPublished(true);
    setModalOpen(true);
  };

  const openEditModal = (post: any) => {
    setEditingPost(post);
    setTitle(post.title || '');
    setExcerpt(post.excerpt || '');
    setContent(post.content || '');
    setCategory(post.category || 'AI');
    setReadTime(post.readTime || '5 min read');
    setImage(post.image || '');
    setPublished(post.published !== false);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim()) {
      toast.error('Title and excerpt are required.');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: title.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        category,
        readTime: readTime.trim(),
        image: image.trim(),
        published
      };

      if (editingPost) {
        await adminApi.updateBlogPost(editingPost.id, payload);
        toast.success(`Article "${title}" updated.`);
      } else {
        await adminApi.createBlogPost(payload);
        toast.success(`Article "${title}" created.`);
      }
      setModalOpen(false);
      onRefresh();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save article.');
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (post: any) => {
    try {
      await adminApi.updateBlogPost(post.id, {
        published: !post.published
      });
      toast.success(post.published ? 'Article set to draft.' : 'Article published live.');
      onRefresh();
    } catch (err: any) {
      toast.error('Failed to change article status.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await adminApi.deleteBlogPost(id);
      toast.success('Article deleted.');
      setDeleteConfirmId(null);
      onRefresh();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete article.');
    }
  };

  const filtered = posts.filter(p => {
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary tracking-tight">
            Articles & Insights
          </h1>
          <p className="text-xs text-text-secondary font-mono mt-1">
            PUBLISH THOUGHT PIECES & EDITORIALS ({posts.length} ARTICLES)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-card-bg border border-border focus:border-accent-primary rounded-xl py-2 pl-9 pr-3 text-xs text-text-primary placeholder:text-text-muted focus:outline-none transition-colors"
            />
          </div>

          <button
            onClick={openCreateModal}
            className="shrink-0 px-4 py-2 rounded-xl bg-accent-primary hover:bg-accent-secondary text-white text-xs font-mono tracking-wider uppercase font-semibold transition-all shadow-md shadow-accent-primary/20 flex items-center gap-2"
          >
            <Plus size={14} />
            <span>Write Article</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {['All', ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
              categoryFilter === cat
                ? 'bg-accent-primary text-white shadow-sm'
                : 'bg-card-bg border border-border text-text-secondary hover:text-text-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {filtered.map((post) => (
          <div
            key={post.id}
            className="p-5 rounded-2xl bg-card-bg border border-border hover:border-border-strong transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4 flex-1">
              {/* Thumbnail */}
              <div className="w-20 h-20 rounded-xl bg-surface-elevated overflow-hidden border border-border shrink-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded-md bg-accent-primary/10 border border-accent-primary/20 text-accent-bright text-[10px]">
                    {post.category}
                  </span>
                  <span className="text-text-muted flex items-center gap-1">
                    <Calendar size={11} />
                    <span>{post.date}</span>
                  </span>
                  <span className="text-text-muted flex items-center gap-1">
                    <Clock size={11} />
                    <span>{post.readTime}</span>
                  </span>
                  <button
                    onClick={() => handleTogglePublish(post)}
                    className={`ml-1 px-2 py-0.5 rounded-full text-[10px] font-mono flex items-center gap-1 transition-colors ${
                      post.published !== false
                        ? 'bg-status-success/10 text-status-success border border-status-success/20'
                        : 'bg-text-muted/10 text-text-muted border border-border'
                    }`}
                  >
                    {post.published !== false ? <CheckCircle2 size={10} /> : <EyeOff size={10} />}
                    <span>{post.published !== false ? 'PUBLISHED' : 'DRAFT'}</span>
                  </button>
                </div>

                <h3 className="text-base font-display font-bold text-text-primary mb-1 truncate">
                  {post.title}
                </h3>

                <p className="text-xs text-text-secondary line-clamp-2 font-light leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 shrink-0 md:self-center font-mono text-xs">
              <button
                onClick={() => openEditModal(post)}
                className="px-3 py-1.5 rounded-xl bg-surface-elevated border border-border hover:border-accent-primary text-text-secondary hover:text-text-primary transition-all flex items-center gap-1.5"
              >
                <Edit3 size={13} />
                <span>Edit</span>
              </button>
              <button
                onClick={() => setDeleteConfirmId(post.id)}
                className="p-1.5 rounded-xl text-text-muted hover:text-status-error hover:bg-status-error/10 transition-colors"
                title="Delete Article"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-card-bg border border-border rounded-2xl p-6 md:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors"
            >
              <X size={18} />
            </button>

            <div className="mb-6">
              <h2 className="text-xl font-display font-bold text-text-primary">
                {editingPost ? 'Edit Article' : 'Compose New Article'}
              </h2>
              <p className="text-xs font-mono text-text-muted mt-1">
                MANAGE YOUR KNOWLEDGE HUB & THOUGHT LEADERSHIP
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Vibe Coding: The Future of Developer Productivity"
                  className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-sm text-text-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="e.g. 5 min read"
                    className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
                    Status
                  </label>
                  <select
                    value={published ? 'published' : 'draft'}
                    onChange={(e) => setPublished(e.target.value === 'published')}
                    className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none"
                  >
                    <option value="published">Published Live</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
                  Short Excerpt / Teaser *
                </label>
                <textarea
                  rows={2}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief 1-2 sentence overview shown in the article grid..."
                  className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-sm text-text-primary focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
                  Article Body (Markdown Supported)
                </label>
                <textarea
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write the full article body here..."
                  className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-sm text-text-primary focus:outline-none font-mono text-xs"
                />
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-elevated border border-border text-text-secondary hover:text-text-primary text-xs font-mono transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-accent-primary hover:bg-accent-secondary text-white text-xs font-mono tracking-wider uppercase font-semibold transition-all shadow-md shadow-accent-primary/20 flex items-center gap-2"
                >
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  <span>{editingPost ? 'Update Article' : 'Publish Article'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-card-bg border border-border rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center space-x-3 text-status-error mb-4">
              <AlertTriangle size={22} />
              <h3 className="text-base font-display font-bold text-text-primary">
                Confirm Article Deletion
              </h3>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed mb-6 font-light">
              Are you sure you want to permanently delete this article?
            </p>
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-surface-elevated border border-border text-text-secondary text-xs font-mono"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-status-error hover:bg-status-error/90 text-white text-xs font-mono tracking-wider uppercase font-semibold transition-colors"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
