import User from '../models/user';
import logger from '../util/logger';

export async function getOne(req, res, next) {
    try {
        const user = await User.findById(req.userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(200).json({ error: "User not found" });
        }
    } catch (err) {
        next(err);
    }
}

export async function updateUser(req, res, next) {
    //console.log(req);

    if (!req.file) {
        logger.error(req);
    }
    const imageUrl = req.file.path || "";
    try {
        await User.updateOne({ _id: req.userId }, {
            $set: {
                photo_url: imageUrl,
            }
        });
        return res.status(200).json({ success: "Updated" })
    } catch (err) {
        next(err);
    }
}
