# webadmin-qrcodeapp
Website users administration page for the qrcodeapp and data dashboard.

## Dependencies

### Google Super Admin Account

1. Your Google account with [Firebase](https://firebase.google.com/) Realtime database enabled.

2. A Firebase project previously set-up using the firebase web console with the following items:

	1. The _Email/Password_ Sign in method enabled in the Firebase Authentication's **Sign-in method** tab.
	`https://console.firebase.google.com/u/0/project/<YOUR_PROJECT_NAME>/authentication/providers` 

	2. Your Google email address added in the Firebase Authentication's **Users** tab.
	`https://console.firebase.google.com/u/0/project/<YOUR_PROJECT_NAME>/authentication/users`

### Tools
The following software tools had been used for this project.

1. **NodeJS** version 10.6.0
2. **Npm** version 6.1.0
3. **firebase-tools** version 4.0.2

## IDE
VS Code is the ideal choice of IDE for this project. Otherwise, any text editor and a command line can be used.

## Installation

### Note
A firebase project with Firebase Realtime Database must have been previously set-up and linked with your Google account prior to proceeding. The Google Super Admin account must have also been set-up.

### Methods

1. Clone this repository into your PC.
2. Delete `.firebaserc`
3. Login to your firebase account using the firebase cli (from the command line).
4. Initialize the project from the firebase cli.
	- `firebase init`
5. **Do no overwrite existing files if prompted from the cli.**
6. Select your project name (previously set-up from firebase web console).
7. Choose
	1. `Database`
	2. `Functions`
	3. `Hosting`
8. _What file should be used for Database Rules?_
	- Use the default `database.rules.json`
9. _What language would you like to use to write Cloud Functions? (Use arrow keys)_
	- Choose `JavaScript`
10. _Do you want to use ESLint to catch probable bugs and enforce style? (y/N)_
	- Choose `Y`
11. _Do you want to install dependencies with npm now? (Y/n)_
	- Choose `Y` 
12. _What do you want to use as your public directory? (public)_ 
	- Press Enter (yes)
13. _Configure as a single-page app (rewrite all urls to /index.html)? (y/N)_ 
	- Choose `N`
14. Open `/public/js/scripts/utils.js`. Replace "oelmapps.gmail.com" with your <YOUR\_GOOGLE\_ACCOUNT>.

### Update and Upload Firebase Functions
1. Navigate into the /functions directory from the command line.
2. Run `npm i --save firebase-functions`
3. Run `npm install`
4. Open `/functions/index.js` and replace all instances of `oelmapps@gmail.com` with <YOUR\_GOOGLE\_ACCOUNT>.
5. Navigate back to the root directory. Upload the functions (for user registration & login to work)
   - `firebase deploy --only functions`

### Run the Website
1. Run `firebase serve` to test and debug functions and hosting locally.
	- Press `Ctrl + C` to stop local server
2. Run `firebase deploy` to commit final updates online.

**Date created:** 20180805<br>
**Date modified:** 20180805