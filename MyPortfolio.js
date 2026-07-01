    AOS.init({ duration: 800, once: true });

    function toggleDarkMode() {
      const body = document.body;
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');
      document.querySelector('.theme-toggle-btn i.bi-sun-fill').classList.toggle('d-none', !isDark);
      document.querySelector('.theme-toggle-btn i.bi-moon-stars-fill').classList.toggle('d-none', isDark);
    }

    // Modern Counter Core Implementation
    const counters = document.querySelectorAll('.counter');
    const runCounters = () => {
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const speed = target / 50;
        if (count < target) {
          counter.innerText = Math.ceil(count + speed);
          setTimeout(runCounters, 30);
        } else {
          counter.innerText = target + (counter.getAttribute('data-target') === "95" ? "%" : "+");
        }
      });
    };

    // Hide loading screen safely
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        const loadingScreen = document.getElementById("loading-screen");
        loadingScreen.style.opacity = "0";
        loadingScreen.style.transition = "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
        setTimeout(() => {
          loadingScreen.style.display = "none";
          runCounters();
        }, 500);
      }, 1500);
    });

    // Guardrail against accidental tampering
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('keydown', e => {
      if(e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
        alert("🔒 System inspection protected.");
      }
    });