document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Effect on Navbar
    const header = document.querySelector('.header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Run once at load in case page is refreshed already scrolled
    handleScroll();

    // 2. Mobile Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle body scroll when mobile menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'visible';
            }
        });

        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'visible';
            });
        });
    }

    // 3. Active State on Navigation Links
    // We determine the active page based on the end of the pathname
    const pathname = window.location.pathname;
    const currentPage = pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const linkPage = href.split('/').pop();
        
        // Remove active initially
        link.classList.remove('active');

        // Check matching
        if (currentPage === 'index.html' && (linkPage === 'index.html' || linkPage === '')) {
            link.classList.add('active');
        } else if (currentPage === 'gimnasio.html' && linkPage === 'gimnasio.html') {
            link.classList.add('active');
        } else if (currentPage === 'contacto.html' && linkPage === 'contacto.html') {
            link.classList.add('active');
        }
    });

    // 4. Accordion for FAQ (only in contacto.html)
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const header = item.querySelector('.faq-header');
            const content = item.querySelector('.faq-content');

            if (header && content) {
                header.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');

                    // Close all other open items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                            const otherContent = otherItem.querySelector('.faq-content');
                            if (otherContent) {
                                otherContent.style.maxHeight = '0px';
                            }
                        }
                    });

                    // Toggle current item
                    if (isActive) {
                        item.classList.remove('active');
                        content.style.maxHeight = '0px';
                    } else {
                        item.classList.add('active');
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }
                });
            }
        });
    }
});
