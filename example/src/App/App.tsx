import { AccountDetails } from '../components/AccountDetails'
import { InitializeAccount } from '../components/InitializeAccount'
import { Mint } from '../components/Mint'
import { Send } from './components/Send'
import { client } from '../config'
import { Account } from '../modules/Account'

import "./style.css";
export function App() {
  const { data: account } = Account.useQuery()

  return (
    <div className="App">
      <div className="container">
      <h1>Gelato ABC EIP-7702 Delegation</h1>

      <p>
        <strong>Chain:</strong> {client.chain.name} ({client.chain.id}){' · '}
        <a
          href={client.chain.blockExplorers?.default.url}
          target="_blank"
          rel="noreferrer"
        >
          Explorer
        </a>
      </p>

      <h2>1. Initialize</h2>
      <p>
        Initialize a new EOA controlled by a WebAuthn key.
      </p>
      <InitializeAccount />

      {account && (
        <>
          <h2>2. Account</h2>
          <AccountDetails account={account} />

          <h2>3. Mint Your NFTs</h2>
          <Mint account={account} />

        </>
      )}
    </div>
    </div>
  )
}
