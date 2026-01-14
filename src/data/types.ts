/**
 * TIPOS TYPESCRIPT - Portafolio
 *
 * Define las interfaces para toda la aplicación
 * Sigue Interface Segregation Principle (SOLID)
 */

export type { ImageMetadata } from 'astro';

// ============= SOCIAL LINKS =============
export interface SocialLinks {
  github: string;
  linkedin: string;
  cv?: string;
  portfolio?: string;
  website?: string;
}

// ============= EDUCATION =============
export interface Education {
  degree: string;
  university: string;
  degreeStatus: string;
}

// ============= SKILL =============
export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'runtime' | 'language' | 'framework' | 'styling' | 'state' | 'sql' | 'nosql' | 'cache' | 'orm' | 'vcs' | 'devops' | 'ci-cd' | 'testing' | 'api' | 'pattern' | 'methodology' | 'principles';
  url?: string; // URL to official documentation
}

// ============= SKILLS COLLECTION =============
export interface SkillsCollection {
  backend: Skill[];
  frontend: Skill[];
  database: Skill[];
  tools: Skill[];
  architecture: Skill[];
}

// ============= EXPERIENCE / PROJECT =============
export interface Experience {
  title: string;
  period: string;
  description: string;
  technologies: string[];
  highlights: string[];
  image?: ImageMetadata | string;
  links?: {
    demo?: string;
    github?: string;
  };
}

// ============= ACHIEVEMENT =============
export interface Achievement {
  title: string;
  description: string;
}

// ============= LANGUAGE =============
export interface Language {
  name: string;
  level: 'Nativo' | 'Fluido' | 'Intermedio-Avanzado' | 'Intermedio' | 'Básico';
  note?: string;
}

// ============= AVAILABILITY =============
export interface Availability {
  status: string;
  type: string;
  position: string;
}

// ============= PERSONAL DATA (Root) =============
export interface PersonalData {
  name: string;
  title: string;
  subtitle: string;
  location: string;
  email: string;
  phone: string;
  university: string;
  degree: string;
  degreeStatus: string;
  
  social: SocialLinks;
  bio: string;
  
  skills: SkillsCollection;
  experience: Experience[];
  achievements: Achievement[];
  languages: Language[];
  
  philosophy: string;
  availability: Availability;
}

// ============= NAVIGATION ITEM =============
export interface NavItem {
  id: string;
  label: string;
  href: string;
  target?: '_blank' | '_self';
}

// ============= UI COMPONENT PROPS =============

// Button Props
export interface ButtonProps {
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: string;
  icon?: string;
  ariaLabel?: string;
  target?: '_blank' | '_self';
  rel?: string;
}

// Badge Props
export interface BadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'info';
  children: string;
}

// SectionHeader Props
export interface SectionHeaderProps {
  label: string;
  title: string;
  description: string;
}

// Card Props
export interface CardProps {
  variant?: 'default' | 'glow' | 'outline';
  children?: any;
}
