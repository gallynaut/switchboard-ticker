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
  List,
  ListItem,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { AggregatorState } from "@switchboard-xyz/switchboard-api";
import { PublicKey, PublicKeyInitData } from "@solana/web3.js";
import solanalogo from "../static/solana.png";
import { formatCurrency } from "../utils";
import { SwitchboardFeed } from "../types";

type SwitchboardResponseProps = {
  selected: SwitchboardFeed | undefined;
};

const SwitchboardResponse: FC<SwitchboardResponseProps> = ({
  selected,
}: SwitchboardResponseProps) => {
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
            minHeight: "300px",
          }}
        >
          {typeof selected?.lastResult === "undefined" ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={3} alignItems="center" direction="column">
              <List>
                <Grid item xs={12}>
                  <ListItem>
                    <Typography variant="subtitle1" sx={{ m: 2 }}>
                      {selected.lastResult?.version}
                    </Typography>
                  </ListItem>
                </Grid>
                {/* <Grid item xs={12}>
                  <ListItem>
                    <Typography variant="subtitle1" sx={{ m: 2 }}>
                      {typeof symbol.lastResult.fulfillmentManagerPubkey ===
                      "undefined"
                        ? ""
                        : new PublicKey(
                            symbol.lastResult?.fulfillmentManagerPubkey
                          )}
                    </Typography>
                  </ListItem>
                </Grid> */}
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
