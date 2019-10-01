import jwt from 'jsonwebtoken';

const isLoggedIn = (token) => {
  let verify = undefined;
  jwt.verify(token, process.env.SECRET_KEY, (err) => {
    if (err) {
      // Wrong token
      verify = false;
    } else {
      verify = true;
    }
  });
  return verify;
};

export default isLoggedIn;
