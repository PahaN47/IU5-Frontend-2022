class List {
    constructor(id, ...items) {
        this.list = document.createElement('div');
        document.body.appendChild(this.list);
        this.list.className = 'list';
        this.list.id = id;
        
        this.button = document.createElement('div');
        this.button.className = 'list-button';
        this.button.addEventListener('click', (e) => {
            this.list.style.height = 
                this.list.style.height === 'fit-content' ? '32px' : 'fit-content';
            e.stopPropagation();
        });
        this.list.appendChild(this.button);

        this.itemBox = document.createElement('div');
        this.itemBox.className = 'list-item-box';
        this.list.appendChild(this.itemBox);

        for (let item of items)
            this.addItem(item);
        this.button.textContent = document.getElementsByClassName('list-item')[0].textContent;
    }

    addItem(text) {
        let itemDiv = document.createElement('div');
        itemDiv.className = 'list-item';
        itemDiv.textContent = text;
        itemDiv.addEventListener('click', (e) => {
            this.button.textContent = itemDiv.textContent;
            this.list.style.height = '32px';
            e.stopPropagation();
        });
        this.itemBox.appendChild(itemDiv);
    }
}