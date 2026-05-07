import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebaseconfig";

const firebaseAuthFunction = async (phone) => {
  try {
    // ✅ Create ONLY once
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth, // important: your setup needs this order
        "recaptcha-container",
        {
          size: "invisible",
        }
      );

      await window.recaptchaVerifier.render();
    }

    const phoneNumber = `+91${phone.trim()}`;

    // ✅ ALWAYS reuse same verifier
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      window.recaptchaVerifier
    );

    console.log(confirmationResult , "confirmationResult");
    return confirmationResult;
    

  } catch (err) {
    console.error("Error sending OTP", err);
    throw err;
  }
};

export default firebaseAuthFunction;