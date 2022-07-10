import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });
export const configData = {
  port: process.env.PORT,
  privateKey: process.env.PRIVATEKEY
}