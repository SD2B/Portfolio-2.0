export interface Project {
  id: string;
  title: string;
  description: string;
  details: string[];
  tech?: string[];
}

export const projects: Record<string, Project> = {
  'simodi-gold': {
    id: 'simodi-gold',
    title: 'Simodi Gold — Digital Gold Trading & Bullion E-Commerce',
    description: 'Trading and physical/digital gold & silver holding platform combined with bullion e-commerce; officially launched at a company conference at the Burj Khalifa, Dubai. Built as solo frontend developer, paired with a team of 3 backend developers.',
    details: [
      'Architected and delivered the complete frontend application for trading and digital/physical gold and silver holdings with integrated bullion e-commerce.',
      'Officially launched by the company at a conference held at the Burj Khalifa, Dubai.',
      'Delivered native (Kotlin/Swift) security hardening ahead of a cybersecurity audit, covering root, jailbreak, emulator, debugger, USB debugging, developer mode, and Frida detection with graceful-failure handling.',
      'Implemented SPKI-based SSL/certificate pinning per host to protect API and WebSocket traffic against man-in-the-middle attacks.',
      'Built iOS/Android credential autofill using AutofillGroup, autofillHints, and TextInput.finishAutofillContext() for a streamlined, secure login experience.',
      'Diagnosed and resolved cross-platform web issues, including WebSocket instance duplication, Dio timeout handling, and layout overflows, ensuring stable behavior across Android, iOS, and Web.',
      'Engineered high-frequency live rates and trading order workflows with Riverpod and WebSockets.'
    ],
    tech: ['Flutter', 'Dart', 'Riverpod', 'WebSocket', 'Firebase', 'Dio', 'Native Security (Kotlin/Swift)', 'SSL Pinning']
  },
  'bullion-live': {
    id: 'bullion-live',
    title: 'Bullion Live Rate Tracking (50+ Apps)',
    description: 'Real-time tracking applications for gold and silver market rates, deployed as white-label solutions for 50+ clients across Android & iOS.',
    details: [
      'Developed and maintained 50+ White-Label Flutter applications for real-time bullion price tracking (Gold, Silver, Platinum).',
      'Built a standardized, brandable component library that cut new-client deployment time from 1 week to 2 days.',
      'Rebuilt legacy apps from scratch with improved architecture, reducing maintenance overhead.',
      'Implemented WebSocket-based live rates, admin-configurable spreads, historical charts, rate alerts, and push notifications (FCM).',
      'Optimized applications for continuous real-time data streaming and standardized reusable components.',
      'Deployed across Android and iOS platforms.'
    ],
    tech: ['Flutter', 'Provider', 'MVVM', 'WebSocket', 'Firebase', 'Dio']
  },
  'trading': {
    id: 'trading',
    title: 'Trading Applications (Forex, Crypto & Metals)',
    description: 'Real-time trading applications with live price streaming and full trade execution workflows across Android, iOS, and Web.',
    details: [
      'Built buy/sell order placement, trade execution, and portfolio/transaction tracking.',
      'Integrated Sumsub for KYC verification and Freshchat for in-app customer support.',
      'Designed state management architecture to handle complex, high-frequency trading workflows.',
      'Implemented live price streaming and interactive trading charts.',
      'Integrated secure REST APIs and WebSocket connections.'
    ],
    tech: ['Flutter', 'Provider', 'MVVM', 'WebSocket', 'Firebase', 'Dio', 'Sumsub KYC', 'Crashlytics']
  },
  'ecommerce': {
    id: 'ecommerce',
    title: 'E-Commerce Applications (Bullion, Jewelry & Retail)',
    description: 'Full-featured shopping apps customized for bullion dealers, jewelers, and retail clients.',
    details: [
      'Built catalog, cart, wishlist, and checkout flow with payment gateway integration.',
      'Implemented admin-controlled inventory/pricing, order tracking, and push notifications.',
      'Added user authentication, profile management, and secure payment processing.',
      'Optimized UI for mobile and web screens with intuitive browsing.'
    ],
    tech: ['Flutter', 'Provider', 'Riverpod', 'MVVM', 'WebSocket', 'Firebase', 'Dio', 'Sumsub KYC']
  },
  'business-systems': {
    id: 'business-systems',
    title: 'Business Management Systems (ERP, POS & Leads)',
    description: 'Four distinct systems built for restaurant, billing, ERP, and lead-management use cases across desktop, mobile, and web.',
    details: [
      'Isselo — Restaurant management system (Android, iOS, Windows, Web); collaborated within a 6-person team (4 frontend, 2 backend).',
      'DB BillMate — Billing & accounting software (Windows); built solo end-to-end, including offline data layer.',
      'Sreekala O2 — ERP system (Android, iOS, Windows, Web); collaborated within a 6-person team (4 frontend, 2 backend).',
      'SincA Leads — Lead management software (Android, iOS, Web); sole frontend developer, paired with one backend developer.'
    ],
    tech: ['Flutter', 'Riverpod', 'MVVM', 'SQLite', 'WebSocket', 'Firebase', 'Dio']
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
    ],
    tech: ['Flutter', 'Dart', 'Open Source', 'Pub.dev']
  }
};
