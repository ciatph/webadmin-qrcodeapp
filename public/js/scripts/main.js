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

    // Swap UI buttons
    this.btn_reg.addEventListener('click', this.swapInterface.bind(this));
    this.btn_login.addEventListener('click', this.swapInterface.bind(this));

    // Submit buttons
    this.btn_submit_reg = document.getElementById('reg_submit');
    this.btn_submit_login = document.getElementById('reg_submit');

    this.btn_submit_reg.addEventListener('click', this.registerEmailPassword.bind(this));
};



/**
 * Register newly-created accounts to the guestbook. 
 * Full access for other nodes is pending for admin approval
 */
App.prototype.registerEmailPassword = function(e){
	console.log("clicked register");
	var input = {
		email: this.reg_email.value,
		fname: this.reg_fname.value,
		lname: this.reg_lname.value,
		date_created: firebase.database.ServerValue.TIMESTAMP,
		date_approved: "",
		acct_status: "3",
		acct_type: "1",
		login_stat: ""
	};

	firebase.auth().createUserWithEmailAndPassword(input.email, this.reg_pass.value).then(function(user){
		var user = firebase.auth().currentUser;
		console.log("User created, success! " + user.email + ", uid: " + user.uid + "\n" +
			input.email + ", " + input.lname);

		new PNotify({
			title: "New account " + user.email + " was created.",
			text: "Please wait for admin approval.",
			type: 'success',
			styling: 'bootstrap3'
		});		

		// Insert registration data to firebase
		firebase.database().ref('guestbook/' + user.uid).set(input);
		firebase.database().ref('guestbook_names/' + user.uid).set({
			"fname": input.fname,
			"lname": input.lname,
			"email": input.email,
			"date_created": firebase.database.ServerValue.TIMESTAMP
		});
	}, function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;

		new PNotify({
			title: errorCode,
			text: errorMessage,
			type: 'success',
			styling: 'bootstrap3'
		});		
		console.log(errorCode + "\n" + errorMessage);
	}).catch(function(error){
		new PNotify({
			title: "Something went wrong",
			text: error,
			type: 'danger',
			styling: 'bootstrap3'
		});		
	});
};


/**
 * Initialize click listeners
 */
App.prototype.initialize = function(){
};


/**
 * Toggle the login/registration UI
 * @param {*} e 
 */
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
