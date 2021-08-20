import { useState, useEffect } from "react";
import { Box, Container, Grid, Divider } from "@material-ui/core";
import { usePageVisibility } from "react-page-visibility";
import { SwitchboardNiceTicker } from "./Ticker";
import useSwitchboard from "./useSwitchboard";
import {
  SwitchboardCardList,
  SwitchboardResponse,
  SwitchboardHeader,
} from "./Switchboard";
import useInterval from "./useInterval";
import "./App.css";
import "typeface-roboto";
import { SwitchboardFeed } from "./types";

export default function App() {
  const { feeds, refreshPrice } = useSwitchboard();
  const [selected, setSelected] = useState<string>("SOL");
  const [solOnly, setSolOnly] = useState<boolean>(true);
  const filterList = (): SwitchboardFeed[] => {
    if (solOnly) {
      return feeds.filter((feed) => feed.isSolana);
    }
    return feeds;
  };
  const [filteredFeeds, setFilteredFeeds] = useState<SwitchboardFeed[]>(
    filterList()
  );
  const isVisible = usePageVisibility();

  const refreshFeeds = () => {
    filteredFeeds.forEach((feed) => {
      refreshPrice(feed.key);
    });
  };

  useEffect(() => {
    setFilteredFeeds(filterList());
  }, [solOnly, feeds]);

  // every 30 seconds
  useInterval(() => {
    if (isVisible) {
      refreshFeeds();
    }
  }, 10000);

  return (
    <Box>
      <SwitchboardNiceTicker
        tickers={filteredFeeds}
        setSelected={setSelected}
      />

      <Container sx={{ marginTop: 3, width: "100%" }}>
        <SwitchboardHeader solOnly={solOnly} setSolOnly={setSolOnly} />
        <Divider sx={{ marginBottom: 2, marginTop: 0 }} />
        <Grid container spacing={2} sx={{ display: "flex", height: "100%" }}>
          <SwitchboardCardList
            tickers={filteredFeeds}
            setSelected={setSelected}
          />
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
