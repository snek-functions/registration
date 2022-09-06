import {usersAdd, usersUpdate} from '@snek-functions/iam'
import {fn} from './factory'
import {User} from './types'

const register = fn<
  {
    email: string
    password: string
    details: {firstName: string; lastName: string}
  },
  {
    user: User
  }
>(
  async ({email, password, details}, _, req) => {
    const addRes = await usersAdd.execute({email: email, password: password})

    if (addRes.errors.length > 0) {
      throw new Error(addRes.errors[0].message)
    }
    console.log('user data!!!', addRes.data)

    usersUpdate.execute({
      userId: addRes.data.userId,
      email: addRes.data.email,
      ...details
    })

    return addRes.data
  },
  {
    name: 'register'
  }
)

export default register
