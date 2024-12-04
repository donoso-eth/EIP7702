import { type BaseError, encodeFunctionData, parseEther } from 'viem'

import { useWaitForTransactionReceipt } from 'wagmi'
import { client } from '../config'
import { ExperimentERC20, Ignis, Tyde } from '../contracts'
import { Account } from '../modules/Account'
import "./style.css";

export function Mint({ account }: { account: Account.Account }) {
  const {
    data: hash,
    mutate: execute,
    error,
    ...executeQuery
  } = Account.useExecute({
    client,
  })

  const receiptQuery = useWaitForTransactionReceipt({ hash })

  const isPending =
    receiptQuery.fetchStatus === 'fetching' || executeQuery.isPending
  const isSuccess = receiptQuery.isSuccess && executeQuery.isSuccess

  return (
    <div>
      <p>Mint Your NFTs</p>
      <div style={{display:'flex', justifyContent:'center'}}>
      <img style={{margin:'10px'}} src="https://anichess.com/static/media/story-6.50b7eb8fe21bc74b8710.png" alt="tyde" height={250} width={500}></img>
      <img style={{margin:'10px'}} src="https://anichess.com/static/media/story-7.92adc9badf10d5ee1d7f.png" alt="tyde" height={250} width={500}></img>
      </div>
    
      <button
        disabled={isPending || isSuccess}
        onClick={() =>
          execute({
            account,
            calls: [
              {
                to: Tyde.address,
                data: encodeFunctionData({
                  abi: Tyde.abi,
                  functionName: 'mint',
                  args: [account.address],
                }),
              },
              {
                to: Ignis.address,
                data: encodeFunctionData({
                  abi: Ignis.abi,
                  functionName: 'mint',
                  args: [account.address],
                }),
              },
            ],
          })
        }
        type="button"
      >
        {isPending ? 'Minting...' : 'Mint your NFTs'}
      </button>
      {error && <p>{(error as BaseError).shortMessage ?? error.message}</p>}
      {isSuccess && (
        <p>
          Minted !! ·{' '}
          <a
            href={`${client.chain.blockExplorers.default.url}/tx/${hash}`}
            target="_blank"
            rel="noreferrer"
          >
            Explorer
          </a>
            </p>
      )}
    </div>
  )
}
