import React, { FC } from "react";
import {
  Box,
  Card,
  Grid,
  Hidden,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { formatCurrency, getPublicKeyString } from "../utils";
import { SwitchboardFeed } from "../types";

type SwitchboardResponseProps = {
  feed: SwitchboardFeed | undefined;
};

const SwitchboardResponse: FC<SwitchboardResponseProps> = ({
  feed,
}: SwitchboardResponseProps) => {
  const fulfilKey = getPublicKeyString(
    feed?.lastResult?.fulfillmentManagerPubkey
  );
  const optimizeResult = getPublicKeyString(
    feed?.lastResult?.parseOptimizedResultAddress
  );
  const configHeader = () => {
    return (
      <>
        <Grid item xs={12} md={4} order={{ xs: 1, md: 1 }}>
          <Tooltip
            title="switchboard config version"
            aria-label="switchboard config version"
          >
            <Typography variant="subtitle1">
              <b>Config Version:</b>&nbsp;{feed?.lastResult?.version}
            </Typography>
          </Tooltip>
        </Grid>
        <Grid item xs={12} md={8} order={{ xs: 3, md: 2 }}>
          <Tooltip
            title="minimum confirmations"
            aria-label="minimum confirmations"
          >
            <Typography variant="subtitle1">
              <b>Minimum Confirmations:</b>&nbsp;
              {feed?.lastResult?.configs?.minConfirmations
                ? feed?.lastResult?.configs?.minConfirmations
                : ""}
            </Typography>
          </Tooltip>
        </Grid>
        <Grid item xs={12} md={4} order={{ xs: 2, md: 3 }}>
          <Tooltip
            title="is switchboard config locked"
            aria-label="is switchboard config locked"
          >
            <Typography variant="subtitle1">
              <b>Config Locked:</b>&nbsp;
              {feed?.lastResult?.configs?.locked ? "True" : "False"}
            </Typography>
          </Tooltip>
        </Grid>
        <Grid item xs={12} md={8} order={{ xs: 4, md: 4 }}>
          <Tooltip
            title="minimum update delay"
            aria-label="minimum update delay"
          >
            <Typography variant="subtitle1">
              <b>Minimum Update Delay:</b>&nbsp;
              {feed?.lastResult?.configs?.minUpdateDelaySeconds
                ? `${feed?.lastResult?.configs?.minUpdateDelaySeconds}s`
                : ""}
            </Typography>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sx={{ m: 2 }} order={{ xs: 5, md: 5 }}>
          <Divider />
        </Grid>
      </>
    );
  };
  const managementKeys = () => {
    return (
      <Hidden mdDown>
        <Grid item xs={12} md={2} order={{ xs: 6, md: 6 }}>
          <Tooltip
            title="fulfillment manager public key"
            aria-label="fulfillment manager public key"
          >
            <Typography variant="subtitle1">
              <b>Fulfilment Manager:</b>&nbsp;
            </Typography>
          </Tooltip>
        </Grid>
        <Grid item xs={12} md={10} order={{ xs: 7, md: 7 }}>
          <Link
            href={`https://solanabeach.io/address/${fulfilKey}`}
            target="_blank"
            rel="noopener"
            color="inherit"
            underline="hover"
          >
            {fulfilKey}
          </Link>
        </Grid>
        <Grid item xs={12} sx={{ m: 1 }} order={{ xs: 8, md: 8 }} />
        <Grid item xs={12} md={2} order={{ xs: 9, md: 9 }}>
          <Tooltip
            title="optimized result public key"
            aria-label="optimized result public key"
          >
            <Typography variant="subtitle1">
              <b>Optimized Result:</b>&nbsp;
            </Typography>
          </Tooltip>
        </Grid>
        <Grid item xs={12} md={10} order={{ xs: 10, md: 10 }}>
          <Link
            href={`https://solanabeach.io/address/${optimizeResult}`}
            target="_blank"
            rel="noopener"
            color="inherit"
            underline="hover"
          >
            {optimizeResult}
          </Link>
        </Grid>
      </Hidden>
    );
  };
  const resultMedians = (): JSX.Element[] | JSX.Element => {
    if (!feed?.lastResult?.currentRoundResult?.medians) {
      return <Typography>No Values</Typography>;
    }
    const medians = feed?.lastResult?.currentRoundResult?.medians
      ?.filter((m) => m)
      .sort((a, b) => {
        return b - a;
      });
    const lastPrice: number = feed?.lastResult.currentRoundResult?.result
      ? feed?.lastResult.currentRoundResult?.result
      : -1;
    const medianElements: JSX.Element[] = medians.map((m) => (
      <ListItem key={uuidv4()}>
        <ListItemIcon>
          <ChevronRightIcon
            color={
              formatCurrency(lastPrice) === formatCurrency(m)
                ? "inherit"
                : "error"
            }
          />
        </ListItemIcon>
        <ListItemText primary={formatCurrency(m)} />
      </ListItem>
    ));

    return medianElements;
  };

  const nodes: number = feed?.lastResult?.currentRoundResult?.numSuccess
    ? feed?.lastResult?.currentRoundResult?.numSuccess
    : 0;

  const lastUpdated = () => {
    return (
      <Box order={{ xs: 99, md: 99 }}>
        <Typography component="span">Last Updated: </Typography>
        <Typography component="span">{feed?.lastUpdated} </Typography>
      </Box>
    );
  };

  return (
    <>
      <Box>
        <Card
          elevation={6}
          raised
          sx={{
            display: "flex",
            alignItems: "flex-start",
            borderRadius: 7,
            opacity: 0.75,
            width: "100%",
            minHeight: "550px",
            py: "50px",
          }}
        >
          {typeof feed === "undefined" ||
          typeof feed?.lastResult === "undefined" ? (
            <CircularProgress />
          ) : (
            <>
              <Grid
                container
                alignItems="flex-start"
                justifyContent="flex-start"
              >
                <Grid
                  container
                  item
                  md={9}
                  xs={12}
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  sx={{ paddingLeft: 2 }}
                >
                  {configHeader()}
                  {managementKeys()}
                  {/* {lastUpdated()} */}
                </Grid>
                <Grid
                  container
                  item
                  md={3}
                  xs={12}
                  justifyContent="center"
                  alignItems="center"
                  direction="column"
                >
                  <Grid item xs={12}>
                    <Typography variant="h5">
                      <b>Price:</b>&nbsp;
                      {feed?.lastResult?.currentRoundResult?.result
                        ? formatCurrency(
                            feed?.lastResult?.currentRoundResult?.result
                          )
                        : "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      <b>Nodes:</b>&nbsp;{nodes}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <List sx={{ my: 0, py: 0 }}>{resultMedians()}</List>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    position: "sticky",
                    bottom: 0,
                    right: 0,
                    zIndex: "modal",
                  }}
                >
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Typography component="span">Last Updated: </Typography>
                  <Typography component="span">{feed?.lastUpdated} </Typography>
                </Grid>
              </Grid>
              {/* ORACLE RESPONSES GO HERE WITH COLUMNS */}
            </>
          )}

          {/* <Typography variant="subtitle1" sx={{ m: 2 }}>
            {JSON.stringify(lastResult, null, 2)}
          </Typography> */}
        </Card>
      </Box>
    </>
  );
};

export default SwitchboardResponse;
