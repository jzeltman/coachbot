class Goal {
    constructor(data){
        this.data    = data;
        this.editing = false;

        return this;
    }

    template(){
        this.$el = document.createElement('li');

        this.$display = document.createElement('span');
        this.$display.innerText = this.data.name;

        this.$input = document.createElement('input');
        this.$input.value = this.data.name;

        this.$complete = document.createElement('i');
        this.$complete.classList.add('fas','fa-check-square');

        this.$edit = document.createElement('i');
        this.$edit.classList.add('fas','fa-edit');

        this.$destroy = document.createElement('i');
        this.$destroy.classList.add('fas','fa-trash-alt');

        this.$el.appendChild( this.$display );
        this.$el.appendChild( this.$input );
        this.$el.appendChild( this.$complete );
        this.$el.appendChild( this.$edit );
        this.$el.appendChild( this.$destroy );

        this.$display.addEventListener('dblclick',this.editHandler.bind(this));
        this.$input.addEventListener('keyup',this.inputHandler.bind(this));
        this.$complete.addEventListener('click',this.checkboxHandler.bind(this));
        this.$edit.addEventListener('click',this.editHandler.bind(this));
        this.$destroy.addEventListener('click',this.destroyHandler.bind(this));

        return this.$el;
    }

    editHandler(e){
        this.complete = false;
        this.$el.classList.remove('complete');
        this.$input.focus();
        this.toggleEdit();
    }

    inputHandler(e){
        if ( e.which === 13 ){ 
            this.setCurrentName(); 
            this.updateDisplay(); 
        } else if ( e.which === 27 ){ 
            this.$input.value = this.data.name;
            this.toggleEdit();
        }
    }

    updateDisplay(){ 
        this.$display.innerText = this.data.name;
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load', this.updateHandler.bind(this));
        xhr.open('PUT', window.location.origin + '/' + this.data._id + '/update');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('name=' + this.data.name);
        this.toggleEdit();
    }

    updateHandler(e){ console.log('updateHandler',e); }

    completeHandler(){  
        this.data.complete != this.data.complete;
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load', this.completeXHRHandler.bind(this));
        xhr.open('PUT', window.location.origin + '/' + this.data._id + '/update');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('complete=' + this.data.complete + '&_id=' + this.data._id);
        this.$el.classList.toggle('complete');
    }

    completeXHRHandler(e){ console.log('completed event',e); }

    toggleEdit(){ 
        this.editing = !this.editing;
        this.$el.classList.toggle('edit'); 
    }

    checkboxHandler(){
        if ( this.editing ){ 
            if (this.$input.value !== this.data.name) { 
                this.setCurrentName();
                this.updateDisplay(); 
            } else { this.toggleEdit(); }

        } else { this.completeHandler(); }
    }

    setCurrentName(){ this.data.name = this.$input.value; }

    destroyHandler(){
        let result = window.confirm('Are you sure?');
        if ( result ){ 
            let xhr = new XMLHttpRequest();
            xhr.addEventListener('load', this.deleteHandler.bind(this));
            xhr.open('DELETE', window.location.origin + '/' + this.data._id + '/delete');
            xhr.send();
        }
    }

    deleteHandler(e){
        console.log('deleteHandler',e);
        this.$display.removeEventListener('dblclick',this.editHandler.bind(this));
        this.$input.removeEventListener('keyup',this.inputHandler.bind(this));
        this.$complete.removeEventListener('click',this.checkboxHandler.bind(this));
        this.$edit.removeEventListener('click',this.editHandler.bind(this));
        this.$destroy.removeEventListener('click',this.destroyHandler.bind(this));
        this.$el.remove();
    }
}