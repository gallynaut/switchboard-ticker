import { PublicKey } from "@solana/web3.js";
import { AggregatorState } from "@switchboard-xyz/switchboard-api";

export interface SwitchboardFeed {
  key: string;
  symbol: string;
  isSolana?: boolean;
  lastPrice?: number | null;
  lastResult?: AggregatorState;
}
