export interface Blog {
  id: string;
  title: string;
  url: string;
  description: string;
  date: string;
  readTime: string;
  imageUrl?: string;
}

export const defaultBlogs: Blog[] = [];

export const fetchBlogs = async (): Promise<Blog[]> => {
  try {
    const res = await fetch('/api/blogs');
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('sanoop_blogs', JSON.stringify(data));
      return data;
    }
  } catch (e) {
    console.error('Error fetching blogs from API:', e);
  }
  return getBlogs();
};

export const addBlogApi = async (blog: Blog): Promise<Blog[]> => {
  try {
    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog)
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('sanoop_blogs', JSON.stringify(data));
      return data;
    }
  } catch (e) {
    console.error('Error adding blog via API:', e);
  }
  const current = getBlogs();
  const updated = [...current, blog];
  saveBlogs(updated);
  return updated;
};

export const updateBlogApi = async (id: string, blog: Partial<Blog>): Promise<Blog[]> => {
  try {
    const res = await fetch(`/api/blogs/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog)
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('sanoop_blogs', JSON.stringify(data));
      return data;
    }
  } catch (e) {
    console.error('Error updating blog via API:', e);
  }
  const current = getBlogs();
  const updated = current.map(b => b.id === id ? { ...b, ...blog } : b);
  saveBlogs(updated);
  return updated;
};

export const deleteBlogApi = async (id: string): Promise<Blog[]> => {
  try {
    const res = await fetch(`/api/blogs/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('sanoop_blogs', JSON.stringify(data));
      return data;
    }
  } catch (e) {
    console.error('Error deleting blog via API:', e);
  }
  const current = getBlogs();
  const updated = current.filter(b => b.id !== id);
  saveBlogs(updated);
  return updated;
};

export const reorderBlogsApi = async (blogs: Blog[]): Promise<Blog[]> => {
  try {
    const res = await fetch('/api/blogs/reorder', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blogs })
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('sanoop_blogs', JSON.stringify(data));
      return data;
    }
  } catch (e) {
    console.error('Error reordering blogs via API:', e);
  }
  saveBlogs(blogs);
  return blogs;
};

export const getBlogs = (): Blog[] => {
  const saved = localStorage.getItem('sanoop_blogs');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Error parsing blogs', e);
    }
  }
  return defaultBlogs;
};

export const saveBlogs = (blogs: Blog[]): void => {
  localStorage.setItem('sanoop_blogs', JSON.stringify(blogs));
};
