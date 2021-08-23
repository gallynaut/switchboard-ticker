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
import { DiscordIcon, MediumIcon, SwitchboardIcon } from "../static/icons";
import "../App.css";

type TickerProps = {
  solOnly: boolean;
  setSolOnly: React.Dispatch<React.SetStateAction<boolean>>;
  lastUpdated: string;
};

const SwitchboardHeader: FC<TickerProps> = ({
  solOnly,
  setSolOnly,
  lastUpdated,
}) => {
  return (
    <Card
      sx={{ background: "transparent", borderRadius: 2, width: "100%" }}
      elevation={0}
    >
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid
          item
          container
          xs={12}
          md={6}
          direction="column"
          alignItems="baseline"
          spacing={1}
        >
          <Grid item xs={12}>
            <h2 className="title">Solana Oracle</h2>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              sx={{ marginLeft: 1 }}
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
          <Grid item xs={12}>
            <Typography component="span" variant="h6" sx={{ marginLeft: 3 }}>
              {`Last Updated: `}
            </Typography>
            <Typography component="span" variant="h5" sx={{ marginLeft: 3 }}>
              {lastUpdated}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            Powered By:{" "}
            <SwitchboardIcon sx={{ fontWeight: 300, fontSize: "1.5em" }} />{" "}
            Switchboard.xyz
          </Typography>
          <Typography variant="body1">
            Switchboard is a community driven decentralized oracle network built
            on Solana. Check out their social media to learn more:
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
