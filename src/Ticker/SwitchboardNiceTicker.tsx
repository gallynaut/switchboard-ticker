import React, { FC } from "react";
import { Box, Paper, Button, Card, Divider } from "@material-ui/core";
import TickerList from "./TickerList";
import { SwitchboardFeed } from "../types";
import TickerCard from "./TickerCard";

type TickerProps = {
  tickers: SwitchboardFeed[];
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const SwitchboardNiceTicker: FC<TickerProps> = ({
  tickers,
  setSelected,
}: TickerProps) => {
  const tickerCards = tickers.map((ticker) => (
    <Box sx={{ minWidth: "120px", mx: 1 }} key={ticker.key}>
      <TickerCard
        symbol={ticker.symbol}
        lastPrice={ticker.lastPrice}
        setSelected={setSelected}
      />
    </Box>
  ));

  // Bad solution but doubling small arrays fixes
  // bug where cards werent wrapping. setting ticker list
  // width to 100% fixes that but causes other overlap
  return (
    <div className="switchboard-ticker">
      <TickerList>
        {tickerCards.length < 15
          ? tickerCards.concat(tickerCards)
          : tickerCards}
      </TickerList>
    </div>
  );
};

export default SwitchboardNiceTicker;
