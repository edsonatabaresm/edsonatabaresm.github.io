/**
 * MOTOR INTERACTIVO Y DINÁMICO - HOJA DE VIDA & PORTAFOLIO DE EDSON ANDRÉS
 * Funcionalidades:
 * 1. Pipeline de Arquitectura Interactivo ("Cómo integro soluciones")
 * 2. Modal de Ficha Técnica Detallada de cada Proyecto
 * 3. Filtrado de Proyectos por Área de Especialidad
 * 4. Buscador de Habilidades Técnicas en tiempo real
 * 5. Contador Dinámico de Métricas de Producción
 * 6. Edición y persistencia de datos de contacto
 * 7. Copiado rápido y notificaciones Toast
 * 8. Modo Oscuro / Claro y botón Scroll-to-Top
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initContactSystem();
  initPipelineSimulator();
  initProjectSystem();
  initSkillsSearch();
  initMetricsAnimation();
  initScrollTop();
  initPrintButton();
});

/* ==========================================================================
   1. GESTIÓN DEL TEMA (MODO OSCURO / CLARO)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('btn-theme-toggle');
  const savedTheme = localStorage.getItem('eatm_theme_mode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Por defecto, iniciamos con modo oscuro tecnológico si lo prefiere el sistema
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
   2. SIMULADOR DE PIPELINE INTERACTIVO ("Cómo integro soluciones en GELCO")
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
   3. BASE DE DATOS DE PROYECTOS & MODAL DE FICHA TÉCNICA DETALLADA
   ========================================================================== */
const PROJECTS_DB = {
  1: {
    title: 'Automatización de Solicitudes de Puntos de Reorden (SPR)',
    category: 'Automatización RPA & Integración ERP',
    status: 'En Producción Diaria (GELCO S.A.S.)',
    problem: 'Proceso semanal manual y crítico para identificar ítems con niveles bajos de inventario. Involucraba análisis en hojas de cálculo Excel, validación manual de mínimos y montaje manual de cada ítem en el ERP SIESA, consumiendo aproximadamente 3 horas semanales por parte del encargado.',
    solution: 'Automatización de extremo a extremo de la detección de ítems y generación de SPR en SIESA. La primera versión se implementó con Power Automate Desktop y evolucionó hacia una integración directa más robusta con Node-RED, endpoints, consumo de servicios SOAP, XML, SQL Server y Power BI.',
    participation: 'Responsabilidad integral: Levantamiento de requerimientos, diseño de flujogramas, definición y negociación de lógica de negocio, consultas SQL de extracción, desarrollo de endpoints y flujos Node-RED, generación de XML SOAP para SIESA, puesta en marcha y documentación técnica.',
    metrics: 'Reducción de tiempo de ~3 horas semanales a menos de 1 minuto 9 segundos por ejecución. Solicitudes generadas diariamente con 8–20+ ítems cada una. Monitoreo en Power BI con registro de más de 1.175 órdenes de compra generadas (127 aprobadas).',
    technologies: ['Node-RED', 'ERP SIESA', 'SOAP / XML', 'SQL Server', 'Power Automate Desktop', 'Power BI']
  },
  2: {
    title: 'Software de Programación y Gestión de Turnos de Planta (12h)',
    category: 'Desarrollo Full Stack & Integración de Hardware',
    status: 'En Producción (GELCO S.A.S.)',
    problem: 'La programación de colaboradores de planta en turnos rotativos de 12 horas se ejecutaba manualmente, complicando la verificación de rotaciones válidas, descansos y novedades.',
    solution: 'Desarrollo desde cero de una aplicación interna con frontend y backend propios. Incluye un algoritmo dinámico de asignación de rotaciones, módulo de gestión de novedades (incapacidades, vacaciones, cambios masivos) e integración para asignar turnos temporales en onboarding/offboarding.',
    participation: 'Desarrollo Full Stack completo: análisis de procesos, algoritmo de asignación de rotaciones, backend, frontend, base de datos e integración directa con el sistema de marcación facial HikCentral para auditar programación teórica vs. presencia física real.',
    metrics: 'Generación inmediata de la malla operativa de turnos sin errores humanos en secuencias de rotación, y auditoría en tiempo real de asistencia mediante biometría facial.',
    technologies: ['JavaScript', 'HTML5 / CSS3', 'Algoritmos de Rotación', 'API HikCentral (Biometría)', 'Backend & Base de Datos']
  },
  3: {
    title: 'Contabilización Automática de Facturas y Proveedores',
    category: 'Automatización RPA & Finanzas Corporativas',
    status: 'En Producción desde Marzo de 2026',
    problem: 'Proceso contable altamente manual y propenso a demoras para causar facturas de proveedores que involucraban múltiples variables: órdenes de compra, servicios, entradas de almacén, retenciones, impuestos, anticipos y diferentes tipos de contabilización.',
    solution: 'Diseño y desarrollo de la versión 2 del proceso. Se eliminó la dependencia de clics de escritorio migrando a una solución integrada con Node-RED, SOAP UI, Power Automate Web, consultas SQL estructuradas, SharePoint y ERP SIESA.',
    participation: 'Diseño de arquitectura, consultas de cruce SQL (entradas vs. órdenes vs. facturas), desarrollo de lógica de decisión contable en Node-RED, integración SOAP con SIESA, mantenimiento y soporte en producción.',
    metrics: '1.168 facturas contabilizadas automáticamente desde marzo de 2026. En un período de auditoría de 603 documentos, 538 fueron completamente exitosos (las 65 anulaciones correspondieron principalmente a pruebas de soporte controladas).',
    technologies: ['Node-RED', 'ERP SIESA', 'SOAP UI / XML', 'Power Automate Web', 'SQL Server', 'SharePoint']
  },
  4: {
    title: 'Automatización de Doble Digitación y Flujo de Requisiciones (RQC)',
    category: 'Integración de Sistemas & Eficiencia Operativa',
    status: 'En Producción Continua',
    problem: 'Doble digitación manual de solicitudes recibidas por correo para crear requisiciones en el ERP y registrarlas en GelcoInfo, demandando unas 2 horas diarias de trabajo operativo (40–50+ requisiciones diarias).',
    solution: 'Integración automatizada bidireccional entre SIESA y GelcoInfo utilizando Node-RED, SQL Server, Power Automate para aprobaciones y Power BI con reportes embebidos. Posteriormente se automatizó la salida y descuento de insumos con trazabilidad completa.',
    participation: 'Definición de lógica, integración mediante consultas SQL, procesamiento en Node-RED, reportes HTML embebidos en Power BI y adaptación de la solución a múltiples áreas operativas.',
    metrics: 'Atención continua de 40 a 50+ requisiciones diarias, mitigando aproximadamente 2 horas de labor manual al día. Cobertura en RQC, EPP para SST, paqueteo, empaques y PTAR.',
    technologies: ['SIESA ERP', 'GelcoInfo', 'Node-RED', 'SQL Server', 'Power Automate', 'Power BI']
  },
  5: {
    title: 'Facturación Automática de Máquina Vending de Colágeno',
    category: 'Desarrollo Frontend, APIs & Facturación Electrónica',
    status: 'En Producción',
    problem: 'Creación de un proceso nuevo para automatizar la facturación de dispensaciones físicas a colaboradores realizadas por una máquina vending.',
    solution: 'Integración con la API del proveedor de la máquina, desarrollo de una landing page HTML con almacenamiento temporal local en IndexedDB para verificación del usuario responsable, procesamiento en Node-RED, causación vía SOAP en SIESA y disparo de Facturación Electrónica Rebuilder con Power Automate Desktop.',
    participation: 'Diseño y desarrollo integral: consumo de API externa, interfaz HTML/IndexedDB, backend Node-RED, integración SOAP con ERP y automatización de la emisión electrónica.',
    metrics: 'Flujo 100% automatizado y trazable desde el botón de la máquina dispensadora hasta la emisión del documento fiscal y contable en el ERP.',
    technologies: ['Consumo de APIs REST', 'Frontend HTML / IndexedDB', 'Node-RED', 'ERP SIESA', 'SOAP', 'Power Automate Desktop']
  },
  6: {
    title: 'Gestor y Control de Entrega de Almuerzos',
    category: 'Backend, NoSQL & Reconocimiento Facial',
    status: 'En Producción',
    problem: 'Necesidad de automatizar y garantizar la trazabilidad en la entrega y conteo de almuerzos para el personal en sitio.',
    solution: 'Backend en Node-RED con base de datos NoSQL MongoDB (modelado de colecciones, registros, documentos JSON y vistas de consulta) conectado a la API de reconocimiento facial de HikCentral.',
    participation: 'Estructuración de datos en MongoDB (documentos, colecciones, vistas), desarrollo de endpoints y lógica en Node-RED e integración con las marcaciones faciales de HikCentral.',
    metrics: 'Control exacto y en tiempo real de colaboradores que recibieron el servicio, eliminando registros manuales en papel o planillas.',
    technologies: ['MongoDB (NoSQL / JSON)', 'Node-RED Backend', 'API HikCentral Facial', 'Modelado de Colecciones']
  }
};

function initProjectSystem() {
  // Filtros de categorías
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

  // Modal de Detalle de Proyecto
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
          tag.style.fontWeight = '600';
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
   4. BUSCADOR INTERACTIVO DE HABILIDADES EN TIEMPO REAL
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
   5. ANIMACIÓN Y CONTADOR DE MÉTRICAS AL HACER SCROLL
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
   6. SISTEMA DE CONTACTO RÁPIDO & EDICIÓN LOCAL PERSISTENTE
   ========================================================================== */
function initContactSystem() {
  // Cargar datos guardados previamente
  const saved = localStorage.getItem('eatm_user_contact');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      applyContactToDOM(data);
    } catch (e) {
      console.error(e);
    }
  }

  // Modal de edición
  const editBtn = document.getElementById('btn-open-contact-edit');
  const modal = document.getElementById('modal-edit-contact');
  const closeBtn = document.getElementById('btn-close-edit-modal');
  const cancelBtn = document.getElementById('btn-cancel-edit');
  const saveBtn = document.getElementById('btn-save-contact');
  const resetBtn = document.getElementById('btn-reset-contact');

  const inName = document.getElementById('in-name');
  const inEmail = document.getElementById('in-email');
  const inPhone = document.getElementById('in-phone');
  const inCity = document.getElementById('in-city');
  const inLinkedin = document.getElementById('in-linkedin');

  editBtn?.addEventListener('click', () => {
    if (inName) inName.value = document.getElementById('user-name')?.textContent.trim() || 'Edson Andrés';
    if (inEmail) inEmail.value = document.getElementById('user-email')?.textContent.trim() || '[CORREO]';
    if (inPhone) inPhone.value = document.getElementById('user-phone')?.textContent.trim() || '[TELÉFONO]';
    if (inCity) inCity.value = document.getElementById('user-city')?.textContent.trim() || 'Manizales, Caldas, Colombia';
    if (inLinkedin) inLinkedin.value = document.getElementById('user-linkedin')?.textContent.trim() || '[LINKEDIN]';
    modal?.classList.add('active');
  });

  const closeModal = () => modal?.classList.remove('active');
  closeBtn?.addEventListener('click', closeModal);
  cancelBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  saveBtn?.addEventListener('click', () => {
    const data = {
      name: inName?.value.trim() || 'Edson Andrés',
      email: inEmail?.value.trim() || '[CORREO]',
      phone: inPhone?.value.trim() || '[TELÉFONO]',
      city: inCity?.value.trim() || 'Manizales, Caldas, Colombia',
      linkedin: inLinkedin?.value.trim() || '[LINKEDIN]'
    };

    localStorage.setItem('eatm_user_contact', JSON.stringify(data));
    applyContactToDOM(data);
    closeModal();
    showToast('✅ Información de contacto actualizada con éxito');
  });

  resetBtn?.addEventListener('click', () => {
    localStorage.removeItem('eatm_user_contact');
    location.reload();
  });

  // Botones de copiado rápido
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
  if (data.name) {
    const el = document.getElementById('user-name');
    if (el) el.textContent = data.name;
    const navEl = document.getElementById('nav-user-name');
    if (navEl) navEl.textContent = data.name;
  }
  if (data.email) {
    const el = document.getElementById('user-email');
    if (el) el.textContent = data.email;
    const link = document.getElementById('user-email-link');
    if (link) link.href = `mailto:${data.email}`;
  }
  if (data.phone) {
    const el = document.getElementById('user-phone');
    if (el) el.textContent = data.phone;
  }
  if (data.city) {
    const el = document.getElementById('user-city');
    if (el) el.textContent = data.city;
  }
  if (data.linkedin) {
    const el = document.getElementById('user-linkedin');
    if (el) {
      el.textContent = data.linkedin;
      el.href = data.linkedin.startsWith('http') ? data.linkedin : `https://${data.linkedin}`;
    }
  }
}

/* ==========================================================================
   7. BOTÓN FLOTANTE SCROLL-TO-TOP & IMPRESIÓN
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
      // Aseguramos que se muestren todos los proyectos antes de imprimir
      const allPill = document.querySelector('.filter-pill[data-filter="all"]');
      if (allPill) allPill.click();
      window.print();
    });
  });
}

/* ==========================================================================
   8. NOTIFICACIÓN TOAST FLOTANTE
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
