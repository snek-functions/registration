import { makeFn } from '@snek-at/functions'

export const url = process.env.IS_OFFLINE
  ? process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-9000.githubpreview.dev/graphql`
    : 'http://localhost:4000/graphql'
  : `https://kleberbaum-schett-net-ami-new-vpwp4j6p4x4fw667-3030.githubpreview.dev/graphql`

export const fn = makeFn({
  url
})
