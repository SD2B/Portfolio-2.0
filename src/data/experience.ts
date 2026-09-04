export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string; // e.g. "07/2023" (MM/YYYY)
  endDate: string;   // e.g. "Present" or "11/2023" (MM/YYYY)
  dateRangeText?: string;
  description: string;
}

export const experiences: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Senior Flutter Developer',
    company: 'Artifitia Solutions LLP',
    location: 'Calicut, Kerala',
    startDate: '04/2026',
    endDate: 'Present',
    dateRangeText: '04/2026 - Present',
    description: 'Promoted to Senior role for taking ownership of architecture and development practices. Led frontend development of Simodi Gold (trading & bullion e-commerce launched at Burj Khalifa, Dubai) and delivered native security hardening ahead of cybersecurity audit. Leading architecture decisions, code reviews, and reusable component standards.'
  },
  {
    id: 'exp-2',
    role: 'Flutter Developer',
    company: 'Artifitia Solutions LLP',
    location: 'Calicut, Kerala',
    startDate: '04/2025',
    endDate: '04/2026',
    dateRangeText: '04/2025 - 04/2026',
    description: 'Shipped and maintained 50+ mobile applications spanning bullion rate tracking, e-commerce, and trading. Refactored legacy codebases, integrated real-time WebSocket and Firebase services, and introduced reusable Flutter widgets across projects.'
  },
  {
    id: 'exp-3',
    role: 'Software Developer (Freelance)',
    company: 'Freelance',
    location: 'Malappuram, Kerala',
    startDate: '11/2024',
    endDate: '04/2025',
    dateRangeText: '11/2024 - 04/2025',
    description: 'Built DB-BillMate, a custom offline billing application for DB Stores. Implemented invoice generation, inventory management, and sales tracking with Flutter, Riverpod, and SQLite.'
  },
  {
    id: 'exp-4',
    role: 'Flutter Developer',
    company: 'Screl Info Pvt. Ltd.',
    location: 'Kerala',
    startDate: '11/2023',
    endDate: '11/2024',
    dateRangeText: '11/2023 - 11/2024',
    description: 'Designed and developed cross-platform applications for Android, iOS, web, and desktop, increasing downloads by 40% and user retention by 15% through effective UI/UX and performance optimization.'
  },
  {
    id: 'exp-5',
    role: 'Flutter Developer Intern',
    company: 'Ralfiz Technologies',
    location: 'Kerala',
    startDate: '07/2023',
    endDate: '11/2023',
    dateRangeText: '07/2023 - 11/2023',
    description: 'Delivered client-facing Flutter features across the full development lifecycle, participating in sprint planning, code reviews, and foundational architecture.'
  }
];

/**
 * Parses date in MM/YYYY format into month index (0-based total months from year 0)
 */
function parseDateStringToMonthIndex(dateStr: string, isEnd = false): number {
  const trimmed = dateStr.trim().toLowerCase();
  const now = new Date();
  
  if (!trimmed || trimmed === 'present' || trimmed === 'current' || trimmed === 'now') {
    // Current month
    return now.getFullYear() * 12 + now.getMonth();
  }

  // Expect MM/YYYY or M/YYYY
  const parts = trimmed.split('/');
  if (parts.length === 2) {
    const month = parseInt(parts[0], 10) - 1; // 0-indexed
    const year = parseInt(parts[1], 10);
    if (!isNaN(month) && !isNaN(year)) {
      return year * 12 + month;
    }
  }

  // Fallback to Date.parse
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    return parsed.getFullYear() * 12 + parsed.getMonth();
  }

  return now.getFullYear() * 12 + now.getMonth();
}

export interface ExperienceStats {
  totalMonths: number;
  yearsNum: number;
  yearsFormatted: string;      // e.g. "3.2+"
  wholeYearsFormatted: string; // e.g. "3+"
  yearsText: string;           // e.g. "3+ years"
  detailedText: string;        // e.g. "3 years 2 months"
}

/**
 * Automatically extracts date information from all experience entries
 * and calculates total years and months.
 */
export function calculateExperienceStats(items: ExperienceItem[] = experiences): ExperienceStats {
  if (!items || items.length === 0) {
    return {
      totalMonths: 0,
      yearsNum: 0,
      yearsFormatted: '0+',
      wholeYearsFormatted: '0+',
      yearsText: '0 years',
      detailedText: '0 months'
    };
  }

  // Collect unique active month indices across all experience intervals to accurately handle overlaps/continuity
  const activeMonths = new Set<number>();

  items.forEach(item => {
    let startStr = item.startDate;
    let endStr = item.endDate;

    // If dateRangeText is provided and start/end are not set
    if ((!startStr || !endStr) && item.dateRangeText) {
      const parts = item.dateRangeText.split('-');
      if (parts.length === 2) {
        startStr = parts[0].trim();
        endStr = parts[1].trim();
      }
    }

    const startIdx = parseDateStringToMonthIndex(startStr, false);
    const endIdx = parseDateStringToMonthIndex(endStr, true);

    const minIdx = Math.min(startIdx, endIdx);
    const maxIdx = Math.max(startIdx, endIdx);

    // Add each month to the set
    for (let m = minIdx; m <= maxIdx; m++) {
      activeMonths.add(m);
    }
  });

  // Total active months. If continuous from 07/2023 to current month, activeMonths.size includes both boundary months
  // For standard duration between points (end - start):
  const sortedMonths = Array.from(activeMonths).sort((a, b) => a - b);
  const earliestMonth = sortedMonths[0];
  const latestMonth = sortedMonths[sortedMonths.length - 1];
  
  // Elapsed months between earliest start and latest end
  const durationMonths = (latestMonth - earliestMonth);
  // Using activeMonths count or duration: since continuous, durationMonths is exact elapsed time
  const totalMonths = Math.max(durationMonths, activeMonths.size > 0 ? activeMonths.size - 1 : 0);

  const exactYears = totalMonths / 12;
  const roundedOneDecimal = Math.round(exactYears * 10) / 10;
  const wholeYears = Math.floor(exactYears);
  const remainingMonths = totalMonths % 12;

  const yearsFormatted = `${roundedOneDecimal.toFixed(1)}+`;
  const wholeYearsFormatted = `${wholeYears}+`;
  const yearsText = `${wholeYears}+ years`;
  const detailedText = remainingMonths > 0 
    ? `${wholeYears} years, ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`
    : `${wholeYears} years`;

  return {
    totalMonths,
    yearsNum: exactYears,
    yearsFormatted,
    wholeYearsFormatted,
    yearsText,
    detailedText
  };
}
