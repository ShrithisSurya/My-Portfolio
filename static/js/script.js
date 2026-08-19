document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       Preloader Logic
       ========================================================================== */
    /* =========================================================
     Preloader Logic
     ========================================================= */

    const preloader = document.getElementById("preloader");
    const loaderPercentage = document.getElementById("loaderPercentage");
    const loaderProgress = document.getElementById("loaderProgress");

    let percentage = 0;

    const loaderInterval = setInterval(() => {

        percentage++;

        loaderPercentage.textContent = percentage;
        loaderProgress.style.width = percentage + "%";

        if (percentage >= 100) {

            clearInterval(loaderInterval);

            setTimeout(() => {

                preloader.style.opacity = "0";
                preloader.style.visibility = "hidden";

                // Trigger hero animations
                setTimeout(() => {
                    handleScrollAnimation();
                }, 300);

            }, 500);
        }

    }, 25);

    /* ==========================================================================
       Navigation Toggle for Mobile
       ========================================================================== */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.querySelector('i').classList.toggle('fa-times');
            hamburger.querySelector('i').classList.toggle('fa-bars');
        });
    }

    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').classList.add('fa-bars');
                hamburger.querySelector('i').classList.remove('fa-times');
            }
        });
    });

    /* ==========================================================================
       Sticky Header & Active Link Update
       ========================================================================== */
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Update
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       Scroll Animations (Fade Up)
       ========================================================================== */
    const fadeElements = document.querySelectorAll('.fade-up');

    const handleScrollAnimation = () => {
        fadeElements.forEach(el => {
            if (el.classList.contains('visible')) return;

            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                el.classList.add('visible');
            }
        });
    };

    // Listen for scroll events to trigger animations
    window.addEventListener('scroll', handleScrollAnimation);

    // Also run once in case elements are already in view (and for reduced motion users)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        fadeElements.forEach(el => {
            el.classList.add('visible');
            el.style.transition = 'none';
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

    /* ==========================================================================
       Desktop Parallax Effect for Hero Image
       ========================================================================== */
    const heroImageWrapper = document.querySelector('.hero-image-wrapper');
    // Only apply on devices with fine pointer (e.g. mouse) and respect reduced motion
    if (heroImageWrapper && window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / 35;
            const y = (e.clientY - window.innerHeight / 2) / 35;

            heroImageWrapper.style.transform = `translate(${x}px, ${y}px) rotateY(${x / 2}deg) rotateX(${-y / 2}deg)`;
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const heroImage = document.querySelector(".hero-image");

    if (!heroImage) return;

    const images = heroImage.querySelectorAll("img");

    if (images.length <= 1) return;

    let current = 0;

    // Prepare all images without changing your HTML/CSS
    images.forEach((img, index) => {
        img.style.position = "absolute";
        img.style.inset = "0";
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        img.style.opacity = index === 0 ? "1" : "0";
        img.style.transition = "opacity 1s ease-in-out";
        img.style.pointerEvents = "none";
    });

    // Keep the first image visible
    heroImage.style.position = "relative";

    function changeHeroImage() {
        const next = (current + 1) % images.length;

        // Fade out current image
        images[current].style.opacity = "0";

        // Fade in next image
        images[next].style.opacity = "1";

        current = next;
    }

    // Change image every 3 seconds
    setInterval(changeHeroImage, 3000);
});


// Email Js
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = document.getElementById("submitBtn");
  const btnText = document.getElementById("btnText");
  const btnSpinner = document.getElementById("btnSpinner");

  // 🔄 Loading state
  submitBtn.disabled = true;
  btnText.textContent = "Sending...";
  btnSpinner.classList.remove("d-none");

  // 📥 Get form values
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  const params = {
    name: name,
    phone: phone,
    email: email,
    phone: phone, 
    subject:subject,
    message: message
  };

  // 📧 Send Email
  emailjs.send("service_icjia8g", "template_mfoo1um", params)
    .then(() => {
      showAlert("success","Inquiry sent successfully 🚀");
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      showAlert("danger","Failed to send inquiry ❌");
    })
    .finally(() => {
      submitBtn.disabled = false;
      btnText.innerHTML = `Send Message <i class="fas fa-paper-plane ms-2"></i>`;
      btnSpinner.classList.add("d-none");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const timeline = document.querySelector(".timeline");

    if (!timeline) return;

    function updateTimelineProgress() {
        const rect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Start filling when timeline enters viewport
        const start = windowHeight * 0.75;

        // Calculate how much of timeline has been scrolled
        const progress = Math.min(
            Math.max(start - rect.top, 0),
            timeline.offsetHeight
        );

        timeline.style.setProperty(
            "--timeline-progress",
            `${progress}px`
        );
    }

    window.addEventListener("scroll", updateTimelineProgress, {
        passive: true
    });

    window.addEventListener("resize", updateTimelineProgress);

    updateTimelineProgress();
});