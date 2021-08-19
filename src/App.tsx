import { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Divider,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import { usePageVisibility } from "react-page-visibility";
import { SwitchboardNiceTicker } from "./Ticker";
import useSwitchboard from "./useSwitchboard";
import { SwitchboardCard, SwitchboardResponse } from "./Switchboard";
import "./App.css";
import "typeface-roboto";

export default function App() {
  const { feeds, loading } = useSwitchboard();
  const [selected, setSelected] = useState<string>("SOL");
  const isVisible = usePageVisibility();

  return (
    <Box>
      <SwitchboardNiceTicker tickers={feeds} setSelected={setSelected} />

      <Container sx={{ marginTop: 3, width: "100%" }}>
        <h2 className="title">Switchboard Tickers</h2>
        <Divider sx={{ marginBottom: 2, marginTop: 0 }} />
        <Grid container spacing={2} sx={{ display: "flex" }}>
          <Grid
            container
            item
            xs={12}
            md={4}
            spacing={3}
            sx={{ height: "100%" }}
          >
            {feeds.map((feed) => {
              return (
                <Grid item xs={12} key={feed.key} sx={{ mx: 3 }}>
                  <SwitchboardCard
                    symbol={feed.symbol}
                    lastPrice={feed.lastPrice}
                    setSelected={setSelected}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={8}
            spacing={1}
            alignItems="center"
            direction="column"
            sx={{ width: "100%" }}
          >
            <Grid item xs={12} sx={{ width: "100%" }}>
              <Grid
                container
                item
                xs={12}
                sx={{ width: "100%" }}
                alignItems="center"
              >
                <h1 className="selected-feed">{selected}</h1>
              </Grid>
              <Grid item>
                <SwitchboardResponse
                  lastResult={
                    feeds.find((feed) => feed.symbol === selected)?.lastResult
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
