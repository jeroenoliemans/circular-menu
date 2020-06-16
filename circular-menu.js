class CircularMenu extends HTMLElement {
    constructor() {
        super();
        
        this.shadow =  this.attachShadow( { mode: 'open' } );
        this.activeClass = 'menu-is-active';

        const styleTemplate = document.querySelector('#circular-menu-styles');
        this.styleContent = document.importNode(styleTemplate.content, true);

        // elements
        this.menuToggle = null;
        this.menuContainer = null;
    }

    // element is added to the dom
    connectedCallback() {
        this.shadow.innerHTML = `<button id="menuToggle" class="menu__toggle" value="menu">menu</button><nav id="menuContainer" class="menu__items"><slot></slot></nav>`;
        this.shadow.appendChild(this.styleContent);
        this.createView(); 
    }

    createView() {
        this.menuContainer = this.shadow.getElementById('menuContainer');
        this.createMenuButton();
    }

    createMenuButton() {
        this.menuToggle = this.shadow.getElementById('menuToggle');

        this.menuToggle.addEventListener('click', (event) => {
            this.toggleMenu(event);
        });
    }

    toggleMenu(event) {
        this.menuContainer.classList.toggle(this.activeClass);
    }
}

customElements.define('circular-menu', CircularMenu);