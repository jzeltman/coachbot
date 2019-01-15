class CoachBot {
    constructor(){
        this.$el        = document.querySelector('#app');
        this.$input     = this.$el.querySelector('#goal-input');
        this.$goalList  = this.$el.querySelector('#goals-list');
        this.$signIn    = this.$el.querySelector('.signin');
        this.$signOut   = this.$el.querySelector('.signout');

        console.log('this',this);
        this.$input.addEventListener('keyup',this.inputHandler.bind(this));
        this.$signIn.addEventListener('click',this.signInHandler.bind(this));
        this.$signOut.addEventListener('click',this.signOutHandler.bind(this));

        this.setupUser();
        this.$input.focus();
    }

    setupUser(){
        this.user = window.localStorage.getItem('coachbot:user');

        if ( this.user === null ){ this.signInHandler(); }
        else {
            this.$signIn.classList.add('hide');
            this.$signOut.classList.remove('hide');
            this.fetchGoals();
        }
    }

    signInHandler(){
        this.user = window.prompt('It appears you\'re new here? Please enter a username', 'e.g. myuser123');
        window.localStorage.setItem('coachbot:user',this.user);
        this.$signOut.classList.remove('hide');
        this.$signIn.classList.add('hide');
        this.fetchGoals();
    }

    signOutHandler(){
        let result = window.confirm('Are you sure you want to sign out?');
        window.localStorage.removeItem('coachbot:user');
        this.$signIn.classList.remove('hide');
        this.$signOut.classList.add('hide');
        this.$goalList.querySelectorAll('li').forEach( (li) => li.remove() );
    }

    fetchGoals(){
        let self = this;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', window.location.origin + '/goals/' + this.user);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = () => { 
            if ( xhr.readyState === 4 ){ 
                this.goals = JSON.parse(xhr.response);
                self.setupGoals.call(self); 
            }
        }
        xhr.send();
    }

    setupGoals(){
        if ( this.goals && this.goals.length > 0 ){ 
            let i = 0;
            this.goals.forEach( (goal) => this.appendGoal(goal));
        }
    }

    appendGoal(goal){ 
        console.log('goal', goal);
        let $goal = new Goal(goal);
        this.$goalList.appendChild($goal.template());
    }

    inputHandler(e){
        if ( e.which === 13 && this.$input.value !== '' ){ 
            this.addGoal();
        }
    }

    addGoal(){
        const self = this;
        const params = {
            user: this.user,
            name: this.$input.value,
            complete: false
        };
        let xhr = new XMLHttpRequest();
        xhr.open('POST', window.location.origin + '/create');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = () => { 
            if ( xhr.readyState === 4 ){ 
                self.appendGoal.call(self,JSON.parse(xhr.response));
                this.$input.value = '';
            }
        }
        xhr.send('name=' + this.$input.value + '&user=' + this.user + '&complete=false');
    }
}