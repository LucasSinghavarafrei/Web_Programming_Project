
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.main-nav');


menuToggle.addEventListener('click', () => {
    
    navMenu.classList.toggle('active');
});


document.addEventListener('DOMContentLoaded', () => {

    const mainTabs = document.querySelectorAll('.course-tab');
    const mainPanels = document.querySelectorAll('.course-panel');

    if(mainTabs.length > 0) {
        mainTabs.forEach(tab => {
            tab.addEventListener('click', () => {

                mainTabs.forEach(t => t.classList.remove('active'));
                mainPanels.forEach(p => p.classList.remove('active'));

  
                tab.classList.add('active');
                const targetId = tab.getAttribute('data-target');
                const targetPanel = document.getElementById(targetId);
                
                if(targetPanel) {
                    targetPanel.classList.add('active');
                    
                    const firstSubTab = targetPanel.querySelector('.sub-tab');
                    if(firstSubTab) firstSubTab.click(); 
                }
            });
        });
    }

    const contentArea = document.querySelector('.courses-content-area');
    
    if(contentArea) {
        contentArea.addEventListener('click', (e) => {
            const clickedSubTab = e.target.closest('.sub-tab');
            
            if(clickedSubTab) {
                
                const parentPanel = clickedSubTab.closest('.course-panel');
                
                
                const subTabs = parentPanel.querySelectorAll('.sub-tab');
                const subPanels = parentPanel.querySelectorAll('.sub-panel');
                
                subTabs.forEach(t => t.classList.remove('active'));
                subPanels.forEach(p => p.classList.remove('active'));
                

                clickedSubTab.classList.add('active');
                
                const targetSubId = clickedSubTab.getAttribute('data-sub');
                const targetSubPanel = document.getElementById(targetSubId);
                if(targetSubPanel) {
                    targetSubPanel.classList.add('active');
                }
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    
    if (track) {
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        let currentIndex = 0;
        let slideInterval;

        const updateCarousel = (index) => {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel(currentIndex);
        };

        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel(currentIndex);
        };

        nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
        prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel(currentIndex);
                resetInterval();
            });
        });

        const startInterval = () => { slideInterval = setInterval(nextSlide, 5000); };
        const resetInterval = () => { clearInterval(slideInterval); startInterval(); };

        startInterval();
    }
});

document.addEventListener('DOMContentLoaded', () => {

    const contactForm = document.getElementById('efrei-contact-form');
  
    const formContainer = document.querySelector('.contact-form-wrapper');


    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
         
            e.preventDefault();

          
            formContainer.innerHTML = `
                <div style="text-align: center; padding: 4rem 2rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 8px; backdrop-filter: blur(10px);">
                    <h3 style="color: #ffffff; font-family: 'Syne', sans-serif; font-size: 2rem; margin-bottom: 1rem;">Message sent successfully!</h3>
                    <p style="color: rgba(255, 255, 255, 0.7); font-size: 1.1rem;">Thank you. The relevant department will get back to you shortly.</p>
                </div>
            `;
        });
    }
});