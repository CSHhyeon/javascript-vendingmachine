export class changeTab {
  constructor() {
    this.nav = document.querySelector('#tab-button-nav');
    this.sections = document.querySelectorAll('section[id^="tab-section"]');

    this.init();
  }

  init() {
    this.nav.addEventListener('click',(e) => {
      if (!e.target.dataset.tabSection) return;

      const targetId = e.target.dataset.tabSection;

      this.sections.forEach((section) => {
        section.id === targetId ? section.removeAttribute('hidden') : section.setAttribute('hidden', true);
      });
    })
  }
}