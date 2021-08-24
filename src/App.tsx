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
import { getCurrentTime } from "./utils";

export default function App() {
  const isVisible = usePageVisibility();
  const { feeds, refreshPrice } = useSwitchboard();
  const [selected, setSelected] = useState<string>("SOL");
  const [lastUpdated, setLastUpdated] = useState<string>("");
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

  const refreshFeeds = async () => {
    setLastUpdated(getCurrentTime());
    filteredFeeds.forEach(async (feed) => {
      const result = await refreshPrice(feed.key);
      if (!result) {
        console.log(getCurrentTime(), "error fetching", feed.symbol);
      }
    });
  };

  useEffect(() => {
    setFilteredFeeds(filterList());
  }, [solOnly, feeds]);

  useEffect(() => {
    if (isVisible) {
      refreshFeeds();
    }
  }, [isVisible]);

  // every 15 seconds
  useInterval(() => {
    if (isVisible) {
      refreshFeeds();
    }
  }, 15000);

  return (
    <Box>
      <SwitchboardNiceTicker
        tickers={filteredFeeds}
        setSelected={setSelected}
      />

      <Container sx={{ marginTop: 3, width: "100%" }}>
        <SwitchboardHeader
          solOnly={solOnly}
          setSolOnly={setSolOnly}
          lastUpdated={lastUpdated}
        />
        <Divider sx={{ marginBottom: 2, marginTop: 0 }} />
        <Grid container spacing={2} sx={{ display: "flex", height: "100%" }}>
          <Grid
            container
            item
            xs={12}
            md={4}
            spacing={3}
            component={Box}
            className="switchboard-cards"
            sx={{
              height: { xs: "100%", md: "70vh" },
              overflow: "auto",
              overflowY: "scroll",
              direction: "rtl",
              my: 2,
            }}
            order={{ xs: 2, md: 1 }}
          >
            <SwitchboardCardList
              tickers={filteredFeeds}
              setSelected={setSelected}
            />
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
            order={{ xs: 1, md: 2 }}
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
                  feed={feeds.find((feed) => feed.symbol === selected)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
