/**
 * MOTOR INTERACTIVO Y ATS DUAL - HOJA DE VIDA & PORTAFOLIO DE EDSON ANDRÉS
 * 
 * Funcionalidades Duales:
 * 1. Conmutador de Pestañas: "Portafolio Interactivo (Personas)" vs "Estructura ATS / IA (Parsers)"
 * 2. Pipeline de Arquitectura Interactivo ("Cómo integro soluciones en GELCO")
 * 3. Modal de Ficha Técnica Detallada de cada Proyecto
 * 4. Filtrado de Proyectos por Área de Especialidad
 * 5. Buscador de Habilidades Técnicas en tiempo real
 * 6. Animación de Métricas de Producción
 * 7. Edición y persistencia de datos de contacto (actualiza ambas vistas en tiempo real)
 * 8. Copiado rápido y notificaciones Toast
 * 9. Modo Oscuro / Claro sin pérdida de contraste
 * 10. Generador y Descarga de Currículum en Texto Plano Estándar ATS (.TXT)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initViewTabs();
  initContactSystem();
  initPipelineSimulator();
  initProjectSystem();
  initSkillsSearch();
  initMetricsAnimation();
  initScrollTop();
  initPrintButton();
  initAtsTextModal();
});

/* ==========================================================================
   1. GESTIÓN DEL TEMA (MODO OSCURO / CLARO NORMALIZADO)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('btn-theme-toggle');
  const savedTheme = localStorage.getItem('eatm_theme_mode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-theme');
    updateThemeIcon(true);
  } else {
    document.body.classList.remove('dark-theme');
    updateThemeIcon(false);
  }

  toggleBtn?.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('eatm_theme_mode', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
    showToast(isDark ? '🌙 Modo Oscuro Activado' : '☀️ Modo Claro Activado');
  });
}

function updateThemeIcon(isDark) {
  const toggleBtn = document.getElementById('btn-theme-toggle');
  if (toggleBtn) {
    toggleBtn.innerHTML = isDark
      ? '<span class="icon">☀️</span>'
      : '<span class="icon">🌙</span>';
    toggleBtn.setAttribute('title', isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro');
  }
}

/* ==========================================================================
   2. CONMUTADOR DE VISTAS DUALES: "INTERACTIVO" VS "ESTRUCTURA ATS"
   ========================================================================== */
function initViewTabs() {
  const tabBtnInteractive = document.getElementById('tab-btn-interactive');
  const tabBtnAts = document.getElementById('tab-btn-ats');
  const viewInteractive = document.getElementById('view-interactive');
  const viewAts = document.getElementById('view-ats');

  if (!tabBtnInteractive || !tabBtnAts || !viewInteractive || !viewAts) return;

  function switchTab(target) {
    if (target === 'ats') {
      tabBtnAts.classList.add('active');
      tabBtnInteractive.classList.remove('active');
      viewAts.style.display = 'block';
      viewInteractive.style.display = 'none';
      localStorage.setItem('eatm_active_tab', 'ats');
      showToast('🤖 Vista ATS / IA Activada (Estructura Canónica)');
    } else {
      tabBtnInteractive.classList.add('active');
      tabBtnAts.classList.remove('active');
      viewInteractive.style.display = 'block';
      viewAts.style.display = 'none';
      localStorage.setItem('eatm_active_tab', 'interactive');
      showToast('👤 Portafolio Interactivo Activado');
    }
  }

  tabBtnInteractive.addEventListener('click', () => switchTab('interactive'));
  tabBtnAts.addEventListener('click', () => switchTab('ats'));

  // Acciones rápidas que conducen a la vista ATS
  document.querySelectorAll('.trigger-ats-view').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab('ats');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Restaurar vista previa
  const savedTab = localStorage.getItem('eatm_active_tab');
  if (savedTab === 'ats') {
    switchTab('ats');
  }
}

/* ==========================================================================
   3. GENERADOR DE TEXTO PLANO ATS (Para copiar en portales de empleo)
   ========================================================================== */
function generatePlainTextResume() {
  const name = document.getElementById('user-name')?.textContent.trim() || 'EDSON ANDRÉS';
  const email = document.getElementById('user-email')?.textContent.trim() || '[CORREO]';
  const phone = document.getElementById('user-phone')?.textContent.trim() || '[TELÉFONO]';
  const city = document.getElementById('user-city')?.textContent.trim() || 'Manizales, Caldas, Colombia';
  const linkedin = document.getElementById('user-linkedin')?.textContent.trim() || '[LINKEDIN]';

  return `================================================================================
${name.toUpperCase()}
Auxiliar de Tecnología | Desarrollo de soluciones empresariales | Automatización de procesos | Integración de sistemas y APIs | Node-RED · Power Automate · JavaScript
Ubicación: ${city} | Correo: ${email} | Teléfono: ${phone} | LinkedIn: ${linkedin}
================================================================================

PERFIL PROFESIONAL
Auxiliar de Tecnología con experiencia práctica en el desarrollo de soluciones empresariales, automatización de procesos e integración de sistemas, participando en proyectos orientados a transformar procesos manuales en soluciones digitales más eficientes y trazables. Mi experiencia se ha desarrollado principalmente en GELCO / Productora de Gelatina S.A.S., evolucionando desde soporte tecnológico hacia el desarrollo e implementación de soluciones que conectan sistemas empresariales, aplicaciones internas, APIs, bases de datos y herramientas de automatización. He trabajado con Node-RED, Power Automate (Desktop y Cloud), APIs REST y SOAP, JavaScript, HTML, CSS, MongoDB, SQL Server, SharePoint, Power BI y SIESA ERP. Estudiante activo de Ingeniería Informática en la Universidad de Caldas.

EXPERIENCIA LABORAL
--------------------------------------------------------------------------------
EMPRESA: GELCO / Productora de Gelatina S.A.S. (Manizales, Caldas, Colombia)
CARGO: Auxiliar de Tecnología (Jornada completa, Presencial)
PERIODO: 25 de julio de 2024 – Actualidad (Activo)
Trayectoria: Práctica profesional (6 meses) -> Bolsa de empleo (~1 año) -> Contratación directa desde febrero de 2026.

Responsabilidades y Logros Clave:
* Desarrollo e implementación de soluciones para digitalizar y automatizar procesos empresariales, utilizando Node-RED, Power Automate y Power Automate Desktop.
* Integración de sistemas mediante APIs REST y SOAP, JSON, XML, autenticación, webhooks y endpoints, conectando ERP SIESA, aplicaciones internas, bases de datos y servicios externos.
* Desarrollo de aplicaciones y componentes web utilizando JavaScript, HTML y CSS, junto con integración de lógica de negocio y servicios backend.
* Consulta y procesamiento de información mediante MongoDB (NoSQL), SQL Server y SQL, además de construcción de componentes de Power BI para análisis, trazabilidad y apoyo a procesos operativos.
* Implementación y mantenimiento de soluciones en producción, realizando ajustes, soporte, validación funcional y evolución continua según el negocio.
* Administración de usuarios y permisos en SIESA y aplicaciones internas, soporte técnico (N1, N2, N3), Active Directory, Microsoft 365 y componentes básicos de redes.

PROYECTOS DESTACADOS EN PRODUCCIÓN
--------------------------------------------------------------------------------
1. Automatización de Procesos de Inventario y Abastecimiento (Puntos de Reorden — ERP SIESA)
   * En producción: 21 de julio de 2025.
   * Problema: Proceso semanal manual de revisión de inventario mediante Excel y digitación individual en el ERP (~3 horas semanales).
   * Solución: V1 en Power Automate Desktop evolucionada a V2 directa en Node-RED con endpoints, consumo de servicios SOAP de SIESA, inyección de XML, SQL Server y Power BI.
   * Resultado: Reducción del tiempo de ~3 horas semanales a menos de 1 minuto 9 segundos por ejecución diaria (7:00 a. m.). 1.175 documentos generados trazados en Power BI.

2. Sistema de Programación y Gestión de Turnos (Turnia Operarios — 12 Horas)
   * En producción: 27 de septiembre de 2025.
   * Solución: Desarrollo integral desde cero (frontend, backend y algoritmos de rotación) para turnos de 12 horas, gestión de novedades e integración con API HikCentral de reconocimiento facial.
   * Resultado: Cobertura de ~143 colaboradores en 11 áreas con ~22 usuarios directos y contraste en tiempo real de presencia física vs. programación teórica.

3. Automatización de Contabilización de Documentos (Facturas de Proveedores — ERP SIESA)
   * En producción: Marzo de 2026.
   * Solución: V2 en Node-RED que cruza entradas de almacén, órdenes de compra y facturas con validación de reglas contables e impuestos en SIESA, apoyando la factura electrónica.
   * Resultado: 1.168 documentos procesados (FDP, FIA, FIA Anticipo, FDS, FAC). Auditoría de 603 documentos con 538 completamente exitosos.

4. Integración de Solicitudes y Trazabilidad Operativa (RQC / GelcoInfo)
   * Solución: Integración bidireccional entre SIESA y aplicación interna para procesar requisiciones de almacén y salidas de insumos (PTAR, SST, paqueteo, mezclas) con flujo de aprobaciones y reportes embebidos.
   * Resultado: Procesamiento fluido de 40 a 50+ solicitudes diarias con trazabilidad completa, mitigando ~2 horas diarias de trabajo operativo manual.

5. Integración y Automatización del Proceso de Facturación (Máquina Vending de Colágeno)
   * En producción: 27 de mayo de 2026 – 22 de septiembre de 2026.
   * Solución: Conexión API dispensadora -> interfaz web con IndexedDB -> Node-RED -> SOAP SIESA -> causación y facturación electrónica con Power Automate Desktop.
   * Resultado: 835 documentos FVP generados e integrados al flujo de facturación electrónica.

6. Sistema de Gestión y Trazabilidad de Entrega de Almuerzos (Gestor de Almuerzos)
   * Solución: Backend en Node-RED con almacenamiento en MongoDB NoSQL (colecciones y vistas JSON) conectado a la API de reconocimiento facial de HikCentral.
   * Resultado: Cobertura de ~266 colaboradores activos y 90–100 usos diarios de lunes a viernes, garantizando control exacto sin registros manuales en papel.

COMPETENCIAS TÉCNICAS
--------------------------------------------------------------------------------
* Automatización y RPA (Avanzado): Node-RED, Microsoft Power Automate, Power Automate Desktop, APIs REST, Flujos Transaccionales, n8n.
* Integraciones y APIs (Intermedio): SIESA ERP, Servicios Web SOAP, SOAP UI, Esquemas XML, JSON, Endpoints HTTP, Webhooks, API HikCentral.
* Desarrollo Web y Backend (Intermedio): JavaScript (ES6+), HTML5, CSS3, IndexedDB, Lógica de Negocio, Algoritmos de Rotación, SharePoint.
* Bases de Datos y Analítica BI: MongoDB NoSQL (Colecciones y Vistas JSON), SQL Server, MySQL, Consultas SQL, Microsoft Power BI.
* Soporte e Infraestructura Complementaria: Active Directory, Microsoft 365, Soporte N1/N2/N3, Redes y Conectividad básica.

EDUCACIÓN FORMAL
--------------------------------------------------------------------------------
* Ingeniería Informática — Universidad de Caldas (1.º semestre — En curso, Inicio: 2026)
* Tecnología en Análisis y Programación de Sistemas de Información — Universidad Autónoma de Manizales (Graduado, 2024–2025 | Promedio: 4.47)
* Técnico Profesional en Programación de Computadores — Universidad Autónoma de Manizales (Graduado, 2023–2024 | Promedio: 4.68)
* Técnico Laboral Auxiliar en Sistemas Informáticos — Universidad Autónoma de Manizales (Graduado, 2022 | Promedio: 4.44)
* Bachiller Técnico con Especialidad en Sistemas y Computación — Instituto Técnico Francisco José de Caldas (Graduado, 2012–2023)
* Certificado de Inglés Nivel A2 — Instituto de Idiomas, Universidad Autónoma de Manizales (Inglés I - IV Acreditados | Español Nativo)
================================================================================`;
}

function initAtsTextModal() {
  const openBtn = document.getElementById('btn-open-ats-text');
  const modal = document.getElementById('modal-ats-text');
  const closeBtn = document.getElementById('btn-close-ats-text');
  const copyBtn = document.getElementById('btn-copy-ats-text');
  const downloadBtn = document.getElementById('btn-download-ats-txt');
  const textPreviewEl = document.getElementById('ats-text-preview');

  openBtn?.addEventListener('click', () => {
    const plainText = generatePlainTextResume();
    if (textPreviewEl) textPreviewEl.textContent = plainText;
    modal?.classList.add('active');
  });

  const closeModal = () => modal?.classList.remove('active');
  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  copyBtn?.addEventListener('click', () => {
    const text = generatePlainTextResume();
    navigator.clipboard.writeText(text).then(() => {
      showToast('📋 Currículum ATS copiado al portapapeles');
    }).catch(() => {
      showToast('Error al copiar texto');
    });
  });

  downloadBtn?.addEventListener('click', () => {
    const text = generatePlainTextResume();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CV_Edson_Andres_ATS.txt';
    a.click();
    URL.revokeObjectURL(url);
    showToast('💾 Archivo CV_Edson_Andres_ATS.txt descargado');
  });
}

/* ==========================================================================
   4. SIMULADOR DE PIPELINE INTERACTIVO ("Cómo integro soluciones en GELCO")
   ========================================================================== */
const PIPELINE_DATA = {
  1: {
    title: 'Paso 1: Diagnóstico Operativo & Toma de Requerimientos',
    desc: 'Análisis directo en planta con usuarios clave. Mapeo del proceso manual, reglas de validación y detección de cuellos de botella.',
    tech: 'Flujogramas, Definición de Lógica de Negocio, Negociación de reglas con el usuario',
    projects: 'Aplicado en: Puntos de Reorden, Doble digitación RQC, Turnos de planta'
  },
  2: {
    title: 'Paso 2: Frontend & Captura Ligera de Datos',
    desc: 'Desarrollo de interfaces accesibles para consulta y validación rápida con almacenamiento local desacoplado o consumo de hardware.',
    tech: 'HTML5, CSS3, JavaScript Vanilla, IndexedDB, APIs biométricas HikCentral',
    projects: 'Aplicado en: Máquina Vending de Colágeno, Software de Turnos, GelcoInfo'
  },
  3: {
    title: 'Paso 3: Orquestación Backend & Automatización RPA',
    desc: 'Construcción del motor de integración. Endpoints, transformaciones de estructuras de datos, generación de XML SOAP y reglas contables.',
    tech: 'Node-RED, Power Automate Desktop, Power Automate Cloud, Algoritmos en JavaScript',
    projects: 'Aplicado en: Contabilización de Facturas, Puntos de Reorden, Almuerzos'
  },
  4: {
    title: 'Paso 4: Conexión con Sistemas Centrales & ERP',
    desc: 'Inyección y extracción de información transaccional segura en el ERP corporativo y bases de datos relacionales y documentales.',
    tech: 'ERP SIESA, Servicios SOAP, SOAP UI, SQL Server, MySQL, MongoDB NoSQL',
    projects: 'Aplicado en: Facturación Electrónica, Causación de Proveedores, Requisiciones'
  },
  5: {
    title: 'Paso 5: Monitoreo Operativo & Business Intelligence',
    desc: 'Cierre del ciclo con visibilidad en tiempo real para líderes de área. Paneles interactivos de auditoría y seguimiento del impacto.',
    tech: 'Power BI, Consultas SQL de extracción, Reportes embebidos, Métricas de producción',
    projects: 'Aplicado en: Control de Órdenes de Compra (1.175 reg.), Trazabilidad RQC'
  }
};

function initPipelineSimulator() {
  const nodes = document.querySelectorAll('.pipeline-node');
  const titleEl = document.getElementById('pipeline-step-title');
  const descEl = document.getElementById('pipeline-step-desc');
  const techEl = document.getElementById('pipeline-step-tech');
  const projEl = document.getElementById('pipeline-step-projects');

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const step = node.getAttribute('data-step');
      const data = PIPELINE_DATA[step];

      if (data && titleEl && descEl && techEl && projEl) {
        titleEl.textContent = data.title;
        descEl.textContent = data.desc;
        techEl.innerHTML = `<strong>Tecnologías Clave:</strong> ${data.tech}`;
        projEl.innerHTML = `<strong>Evidencia:</strong> ${data.projects}`;
      }
    });
  });
}

/* ==========================================================================
   5. BASE DE DATOS DE PROYECTOS & MODAL DE FICHA TÉCNICA DETALLADA
   ========================================================================== */
const PROJECTS_DB = {
  1: {
    title: 'Automatización de Procesos de Inventario y Abastecimiento',
    category: 'Automatización RPA & Integración ERP',
    status: 'En Producción desde el 21 de Julio de 2025',
    problem: 'Proceso semanal manual y crítico para identificar artículos con bajo nivel de inventario. Involucraba análisis en hojas de cálculo Excel, validación manual de mínimos y montaje manual de cada ítem en el ERP SIESA, consumiendo aproximadamente 3 horas semanales por parte del responsable.',
    solution: 'Automatización de extremo a extremo de la detección de artículos y generación de solicitudes de reorden en SIESA. V1 en Power Automate Desktop que evolucionó a V2 directa en Node-RED con endpoints, consumo de servicios SOAP, inyección de XML, SQL Server y Power BI.',
    participation: 'Responsabilidad integral: Levantamiento de requerimientos, diseño de flujogramas, definición y negociación de lógica de negocio, consultas SQL de extracción, desarrollo de endpoints y flujos Node-RED, generación de XML SOAP para SIESA, puesta en marcha y documentación técnica.',
    metrics: 'Reducción de ~3 horas semanales a menos de 1 minuto 9 segundos por ciclo. Ejecución diaria a las 7:00 a. m. con 1.175 documentos generados registrados y auditados en Power BI.',
    technologies: ['Node-RED', 'ERP SIESA', 'SOAP / XML', 'SQL Server', 'Power Automate Desktop', 'Power BI']
  },
  2: {
    title: 'Sistema de Programación y Gestión de Turnos',
    category: 'Desarrollo Web & Integración de Hardware',
    status: 'En Producción desde el 27 de Septiembre de 2025',
    problem: 'La programación de colaboradores de planta en turnos rotativos de 12 horas se realizaba manualmente, dificultando la verificación de secuencias de rotación válidas, descansos y novedades.',
    solution: 'Desarrollo desde cero de una aplicación interna con frontend y backend propios. Incluye un algoritmo dinámico de rotaciones de 12 horas, módulo de novedades (vacaciones, incapacidades, cambios masivos) e integración con la API de marcación facial de HikCentral.',
    participation: 'Desarrollo Full Stack completo: análisis de procesos, algoritmo de asignación de rotaciones, backend, frontend, base de datos e integración con el sistema biométrico de HikCentral para contrastar programación teórica vs. presencia física real.',
    metrics: 'Malla operativa para ~143 colaboradores en 11 áreas con ~22 usuarios directos y ~10 supervisores. Generación estructurada de turnos y auditoría de asistencia en tiempo real.',
    technologies: ['JavaScript', 'HTML5 / CSS3', 'Algoritmos de Rotación', 'API HikCentral (Biometría)', 'Backend']
  },
  3: {
    title: 'Automatización de Contabilización de Documentos',
    category: 'Automatización RPA & Finanzas Corporativas',
    status: 'En Producción desde Marzo de 2026',
    problem: 'Proceso contable altamente manual para causar facturas de proveedores que involucraban múltiples variables: órdenes de compra, servicios, entradas de almacén, retenciones, impuestos, anticipos y diferentes tipos de contabilización.',
    solution: 'Versión 2 desarrollada principalmente por el usuario en Node-RED, SOAP UI, Power Automate Web, consultas SQL estructuradas, SharePoint y ERP SIESA. Cruce de entradas de almacén, órdenes de compra y facturas con validación contable e integración con el proceso de aprobación de factura electrónica.',
    participation: 'Diseño de arquitectura, consultas de cruce SQL (entradas vs. órdenes vs. facturas), desarrollo de lógica contable en Node-RED, integración SOAP con SIESA, mantenimiento y soporte en producción.',
    metrics: '1.168 documentos procesados desde marzo de 2026 (FDP, FIA, FIA Anticipo, FDS, FAC). En un período de auditoría de 603 documentos, 538 fueron completamente exitosos (las 65 anulaciones correspondieron a pruebas y soporte).',
    technologies: ['Node-RED', 'ERP SIESA', 'SOAP UI / XML', 'Power Automate', 'SQL Server', 'SharePoint']
  },
  4: {
    title: 'Integración de Solicitudes y Trazabilidad Operativa',
    category: 'Integración de Sistemas & Eficiencia Operativa',
    status: 'En Producción Continua',
    problem: 'Doble digitación manual de solicitudes recibidas por correo para crear requisiciones en el ERP y registrarlas en GelcoInfo, demandando unas 2 horas diarias de trabajo operativo (40–50 solicitudes diarias).',
    solution: 'Integración bidireccional entre SIESA y GelcoInfo utilizando Node-RED, SQL Server, Power Automate para aprobaciones y Power BI con reportes embebidos. Conecta solicitudes de almacén y salidas de insumos (PTAR, SST, paqueteo, mezclas) con trazabilidad completa.',
    participation: 'Definición de lógica de negocio, integración mediante consultas SQL, procesamiento en Node-RED, reportes HTML embebidos en Power BI y adaptación de la solución a múltiples áreas operativas.',
    metrics: 'Atención continua de 40 a 50+ solicitudes diarias con trazabilidad total, mitigando aproximadamente 2 horas de labor manual al día.',
    technologies: ['SIESA ERP', 'GelcoInfo', 'Node-RED', 'SQL Server', 'Power Automate', 'Power BI']
  },
  5: {
    title: 'Integración y Automatización del Proceso de Facturación',
    category: 'Desarrollo Frontend, APIs & Facturación Electrónica',
    status: 'En Producción desde Mayo de 2026',
    problem: 'Automatización de la facturación y causación fiscal por dispensaciones físicas realizadas por una máquina vending a colaboradores.',
    solution: 'Integración con la API del proveedor de la máquina, desarrollo de aplicación web con IndexedDB para verificación de entregas, procesamiento en Node-RED, causación vía SOAP en SIESA y emisión de Facturación Electrónica con Power Automate Desktop.',
    participation: 'Diseño y desarrollo integral: consumo de API externa, interfaz HTML/IndexedDB, backend Node-RED, integración SOAP con ERP y automatización de la emisión electrónica.',
    metrics: '835 documentos FVP generados e integrados al flujo de facturación electrónica (27 de mayo a 22 de septiembre de 2026).',
    technologies: ['Consumo de APIs REST', 'IndexedDB', 'Node-RED', 'ERP SIESA', 'SOAP', 'Power Automate Desktop']
  },
  6: {
    title: 'Sistema de Gestión y Trazabilidad de Entrega de Almuerzos',
    category: 'Backend, NoSQL & Reconocimiento Facial',
    status: 'En Producción Continua',
    problem: 'Garantizar el control exacto y la trazabilidad en la entrega y conteo de almuerzos para el personal en planta.',
    solution: 'Backend en Node-RED con base de datos NoSQL MongoDB (modelado de colecciones, registros, documentos JSON y vistas de consulta) conectado a la API de reconocimiento facial de HikCentral.',
    participation: 'Proyecto conjunto: Responsable de la lógica de negocio, backend en Node-RED, estructuración de MongoDB (documentos, colecciones, vistas) e integración con la marcación facial de HikCentral.',
    metrics: 'Cobertura de ~266 colaboradores activos y 90–100 usos diarios de lunes a viernes, eliminando planillas manuales en papel y registrando asistencia fidedigna.',
    technologies: ['MongoDB (NoSQL / JSON)', 'Node-RED Backend', 'API HikCentral Facial', 'Modelado de Colecciones']
  }
};

function initProjectSystem() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.project-card-interactive');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  const modal = document.getElementById('modal-project-spec');
  const closeModalBtn = document.getElementById('btn-close-project-modal');
  const openModalBtns = document.querySelectorAll('.btn-open-modal');

  const titleEl = document.getElementById('modal-proj-title');
  const statusEl = document.getElementById('modal-proj-status');
  const problemEl = document.getElementById('modal-proj-problem');
  const solutionEl = document.getElementById('modal-proj-solution');
  const roleEl = document.getElementById('modal-proj-role');
  const metricsEl = document.getElementById('modal-proj-metrics');
  const techContainer = document.getElementById('modal-proj-techs');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project-id');
      const data = PROJECTS_DB[projId];

      if (!data) return;

      if (titleEl) titleEl.textContent = data.title;
      if (statusEl) statusEl.textContent = data.status;
      if (problemEl) problemEl.textContent = data.problem;
      if (solutionEl) solutionEl.textContent = data.solution;
      if (roleEl) roleEl.textContent = data.participation;
      if (metricsEl) metricsEl.textContent = data.metrics;

      if (techContainer) {
        techContainer.innerHTML = '';
        data.technologies.forEach(tech => {
          const tag = document.createElement('span');
          tag.className = 'p-tag';
          tag.style.fontWeight = '700';
          tag.textContent = tech;
          techContainer.appendChild(tag);
        });
      }

      modal?.classList.add('active');
    });
  });

  closeModalBtn?.addEventListener('click', () => modal?.classList.remove('active'));
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

/* ==========================================================================
   6. BUSCADOR INTERACTIVO DE HABILIDADES EN TIEMPO REAL
   ========================================================================== */
function initSkillsSearch() {
  const searchInput = document.getElementById('input-skill-search');
  const skillEntries = document.querySelectorAll('.skill-entry');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    skillEntries.forEach(entry => {
      const name = entry.querySelector('.skill-entry-name')?.textContent.toLowerCase() || '';
      if (!query) {
        entry.classList.remove('highlighted');
        entry.style.opacity = '1';
      } else if (name.includes(query)) {
        entry.classList.add('highlighted');
        entry.style.opacity = '1';
      } else {
        entry.classList.remove('highlighted');
        entry.style.opacity = '0.35';
      }
    });
  });
}

/* ==========================================================================
   7. ANIMACIÓN DE MÉTRICAS AL HACER SCROLL
   ========================================================================== */
function initMetricsAnimation() {
  const metricBoxes = document.querySelectorAll('.metric-box');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    metricBoxes.forEach(box => {
      box.style.opacity = '0.7';
      box.style.transform = 'translateY(15px)';
      box.style.transition = 'all 0.5s ease-out';
      observer.observe(box);
    });
  }
}

/* ==========================================================================
   8. SISTEMA DE CONTACTO RÁPIDO (Actualiza ambas vistas en tiempo real)
   ========================================================================== */
function initContactSystem() {
  const saved = localStorage.getItem('eatm_user_contact');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      applyContactToDOM(data);
    } catch (e) {
      console.error(e);
    }
  }

  // Cargar datos persistidos si existen
  const savedContact = localStorage.getItem('eatm_user_contact');
  if (savedContact) {
    try {
      const data = JSON.parse(savedContact);
      applyContactToDOM(data);
    } catch (e) {
      console.warn('Error al cargar datos de contacto:', e);
    }
  }

  document.querySelectorAll('.copy-mini-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const el = document.getElementById(targetId);
      if (!el) return;

      const text = el.textContent.trim();
      navigator.clipboard.writeText(text).then(() => {
        showToast(`📋 Copiado al portapapeles: "${text}"`);
      }).catch(() => {
        showToast('Error al copiar texto');
      });
    });
  });
}

function applyContactToDOM(data) {
  // Vista Interactiva
  if (data.name) {
    const el = document.getElementById('user-name');
    if (el) el.textContent = data.name;
    const navEl = document.getElementById('nav-user-name');
    if (navEl) navEl.textContent = data.name;
    const atsName = document.getElementById('ats-doc-display-name');
    if (atsName) atsName.textContent = data.name;
  }
  if (data.email) {
    const el = document.getElementById('user-email');
    if (el) el.textContent = data.email;
    const link = document.getElementById('user-email-link');
    if (link) link.href = `mailto:${data.email}`;
    const atsEmail = document.getElementById('ats-doc-email');
    if (atsEmail) atsEmail.textContent = data.email;
  }
  if (data.phone) {
    const el = document.getElementById('user-phone');
    if (el) el.textContent = data.phone;
    const atsPhone = document.getElementById('ats-doc-phone');
    if (atsPhone) atsPhone.textContent = data.phone;
  }
  if (data.city) {
    const el = document.getElementById('user-city');
    if (el) el.textContent = data.city;
    const atsCity = document.getElementById('ats-doc-city');
    if (atsCity) atsCity.textContent = data.city;
  }
  if (data.linkedin) {
    const el = document.getElementById('user-linkedin');
    if (el) {
      el.textContent = data.linkedin;
      el.href = data.linkedin.startsWith('http') ? data.linkedin : `https://${data.linkedin}`;
    }
    const atsLinkedin = document.getElementById('ats-doc-linkedin');
    if (atsLinkedin) atsLinkedin.textContent = data.linkedin;
  }
}

/* ==========================================================================
   9. SCROLL-TO-TOP & IMPRESIÓN
   ========================================================================== */
function initScrollTop() {
  const btn = document.getElementById('btn-scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initPrintButton() {
  const printBtns = document.querySelectorAll('.action-print-cv');
  printBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  });
}

/* ==========================================================================
   10. NOTIFICACIÓN TOAST FLOTANTE
   ========================================================================== */
function showToast(message) {
  let toast = document.querySelector('.toast-bubble');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-bubble';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('visible');

  setTimeout(() => {
    toast.classList.remove('visible');
  }, 2700);
}
