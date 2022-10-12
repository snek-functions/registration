import { fn, spawnChild } from './factory';
import { User } from './types';

const prepare = fn<
    { username: string; password: string; details: { firstName: string; lastName: string } },
    {
        email: string,
        password: string,
        details: { firstName: string; lastName: string }
    }
>(
    async ({ username, password, details }, _, req) => {
        // Does one alias per user really make sense?
        console.log(process.env.CODESPACE_NAME)
        // const user = (await storage.queryDatabaseForUser(username)) as User
        const userStr = await spawnChild('venv/bin/python', 'internal/storage.py', [
            username
        ])
        console.log(`test:${userStr}`)
        const user = JSON.parse(userStr) as User
        console.log('test: ', user)

        const { hash } = await import('./internal/index.js')

        if (user.user_id === '0') {
            let passwordHash: string = await hash.generatePasswordHash(password)

            return {
                email: username,
                password: passwordHash,
                details: details
            }

        }
        throw new Error(`Already in use: ${username}`)
    },
    {
        name: 'prepare'
    }
)

export default prepare
