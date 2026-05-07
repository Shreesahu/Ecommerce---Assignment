import "dotenv/config";
import admin from "firebase-admin";


const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

console.log("Project:", serviceAccount.project_id);
console.log("Email:", serviceAccount.client_email);


if(!admin.apps.length){
    admin.initializeApp({
        credential: admin.credential.cert({
            ...serviceAccount,
            privateKey: serviceAccount.private_key
        })
    })
}

export default admin;