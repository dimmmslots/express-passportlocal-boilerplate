import bcrypt from "bcrypt";

function encryptPass(plaintext: string): string {
  return bcrypt.hashSync(plaintext, 10);
}

function comparePass(plaintext: string, ciphertext: string): boolean {
  return bcrypt.compareSync(plaintext, ciphertext);
}

export default { encryptPass, comparePass };
