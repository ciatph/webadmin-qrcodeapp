var InitSettings = function(){
	this.listAccountStatus = {};
    this.listAccountType = {};
        
    this.initFirebase();
};


InitSettings.prototype.initFirebase = function(){
	this.auth = firebase.auth();

	this.mStatusRef = firebase.database().ref('settings/account_status');
	this.mTypeRef = firebase.database().ref('settings/account_type');

	this.loadConstants();
	this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};


/**
 * Add an asynchronous authenticated logged-in User reference
 */
InitSettings.prototype.onAuthStateChanged = function(user){
	var logout = false;

	if(user){
		if(Utils.admins.indexOf(user.email) == -1){
			this.auth.signOut();
			logout = true;
		}		
		console.log("Email: " + user.email);
		// initialize user
		$("#username").html(user.email);
		$("#username_header").html(user.email);		
	}
	else{
		logout = true;
		console.log("No user is logged in");
	}

	if(logout){
		window.location = Utils.redirect_logout;
	}	
};


InitSettings.prototype.initAccountType = function(e){
	this.mTypeRef.set({
		"user": "1",
		"administrator": "2",
		"super administrator": "3"
	}).then(function(){
		console.log("Account type written!");
		new PNotify({
			title: "Firebase account_type has been initialized.",
			text: "Node account_type settings is now ready to use.",
			type: 'success',
			styling: 'bootstrap3'
		});	
	}, function(error){
		console.log("Error initializing settings");
		new PNotify({
			title: "Firebase account_type has not been initialized.",
			text: error,
			type: 'danger',
			styling: 'bootstrap3'
		});	
	}).catch(function(error){
		console.log("Error writing data: " + error);
	});
};

InitSettings.prototype.initAccountStatus = function(e){
	this.mStatusRef.set({
		"active": "1",
		"suspended": "2",
		"waiting approval": "3"
	}).then(function(){
		new PNotify({
			title: "Firebase account_status has been initialized.",
			text: "Node account_status settings is now ready to use.",
			type: 'success',
			styling: 'bootstrap3'
		});			
	}, function(error){
		console.log("Error initializing settings");
		new PNotify({
			title: "Firebase account_status has not been initialized.",
			text: error,
			type: 'danger',
			styling: 'bootstrap3'
		});	
	}).catch(function(error){
		console.log("Error writing data: " + error);
	});
};


window.onload = function(){
    window.Utils = new Utils();
    window.InitSettings = new InitSettings();
};