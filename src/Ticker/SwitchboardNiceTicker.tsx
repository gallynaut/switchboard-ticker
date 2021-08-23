import React, { FC } from "react";
import {
  Box,
  Paper,
  Typography,
  Hidden,
  Button,
  Card,
  Divider,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
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
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.up("xl"));

  const getTickerCards = () => {
    return tickers.map((ticker) => (
      <Box sx={{ minWidth: "120px", mx: 1 }} key={uuidv4()}>
        <TickerCard
          symbol={ticker.symbol}
          lastPrice={ticker.lastPrice}
          setSelected={setSelected}
        />
      </Box>
    ));
  };

  // Bad solution but doubling small arrays fixes
  // bug where cards werent wrapping. setting ticker list
  // width to 100% fixes that but causes other overlap
  return (
    <div className="switchboard-ticker">
      <TickerList>
        {getTickerCards()}
        {tickers.length < 15 && lgScreen ? getTickerCards() : <></>}
        {/* <Hidden mdDown>
        </Hidden> */}
      </TickerList>
    </div>
  );
};

export default SwitchboardNiceTicker;
