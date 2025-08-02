import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Header
      'app.title': 'Easy Onboard',
      'header.admin': 'Admin',
      'header.userView': 'User View',
      'header.logout': 'Logout',
      
      // Home Page
      'home.welcome': 'Welcome to',
      'home.subtitle': 'Your onboarding journey starts here',
      'home.getStarted': 'Get Started',
      'home.continue': 'Continue Where You Left Off',
      'home.progress': 'Progress: {{completed}} of {{total}} topics completed',
      'home.noTopics': 'No onboarding content available. Please contact your administrator.',
      'home.features.title': 'What You\'ll Learn',
      'home.features.tracking': 'Progress Tracking',
      'home.features.trackingDesc': 'Track your completion status across all topics',
      'home.features.content': 'Rich Content',
      'home.features.contentDesc': 'Interactive markdown content with code examples',
      'home.features.pace': 'Your Own Pace',
      'home.features.paceDesc': 'Complete topics at your own speed and schedule',
      
      // Onboarding Flow
      'onboarding.step': 'Step {{current}} of {{total}}',
      'onboarding.completed': 'Completed',
      'onboarding.inProgress': 'In Progress',
      'onboarding.previous': 'Previous',
      'onboarding.next': 'Next',
      'onboarding.complete': 'Complete Onboarding!',
      'onboarding.backToHome': 'Back to Home',
      
      // Admin
      'admin.login.title': 'Admin Login',
      'admin.login.username': 'Username',
      'admin.login.password': 'Password',
      'admin.login.button': 'Login',
      'admin.login.cancel': 'Cancel',
      'admin.upload.title': 'Upload Content',
      'admin.upload.dragDrop': 'Drag and drop markdown files here, or click to browse',
      'admin.topics': 'Topics',
      'admin.preview': 'Preview',
      
      // Languages
      'language.english': 'English',
      'language.spanish': 'Español',
      
      // Common
      'common.loading': 'Loading...',
    }
  },
  es: {
    translation: {
      // Header
      'app.title': 'Easy Onboard',
      'header.admin': 'Admin',
      'header.userView': 'Vista Usuario',
      'header.logout': 'Cerrar Sesión',
      
      // Home Page
      'home.welcome': 'Bienvenido a',
      'home.subtitle': 'Tu proceso de incorporación comienza aquí',
      'home.getStarted': 'Comenzar',
      'home.continue': 'Continuar Donde Lo Dejaste',
      'home.progress': 'Progreso: {{completed}} de {{total}} temas completados',
      'home.noTopics': 'No hay contenido de incorporación disponible. Por favor contacta a tu administrador.',
      'home.features.title': 'Lo Que Aprenderás',
      'home.features.tracking': 'Seguimiento de Progreso',
      'home.features.trackingDesc': 'Rastrea tu estado de finalización en todos los temas',
      'home.features.content': 'Contenido Rico',
      'home.features.contentDesc': 'Contenido markdown interactivo con ejemplos de código',
      'home.features.pace': 'A Tu Ritmo',
      'home.features.paceDesc': 'Completa los temas a tu velocidad y horario',
      
      // Onboarding Flow
      'onboarding.step': 'Paso {{current}} de {{total}}',
      'onboarding.completed': 'Completado',
      'onboarding.inProgress': 'En Progreso',
      'onboarding.previous': 'Anterior',
      'onboarding.next': 'Siguiente',
      'onboarding.complete': '¡Completar Incorporación!',
      'onboarding.backToHome': 'Volver al Inicio',
      
      // Admin
      'admin.login.title': 'Acceso Admin',
      'admin.login.username': 'Usuario',
      'admin.login.password': 'Contraseña',
      'admin.login.button': 'Iniciar Sesión',
      'admin.login.cancel': 'Cancelar',
      'admin.upload.title': 'Subir Contenido',
      'admin.upload.dragDrop': 'Arrastra y suelta archivos markdown aquí, o haz clic para navegar',
      'admin.topics': 'Temas',
      'admin.preview': 'Vista Previa',
      
      // Languages
      'language.english': 'English',
      'language.spanish': 'Español',
      
      // Common
      'common.loading': 'Cargando...',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
