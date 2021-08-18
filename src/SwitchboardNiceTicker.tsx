import React, { FC } from "react";
import Ticker, { FinancialTicker } from "nice-react-ticker";
import { Box, Paper, Button, Card, Divider } from "@material-ui/core";
import { SwitchboardFeed } from "./types";
import TickerCard from "./TickerCard";
import "./App.css";

type TickerProps = {
  tickers: SwitchboardFeed[];
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const SwitchboardNiceTicker: FC<TickerProps> = ({
  tickers,
  setSelected,
}: TickerProps) => {
  const tickerCards = tickers.map((ticker) => (
    <Box sx={{ minWidth: "120px", mx: 2 }} key={ticker.key}>
      <TickerCard
        symbol={ticker.symbol}
        lastPrice={ticker.lastPrice}
        setSelected={setSelected}
      />
    </Box>
  ));

  return (
    <div className="switchboard-ticker">
      <Ticker>{tickerCards}</Ticker>
      {/* <Divider /> */}
    </div>
  );
};

export default SwitchboardNiceTicker;
