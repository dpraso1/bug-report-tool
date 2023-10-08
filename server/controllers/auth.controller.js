import { SALT_ROUNDS, SECRET } from "../constants.js";
import User from "../models/User.model.js";
import bycript from 'bcrypt'
//dont forget to import
import getUserByEmail from "../dao/user.dao.js";
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
    const { password, ...data } = req.body;

    if (!password || !data.email || !data.name || !data.role) {
        return res.status(400).send('Missing credentials');
    }

    try {
        const hashedPassword = await bycript.hash(password, SALT_ROUNDS);
        const user = new User({ ...data, password: hashedPassword });

        await user.save();

        res.status(200).send('User successfully created');
    } catch (e) {
        res.status(500).send('Could not create user');
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!password || !email) {
        return res.status(400).send('Missing credentials');
    }

    try {
        const user = await getUserByEmail(email);
        console.log(user);
        const match = await bycript.compare(password, user.password)

        //res.status(200).send('User successfully logined!');

        if (match) {

            const token = jwt.sign({
                id: user._id.toString(),
                email: user.email,
                role: user.role
            }, SECRET, { expiresIn: 60 * 60 })

            res.status(201).send({ token });

        } else {
            res.status(401).send('Wrong email or password!');
        }
    } catch (e) {
        res.status(500).send('Something went wrong!');
    }
}

