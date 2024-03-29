import jwt from 'jsonwebtoken';

//TODO: but this function in every other micro
export const checkUser = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
			if (err) {
				req.user = null;
				next();
			} else {
				req.user = decodedToken.id;
				next();
			}
		});
	} else {
		req.user = null;
		next();
	}
};