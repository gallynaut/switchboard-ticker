import React, { FC } from "react";
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { AggregatorState } from "@switchboard-xyz/switchboard-api";
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
      {selected ? (
        <Box>
          <Card
            elevation={6}
            raised
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: 7,
              opacity: 0.75,
            }}
          >
            <Typography variant="subtitle1" sx={{ m: 2 }}>
              {JSON.stringify(selected.lastResult, null, 2)}
            </Typography>
          </Card>
        </Box>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default SwitchboardResponse;
