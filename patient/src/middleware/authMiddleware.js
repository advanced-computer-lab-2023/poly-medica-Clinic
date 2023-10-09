import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(401).send({message: "you are not Auth"});
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(401).send({message: "you are not Auth"})
  }
};


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