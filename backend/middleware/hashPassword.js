import bcrypt from 'bcrypt';

const hashPassword = async(req , res, next) => {
    try {
        const {password} = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)
        req.body.password = hashedPassword
        next()
    } catch (error) {
        res.status(500).json({message: 'Error hashing password', error: error.message})
    }
}

export default hashPassword;
