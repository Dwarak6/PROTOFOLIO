/**
 * Portfolio Interactive Scripts
 * Controls navigation, smooth scrolling, filtering, modals, counters & form submission
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initProjectFiltering();
  initProjectModals();
  initContactForm();
  initMetricCounters();
});

/* Navigation & Header Scroll State */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      navToggle.innerHTML = isOpen ? '✕' : '☰';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        navToggle.innerHTML = '☰';
      });
    });
  }

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 120;
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/* Projects Category Filtering */
function initProjectFiltering() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterTabs.length || !projectCards.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* Project Detail Modal Data (Tailored to Dwarak's Data Analytics Profile) */
const projectData = {
  ecommerce: {
    title: 'E-Commerce Retail Sales Analytics & Customer Segmentation',
    category: 'Python, Pandas & SQL',
    description: 'An end-to-end data analysis project exploring real-world transaction patterns. Preprocessed and transformed raw sales logs to discover high-value purchase trends, inventory bottlenecks, and seasonal spikes.',
    metrics: '📊 100K+ transaction records • RFM Customer Scoring • Revenue seasonality breakdown',
    architecture: 'Cleaned and structured messy transactional data using Pandas. Ran relational SQL queries with aggregations and window functions to compute customer retention cohorts and average order values (AOV).',
    tech: ['Python', 'Pandas', 'SQL', 'Matplotlib', 'Seaborn', 'Jupyter Notebook'],
    code: 'https://github.com/Dwarak6/ecommerce-retail-analytics'
  },
  powerbi: {
    title: 'Executive Sales & Operations KPI Dashboard',
    category: 'Power BI, DAX & Advanced Excel',
    description: 'A multi-page business intelligence dashboard delivering clear visibility into sales conversion funnels, profit margins, and regional sales distribution with interactive slicers.',
    metrics: '📈 10+ Custom DAX KPIs • Dynamic drilldown by category • 100% automated data refresh',
    architecture: 'Modeled star-schema data tables in Power BI. Authored custom DAX calculations for Year-Over-Year (YoY) growth, customer churn rates, and cumulative sales velocities.',
    tech: ['Power BI', 'DAX Measures', 'Advanced Excel', 'Power Query', 'Data Modeling'],
    code: 'https://github.com/Dwarak6'
  },
  fakenews: {
    title: 'NLP Misinformation & Content Credibility Detector',
    category: 'Python, NLP & Machine Learning',
    description: 'A machine learning and NLP application that analyzes news headlines and claims to produce an instant, evidence-backed credibility score.',
    metrics: '⚡ 94%+ classification precision • Deployed live web interface',
    architecture: 'Extracted semantic and linguistic features from news corpora. Trained and benchmarked classification models using Scikit-Learn, Pandas, and deployed via Streamlit.',
    tech: ['Python', 'Pandas', 'Scikit-Learn', 'NLP', 'Streamlit', 'Data Preprocessing'],
    code: 'https://github.com/Dwarak6/fake-news-detector'
  },
  musi: {
    title: 'Musi River Digital Twin & Urban Spatial Analysis',
    category: 'Geospatial & Environmental Analytics',
    description: 'Environmental data modeling project mapping hydrological patterns and urban infrastructure sensors along the Musi river basin in Hyderabad.',
    metrics: '🌊 42 sensor telemetry points analyzed • Spatial correlation heatmaps',
    architecture: 'Processed geographic and temporal sensor readings with Python and Pandas to analyze seasonal drainage capacity and contamination risk indicators.',
    tech: ['Python', 'Pandas', 'Geospatial Data', 'Data Visualization', 'EDA'],
    code: 'https://github.com/Dwarak6/Musi-Digital-Twin'
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('projectModal');
  if (!modalOverlay) return;

  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalMetrics = document.getElementById('modalMetrics');
  const modalArchitecture = document.getElementById('modalArchitecture');
  const modalTechTags = document.getElementById('modalTechTags');
  const modalCodeBtn = document.getElementById('modalCodeBtn');
  const closeBtn = document.getElementById('modalCloseBtn');

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project');
      const data = projectData[projId];

      if (data) {
        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;
        modalMetrics.textContent = data.metrics;
        modalArchitecture.textContent = data.architecture;

        modalTechTags.innerHTML = '';
        data.tech.forEach(t => {
          const span = document.createElement('span');
          span.className = 'tech-tag';
          span.textContent = t;
          modalTechTags.appendChild(span);
        });

        modalCodeBtn.setAttribute('href', data.code);

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
  });
}

/* Interactive Contact Form */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<span>Sending Message...</span>';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      showToast('Thank you! Your message has been sent. I will get back to you promptly.');
    }, 800);
  });

  function showToast(message) {
    if (!toast) return;
    toast.querySelector('.toast-text').textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }
}

/* Metric Counter Animation */
function initMetricCounters() {
  const metrics = document.querySelectorAll('.metric-value');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        metrics.forEach(counter => {
          counter.style.transform = 'scale(1.08)';
          setTimeout(() => {
            counter.style.transform = 'scale(1)';
            counter.style.transition = 'transform 0.4s ease';
          }, 300);
        });
      }
    });
  }, { threshold: 0.5 });

  const metricsSection = document.querySelector('.metrics-section');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}
