import { FC } from "react";
import {
  Box,
  Card,
  CardActionArea,
  Link,
  IconButton,
  Grid,
  Typography,
} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import LanguageIcon from "@material-ui/icons/Language";
import TelegramIcon from "@material-ui/icons/Telegram";
import SwitchboardCard from "./SwitchboardCard";
import "../App.css";
import { SwitchboardFeed } from "../types";

type SwitchboardCardListProps = {
  tickers: SwitchboardFeed[];
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const SwitchboardCardList: FC<SwitchboardCardListProps> = ({
  tickers,
  setSelected,
}) => {
  return (
    <Grid
      container
      item
      xs={12}
      md={4}
      spacing={3}
      component={Box}
      className="switchboard-cards"
      sx={{
        height: "70vh",
        overflow: "auto",
        overflowY: "scroll",
        direction: "rtl",
        my: 2,
      }}
    >
      {tickers.map((feed) => {
        return (
          <Grid item xs={12} key={feed.key} sx={{ mx: 3, direction: "ltr" }}>
            <SwitchboardCard
              symbol={feed.symbol}
              lastPrice={feed.lastPrice}
              setSelected={setSelected}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SwitchboardCardList;
