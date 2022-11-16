import { useEffect, useState } from "react";
import jsonFile from './countries-50m.json';
import { feature, mesh } from 'topojson';

export const useDataFromworldMap = () => {
  const [data, setData] = useState<any>();

  const json = (x: any, cb: { call: (arg0: null, arg1: any) => any; })=>cb.call(null,x)
  useEffect(() => {
    json(jsonFile, (topology: any) => {
      console.log(topology)
      const { countries, land } = topology.objects;
      setData({
        land: feature(topology, countries),
        // land: feature(topology, land),
        interiors: mesh(topology, countries, (a,b) => a !== b)
      });
    })
  }, []);

  return data;
}