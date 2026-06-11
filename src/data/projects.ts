export interface Project {
  id: string;
  title: string;
  description: string;
  details: string[];
}

export const projects: Record<string, Project> = {
  'bullion-live': {
    id: 'bullion-live',
    title: 'Bullion Live Rate Tracking (50+ Apps)',
    description: 'Real-time tracking applications for gold and silver market rates, deployed as white-label solutions for 50+ clients.',
    details: [
      'Developed and maintained 50+ White-Label Flutter applications for real-time bullion price tracking (Gold, Silver, Platinum).',
      'Implemented real-time live rate updates using WebSocket and REST APIs.',
      'Added historical charts, rate alerts, and multi-market support.',
      'Built customizable white-label apps with dynamic branding and admin-configurable spreads.',
      'Optimized applications for continuous real-time data streaming and standardized reusable components.',
      'Deployed across Android and iOS platforms.'
    ]
  },
  'trading': {
    id: 'trading',
    title: 'Trading Applications (Forex, Metals, Crypto)',
    description: 'Real-time trading platforms supporting multiple markets with advanced charting and execution flows.',
    details: [
      'Built real-time trading applications supporting Forex, Crypto, and Metals.',
      'Implemented live price streaming and interactive trading charts.',
      'Developed buy/sell order placement and trade execution flows.',
      'Added portfolio tracking and transaction history.',
      'Integrated secure REST APIs and WebSocket connections.',
      'Implemented state management for complex trading workflows.'
    ]
  },
  'ecommerce': {
    id: 'ecommerce',
    title: 'E-Commerce Applications',
    description: 'Full-featured e-commerce solutions for bullion dealers, jewelry stores, and retail businesses.',
    details: [
      'Developed full-featured e-commerce mobile applications using Flutter.',
      'Implemented product catalog, categories, cart, and wishlist.',
      'Built checkout flow with payment gateway integration.',
      'Added order tracking and push notifications.',
      'Implemented user authentication and profile management.',
      'Integrated admin-controlled inventory and pricing.'
    ]
  },
  'business-systems': {
    id: 'business-systems',
    title: 'Management & ERP Systems',
    description: 'Comprehensive business management solutions including POS, ERP, and Lead Management.',
    details: [
      'Developed restaurant management, billing, ERP, and lead management systems.',
      'Implemented inventory management, sales tracking, invoicing, and reporting modules.',
      'Built role-based workflows, dashboards, and operational automation.',
      'Developed Windows and Web-based software solutions.',
      'Integrated accounting features, analytics, and real-time data management.',
      'Key Projects: Isselo (POS), DB BillMate (Windows Billing), Sreekala O2 (ERP), SincA Leads (Lead Management).'
    ]
  },
  'flutter-plugins': {
    id: 'flutter-plugins',
    title: 'Flutter Plugins & Packages',
    description: 'Open-source and internal Flutter packages to enhance development efficiency and UI capabilities.',
    details: [
      'Custom Overlay Popup: A flexible package for creating customizable overlay popups.',
      'Smart Wrap: Widget supporting responsive layouts for adaptive UI design.',
      'Smart Tip: Tooltip widget enabling rich, context-sensitive UI elements.',
      'Page Flow: Enables seamless navigation within a single ScrollView.'
    ]
  }
};
