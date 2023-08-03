import jwt from "jsonwebtoken";
import * as bcrypt from 'bcrypt'

export const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash);
}

export const hashPassword = (password) => {
    return bcrypt.hash(password, 5);
    // second argument is salt
    // 5 is the default
    // 10 is recommended
    // 15 is overkill
    // 20 is insane
    // 25 is insane and slow
    // 30 is insane and slow and will make you cry
    // 35 is insane and slow and will make you cry and die
    // salting is known as the process of adding random data to a password to make it harder to crack
    // the more salt you add the harder it is to crack but the longer it takes to crack
}

export const createJWT = (user) => {
    const token = jwt.sign({
            id: user.id,
            username: user.username
        },
        process.env.JWT_SECRET
    );
    return token;
}
/* 
    `jwt.sign` is a function provided by the `jsonwebtoken` library in TypeScript. It
    is used to generate a JSON Web Token (JWT) by signing a payload with a secret key.
    The payload typically contains information about the user or entity that the token
    represents. The secret key is used to verify the authenticity of the token later
    on. 
*/

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith("Bearer ")) {
        // res.status(401);
        // res.json({message:"not authorized"})
        // use not found instead for security purposes
        res.status(404);
        res.json({ message: "not found" });
        return;
    }

    const [, token] = bearer.split(' ');
    // const token = bearer.split("Bearer ")[1].trim();  alternative

    if (!token) {
        res.status(404);
        res.json({ message: "not found" });
        return;
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        console.log(payload);
        next();
    } catch (e) {
        console.error(e);
        res.status(404);
        res.json({ message: "not found" });
        return;
    }
}