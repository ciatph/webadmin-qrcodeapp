// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Allow cross-origin
const cors = require("cors")({ origin: true });

// External HTTP requests
const request = require('request');

// CSV export
const json2csv = require('json2csv').Parser;

// Utility methods
var utils = require('./utils');

// firebase nodes
const ref_guestbook = 'guestbook';
const ref_guestbook_names = 'guestbook_names';
const ref_users = 'users';
const ref_counter = 'count';


/**
 * Automatically register a guest user as soon as the user's 
 * email/password is saved in the firebase users authentication.
 * User's first and last name are assumed to have been encoded by firebase client
 */    
exports.createGuest = functions.auth.user().onCreate((userRecord, context) => {
    const tempName = admin.database().ref(ref_guestbook + '/' + userRecord.uid);
    const guestbook = admin.database().ref(ref_guestbook);
  
    var userObject = {
        email: userRecord.email,
        date_created: Date.now(),
        fname: (tempName.fname !== undefined) ? tempName.fname : "",
        lname: (tempName.lname !== undefined) ? tempName.lname : "",
        acct_status: "3",
        acct_type: "1",
        date_approved: "",
        login_stat: ""
    };
  
    console.log('Created user ' + userRecord.email);
    return admin.database().ref(ref_guestbook + '/' + userRecord.uid).set(userObject);
}); 

  
/**
 * Set a counter for guests from /guestbook
 */
exports.countGuestsUsers = functions.database.ref(ref_guestbook).onWrite((event) => {
    const countRef = admin.database().ref(ref_counter + '/' + ref_guestbook);
  
    return countRef.transaction((current) => {
        if(event.after.exists()){    
            return event.after.numChildren();
        }
        else{
            // node has been deleted
            return 0;
        }
    }).then(() => {
        return console.log("Read post done.");
    }); 
});  


/**
 * Set a counter for admin-validated users at /users
 */
exports.countUsers = functions.database.ref(ref_users).onWrite(event => {
    const countRef = admin.database().ref(ref_counter + '/' + ref_users);

    return countRef.transaction((current) => {
        if(event.after.exists()){    
            return event.after.numChildren();
        }
        else{
            // node has been deleted
            return 0;
        }
    }).then(() => {
        return console.log("Read post done.");
    }); 
});
  

/**
 * Delete a user's firebase auth() details upon its deletion in the /guestbook_names node
 */
exports.deleteGuestInfo = functions.database.ref(ref_guestbook_names + '/{userId}').onDelete(
    (snapshot, context) => {
  
    // TODO: Fix Function returned undefined, expected Promise or value
  
    console.log('Deleting guest: ' + context.params.userId);
    admin.auth().deleteUser(context.params.userId)
        .then(() => {
            console.log('Successfully deleted guest ' + context.params.userId);
            return 0;
        })
        .catch(() => {
            console.log('Error deleting guest ' + context.params.userId);
            return 0;
    });
  
    return 0;
});
  

/**
 * Delete a user's firebase auth() details upon its deletion in the /users node
 */
exports.deleteUserInfo = functions.database.ref(ref_users + '/{userId}').onDelete(
    (snapshot, context) => {

    console.log('Deleting user: ' + context.params.userId);
    admin.auth().deleteUser(context.params.userId)
        .then(() =>{
            console.log('Successfully deleted user ' + context.params.userId);
            return 0;
        })
        .catch(() => {
            console.log('Error deleting user ' + context.params.userId);
            return 0;
        });
  
    return 0;
});