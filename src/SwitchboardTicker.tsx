import React, { FC, useState } from "react";
import { Button, Card } from "@material-ui/core";
import Ticker from "react-ticker";
import PageVisibility from "react-page-visibility";
import { SwitchboardFeed } from "./types";
import TickerCard from "./TickerCard";
import solanalogo from "./static/solana.png";
import { formatCurrency } from "./utils";

type TickerProps = {
  tickers: SwitchboardFeed[];
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const SwitchboardTicker: FC<TickerProps> = ({
  tickers,
  setSelected,
}: TickerProps) => {
  const [pageIsVisible, setPageIsVisible] = useState(true);

  const handleVisibilityChange = (isVisible: boolean) => {
    setPageIsVisible(isVisible);
  };

  const tickerCards = tickers.map((ticker) => (
    <TickerCard
      key={ticker.key}
      symbol={ticker.symbol}
      lastPrice={ticker.lastPrice}
      setSelected={setSelected}
    />
  ));

  const tickerString: string[] = tickers.map((t) => {
    return `${t.symbol} - ${formatCurrency(t.lastPrice)}`;
  });

  return <>{tickerCards}</>;
};

export default SwitchboardTicker;
