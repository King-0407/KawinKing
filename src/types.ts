/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  colSpanClass: string; // Tailored column span in Bento grid, e.g. "md:col-span-7", "md:col-span-5"
  link?: string;
  caseStudyUrl?: string;
  designUrl?: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  readTime: string;
  date: string;
  imageUrl: string;
  category: string;
}

export interface ExplorationItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  rotation: string; // e.g. "rotate-3", "rotate-[-4deg]"
}

export interface StatItem {
  value: string;
  label: string;
}
