var App = function(){
    // Get reference to DOM elements
    this.form_login = document.getElementById('form-login');
    this.form_register = document.getElementById('form-register');
    this.btn_login = document.getElementById('signin');
    this.btn_reg = document.getElementById('signup');

    this.login_email = document.getElementById('login_email');
    this.login_pass = document.getElementById('login_password');

    this.reg_fname = document.getElementById('reg_fname');
    this.reg_lname = document.getElementById('reg_lname');
    this.reg_email = document.getElementById('reg_email');
    this.reg_pass = document.getElementById('reg_password');        

    this.btn_reg.addEventListener('click', this.swapInterface.bind(this));
    this.btn_login.addEventListener('click', this.swapInterface.bind(this));
};



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
