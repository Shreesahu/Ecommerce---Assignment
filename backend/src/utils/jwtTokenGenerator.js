import jwt from "jsonwebtoken";

export const jwtTokenGenerator = (user)=>{
    console.log(user , "user during JWT GENERATION")

    return jwt.sign(
        {   
            userId: user.id,
            phone: user.phone,

        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

export default jwtTokenGenerator;