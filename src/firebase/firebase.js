import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {firebase, googleAuthProvider, database as default};


// 
// // database.ref('expenses').on('child_changed', (snapshot) => {
// //   console.log(snapshot.key, snapshot.val());
// // });

// // database.ref('expenses')
// //   .once('value')
// //   .then((snapshot) => {
// //     const expenses = [];
// //     snapshot.forEach((childSnapshot) => {
// //       expenses.push({
// //         id: childSnapshot.key,
// //         ...childSnapshot.val()
// //       });
// //     });

// //     console.log(expenses);
// //   });

// //   database.ref('expenses')
// //   .on('value', (snapshot) => {
// //     const expenses = [];
// //     snapshot.forEach((childSnapshot) => {
// //       expenses.push({
// //         id: childSnapshot.key,
// //         ...childSnapshot.val()
// //       });
// //     });

// //     console.log(expenses);
// //   });

// // add array
// // expenses.forEach((expense) => {
// //   database.ref('expenses').push(expense)
// // });

// // test connection
// // create
// // firebase.database().ref().set({
// //   name: 'Maharshi Rawal',
// //   age: 24, 
// //   isSingle: true,
// //   location: {
// //     city: 'Gainesville',
// //     country: 'United States'
// //   }
// // }).then(() => {
// //   console.log('Data is saved!');
// // }).catch((e) => {
// //   console.log('Error occured: ' + e);
// // });

// // delete
// // firebase.database().ref('/isSingle').remove().then(() => {
// //   console.log('Data successfully removed')
// // }).catch((e) => {
// //   console.log('Error removing data', e);
// // });

// // update
// // firebase.database().ref().update({
// //   stressLevel: 9,
// //   'job/company': 'Amazon',
// //   'location/city': 'Seattle'
// // });
// 