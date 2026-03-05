import * as admin from 'firebase-admin';

// Initialize Firebase Admin
if (!admin.apps.length) {
    try {
        if (process.env.FIREBASE_PROJECT_ID) {
            let pKey = process.env.FIREBASE_PRIVATE_KEY || "";
            // Handle Next.js automatically escaping newlines in env vars and literal quotes
            pKey = pKey.replace(/\\n/g, '\n').replace(/"/g, '').trim();

            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: pKey || undefined,
                }),
            });
            console.log('Firebase Admin initialized successfully.');
        } else {
            console.log('FIREBASE_PROJECT_ID missing. Skipping Firebase Admin initialization.');
        }
    } catch (error) {
        console.log('Firebase admin initialization error', error);
    }
}

// We only export db if apps.length > 0 to avoid errors when not configured
export const adminDb = admin.apps.length ? admin.firestore() : null;
