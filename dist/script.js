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

document.querySelectorAll('.program-card').forEach((card) => {
  const front = card.querySelector('.program-front');
  const back = card.querySelector('.program-back');
  const openButton = front.querySelector('.flip-trigger');
  const closeButton = back.querySelector('.flip-trigger');

  function setFlipped(flipped) {
    card.classList.toggle('is-flipped', flipped);
    openButton.setAttribute('aria-expanded', String(flipped));
    front.setAttribute('aria-hidden', String(flipped));
    back.setAttribute('aria-hidden', String(!flipped));
    openButton.tabIndex = flipped ? -1 : 0;
    closeButton.tabIndex = flipped ? 0 : -1;
    (flipped ? closeButton : openButton).focus();
  }

  openButton.addEventListener('click', () => setFlipped(true));
  closeButton.addEventListener('click', () => setFlipped(false));
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const subject = encodeURIComponent(`Class registration — ${data.name}`);
  const body = encodeURIComponent(`FFA OpenBridge class registration

Name: ${data.name}
Contact email: ${data.email}
Learner age range: ${data.age}
Program: ${data.program}

What they would like help with:
${data.message}`);
  status.textContent = 'Opening your email app. Please send the prepared email to complete registration.';
  window.location.href = `mailto:contact.ffaopenbridge@gmail.com?subject=${subject}&body=${body}`;
});

document.querySelector('#year').textContent = new Date().getFullYear();


// Native dialogs provide focus trapping and Escape-key dismissal.
let profileOpener = null;
document.querySelectorAll('[data-profile-open]').forEach((button) => {
  button.addEventListener('click', () => {
    const dialog = document.querySelector(`#profile-${button.dataset.profileOpen}`);
    profileOpener = button;
    dialog.showModal();
    dialog.querySelector('.profile-details').scrollTop = 0;
    document.body.classList.add('profile-open');
  });
});
document.querySelectorAll('.profile-dialog').forEach((dialog) => {
  dialog.querySelector('.profile-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('profile-open');
    profileOpener?.focus({ preventScroll: true });
  });
});
