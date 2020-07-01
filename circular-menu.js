class CircularMenu extends HTMLElement {
    constructor() {
        super();
        
        this.shadow =  this.attachShadow( { mode: 'open' } );
        this.activeClass = 'menu-is-active';

        const styleTemplate = document.querySelector('#circular-menu-styles');
        this.styleContent = document.importNode(styleTemplate.content, true);
        
        this.defaults = {
             placement: 'left'
        }

        // elements
        this.menuToggle = null;
        this.menuContainer = null;
    }

    // element is added to the dom
    connectedCallback() {
        const placement = this.dataset.placement ? this.dataset.placement : this.defaults.placement;

        this.shadow.innerHTML = `<button id="menuToggle" aria-expanded="false" class="menu__toggle menu__toggle-${placement}" value="menu">&#9776;</button><nav id="menuContainer" class="menu__items"><slot></slot></nav>`;
        this.shadow.appendChild(this.styleContent);
        this.createView(); 
    }

    createView() {
        var menuItems = Array.prototype.slice.call( this.children )
        menuItems.forEach((menuItem) => {
            console.log(menuItem);
        });

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