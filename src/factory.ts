import {makeFn} from '@snek-at/functions'
import type {SpawnOptionsWithoutStdio} from 'child_process'

export const url = process.env.IS_OFFLINE
  ? process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-4030.githubpreview.dev/graphql`
    : 'http://localhost:4030/graphql'
  : `${process.env.ENDPOINT_URL_REGISTRATION}`

export const fn = makeFn({
  url
})
