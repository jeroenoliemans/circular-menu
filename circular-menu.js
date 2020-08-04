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
        this.menuContainer = this.shadow.getElementById('menuContainer');
        this.menuContainer.style.position = 'fixed';
        this.menuContainer.style.top = '200px';

        const menuItems = Array.prototype.slice.call( this.children );

        let angle = ((180 / (menuItems.length -1)) * (Math.PI/180));
        const radius = 30 * menuItems.length;
        let correction = this.options.placement === 'left' ? -90* (Math.PI/180) : -90 * (Math.PI/180);

        menuItems.forEach((menuItem, index) => {
            menuItem.classList.add('menu__item');
            menuItem.setAttribute('part','menuitem');
            menuItem.style.position = 'absolute';
            menuItem.style.padding = '10px';
            menuItem.style.listStyle = 'none';
            menuItem.style.height = '60px';
            menuItem.style.width = '60px';
            menuItem.style.display = 'flex';
            menuItem.style.alignItems = 'center';
            menuItem.style.textAlign = 'center';
            menuItem.style.borderRadius = '50%';
            menuItem.style.color = 'white';
            menuItem.style.backgroundColor = 'tomato';

            let xPos = this.options.placement === 'left' ? 
                radius * Math.cos((index * angle) + correction) 
                : ((radius * Math.cos((index * angle) + correction)) * -1) + window.innerWidth - 80; 
            let yPos = radius * Math.sin((index * angle)  + correction);
            menuItem.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });

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

    openMenu() {
        this.menuContainer.classList.add(this.activeClass);
    }

    closeMenu() {
        this.menuContainer.classList.remove(this.activeClass);
    }
}

customElements.define('circular-menu', CircularMenu);