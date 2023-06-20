// import jwt from "jsonwebtoken";

// export const verifyToken = async (req, res, next) => {
//     try {
//         let token = req.header("Authorization");

//         if (!token) {
//             return res.status(403).send("Access Denied");
//         }

//         if (token.startsWith("Bearer ")) {
//             token = token.slice(7, token.length).trimLeft();
//         }

//         console.log("Token:", token);

//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

export const authRole = (requiredRoles) => {
    return (req, res, next) => {
        const { role } = req.body.user;

        if (requiredRoles.includes(role)) {
            next();
        } else {
            res.status(403).json({
                error: "Access denied. Insufficient role.",
            });
        }
    };
};
