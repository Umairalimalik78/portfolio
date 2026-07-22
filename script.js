// =============================================
//  UMAIR ALI — MODERN PORTFOLIO INTERACTION LOGIC
// =============================================

document.addEventListener('DOMContentLoaded', function () {
  
  // ── 1. AMBIENT CURSOR GLOW ──
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow) {
    window.addEventListener('mousemove', function (e) {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });
  }

  // ── 2. HERO CANVAS PARTICLES ──
  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    window.addEventListener('resize', function () {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    });

    const particles = [];
    const numParticles = Math.min(Math.floor(width / 25), 45);

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? '#86C232' : '#61892F'
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.5;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#86C232';
            ctx.globalAlpha = (1 - dist / 120) * 0.2;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // ── 3. 3D CARD TILT EFFECT ──
  const heroCard = document.querySelector('.heroAvatarCard');
  const heroFrame = document.getElementById('heroFrameContainer');

  if (heroFrame && heroCard) {
    heroFrame.addEventListener('mousemove', function (e) {
      const rect = heroFrame.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (centerY - y) / 12;
      const rotateY = (x - centerX) / 12;

      heroCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    heroFrame.addEventListener('mouseleave', function () {
      heroCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // ── 4. NAVBAR SCROLL EFFECT ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ── 5. HAMBURGER MENU ──
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  // ── 6. DYNAMIC TYPING EFFECT ──
  const typingElement = document.getElementById('typingText');
  if (typingElement) {
    const words = [
      'Modern Web Applications',
      'Figma UI/UX Systems',
      'Responsive Web Interfaces',
      'Clean & Scalable Code'
    ];
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 90;

    function type() {
      const currentWord = words[wordIdx];

      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
        typeSpeed = 50;
      } else {
        typingElement.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
        typeSpeed = 90;
      }

      if (!isDeleting && charIdx === currentWord.length) {
        isDeleting = true;
        typeSpeed = 1600;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        typeSpeed = 350;
      }

      setTimeout(type, typeSpeed);
    }
    setTimeout(type, 600);
  }

  // ── 7. SKILL BARS ANIMATION ──
  const skillFills = document.querySelectorAll('.skillFill');
  const skillsSection = document.getElementById('skills');

  if (skillsSection && skillFills.length > 0) {
    let animated = false;
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !animated) {
          animated = true;
          skillFills.forEach(function (fill) {
            const width = fill.getAttribute('data-width');
            fill.style.width = width + '%';
          });
        }
      });
    }, { threshold: 0.2 });

    observer.observe(skillsSection);
  }

  // ── 8. PROJECT FILTER ──
  const filterBtns = document.querySelectorAll('.filterBtn');
  const projectCards = document.querySelectorAll('.projectCard');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(function (card) {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ── 9. SCROLL REVEAL ANIMATIONS ──
  const revealTargets = document.querySelectorAll(
    '.aboutCard, .skillCategory, .projectCard, .certCard, .contactItem'
  );

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealTargets.forEach(function (target) {
    target.style.opacity = '0';
    target.style.transform = 'translateY(24px)';
    target.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(target);
  });

  // ── 10. CONTACT FORM HANDLING VIA EMAILJS ──
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const userName = document.getElementById('userName').value.trim();
      const userEmail = document.getElementById('userEmail').value.trim();
      const userSubject = document.getElementById('userSubject').value.trim();
      const userMessage = document.getElementById('userMessage').value.trim();

      if (!userName || !userEmail || !userMessage) {
        alert('Please fill in your name, email, and message.');
        return;
      }

      const submitBtn = contactForm.querySelector('.submitBtn');
      const origBtnHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending...</span>';
      submitBtn.disabled = true;

      const templateParams = {
        from_name: userName,
        from_email: userEmail,
        subject: userSubject || 'Portfolio Contact Inquiry',
        message: userMessage
      };

      const serviceId = 'service_iopcimo';
      const templateId = 'template_6kuj94k';
      const publicKey = 'NL9BuXiXpTPu3wMgr';

      emailjs.send(serviceId, templateId, templateParams, publicKey)
        .then(function () {
          formSuccess.style.display = 'block';
          contactForm.reset();
          submitBtn.innerHTML = origBtnHtml;
          submitBtn.disabled = false;

          setTimeout(function () {
            formSuccess.style.display = 'none';
          }, 4500);
        })
        .catch(function (err) {
          alert('Failed to send message via EmailJS. Please try again.');
          console.error('EmailJS Error:', err);
          submitBtn.innerHTML = origBtnHtml;
          submitBtn.disabled = false;
        });
    });
  }

  // ── 11. ACTIVE LINK TRACKING ──
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.navLinks a');

  window.addEventListener('scroll', function () {
    let current = '';
    sections.forEach(function (sec) {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        current = sec.getAttribute('id');
      }
    });

    navAnchors.forEach(function (a) {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) {
        a.classList.add('active');
      }
    });
  });

});

// Inject keyframe animation for project filter transition
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(styleSheet);
