var Admin = function(){
    this.btn_logout = document.getElementById('btn_logout');
    this.initFirebase();
};

Admin.prototype.initFirebase = function(){
	this.auth = firebase.auth();
	this.database = firebase.database();

	this.mGuestsRef = firebase.database().ref('guestbook');
	this.mGuestNamesRef = firebase.database().ref('guestbook_names');
	this.mUserRef = firebase.database().ref('users');
	this.mStatusRef = firebase.database().ref('settings/account_status');
	this.mTypeRef = firebase.database().ref('settings/account_type');	
	this.mCountRef = firebase.database().ref('count');

    this.btn_logout.addEventListener('click', this.signOut.bind(this));
    this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
    /*
	this.mGuestsRef.on('child_removed', function(snapshot) {
		deleteRow(snapshot.key);
    });
    	
    this.loadConstants();
    */
};


/**
 * Add an asynchronous authenticated logged-in User reference
 */
Admin.prototype.onAuthStateChanged = function(user){
	var logout = false;

	if(user){
		if(Utils.admins.indexOf(user.email) == -1){
			this.auth.signOut();
			logout = true;
		}		
		console.log("Email: " + user.email);
		// initialize user
		$(".username").html($(".username").html() + ', ' + user.email);
		// FirebaseReset.initNodes();
	}
	else{
		logout = true;
		console.log("No user is logged in");
	}

	if(logout){
		// Note: Replace with '/' when uploading to firebase hosting
		window.location = Utils.redirect_logout;
	}
	else{
		// this.listGuests();
	}
};


/**
 * Sign-out logged-in user
 */
Admin.prototype.signOut = function(){
	this.auth.signOut();
};


window.onload = function(){
    window.Utils = new Utils();
    window.Admin = new Admin();
};