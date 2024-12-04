import type { BaseError } from 'viem'

import { client } from '../config'
import { Account } from '../modules/Account'
import "./style.css";
export function InitializeAccount() {
  const { data: hash, ...createMutation } = Account.useCreate({
    client,
  })
  const loadMutation = Account.useLoad({ client })

  const isPending = createMutation.isPending || loadMutation.isPending
  const error = createMutation.error || loadMutation.error

  return (
    <div>
      <button
        disabled={isPending}
        onClick={() => createMutation.mutate()}
        type="button"
      >
        Register
      </button>
      {/* <button
        disabled={isPending}
        onClick={() => loadMutation.mutate()}
        type="button"
      >
        Sign In
      </button> */}
      {hash && (
        <p>
          Account created!{' '}
          <a
            href={`${client.chain.blockExplorers.default.url}/tx/${hash}`}
            target="_blank"
            rel="noreferrer"
          >
            Explorer
          </a>
        </p>
      )}
      {error && <p>{(error as BaseError).shortMessage ?? error.message}</p>}
    </div>
  )
}
