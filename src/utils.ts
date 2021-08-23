import { keyframes } from "@emotion/react";
import { PublicKey, PublicKeyInitData } from "@solana/web3.js";

export const formatCurrency = (price: number | null | undefined) => {
  if (price) {
    if (price < 1) {
      return currencyFormatter4.format(price);
    }
    if (price > 1 && price < 20) {
      return currencyFormatter3.format(price);
    }
    if (price > 1000) {
      return currencyFormatter0.format(price);
    }
    return currencyFormatter2.format(price);
  }
  return "N/A";
};

const currencyFormatter0 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
const currencyFormatter2 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const currencyFormatter3 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 3,
});
const currencyFormatter4 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 4, // (causes 2500.99 to be printed as $2,501)
});

export const getCurrentTime = (): string => {
  const today = new Date();
  const hours =
    today.getHours() > 12
      ? (today.getHours() - 12).toLocaleString("en-US", {
          minimumIntegerDigits: 1,
        })
      : today.getHours().toLocaleString("en-US", {
          minimumIntegerDigits: 1,
        });
  const minutes = today.getMinutes().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });
  const seconds = today.getSeconds().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });
  const timeOfDay = today.getHours() > 12 ? "PM" : "AM";
  return `${hours}:${minutes}:${seconds} ${timeOfDay}`;
};

export const getPublicKeyString = (key: Uint8Array | undefined): string => {
  if (!key) {
    return "";
  }
  const pubKey: PublicKey = new PublicKey(key);
  return pubKey.toString();
};
