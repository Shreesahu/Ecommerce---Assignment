import admin from "./firebaseAdmin.js";

const verifyFirebaseToken = async(token)=>{
    const decoded = await admin.auth().verifyIdToken(token);
    return decoded;
}

export default verifyFirebaseToken;