import { useState, useEffect } from "react";
import { getPools } from "../repos/uniswap";
import { Pool } from "../common/types";

export default function usePoolsOverview(): Pool[] {
  const [pools, setPools] = useState<Pool[]>([]);

  const fetchPools = async () => {
    const pools = await getPools();
    setPools(pools);
  };

  useEffect(() => {
    fetchPools();
    return;
  }, []);

  return pools
};