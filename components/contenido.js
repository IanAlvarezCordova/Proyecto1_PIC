const appContent = document.getElementById('app-content');

document.querySelector('nav-bar').addEventListener('navigate', (event) => {
    const sections = appContent.querySelectorAll('.app-section');
    sections.forEach(section => (section.style.display = 'none'));

    const targetSection = event.detail.section;
    const activeSection = appContent.querySelector(`#${targetSection}`);
    if (activeSection) activeSection.style.display = 'block';
});