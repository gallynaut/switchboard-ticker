import { useState, useEffect } from "react";
import { Connection, Cluster, clusterApiUrl, PublicKey } from "@solana/web3.js";
import {
  parseAggregatorAccountData,
  SWITCHBOARD_DEVNET_PID,
  AggregatorState,
} from "@switchboard-xyz/switchboard-api";
import { usePageVisibility } from "react-page-visibility";
import useInterval from "./useInterval";
import FEEDS from "./feeds.json";
import { SwitchboardFeed } from "./types";
import { getCurrentTime } from "./utils";

const useSwitchboard = () => {
  const connection = new Connection("https://api.devnet.solana.com");
  const [feeds, setFeeds] = useState<SwitchboardFeed[]>(FEEDS);
  const [loading, setLoading] = useState<boolean>(true);
  const isVisible = usePageVisibility();

  useEffect(() => {
    refreshPrices();
    checkLoaded();
  }, []);

  const refreshPrices = async (): Promise<void> => {
    feeds.forEach(async (feed) => {
      const pKey = new PublicKey(feed.key);
      const resp = await parseAggregatorAccountData(connection, pKey);
      if (resp.currentRoundResult?.result) {
        setFeeds((prevState) => {
          const updatedState = prevState.map((f) => {
            if (feed.key === f.key) {
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
    });
  };
  const checkLoaded = () => {
    let finishedLoading = true;
    feeds.forEach((feed) => {
      if (feed.lastPrice === undefined || feed.lastPrice === null) {
        finishedLoading = false;
      }
    });
    setLoading(!finishedLoading);
    console.log("Finished loading?", finishedLoading);
  };

  // every 5 seconds
  useInterval(() => {
    if (isVisible) {
      if (loading) {
        checkLoaded();
      }
      // console.log(getCurrentTime(), " Refreshing");
      refreshPrices();
    }
  }, 5000);

  return { feeds, loading };
};

export default useSwitchboard;
