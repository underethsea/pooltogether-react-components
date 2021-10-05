import React from 'react'
import classnames from 'classnames'
import { usePooltogetherTotalPrizesV3 } from '@pooltogether/hooks'
import { numberWithCommas } from '@pooltogether/utilities'

import { ThemedClipSpinner } from '../Loading/ThemedClipSpinner'

const AWARD_DAY = 'Friday'

export const WeeklyPrizeAmountCard = (props) => {
  const { t, sm, prizePretty } = props

  const amount = prizePretty ? formatNumbers(prizePretty) : weeklyPrizeAmountV3()

  return (
    <div
      className={classnames(
        'relative overflow-visible flex flex-col justify-between text-center py-8 xs:pt-4 mb-4',
        {
          'bg-prize-amount--small': sm,
          'bg-prize-amount': !sm
        }
      )}
      style={{ minHeight: 127 }}
    >
      <div className='lightning-bolts' />

      <div className=''>
        <h1 className='text-4xl xs:text-6xl -mt-6 xs:-mt-0 font-semibold'>{amount}</h1>
        <div className='uppercase font-semibold text-default text-xxs xs:text-lg -mt-2'>
          {t?.('inWeeklyPrizes', 'In weekly prizes') || 'In weekly prizes'}
        </div>
      </div>
      <div className='uppercase font-semibold text-green text-xxs xs:text-lg w-2/3 xs:w-1/2 mx-auto'>
        {t?.('awardedEveryXDay', {
          day: AWARD_DAY
        }) || `Awarded every ${AWARD_DAY}!`}
      </div>
    </div>
  )
}

const formatNumbers = (num) => {
  if (num > 1000000) {
    return `$${numberWithCommas(num / 1000000, { precision: 2 })} ${'million'}`
  } else if (num > 10000) {
    return `$${numberWithCommas(num, { precision: 0 })}`
  } else {
    return `$${numberWithCommas(num, { precision: 0 })}`
  }
}

export const weeklyPrizeAmountV3 = () => {
  const totalPrizes = usePooltogetherTotalPrizesV3()

  // Check if data has loaded
  if (totalPrizes === null) {
    return <ThemedClipSpinner />
  }

  return formatNumbers(totalPrizes)
}