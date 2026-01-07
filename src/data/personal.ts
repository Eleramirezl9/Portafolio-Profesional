/**
 * DATOS PERSONALES - Exportados con tipos TypeScript
 * 
 * Importa el JSON y lo tipifica según PersonalData interface
 * Centraliza todo el contenido del portafolio
 */

import { type PersonalData } from './types';

// Importar datos JSON
import personalDataRaw from './personal.json';

// Tipar los datos
const personalData: PersonalData = personalDataRaw as PersonalData;

export default personalData;

// Exportar secciones individuales para reutilización
export const { name, email, phone, social, skills, experience, achievements, languages, availability, bio, title, subtitle, location, university, degree, degreeStatus, philosophy } = personalData;
