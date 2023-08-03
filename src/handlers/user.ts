import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
    // const { username, password } = req.body;
    try {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password)
            },
        });
        const token = createJWT(user)
        res.json({
            token,
            data: user});
    } catch (e) {
        console.error(e);
        res.status(500);
        res.json({ message: "something went wrong" });
    }
}

export const signin = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: req.body.username
            }
        })
    
        const isValid = await comparePasswords(req.body.password, user.password)
    
        if (!isValid) {
            res.status(401)
            res.json({ message: 'Invalid credentials' })
            return
        }
    
        const token = createJWT(user)
        res.json({ token })
    } catch (err) {
        console.error(err)
        res.status(500)
        res.json({ message: 'Something went wrong' })
    }
}