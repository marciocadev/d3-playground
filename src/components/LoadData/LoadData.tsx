import { csv, csvFormat, DSVRowArray } from "d3";
import { useState, useEffect } from "react";

export const LoadData = () => {
  const url = 'https://raw.githubusercontent.com/curran/datasets/master/1962_2006_walmart_store_openings.csv'

  const [data, setData] = useState<DSVRowArray<string>>();

  const msg = (data: DSVRowArray<string>) => {
    let msg = '';
    msg = msg + Math.round(csvFormat(data).length / 1024) + ' kB\n';
    msg = msg + data.length + ' rows\n';
    msg = msg + data.columns.length + ' columns';
    return msg;
  }

  useEffect(() => {
    csv(url).then(d => {
      setData(d);
      console.log('Fetching data');
    });
  }, []);
  // csv(url).then(setData);

  return (
    <pre style={{'fontSize': '7em'}}>{data ? msg(data) : 'Loading'}</pre>
  );
}