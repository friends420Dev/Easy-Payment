import { initializeApp } from 'firebase/app';

var firebaseConfig = {
    apiKey: "AIzaSyCayU36YLSB3uZFGSjxQHuYpikJYW9fhKU",
    authDomain: "battle-lab-d4083.firebaseapp.com",
    databaseURL: "https://battle-lab-d4083-default-rtdb.firebaseio.com",
    projectId: "battle-lab-d4083",
    storageBucket: "battle-lab-d4083.appspot.com",
    messagingSenderId: "950002900597",
    appId: "1:950002900597:web:11ff89ecc4651bf51c223c",
    measurementId: "G-16JHDXCB0L"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;