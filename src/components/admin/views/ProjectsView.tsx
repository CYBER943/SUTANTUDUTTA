import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Star, 
  Sparkles, 
  FolderKanban, 
  Codepen, 
  Github, 
  X, 
  Check, 
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { adminApi } from '../../../services/adminApi';
import { toast } from 'sonner';

interface ProjectsViewProps {
  projects: any[];
  onRefresh: () => void;
  openCreateOnMount?: boolean;
}

export default function ProjectsView({ projects, onRefresh, openCreateOnMount }: ProjectsViewProps) {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(!!openCreateOnMount);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('WEB / EXPERIMENT');
  const [techInput, setTechInput] = useState('');
  const [techList, setTechList] = useState<string[]>(['HTML', 'CSS', 'JavaScript']);
  const [link, setLink] = useState('');
  const [codepen, setCodepen] = useState('');
  const [github, setGithub] = useState('');
  const [image, setImage] = useState('');
  const [featured, setFeatured] = useState(false);

  const openCreateModal = () => {
    setEditingProject(null);
    setTitle('');
    setDescription('');
    setCategory('WEB / EXPERIMENT');
    setTechList(['HTML', 'CSS', 'JavaScript']);
    setTechInput('');
    setLink('');
    setCodepen('');
    setGithub('');
    setImage('');
    setFeatured(false);
    setModalOpen(true);
  };

  const openEditModal = (proj: any) => {
    setEditingProject(proj);
    setTitle(proj.title || '');
    setDescription(proj.description || '');
    setCategory(proj.category || 'WEB / EXPERIMENT');
    setTechList(proj.tech || ['HTML', 'CSS', 'JavaScript']);
    setTechInput('');
    setLink(proj.link || '');
    setCodepen(proj.codepen || '');
    setGithub(proj.github || '');
    setImage(proj.image || '');
    setFeatured(!!proj.featured);
    setModalOpen(true);
  };

  const handleAddTech = () => {
    if (!techInput.trim()) return;
    if (!techList.includes(techInput.trim())) {
      setTechList([...techList, techInput.trim()]);
    }
    setTechInput('');
  };

  const handleRemoveTech = (item: string) => {
    setTechList(techList.filter(t => t !== item));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error('Title and description are required.');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        tech: techList,
        link: link.trim() || codepen.trim(),
        codepen: codepen.trim(),
        github: github.trim(),
        image: image.trim(),
        featured
      };

      if (editingProject) {
        await adminApi.updateProject(editingProject.id, payload);
        toast.success(`Project "${title}" updated successfully.`);
      } else {
        await adminApi.createProject(payload);
        toast.success(`Project "${title}" published.`);
      }
      setModalOpen(false);
      onRefresh();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await adminApi.deleteProject(id);
      toast.success('Project deleted successfully.');
      setDeleteConfirmId(null);
      onRefresh();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete project.');
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= projects.length) return;

    const copy = [...projects];
    const [moved] = copy.splice(index, 1);
    copy.splice(newIdx, 0, moved);

    const ids = copy.map(p => p.id);
    try {
      await adminApi.reorderProjects(ids);
      onRefresh();
    } catch (err: any) {
      toast.error('Failed to update project order.');
    }
  };

  const filtered = projects.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary tracking-tight">
            Projects Portfolio
          </h1>
          <p className="text-xs text-text-secondary font-mono mt-1">
            MANAGE & REORDER YOUR EXPERIMENTS ({projects.length} TOTAL)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full bg-card-bg border border-border focus:border-accent-primary rounded-xl py-2 pl-9 pr-3 text-xs text-text-primary placeholder:text-text-muted focus:outline-none transition-colors"
            />
          </div>

          <button
            onClick={openCreateModal}
            className="shrink-0 px-4 py-2 rounded-xl bg-accent-primary hover:bg-accent-secondary text-white text-xs font-mono tracking-wider uppercase font-semibold transition-all shadow-md shadow-accent-primary/20 flex items-center gap-2"
          >
            <Plus size={14} />
            <span>Add Project</span>
          </button>
        </div>
      </div>

      {/* Projects Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((proj, idx) => (
          <div
            key={proj.id}
            className="group rounded-2xl bg-card-bg border border-border hover:border-border-strong overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md"
          >
            {/* Image / Thumbnail Preview */}
            <div className="relative aspect-[16/9] bg-surface-elevated overflow-hidden border-b border-border">
              {proj.image ? (
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to placeholder if broken image
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-text-muted gap-2">
                  <Codepen size={32} className="opacity-40" />
                  <span className="text-[10px] font-mono">No Image</span>
                </div>
              )}

              {proj.featured && (
                <div className="absolute top-3 left-3 px-2 py-1 bg-amber-500/90 text-black text-[10px] font-mono font-bold rounded-md shadow-lg flex items-center gap-1 backdrop-blur-sm">
                  <Star size={11} className="fill-black" />
                  <span>FEATURED</span>
                </div>
              )}

              <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90">
                <button
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, 'up')}
                  className="w-7 h-7 rounded-lg bg-bg-primary/80 backdrop-blur-md border border-border flex items-center justify-center text-text-secondary hover:text-text-primary disabled:opacity-30 transition-all"
                  title="Move Up"
                >
                  <ArrowUp size={12} />
                </button>
                <button
                  disabled={idx === projects.length - 1}
                  onClick={() => handleMove(idx, 'down')}
                  className="w-7 h-7 rounded-lg bg-bg-primary/80 backdrop-blur-md border border-border flex items-center justify-center text-text-secondary hover:text-text-primary disabled:opacity-30 transition-all"
                  title="Move Down"
                >
                  <ArrowDown size={12} />
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-accent-secondary uppercase tracking-widest mb-1.5">
                  <span>{proj.category || 'EXPERIMENT'}</span>
                  <span className="text-text-muted">#{proj.order ?? idx + 1}</span>
                </div>

                <h3 className="text-base font-display font-bold text-text-primary mb-2">
                  {proj.title}
                </h3>

                <p className="text-xs text-text-secondary leading-relaxed line-clamp-2 mb-4 font-light">
                  {proj.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {proj.tech?.map((t: string, i: number) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-surface-elevated border border-border text-[11px] font-mono text-text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-mono">
                <div className="flex items-center space-x-2">
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors"
                      title="Open Live Link"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {proj.codepen && (
                    <a
                      href={proj.codepen}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors"
                      title="Open on CodePen"
                    >
                      <Codepen size={14} />
                    </a>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEditModal(proj)}
                    className="p-1.5 rounded-lg text-text-muted hover:text-accent-secondary hover:bg-surface-elevated transition-colors flex items-center gap-1"
                    title="Edit Project"
                  >
                    <Edit3 size={14} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(proj.id)}
                    className="p-1.5 rounded-lg text-text-muted hover:text-status-error hover:bg-status-error/10 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-card-bg border border-border rounded-2xl p-6 md:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors"
            >
              <X size={18} />
            </button>

            <div className="mb-6">
              <h2 className="text-xl font-display font-bold text-text-primary">
                {editingProject ? 'Edit Project' : 'Publish New Project'}
              </h2>
              <p className="text-xs font-mono text-text-muted mt-1">
                UPDATES REFLECT IMMEDIATELY ON YOUR PUBLIC PORTFOLIO
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. CYBER943"
                    className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-sm text-text-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. WEB / EXPERIMENT, GAME / WEB"
                    className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-sm text-text-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the project, intent, and technologies explored..."
                  className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-sm text-text-primary focus:outline-none resize-none"
                />
              </div>

              {/* Tech stack tags */}
              <div>
                <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
                  Tech Stack Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTech();
                      }
                    }}
                    placeholder="Type tech and press Enter (e.g. React, Three.js, Python)"
                    className="flex-1 bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-1.5 px-3 text-xs text-text-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddTech}
                    className="px-3 py-1.5 rounded-xl bg-surface-elevated border border-border hover:border-accent-primary text-text-primary text-xs font-mono"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {techList.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md bg-accent-primary/10 border border-accent-primary/20 text-accent-bright text-xs font-mono flex items-center gap-1.5"
                    >
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTech(t)}
                        className="hover:text-status-error"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
                    Live URL / CodePen Link
                  </label>
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://codepen.io/..."
                    className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-text-secondary mb-1">
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://images.unsplash.com/... or codepen image"
                    className="w-full bg-surface-elevated border border-border focus:border-accent-primary rounded-xl py-2 px-3 text-xs text-text-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded bg-surface-elevated border-border text-accent-primary focus:ring-0 cursor-pointer"
                />
                <label htmlFor="featured-check" className="text-xs text-text-secondary cursor-pointer">
                  Feature this project prominently on the portfolio
                </label>
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
                  <span>{editingProject ? 'Save Changes' : 'Create Project'}</span>
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
                Confirm Project Deletion
              </h3>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed mb-6 font-light">
              Are you sure you want to permanently delete this project? It will be immediately removed from your live portfolio.
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
