import { csv, DSVRowArray } from "d3";
import { useEffect, useState } from "react";

export const useData = (url: string) => {
  const [data, setData] = useState<DSVRowArray<any>>();

  useEffect(() => {
    const row = (d: any) => {
      d['Population'] = +d['2020'] * 1000
      return d;
    }
    // csv(url, row).then(setData);
    csv(url, row).then(data => {
      let slicedData: any = data.slice(0, 10)
      setData(slicedData)
    });
  }, []);

  return data;
}