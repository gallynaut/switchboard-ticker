import { useState, useEffect } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { parseAggregatorAccountData } from "@switchboard-xyz/switchboard-api";
import { getTableHeadUtilityClass } from "@material-ui/core";
import FEEDS from "./feeds.json";
import { SwitchboardFeed } from "./types";
import { getCurrentTime } from "./utils";

/*
Need to add expiring timestamp for when values are stale
*/

const useSwitchboard = () => {
  const connection = new Connection("https://api.devnet.solana.com");
  const [feeds, setFeeds] = useState<SwitchboardFeed[]>(FEEDS);

  const refreshPrice = async (key: string): Promise<boolean> => {
    const pKey = new PublicKey(key);
    try {
      const resp = await parseAggregatorAccountData(connection, pKey);
      if (resp.currentRoundResult?.result) {
        setFeeds((prevState) => {
          const updatedState = prevState.map((f) => {
            if (f.key === key) {
              return {
                ...f,
                lastPrice: resp.currentRoundResult?.result,
                lastResult: resp,
              };
            }
            return f;
          });
          return updatedState;
        });
      }
      return true;
    } catch (error) {
      console.error(error);
    }
    return false;
  };

  return { feeds, refreshPrice };
};

export default useSwitchboard;
