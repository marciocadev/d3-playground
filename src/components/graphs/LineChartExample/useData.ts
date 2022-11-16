import { csv, DSVRowArray } from "d3";
import { useEffect, useState } from "react";

export const useData = (url: string) => {
  const [data, setData] = useState<DSVRowArray<any>>();

  useEffect(() => {
    const row = (d: any) => {
      d.temperature = +d.temperature;
      d.timestamp = new Date(d.timestamp);
      return d;
    }
    csv(url, row).then(setData);
  }, []);

  return data;
}