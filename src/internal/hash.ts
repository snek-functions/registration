import crypto from 'crypto';

const digest = 'sha256';
const iterations = 100000;
const keyLength = 32;
const saltSize = 12;

export async function generatePasswordHash(password: string) {
    return new Promise<string>((resolve, reject) => {
        crypto.randomBytes(saltSize * 8, (error, salt) => {
            if (error) {
                return reject(error);
            }

            const salt_str = Buffer.from(salt).toString('base64').replace(/\+/g, '').replace(/\//g, '').substring(0, saltSize);

            crypto.pbkdf2(password, salt_str, iterations, keyLength, digest, (error, derivedKey) => {
                if (error) {
                    return reject(error);
                }
                resolve(`pbkdf2_${digest}$${iterations}$${salt_str}$${derivedKey.toString('base64')}`);
            });
        });
    });
};
