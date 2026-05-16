// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(section => observer.observe(section));

// ===== SCROLL REVEAL ANIMATION =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, entry.target.dataset.delay || 0);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach((el, i) => {
  el.dataset.delay = (i % 4) * 100;
  revealObserver.observe(el);
});

// ===== HERO PARALLAX =====
const heroBg = document.getElementById('hero-bg');
window.addEventListener('scroll', () => {
  if (heroBg) {
    heroBg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.3}px)`;
  }
});

// ===== SMOOTH ANCHOR SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== ANIMATED COUNTER =====
function animateCounter(el) {
  const target = parseInt(el.innerText.replace(/[^0-9]/g, ''));
  const suffix = el.innerText.replace(/[0-9]/g, '');
  let count = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    el.innerText = count + suffix;
    if (count >= target) clearInterval(timer);
  }, 25);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

// Promo Popup Logic
document.addEventListener('DOMContentLoaded', () => {
  const promoPopup = document.getElementById('promo-popup');
  const promoClose = document.getElementById('promo-close');
  
  // Show popup after 3 seconds
  setTimeout(() => {
    if (promoPopup) {
      promoPopup.classList.add('show');
    }
  }, 3000);
  
  // Close popup logic
  if (promoClose) {
    promoClose.addEventListener('click', () => {
      promoPopup.classList.remove('show');
    });
  }
});

// Chatbot UI & Logic
document.addEventListener('DOMContentLoaded', () => {
  const chatToggle = document.getElementById('chatbot-toggle');
  const chatWindow = document.getElementById('chatbot-window');
  const chatClose = document.getElementById('chatbot-close');
  const chatInput = document.getElementById('chatbot-input');
  const chatSend = document.getElementById('chatbot-send');
  const chatMessages = document.getElementById('chatbot-messages');

  if (chatToggle && chatWindow && chatClose) {
    chatToggle.addEventListener('click', () => {
      chatWindow.classList.toggle('open');
    });

    chatClose.addEventListener('click', () => {
      chatWindow.classList.remove('open');
    });
  }

  const responses = [
    { keywords: ['price', 'cost', 'rate', 'how much', 'rupee', 'rs'], text: "Our prices: Groundnut Oil (Rs 100/500ml, Rs 200/1L, Rs 1000/5L), Sesame Oil (Rs 150/500ml, Rs 300/1L, Rs 1500/5L), Coconut Oil (Rs 125/500ml, Rs 250/1L, Rs 1250/5L)." },
    { keywords: ['delivery', 'ship', 'location', 'where', 'address', 'visit', 'map'], text: "We are located at Sankarapuram Main Road, Moorarpalayam, Kallakurichi District, Tamil Nadu. We do deliver! Please contact us on WhatsApp (+91 99999 99999) for delivery options." },
    { keywords: ['pure', 'chemical', 'original', 'quality', 'adulterate', 'fake', 'real'], text: "All our oils are 100% pure, unrefined, and chemical-free. We extract them using traditional wooden Chekku methods to retain maximum nutrients." },
    { keywords: ['groundnut', 'peanut', 'kadalai'], text: "Our Cold-Pressed Groundnut Oil (Kadalai Ennai) is rich in Vitamin E and perfect for deep frying and sautéing. It's our Best Seller!" },
    { keywords: ['sesame', 'gingelly', 'nallennai'], text: "Our Wood-Pressed Sesame Oil (Nallennai) is deeply revered in Tamil culture for its rich flavour, medicinal properties, and high antioxidants." },
    { keywords: ['coconut', 'thengai'], text: "Our Cold-Pressed Coconut Oil (Thengai Ennai) is extracted from fresh coconuts. It has a natural aroma and is ideal for cooking, hair, and skincare." },
    { keywords: ['method', 'process', 'chekku', 'wood', 'cold', 'pressed', 'extract'], text: "We use the ancient Chekku (wood-pressed) method. This extracts the oil without any heat or chemicals, preserving the natural flavour and health benefits." },
    { keywords: ['history', 'since', 'old', 'started', 'founder', 'about', 'story'], text: "Vetri Oil Mill was founded in 1990 in Sankarapuram. For over 30 years, we have been committed to providing pure, traditional oils to our community." },
    { keywords: ['contact', 'phone', 'call', 'number', 'whatsapp'], text: "You can reach us by Phone or WhatsApp at +91 99999 99999. Our hours are Mon – Sat: 7 AM – 7 PM." },
    { keywords: ['buy', 'order', 'purchase', 'shop'], text: "To place an order, you can call or WhatsApp us at +91 99999 99999, or visit our mill in Kallakurichi!" },
    { keywords: ['hi', 'hello', 'hey', 'help', 'good morning', 'good evening', 'hi bot'], text: "Hello! Welcome to Vetri Oil Mill. You can ask me about our oils, prices, location, or how to order!" },
    { keywords: ['thanks', 'thank you', 'ok', 'okay', 'great', 'awesome'], text: "You're very welcome! Let me know if you have any other questions." }
  ];

  function addMessage(text, isUser = false) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-msg');
    msgDiv.classList.add(isUser ? 'user-msg' : 'bot-msg');
    msgDiv.innerText = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, true);
    chatInput.value = '';

    // Bot reply simulation
    setTimeout(() => {
      let reply = "Thanks for your message! For detailed queries, please WhatsApp us at +91 99999 99999 or call us directly.";
      const lowerText = text.toLowerCase();
      
      for (const rule of responses) {
        if (rule.keywords.some(kw => lowerText.includes(kw))) {
          reply = rule.text.replace(/\"/g, ''); // strip quotes
          break;
        }
      }
      
      addMessage(reply, false);
    }, 600);
  }

  if (chatSend && chatInput) {
    chatSend.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }
});
