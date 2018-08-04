var App = function(){
    // Get reference to DOM elements
    this.form_login = document.getElementById('form-login');
    this.form_register = document.getElementById('form-register');
    this.btn_login = document.getElementById('signin');
    this.btn_reg = document.getElementById('signup');

    this.btn_reg.addEventListener('click', this.swapInterface.bind(this));
    this.btn_login.addEventListener('click', this.swapInterface.bind(this));
};

var t;


/**
 * Initialize click listeners
 */
App.prototype.initialize = function(){
};


App.prototype.swapInterface = function(e){
    if(e.target.id === 'signup'){
        console.log('create new account');
        this.form_register.style.display = 'block';
        this.form_login.style.display = 'none';
    }
    else if(e.target.id === 'signin'){
        console.log('log in');
        this.form_register.style.display = 'none';
        this.form_login.style.display = 'block';        
    }
};


window.onload = function(){
    window.App = new App();
};
