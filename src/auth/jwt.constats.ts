require('dotenv').config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;


export const jwtConstants = {
    secret: jwtSecretKey,
  };
  