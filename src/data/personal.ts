/**
 * DATOS PERSONALES - Portafolio
 *
 * Datos centralizados del perfil profesional
 * Las imágenes se importan desde src/assets/images para optimización con astro:assets
 */

import type { PersonalData, ImageMetadata } from './types';

// Importar imágenes desde assets (Astro las optimiza automáticamente)
import gestorDocumentalImg from '../assets/images/gestorDocumental.PNG';
import tiendaImaImg from '../assets/images/TiendaIma.PNG';
import erpImagenImg from '../assets/images/ERPimagen.PNG';

// Mapear imágenes a tipo ImageMetadata
const images: Record<string, ImageMetadata> = {
  '/gestorDocumental.PNG': gestorDocumentalImg as ImageMetadata,
  '/TiendaIma.PNG': tiendaImaImg as ImageMetadata,
  '/ERPimagen.PNG': erpImagenImg as ImageMetadata,
};

// Helper para obtener la imagen correcta
const getImage = (path: string | undefined): ImageMetadata | undefined => {
  if (!path) return undefined;
  return images[path];
};

export const personalData: PersonalData = {
  name: "Eddy Alexander Ramírez Lorenzana",
  title: "Desarrollador Frontend con conocimientos en Backend y QA",
  subtitle: "Especialista en Clean Architecture & Desarrollo Escalable",
  location: "Ciudad de Guatemala, Guatemala",
  email: "eddyramirez150@gmail.com",
  phone: "+502 0000 0000",
  university: "Universidad Mariano Gálvez",
  degree: "Ingeniería en Sistemas",
  degreeStatus: "En curso (2019 - 2024)",

  social: {
    linkedin: "https://www.linkedin.com/in/eddy-alexander-ramirez-lorenzana-196a47267",
    github: "https://github.com/Eleramirezl9",
    website: "https://eddyramirez150@gmail.com"
  },

  bio: "Desarrollador Frontend con sólidos conocimientos en arquitecturas de software escalables y desarrollo de aplicaciones web completas. 5 años de formación académica en ingeniería de sistemas complementados con 1 año de desarrollo práctico autodidacta en proyectos empresariales. Especialista en implementación de Clean Architecture, TDD y desarrollo de soluciones robustas.",

  skills: {
    backend: [
      {
        name: "Node.js",
        level: 90,
        category: "runtime",
        url: "https://nodejs.org/docs/latest/"
      },
      {
        name: "TypeScript",
        level: 85,
        category: "language",
        url: "https://www.typescriptlang.org/docs/"
      },
      {
        name: "Express.js",
        level: 90,
        category: "framework",
        url: "https://expressjs.com/"
      },
      {
        name: "NestJS",
        level: 80,
        category: "framework",
        url: "https://docs.nestjs.com/"
      },
      {
        name: "Python",
        level: 70,
        category: "language",
        url: "https://docs.python.org/3/"
      },
      {
        name: "Java",
        level: 65,
        category: "language",
        url: "https://docs.oracle.com/en/java/"
      }
    ],
    frontend: [
      {
        name: "React",
        level: 90,
        category: "framework",
        url: "https://react.dev/"
      },
      {
        name: "Next.js",
        level: 85,
        category: "framework",
        url: "https://nextjs.org/docs"
      },
      {
        name: "Vue.js",
        level: 75,
        category: "framework",
        url: "https://vuejs.org/guide/"
      },
      {
        name: "Tailwind CSS",
        level: 90,
        category: "styling",
        url: "https://tailwindcss.com/docs"
      },
      {
        name: "Redux",
        level: 80,
        category: "state",
        url: "https://redux.js.org/"
      }
    ],
    database: [
      {
        name: "PostgreSQL",
        level: 85,
        category: "sql",
        url: "https://www.postgresql.org/docs/"
      },
      {
        name: "MongoDB",
        level: 80,
        category: "nosql",
        url: "https://www.mongodb.com/docs/"
      },
      {
        name: "MySQL",
        level: 80,
        category: "sql",
        url: "https://dev.mysql.com/doc/"
      },
      {
        name: "Redis",
        level: 70,
        category: "cache",
        url: "https://redis.io/docs/"
      },
      {
        name: "Prisma",
        level: 85,
        category: "orm",
        url: "https://www.prisma.io/docs/"
      }
    ],
    tools: [
      {
        name: "Git",
        level: 90,
        category: "vcs",
        url: "https://git-scm.com/doc"
      },
      {
        name: "Docker",
        level: 75,
        category: "devops",
        url: "https://docs.docker.com/"
      },
      {
        name: "GitHub Actions",
        level: 70,
        category: "ci-cd",
        url: "https://docs.github.com/en/actions"
      },
      {
        name: "Jest",
        level: 80,
        category: "testing",
        url: "https://jestjs.io/docs/getting-started"
      },
      {
        name: "Postman",
        level: 85,
        category: "api",
        url: "https://learning.postman.com/"
      }
    ],
    architecture: [
      {
        name: "Clean Architecture",
        level: 85,
        category: "pattern",
        url: "https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html"
      },
      {
        name: "Hexagonal Architecture",
        level: 80,
        category: "pattern",
        url: "https://alistair.cockburn.us/hexagonal-architecture/"
      },
      {
        name: "MVC",
        level: 90,
        category: "pattern",
        url: "https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller"
      },
      {
        name: "DDD",
        level: 75,
        category: "pattern",
        url: "https://domaindrivendesign.io/"
      },
      {
        name: "TDD",
        level: 80,
        category: "methodology",
        url: "https://testdriven.io/tdd-best-practices/"
      },
      {
        name: "SOLID Principles",
        level: 85,
        category: "principles",
        url: "https://en.wikipedia.org/wiki/SOLID"
      }
    ]
  },

  experience: [
    {
      title: "Gestor Documental MINEDUC",
      period: "2024",
      description: "Sistema de gestión documental empresarial para administración de archivos y trámites. Proyecto de graduación que implementa arquitectura escalable con separación clara de responsabilidades.",
      technologies: ["Next.js", "Node.js", "PostgreSQL", "TypeScript", "Docker"],
      image: getImage("/gestorDocumental.PNG"),
      highlights: [
        "Gestión completa de documentos y archivos",
        "Sistema de permisos y roles granular",
        "Búsqueda avanzada y versionado de documentos",
        "Generación de reportes automatizados"
      ],
      links: {
        demo: "https://gestor-documental-mineduc.vercel.app",
        github: "https://github.com/Eleramirezl9/gestor-documental-mineduc"
      }
    },
    {
      title: "Sistema E-Commerce CISNET",
      period: "2024",
      description: "Plataforma de venta online con carrito de compras, gestión de inventario y procesamiento de pagos. Arquitectura modular con Clean Architecture.",
      technologies: ["Next.js 14", "Node.js", "PostgreSQL", "Stripe", "Redis"],
      image: getImage("/TiendaIma.PNG"),
      highlights: [
        "Carrito de compras en tiempo real",
        "Sistema de pagos integrado (Stripe)",
        "Panel administrativo con análisis",
        "Optimización para múltiples usuarios concurrentes"
      ],
      links: {
        demo: "https://venta-de-software.vercel.app/",
        github: "https://github.com/Eleramirezl9/CISNET-Tienda-"
      }
    },
    {
      title: "ERP Multi-Sucursal Empresarial",
      period: "Diciembre 2023 - Presente",
      description: "Sistema ERP completo para administración empresarial con múltiples módulos. Implementa arquitectura hexagonal con dominio bien modelado y testing robusto.",
      technologies: ["Next.js", "Node.js", "React", "PostgreSQL", "Docker"],
      image: getImage("/ERPimagen.PNG"),
      highlights: [
        "Módulos de contabilidad, inventario y facturación",
        "Generación de reportes PDF y Excel en tiempo real",
        "Testing completo con alta cobertura de código",
        "Dashboard con análisis de ventas y métricas"
      ],
      links: {
        demo: "https://crm-multi-sucursal.vercel.app/iniciar-sesion",
        github: "https://github.com/Eleramirezl9/CRM"
      }
    }
  ],

  achievements: [
    {
      title: "Optimización de Procesos",
      description: "Implementación de arquitecturas limpias que mejoraron mantenibilidad en 60%"
    },
    {
      title: "Cultura de Calidad",
      description: "Introducción de TDD aumentando calidad del código y reduciendo bugs en 40%"
    },
    {
      title: "Innovación con IA",
      description: "Integración de asistentes de IA en flujo de desarrollo para acelerar tareas"
    },
    {
      title: "Escalabilidad",
      description: "Diseño de sistemas pensando en escalabilidad futura y crecimiento modular"
    }
  ],

  languages: [
    {
      name: "Español",
      level: "Nativo"
    },
    {
      name: "Inglés",
      level: "Intermedio-Avanzado",
      note: "Lectura de documentación técnica, comunicación escrita"
    }
  ],

  philosophy: "Creo en construir software que no solo funcione, sino que sea mantenible, escalable y agradable de trabajar. Combino principios de ingeniería de software probados con herramientas modernas, siempre buscando el balance perfecto entre calidad y velocidad de desarrollo.",

  availability: {
    status: "Disponible",
    type: "Remoto o presencial en Ciudad de Guatemala",
    position: "Junior Developer - Frontend & Backend"
  }
};

// Exportar secciones individuales para reutilización
export const { name, email, phone, social, skills, experience, achievements, languages, availability, bio, title, subtitle, location, university, degree, degreeStatus, philosophy } = personalData;

// Exportar helper para uso externo
export { getImage, images };
