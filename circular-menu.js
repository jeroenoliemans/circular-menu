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

        this.options = {
            placement: this.dataset.placement ? this.dataset.placement : this.defaults.placement
        }

        // elements
        this.menuToggle = null;
        this.menuContainer = null;
    }

    // element is added to the dom
    connectedCallback() {
        this.shadow.innerHTML = `
            <button id="menuToggle" aria-expanded="false" class="menu__toggle menu__toggle-${this.options.placement}" value="menu">&#9776;</button>
            <nav id="menuContainer" class="menu__items">
                <slot></slot>
            </nav>`;
        this.shadow.appendChild(this.styleContent);

        this.createView(); 
    }

    createView() {
        var menuItems = Array.prototype.slice.call( this.children )
        menuItems.forEach((menuItem, index) => {
            menuItem.classList.add('menu__item');
            menuItem.setAttribute('part','menuitem');
            menuItem.style.position = 'absolute';
            menuItem.style.padding = '1rem';
            menuItem.style.listStyle = 'none';
            menuItem.style.height = '4rem';
            menuItem.style.width = '4rem';
            menuItem.style.display = 'flex';
            menuItem.style.alignItems = 'center';
            menuItem.style.textAlign = 'center';
            menuItem.style.borderRadius = '50%';
            menuItem.style.color = 'white';
            menuItem.style.backgroundColor = 'tomato';

            menuItem.style[this.options.placement] = `20px`;
            menuItem.style.top = `${index * 60}px`;

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