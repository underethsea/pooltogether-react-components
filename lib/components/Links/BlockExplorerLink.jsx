import React from 'react'
import classnames from 'classnames'
import { getChain } from '@pooltogether/evm-chains-extended'
import { NETWORK, shorten as shortenHash } from '@pooltogether/utilities'

import { CopyIcon } from '../Icons/CopyIcon'
import { LinkIcon } from '../Icons/LinkIcon'
import { ExternalLink } from './ExternalLink'

export const BlockExplorerLink = (props) => {
  const {
    address,
    txHash,
    children,
    className,
    shorten,
    noIcon,
    noText,
    noUnderline,
    iconClassName,
    copyable,
    chainId
  } = props

  let url
  if (txHash) {
    url = formatBlockExplorerTxUrl(txHash, chainId)
  } else if (address) {
    url = formatBlockExplorerAddressUrl(address, chainId)
  }

  const display = txHash || address

  return (
    <>
      <ExternalLink
        className={classnames(`inline-flex`, className)}
        href={url}
        noIcon={noIcon}
        iconClassName={iconClassName}
        title='View on Block Explorer'
      >
        {children || (
          <div className='flex'>
            <span
              className={classnames('inline-block', {
                'sm:hidden': !shorten
              })}
            >
              {shortenHash(display)}
            </span>
            <span
              className={classnames('hidden', {
                'sm:inline-block': !shorten
              })}
            >
              {!noText && display}
            </span>
          </div>
        )}
      </ExternalLink>
      {copyable && <CopyIcon className='ml-2 my-auto' text={display} />}
    </>
  )
}

BlockExplorerLink.defaultProps = {
  noIcon: false,
  noText: false,
  noUnderline: false,
  iconClassName: 'h-4 w-4 ml-1 my-auto'
}

const formatBlockExplorerTxUrl = (tx, networkId) => {
  try {
    const blockExplorerUrl = getChain(Number(networkId)).blockExplorerUrls[0]
    return `${blockExplorerUrl}/tx/${tx}`
  } catch (e) {
    throw new Error('Chain ID not supported')
  }
}

const formatBlockExplorerAddressUrl = (address, networkId) => {
  try {
    const blockExplorerUrl = getChain(Number(networkId)).blockExplorerUrls[0]
    return `${blockExplorerUrl}/address/${address}`
  } catch (e) {
    throw new Error('Chain ID not supported')
  }
}
