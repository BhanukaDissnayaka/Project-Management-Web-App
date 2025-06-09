import bcrypt from "bcryptjs";

export const hashValue = async (value: string, salt: number = 10) =>
  await bcrypt.hash(value, salt);
