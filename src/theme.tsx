import red from "@material-ui/core/colors/red";
import { createTheme } from "@material-ui/core/styles";
import { fontFamily } from "@material-ui/system";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#f890e7",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#0bd3d3",
      paper: "#EEEEEE",
    },
  },
});

export default theme;
