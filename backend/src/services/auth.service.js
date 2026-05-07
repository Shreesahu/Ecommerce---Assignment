import verifyFirebaseToken from "../utils/verifyFirebaseToken.js";

export const verifyTokenService = async (token) => {
  const decoded = await verifyFirebaseToken(token);
  return decoded;
};