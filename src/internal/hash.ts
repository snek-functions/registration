import crypto from 'crypto';

const digest = 'sha256';
const iterations = 100000;
const keyLength = 32;
const saltSize = 8;

export async function generatePasswordHash(password: string) {
    return new Promise<string>((resolve, reject) => {
        crypto.randomBytes(saltSize, (error, salt) => {
            if (error) {
                return reject(error);
            }

            const salt_str = Buffer.from(salt).toString('base64')

            crypto.pbkdf2(password, salt_str, iterations, keyLength, digest, (error, derivedKey) => {
                if (error) {
                    return reject(error);
                }
                resolve(`pbkdf2_${digest}$${iterations}$${salt}$${derivedKey.toString('base64')}`);
            });
        });
    });
};
