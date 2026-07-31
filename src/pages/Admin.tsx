import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  fetchBlogs, 
  getBlogs, 
  addBlogApi, 
  updateBlogApi, 
  deleteBlogApi, 
  reorderBlogsApi, 
  Blog 
} from '../data/blogs';
import { 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Plus, 
  ShieldAlert, 
  Check, 
  LogOut, 
  ExternalLink, 
  Edit2, 
  X, 
  AlertTriangle 
} from 'lucide-react';

const Admin: React.FC = () => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [blogs, setBlogs] = useState<Blog[]>(getBlogs());
  
  // Blog Form state
  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newReadTime, setNewReadTime] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  
  // Editing and Deleting state
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [deletingBlogId, setDeletingBlogId] = useState<string | null>(null);
  
  const navigate = useNavigate();

  // Load blogs if authenticated
  useEffect(() => {
    // Check if they already logged in during this session
    const authStatus = sessionStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchBlogs().then(data => {
        if (data) setBlogs(data);
      });
    }
  }, []);

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const defaultPin = '0000';
    if (pin === defaultPin) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      const loaded = await fetchBlogs();
      if (loaded) setBlogs(loaded);
      setError('');
    } else {
      setError('Incorrect PIN. Please try again.');
      setPin('');
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) {
      setError('Title and URL are required.');
      return;
    }

    if (editingBlogId) {
      // Update Mode
      const updatedData: Partial<Blog> = {
        title: newTitle,
        url: newUrl,
        description: newDescription || 'No description provided.',
        date: newDate || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        readTime: newReadTime || '5 min read',
        imageUrl: newImageUrl || undefined
      };
      const res = await updateBlogApi(editingBlogId, updatedData);
      setBlogs(res);
      
      // Reset Edit Mode
      setEditingBlogId(null);
    } else {
      // Add Mode
      const newBlog: Blog = {
        id: `blog-${Date.now()}`,
        title: newTitle,
        url: newUrl,
        description: newDescription || 'No description provided.',
        date: newDate || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        readTime: newReadTime || '5 min read',
        imageUrl: newImageUrl || undefined
      };

      const res = await addBlogApi(newBlog);
      setBlogs(res);
    }
    
    // Clear form fields
    setNewUrl('');
    setNewTitle('');
    setNewDescription('');
    setNewDate('');
    setNewReadTime('');
    setNewImageUrl('');
    setError('');
  };

  const startEdit = (blog: Blog) => {
    setEditingBlogId(blog.id);
    setNewTitle(blog.title);
    setNewUrl(blog.url);
    setNewDescription(blog.description);
    setNewDate(blog.date);
    setNewReadTime(blog.readTime);
    setNewImageUrl(blog.imageUrl || '');
    setError('');
    
    // Scroll smoothly to form
    const formElement = document.getElementById('blog-form-container');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cancelEdit = () => {
    setEditingBlogId(null);
    setNewUrl('');
    setNewTitle('');
    setNewDescription('');
    setNewDate('');
    setNewReadTime('');
    setNewImageUrl('');
    setError('');
  };

  const confirmDelete = (id: string) => {
    setDeletingBlogId(id);
  };

  const executeDelete = async (id: string) => {
    const res = await deleteBlogApi(id);
    setBlogs(res);
    setDeletingBlogId(null);
  };

  const cancelDelete = () => {
    setDeletingBlogId(null);
  };

  const moveUp = async (index: number) => {
    if (index === 0) return;
    const updated = [...blogs];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setBlogs(updated);
    const res = await reorderBlogsApi(updated);
    setBlogs(res);
  };

  const moveDown = async (index: number) => {
    if (index === blogs.length - 1) return;
    const updated = [...blogs];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setBlogs(updated);
    const res = await reorderBlogsApi(updated);
    setBlogs(res);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setPin('');
  };

  if (!isAuthenticated) {
    return (
      <main className="section" style={{ marginTop: '70px', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '450px' }}>
          <div className="game-card shine-effect" style={{ border: '1px solid var(--border)', background: 'var(--gray)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--accent)' }}>
              <ShieldAlert size={48} />
            </div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Admin Access</h2>
            <p style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>Please enter your 4-digit PIN to manage the blog section.</p>
            
            <form onSubmit={handlePinSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <input
                  type="password"
                  maxLength={4}
                  placeholder="••••"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    background: 'var(--light)',
                    color: 'var(--primary)',
                    textAlign: 'center',
                    fontSize: '1.8rem',
                    letterSpacing: '1rem',
                    outline: 'none'
                  }}
                  autoFocus
                />
              </div>
              
              {error && <p style={{ color: '#ff4d4d', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{error}</p>}
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link to="/" className="btn" style={{ flex: 1, padding: '0.8rem', background: 'transparent', border: '1px solid var(--border)', display: 'inline-block', textDecoration: 'none' }}>
                  Cancel
                </Link>
                <button type="submit" className="btn" style={{ flex: 1, padding: '0.8rem' }}>
                  Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="section" style={{ marginTop: '70px', minHeight: '90vh' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Admin Dashboard</h1>
            <p style={{ color: 'var(--accent)', margin: 0 }}>Manage your Medium blog posts, edit details, and arrange display order.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/#blog" className="btn" style={{ background: 'transparent', border: '1px solid var(--border)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              View Blog Section
            </Link>
            <button onClick={handleLogout} className="btn" style={{ background: '#ff4d4d', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        <div id="blog-form-container" className="grid" style={{ gridTemplateColumns: '1fr', gap: '3rem' }}>
          {/* Blog Form (Create / Edit) */}
          <div className="game-card" style={{ background: 'var(--gray)', padding: '2.5rem', borderRadius: '1rem', border: '1px solid var(--border)', textAlign: 'left' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: editingBlogId ? 'var(--accent)' : 'inherit' }}>
              {editingBlogId ? <Edit2 size={20} /> : <Plus size={20} />} 
              {editingBlogId ? 'Edit Blog Post' : 'Add New Blog Post'}
            </h2>
            <form onSubmit={handleFormSubmit} className="grid" style={{ gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Medium Post URL *</label>
                <input
                  type="url"
                  placeholder="https://medium.com/@sd2b/your-awesome-post"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--light)', color: 'var(--primary)' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Title *</label>
                <input
                  type="text"
                  placeholder="Enter post title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--light)', color: 'var(--primary)' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--light)', color: 'var(--primary)' }}
                />
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: 'var(--accent)' }}>Give a direct image link to display a gorgeous header photo for your article.</p>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Description (Brief Summary)</label>
                <textarea
                  placeholder="Enter a brief summary of the blog post..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--light)', color: 'var(--primary)', minHeight: '100px', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Date (e.g. July 2026)</label>
                  <input
                    type="text"
                    placeholder="July 2026"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--light)', color: 'var(--primary)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Read Time (e.g. 5 min read)</label>
                  <input
                    type="text"
                    placeholder="5 min read"
                    value={newReadTime}
                    onChange={(e) => setNewReadTime(e.target.value)}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--light)', color: 'var(--primary)' }}
                  />
                </div>
              </div>

              {error && <p style={{ color: '#ff4d4d', fontSize: '0.9rem' }}>{error}</p>}

              <div style={{ display: 'flex', gap: '1rem' }}>
                {editingBlogId && (
                  <button type="button" onClick={cancelEdit} className="btn" style={{ flex: 1, padding: '1rem', background: 'transparent', border: '1px solid var(--border)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <X size={16} /> Cancel
                  </button>
                )}
                <button type="submit" className="btn shine-effect" style={{ flex: editingBlogId ? 2 : 1, padding: '1rem' }}>
                  {editingBlogId ? 'Save Changes' : 'Add Blog Post'}
                </button>
              </div>
            </form>
          </div>

          {/* Manage Existing Blogs */}
          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Manage Blog Posts ({blogs.length})</h2>
            {blogs.length === 0 ? (
              <div className="game-card" style={{ background: 'var(--gray)', padding: '3rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                <p style={{ margin: 0, color: 'var(--accent)' }}>No blog posts added yet. Add your first post using the form above.</p>
              </div>
            ) : (
              <div className="grid" style={{ gap: '1.25rem' }}>
                {blogs.map((blog, index) => (
                  <div
                    key={blog.id}
                    className="shine-effect"
                    style={{
                      background: editingBlogId === blog.id ? 'rgba(var(--accent-rgb), 0.05)' : 'var(--gray)',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: editingBlogId === blog.id ? '2px solid var(--accent)' : '1px solid var(--border)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: '250px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '0.8rem', background: 'var(--border)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 600 }}>
                            #{index + 1}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--accent)' }}>{blog.date}</span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--accent)' }}>&bull; {blog.readTime}</span>
                        </div>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {blog.title}
                          {blog.imageUrl && <span style={{ fontSize: '0.75rem', background: 'rgba(0, 0, 0, 0.2)', color: 'var(--accent)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>Has Image</span>}
                        </h3>
                        <a href={blog.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'underline' }}>
                          {blog.url.substring(0, 50)}... <ExternalLink size={12} />
                        </a>
                      </div>

                      {/* Control buttons */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button
                          onClick={() => moveUp(index)}
                          disabled={index === 0}
                          className="btn"
                          style={{
                            padding: '0.5rem',
                            background: 'var(--light)',
                            color: 'var(--primary)',
                            border: '1px solid var(--border)',
                            cursor: index === 0 ? 'not-allowed' : 'pointer',
                            opacity: index === 0 ? 0.4 : 1
                          }}
                          title="Move Up"
                        >
                          <ArrowUp size={16} />
                        </button>
                        <button
                          onClick={() => moveDown(index)}
                          disabled={index === blogs.length - 1}
                          className="btn"
                          style={{
                            padding: '0.5rem',
                            background: 'var(--light)',
                            color: 'var(--primary)',
                            border: '1px solid var(--border)',
                            cursor: index === blogs.length - 1 ? 'not-allowed' : 'pointer',
                            opacity: index === blogs.length - 1 ? 0.4 : 1
                          }}
                          title="Move Down"
                        >
                          <ArrowDown size={16} />
                        </button>
                        <button
                          onClick={() => startEdit(blog)}
                          className="btn"
                          style={{
                            padding: '0.5rem',
                            background: 'var(--primary)',
                            color: 'var(--light)',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                          title="Edit Post"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => confirmDelete(blog.id)}
                          className="btn"
                          style={{
                            padding: '0.5rem',
                            background: '#ff4d4d',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                          title="Delete Post"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Inline Delete Confirmation */}
                    {deletingBlogId === blog.id && (
                      <div 
                        style={{ 
                          background: 'rgba(255, 77, 77, 0.1)', 
                          border: '1px solid #ff4d4d', 
                          padding: '1rem', 
                          borderRadius: '8px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between', 
                          gap: '1rem',
                          marginTop: '0.5rem'
                        }}
                      >
                        <span style={{ fontSize: '0.9rem', color: '#ff4d4d', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <AlertTriangle size={16} /> Are you absolutely sure you want to delete this post?
                        </span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            onClick={() => executeDelete(blog.id)} 
                            className="btn" 
                            style={{ background: '#ff4d4d', color: '#fff', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                          >
                            Yes, Delete
                          </button>
                          <button 
                            onClick={cancelDelete} 
                            className="btn" 
                            style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--primary)', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Admin;
