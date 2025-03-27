export class changeTab {
  constructor() {
    this.nav = document.querySelector('#tab-button-nav');
    this.sections = document.querySelectorAll('section[id^="tab-section"]');

    this.nav.addEventListener("click", this.handleTabClick.bind(this));
  }

  handleTabClick(event) {
    const targetId = event.target.dataset.tabSection;
    if (!targetId) return;

    this.sections.forEach((section) =>
      section.id === targetId ? section.removeAttribute("hidden") : section.setAttribute("hidden", true)
    );
  }
}