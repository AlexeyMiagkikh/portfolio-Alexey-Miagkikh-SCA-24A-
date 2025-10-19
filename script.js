// === Инициализация темы (без мигания полностью нельзя без инлайна, но выставим сохранённую сразу после загрузки) ===
(function initThemeOnLoad(){
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
})();

// Год в футере
document.getElementById('year').textContent = new Date().getFullYear();

// Burger-меню
const nav = document.querySelector('.nav');
const burger = document.getElementById('burger');
const menu = document.getElementById('nav-menu');

function setOpen(open){
  nav.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
}
burger.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click', () => setOpen(false)));
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') setOpen(false); });

// Логотип: наверх и закрыть меню
document.querySelector('.brand').addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setOpen(false);
});

// ===== Theme toggle =====
const root = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');

function applyIcon(theme){
  toggleBtn.textContent = theme === 'light' ? '🌙' : '☀️'; // показываем противоположную
  toggleBtn.setAttribute('aria-label', theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему');
  toggleBtn.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
}
function setTheme(theme){
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  applyIcon(theme);
}

// начальная иконка
applyIcon(root.getAttribute('data-theme') || 'dark');

// обработчик клика
toggleBtn.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') || 'dark';
  setTheme(current === 'dark' ? 'light' : 'dark');
});
