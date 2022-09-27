
const adminMiddleware = (req,  res, next) => {
    const { role } = req.body;
    if(role === "admin") {
        next();
    } else {
        res.status(401).json({msg: 'you are not an admin'});
    }
}

module.exports = {
    adminMiddleware
}