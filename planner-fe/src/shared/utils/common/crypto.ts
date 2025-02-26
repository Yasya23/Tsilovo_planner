import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY =
  process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'default_secret_key';

/**
 * Encrypts a string using AES encryption.
 * @param {string} data - The data to be encrypted.
 * @returns {string} - The encrypted string.
 */
export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
};

/**
 * Decrypts an AES-encrypted string.
 * @param {string} data - The encrypted data to be decrypted.
 * @returns {string | null} - The decrypted string, or null if decryption fails.
 */
export const decryptData = (data: string): string | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(data, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
};
