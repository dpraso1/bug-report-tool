import Bug from "../models/Bug.model.js";
import User from "../models/User.model.js";
import { ROLES } from "../constants.js";

export const createBug = async (req, res) => {
    const bug = req.body;

    const bugToSave = new Bug(bug);

    try {
        const result = await bugToSave.save();
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send('Could not create bug');
    }
}

export const getAllBugs = async (req, res) => {
    
    const { role, id } = req.user;

    try {
        //const user = await User.findById(userId);
        let bugs = [];
        if (role === ROLES.QA) {
            bugs = await Bug.find({ reportedBy: id })
        } else {
            bugs = await Bug.find({ assignedTo: id });
        }

        return res.status(200).send(bugs);

    } catch (e) {
        res.status(500).send('Could not fetch bugs');
    }
}

export const changeCompletedStatus = async (req, res) => {
    const { completed } = req.body;
    const { id } = req.params;
   
    try {
        await Bug.findByIdAndUpdate(id, { completed: completed });
        res.status(200).send('Succesfully changed status!');
    } catch (e) {
        res.status(500).send('Could not change status');
    }
}

