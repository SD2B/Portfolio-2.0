export interface Blog {
  id: string;
  title: string;
  url: string;
  description: string;
  date: string;
  readTime: string;
  imageUrl?: string;
}

export const defaultBlogs: Blog[] = [
  {
    id: 'blog-1',
    title: 'Mastering Multi-Platform Flutter: A Single Codebase for Mobile, Desktop, and Web',
    url: 'https://medium.com/@sd2b/mastering-multi-platform-flutter-a-single-codebase-for-mobile-desktop-and-web',
    description: 'Discover how to optimize and structure your Flutter apps to run seamlessly on iOS, Android, macOS, Windows, and the Web from a single source.',
    date: 'June 2026',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'blog-2',
    title: 'Writing High-Performance Custom Native Plugins for Flutter',
    url: 'https://medium.com/@sd2b/writing-high-performance-custom-native-plugins-for-flutter',
    description: 'An in-depth guide to bridging Dart with native Swift, Kotlin, and C++ code to unlock platform-specific features and maximum performance.',
    date: 'April 2026',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'blog-3',
    title: 'Architecting Large-Scale Flutter Applications: State Management & Clean Code',
    url: 'https://medium.com/@sd2b/architecting-large-scale-flutter-applications-state-management-clean-code',
    description: 'Best practices for choosing the right state management solution and organizing your project structure to maintain 50+ enterprise apps.',
    date: 'February 2026',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'
  }
];

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
