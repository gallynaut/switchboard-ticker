import React, { FC } from "react";
import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { formatCurrency } from "../utils";
import { SolanaIcon, SolanaGradientIcon, SolanaLogo } from "../static/icons";

type CardProps = {
  symbol: string;
  lastPrice: number | null | undefined;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const SwitchboardCard: FC<CardProps> = ({
  symbol,
  lastPrice,
  setSelected,
}: CardProps) => {
  const handleClick = () => {
    setSelected(symbol);
  };

  return (
    <Card
      elevation={6}
      raised
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: 7,
        opacity: 0.75,
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
        <Avatar sx={{ mx: 2 }} alt="logo" src={SolanaLogo} />
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h4" component="span">
            {symbol}
          </Typography>
          {formatCurrency(lastPrice) === "N/A" ? (
            <CircularProgress />
          ) : (
            <Typography variant="h6" component="span" sx={{ height: 40 }}>
              {formatCurrency(lastPrice)}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SwitchboardCard;
