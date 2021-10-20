import * as firebaseAdmin from 'firebase-admin';

if (!firebaseAdmin.apps.length) {
    const serviceAccount = {
        privateKey: process.env.private_key,
        clientEmail: process.env.client_email,
        projectId: process.env.project_id,

    };
    
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
        databaseURL: process.env.databaseURL,
    });
}
   
export { firebaseAdmin }