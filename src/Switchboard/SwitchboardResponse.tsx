import React, { FC } from "react";
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActionArea,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  Tooltip,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import { AggregatorState } from "@switchboard-xyz/switchboard-api";
import { PublicKey, PublicKeyInitData } from "@solana/web3.js";
import solanalogo from "../static/solana.png";
import { formatCurrency, getPublicKeyString } from "../utils";

type SwitchboardResponseProps = {
  lastResult: AggregatorState | undefined;
};

const SwitchboardResponse: FC<SwitchboardResponseProps> = ({
  lastResult,
}: SwitchboardResponseProps) => {
  const fulfilKey = getPublicKeyString(lastResult?.fulfillmentManagerPubkey);
  const optimizeResult = getPublicKeyString(
    lastResult?.parseOptimizedResultAddress
  );
  return (
    <>
      <Box>
        <Card
          elevation={6}
          raised
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: 7,
            opacity: 0.75,
            width: "100%",
            minHeight: "500px",
          }}
        >
          {typeof lastResult === "undefined" ? (
            <CircularProgress />
          ) : (
            <Grid
              container
              spacing={3}
              alignItems="baseline"
              direction="column"
              sx={{ mx: 2 }}
            >
              <List>
                <Grid item xs={12}>
                  <ListItem>
                    <Tooltip
                      title="switchboard config version"
                      aria-label="switchboard config version"
                    >
                      <Typography variant="subtitle1">
                        <b>Version:</b>&nbsp;{lastResult?.version}
                      </Typography>
                    </Tooltip>
                  </ListItem>
                </Grid>
                <Grid item xs={12}>
                  <ListItem>
                    <Typography variant="subtitle1">
                      <b>Fulfilment Manager:</b>&nbsp;
                      <Link
                        href={`https://solanabeach.io/address/${fulfilKey}`}
                        target="_blank"
                        rel="noopener"
                        color="inherit"
                        underline="hover"
                      >
                        {fulfilKey}
                      </Link>
                    </Typography>
                  </ListItem>
                </Grid>
                <Grid item xs={12}>
                  <ListItem>
                    <Typography variant="subtitle1">
                      <b>Optimized Result:</b>&nbsp;
                      <Link
                        href={`https://solanabeach.io/address/${optimizeResult}`}
                        target="_blank"
                        rel="noopener"
                        color="inherit"
                        underline="hover"
                      >
                        {optimizeResult}
                      </Link>
                    </Typography>
                  </ListItem>
                </Grid>
                <Divider />
                {/* ORACLE RESPONSES GO HERE WITH COLUMNS */}
              </List>
            </Grid>
          )}

          {/* <Typography variant="subtitle1" sx={{ m: 2 }}>
            {JSON.stringify(selected?.lastResult, null, 2)}
          </Typography> */}
        </Card>
      </Box>
    </>
  );
};

export default SwitchboardResponse;
