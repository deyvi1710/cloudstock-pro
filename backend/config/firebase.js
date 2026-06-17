const admin = require('firebase-admin');

let db = null;
let usingDemo = false;

if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
  try {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
        }),
        databaseURL: process.env.FIREBASE_DATABASE_URL
      });
    }
    db = admin.database();
    console.log('✅ Firebase Realtime Database conectado');
  } catch (error) {
    console.warn('⚠️  Firebase no configurado, usando modo demo:', error.message);
    usingDemo = true;
  }
} else {
  console.warn('⚠️  Variables Firebase no encontradas. Usando modo demo con datos de ejemplo.');
  usingDemo = true;
}

module.exports = { db, usingDemo };
