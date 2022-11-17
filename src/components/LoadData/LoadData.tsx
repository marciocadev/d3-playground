import React, { useState, useEffect } from 'react'
import { csv, csvFormat, DSVRowArray } from 'd3'

export const LoadData = (): JSX.Element => {
  const url = 'https://raw.githubusercontent.com/curran/datasets/master/1962_2006_walmart_store_openings.csv'

  const [data, setData] = useState<DSVRowArray<string>>()

  const msg = (data: DSVRowArray<string>): string => {
    let msg = ''
    msg = msg + Math.round(csvFormat(data).length / 1024).toString() + ' kB\n'
    msg = msg + (data.length).toString() + ' rows\n'
    msg = msg + (data.columns.length).toString() + ' columns'
    return msg
  }

  useEffect(() => {
    csv(url).then(d => {
      setData(d)
      console.log('Fetching data')
    })
  }, [])
  // csv(url).then(setData)

  return (
    <pre style={{ fontSize: '7em' }}>{(data != null) ? msg(data) : 'Loading'}</pre>
  )
}
