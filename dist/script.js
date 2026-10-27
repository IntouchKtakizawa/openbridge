const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.site-nav');
const form = document.querySelector('#interest-form');
const status = document.querySelector('#form-status');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 24), { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  data.savedAt = new Date().toISOString();
  localStorage.setItem('openbridge-interest-draft', JSON.stringify(data));
  status.textContent = 'Draft saved on this device. Nothing has been sent yet.';
});

try {
  const saved = JSON.parse(localStorage.getItem('openbridge-interest-draft'));
  if (saved) {
    ['name', 'age', 'program', 'message'].forEach((field) => {
      if (form.elements[field] && saved[field]) form.elements[field].value = saved[field];
    });
    status.textContent = 'Your previous draft is loaded from this device.';
  }
} catch (_) {
  localStorage.removeItem('openbridge-interest-draft');
}

document.querySelector('#year').textContent = new Date().getFullYear();
