import { compare, hash } from "bcryptjs";

const hashPassword = async (password) => {
  const hashedPass = await hash(password, 12);
  return hashedPass;
};

const verifyPassword = async (password, hashPass) => {
  const isValid = await compare(password, hashPass);
  return isValid;
};

export { hashPassword, verifyPassword };
