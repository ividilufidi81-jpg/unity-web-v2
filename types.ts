// Fix: Import React to resolve 'Cannot find namespace React' when using React.ReactNode
import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface PainPoint {
  title: string;
  description: string;
  image: string;
}

export interface Solution {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
}

export interface CourseChapter {
  id: number;
  title: string;
  content: string;
  isFree: boolean;
}