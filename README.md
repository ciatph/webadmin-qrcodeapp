# webadmin-qrcodeapp
Website users administration page for the qrcodeapp and data dashboard.

## Dependencies

The following software had been used for this project.

1. Google account with [Firebase](https://firebase.google.com/) Realtime database enabled.
2. A Firebase project previously set-up using the firebase web console.
1. **NodeJS** version 10.6.0
2. **Npm** version 6.1.0
3. **firebase-tools** version 4.0.2

## IDE
VS Code is the ideal choice of IDE for this project. Otherwise, any text editor and a command line can be used.

## Installation

### Note
A firebase project with Firebase Realtime Database must have been previously set-up and linked with your google account prior to proceeding.

### Methods

1. Clone this repository into your PC.
2. Delete `.firebaserc`
3. Login to your firebase account using the firebase cli (from the command line).
4. Initialize the project from the firebase cli.
	1. `firebase init`
5. Select your project name (previously set-up from firebase web console).
5. Choose
	1. `Database`
	2. `Functions`
	3. `Hosting`
6. Do no overwrite existing files if prompted from the cli.
7. Run `firebase serve` to test and debug functions and hosting locally.
7. Run `firebase deploy` to commit final updates online.

**Date created:** 20180805<br>
**Date modified:** 20180805