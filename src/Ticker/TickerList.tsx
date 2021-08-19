import * as React from "react";
import "./styles.css";

interface TickerListProps {
  name?: string;
  slideSpeed?: number; // @TODO not implemented
  visibleItems?: number; // @TODO not implemented
  isNewsTicker?: boolean;
  children?: any;
}

const TickerList: React.FunctionComponent<TickerListProps> = ({
  slideSpeed,
  visibleItems,
  children,
  isNewsTicker,
}) => {
  return (
    <div className="ticker">
      <div className="ticker-list">{children}</div>
      {!isNewsTicker ? <div className="ticker-list">{children}</div> : ""}
    </div>
  );
};

export default TickerList;
