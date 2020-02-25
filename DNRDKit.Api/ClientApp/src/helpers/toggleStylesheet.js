export default ({ isDark }) => {
  const theme = isDark ? 'light' : 'dark';
  document.documentElement.setAttribute("data-theme", theme);
  window.setTimeout(function() {
    document.documentElement.classList.remove('theme-transition')
  }, 1000);
};