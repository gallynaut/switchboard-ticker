import React, { FC } from "react";
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Typography,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import solanalogo from "./static/solana.png";
import { formatCurrency } from "../utils";

type TickerCardProps = {
  symbol: string;
  lastPrice: number | null | undefined;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const TickerCard: FC<TickerCardProps> = ({
  symbol,
  lastPrice,
  setSelected,
}: TickerCardProps) => {
  const theme = useTheme();

  const handleClick = (e: any) => {
    setSelected(symbol);
  };

  return (
    <Card
      elevation={4}
      raised
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: 2,
        maxHeight: "80%",
        backgroundColor: "white",
      }}
      onClick={handleClick}
    >
      <CardActionArea
        sx={{
          display: "flex",
          alignItems: "left",
          justifyContent: "flex-start",
        }}
      >
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="subtitle1"
            component="span"
            sx={{ fontSize: "1.4rem" }}
          >
            {symbol}
          </Typography>
          <Typography
            variant="subtitle1"
            component="span"
            sx={{ color: "black" }}
          >
            {formatCurrency(lastPrice)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TickerCard;
