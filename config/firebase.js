const admin = require('firebase-admin');
const path = require('path');

const serviceAccount = require(path.join(__dirname, '../travelix-37d94-firebase-adminsdk-yf3yn-f9de911052.json'));

if (!admin.apps.length) { // Check if no apps have been initialized yet
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "gs://travelix-37d94.appspot.com" // Replace with your actual bucket URL
    });
}

const storage = admin.storage();

module.exports = { storage };
