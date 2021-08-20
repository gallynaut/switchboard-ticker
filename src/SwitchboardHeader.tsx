import { FC } from "react";
import {
  Card,
  CardActionArea,
  FormControlLabel,
  Switch,
  Link,
  IconButton,
  Grid,
  Typography,
} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import LanguageIcon from "@material-ui/icons/Language";
import TelegramIcon from "@material-ui/icons/Telegram";
import DiscordIcon from "./static/DiscordIcon";
import MediumIcon from "./static/MediumIcon";
import "./App.css";

type TickerProps = {
  solOnly: boolean;
  setSolOnly: React.Dispatch<React.SetStateAction<boolean>>;
};

const SwitchboardHeader: FC<TickerProps> = ({ solOnly, setSolOnly }) => {
  return (
    <Card
      sx={{ background: "transparent", borderRadius: 2, width: "100%" }}
      elevation={0}
    >
      {/* <Link
          href="https://switchboard.xyz/"
          target="_blank"
          rel="noopener"
          color="inherit"
          underline="none"
        > */}
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6}>
          <h2 className="title">Switchboard Tickers</h2>
          <FormControlLabel
            control={
              <Switch
                checked={solOnly}
                onChange={() => setSolOnly(!solOnly)}
                name="Solana Tokens Only"
              />
            }
            label={<div className="solana-switch">Solana Only</div>}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            Switchboard is a community driven decentralized oracle network on
            Solana
          </Typography>
          <IconButton
            size="medium"
            href="https://switchboard.xyz"
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            <LanguageIcon />
          </IconButton>
          &nbsp;&nbsp;
          <IconButton
            size="medium"
            href="https://twitter.com/switchboardxyz"
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            <TwitterIcon />
          </IconButton>
          &nbsp;&nbsp;
          <IconButton
            size="medium"
            href="https://t.me/switchboardxyz"
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            <TelegramIcon />
          </IconButton>
          &nbsp;&nbsp;
          <IconButton
            size="medium"
            href="https://discord.com/invite/sNeGymrabT"
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            <DiscordIcon />
          </IconButton>
          &nbsp;&nbsp;
          <IconButton
            size="medium"
            href="https://switchboardxyz.medium.com/"
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            <MediumIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SwitchboardHeader;
