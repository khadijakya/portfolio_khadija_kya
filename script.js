 // Professional Portfolio JavaScript - Sarah Kim
        // First-Year Information Engineering Student Portfolio
        // All functionalities implemented with modern JavaScript ES6+

        class PortfolioApp {
            constructor() {
                this.projects = [];
                this.githubUsername = 'facebook'; // Using Facebook for demo (public repos)
                this.init();
            }

            // Initialize all event listeners and functionalities
            init() {
                this.initNavigation();
                this.initSmoothScroll();
                this.initScrollAnimations();
                this.initProjectFiltering();
                this.initModal();
                this.initContactForm();
                this.initStatsAnimation();
                this.loadGitHubRepos();
                this.loadProjects();
                this.observeElements();
            }

            // Navigation functionality
            initNavigation() {
                const navToggle = document.getElementById('nav-toggle');
                const navMenu = document.getElementById('nav-menu');

                navToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                    navToggle.classList.toggle('active');
                });

                // Close mobile menu when clicking on a link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.addEventListener('click', () => {
                        navMenu.classList.remove('active');
                        navToggle.classList.remove('active');
                    });
                });
            }

            // Smooth scrolling and active nav highlighting
            initSmoothScroll() {
                document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                    anchor.addEventListener('click', function (e) {
                        e.preventDefault();
                        const target = document.querySelector(this.getAttribute('href'));
                        if (target) {
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    });
                });

                // Navbar background on scroll
                window.addEventListener('scroll', () => {
                    const navbar = document.getElementById('navbar');
                    if (window.scrollY > 50) {
                        navbar.style.background = 'rgba(15, 15, 35, 0.98)';
                    } else {
                        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
                    }

                    this.updateActiveNav();
                });
            }

            updateActiveNav() {
                const sections = document.querySelectorAll('section');
                const navLinks = document.querySelectorAll('.nav-link');

                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (window.scrollY >= (sectionTop - 200)) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            }

            // Intersection Observer for scroll animations
            observeElements() {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('fade-in-up');
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                });

                document.querySelectorAll('[data-aos]').forEach(el => {
                    observer.observe(el);
                });
            }

            // Stats counter animation
            initStatsAnimation() {
                const stats = document.querySelectorAll('.stat-number');
                
                const animateStats = () => {
                    stats.forEach(stat => {
                        const target = parseInt(stat.dataset.target);
                        const increment = target / 100;
                        let current = 0;

                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                stat.textContent = target;
                                clearInterval(timer);
                            } else {
                                stat.textContent = Math.floor(current);
                            }
                        }, 20);
                    });
                };

                // Trigger when stats section is visible
                const statsObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateStats();
                            statsObserver.unobserve(entry.target);
                        }
                    });
                });

                document.querySelector('.about-stats')?.parentElement && 
                statsObserver.observe(document.querySelector('.about-stats'));
            }

            // Project filtering
            initProjectFiltering() {
                const filterBtns = document.querySelectorAll('.filter-btn');
                
                filterBtns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        filterBtns.forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        
                        const filter = btn.dataset.filter;
                        this.filterProjects(filter);
                    });
                });
            }

            filterProjects(filter) {
                const projectCards = document.querySelectorAll('.project-card');
                projectCards.forEach(card => {
                    const category = card.dataset.category;
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.6s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }

            // Load first-year student projects
            loadProjects() {
                const projectsGrid = document.getElementById('projects-grid');
                const projectsData = [
                    {
                        id: 1,
                        title: 'Personal Portfolio Website',
                        description: 'My first responsive portfolio built with HTML, CSS, and JavaScript. Features smooth animations, mobile responsiveness, and interactive elements.',
                        tags: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
                        image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        category: 'web',
                        link: '#'
                    },
                    {
                        id: 2,
                        title: 'Student Database System',
                        description: 'University database project using SQL. Created tables for student records, courses, and grades with complex JOIN queries and normalization.',
                        tags: ['SQL', 'MySQL', 'Database Design', 'Queries'],
                        image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        category: 'database',
                        link: '#'
                    },
                    {
                        id: 3,
                        title: 'To-Do List Application',
                        description: 'Interactive to-do list web app with local storage, drag & drop functionality, and task categorization built during programming fundamentals course.',
                        tags: ['HTML', 'CSS', 'JavaScript', 'Local Storage'],
                        image: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                        category: 'web',
                        link: '#'
                    },
                    {
                        id: 4,
                        title: 'Sorting Algorithm Visualizer',
                        description: 'Web application visualizing Bubble Sort, Selection Sort, and Insertion Sort algorithms with animated step-by-step execution.',
                        tags: ['JavaScript', 'HTML Canvas', 'Algorithms', 'Visualization'],
                        image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                        category: 'algorithms',
                        link: '#'
                    },
                    {
                        id: 5,
                        title: 'Library Management System',
                        description: 'Database project modeling a library system with books, members, and borrowing records. Implemented stored procedures and triggers.',
                        tags: ['SQL', 'MySQL', 'Database Design', 'Stored Procedures'],
                        image: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                        category: 'database',
                        link: '#'
                    },
                    {
                        id: 6,
                        title: 'Number Guessing Game',
                        description: 'Algorithm assignment implementing binary search to create an efficient number guessing game with optimal strategy analysis.',
                        tags: ['JavaScript', 'Algorithms', 'Binary Search', 'Game Logic'],
                        image: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                        category: 'algorithms',
                        link: '#'
                    }
                ];

                projectsData.forEach(project => {
                    const projectCard = this.createProjectCard(project);
                    projectsGrid.appendChild(projectCard);
                });
            }

            createProjectCard(project) {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.dataset.category = project.category;
                card.innerHTML = `
                    <div class="project-image" style="background: ${project.image}"></div>
                    <div class="project-content">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                `;
                
                card.addEventListener('click', () => this.openProjectModal(project));
                return card;
            }

            // Modal functionality
            initModal() {
                const modal = document.getElementById('project-modal');
                const closeBtn = document.getElementById('modal-close');

                closeBtn.addEventListener('click', () => {
                    modal.classList.remove('active');
                });

                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.classList.remove('active');
                    }
                });

                // Close on Escape key
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && modal.classList.contains('active')) {
                        modal.classList.remove('active');
                    }
                });
            }

            openProjectModal(project) {
                const modal = document.getElementById('project-modal');
                const modalBody = document.getElementById('modal-body');
                
                modalBody.innerHTML = `
                    <div style="background: linear-gradient(135deg, ${project.image}); padding: 3rem; border-radius: 20px 20px 0 0; text-align: center;">
                        <h2 style="color: white; margin-bottom: 0.5rem;">${project.title}</h2>
                        <p style="color: rgba(255,255,255,0.9); font-size: 1.1rem;">${project.tags.join(' • ')}</p>
                    </div>
                    <div style="padding: 2.5rem;">
                        <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 2rem; font-size: 1.1rem;">
                            ${project.description}
                        </p>
                        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                            <a href="${project.link}" class="btn btn-primary" style="flex: 1;" target="_blank">
                                <i class="fas fa-eye"></i> View Project
                            </a>
                            <a href="#" class="btn btn-secondary" style="flex: 1;">
                                <i class="fab fa-github"></i> View Code
                            </a>
                        </div>
                    </div>
                `;
                
                modal.classList.add('active');
            }

            // GitHub API Integration with async/await and error handling
            async loadGitHubRepos() {
                try {
                    const container = document.getElementById('github-container');
                    
                    // Show loading state
                    container.innerHTML = `
                        <div class="loading-spinner">
                            <i class="fas fa-spinner fa-spin"></i>
                            <p>Fetching GitHub repositories...</p>
                        </div>
                    `;

                    const response = await fetch(
                        `https://api.github.com/users/${this.githubUsername}/repos?sort=updated&per_page=6`,
                        {
                            headers: {
                                'Accept': 'application/vnd.github.v3+json'
                            }
                        }
                    );

                    if (!response.ok) {
                        throw new Error(`GitHub API error: ${response.status}`);
                    }

                    const repos = await response.json();
                    
                    // Update container with repos or fallback
                    container.innerHTML = repos.length > 0 
                        ? repos.map(repo => this.createGitHubCard(repo)).join('')
                        : this.createNoReposMessage();

                } catch (error) {
                    console.error('Error loading GitHub repos:', error);
                    this.showErrorMessage('github-container', 'Failed to load GitHub repositories. Please check your connection.');
                }
            }

            createGitHubCard(repo) {
                return `
                    <div class="github-card">
                        <h3 class="repo-name">
                            <a href="${repo.html_url}" target="_blank" style="color: var(--text-primary); text-decoration: none;">
                                ${repo.name}
                            </a>
                        </h3>
                        <p class="repo-description">${repo.description || 'No description available'}</p>
                        <div class="repo-stats">
                            <span>⭐ ${repo.stargazers_count}</span>
                            <span>🍴 ${repo.forks_count}</span>
                            <span>📂 ${repo.language || 'Unknown'}</span>
                        </div>
                    </div>
                `;
            }

            createNoReposMessage() {
                return `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
                        <i class="fas fa-folder-open" style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                        <p>No public repositories found.</p>
                    </div>
                `;
            }

            showErrorMessage(containerId, message) {
                const container = document.getElementById(containerId);
                container.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #ef4444;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                        <p>${message}</p>
                    </div>
                `;
            }

initContactForm() {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        await this.handleFormSubmit(data);
    });
} // هاد القوس كان ناقص عندك وهو اللي داير مشكل لتحت

async handleFormSubmit(data) {
    const form = document.getElementById('contact-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('تم إرسال الرسالة بنجاح! شكراً لك');
            form.reset();
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        alert('وقع خطأ، يرجى المحاولة مرة أخرى');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

            // Scroll animations
            initScrollAnimations() {
                // Parallax effect for hero floating cards
                window.addEventListener('scroll', () => {
                    const scrolled = window.pageYOffset;
                    const floatingCards = document.querySelectorAll('.floating-card');
                    
                    floatingCards.forEach((card, index) => {
                        const speed = 0.5 + (index * 0.1);
                        card.style.transform = `translateY(${scrolled * speed}px)`;
                    });
                });
            }
        }

        // Initialize the portfolio app when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new PortfolioApp();
            
            // Add fade-in animation to sections
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -10% 0px'
            };
            
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            document.querySelectorAll('section').forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                section.style.transition = 'all 0.6s ease';
                sectionObserver.observe(section);
            });
        });

        // PWA-like functionality for better UX
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').catch(() => {
                    // Ignore service worker registration errors
                });
            });
        }
    
    
