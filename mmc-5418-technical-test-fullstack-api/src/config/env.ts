import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const environmentVars = {
  JWT_PASSPHRASE: process.env.JWT_PASSPHRASE,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
};
export default environmentVars;
