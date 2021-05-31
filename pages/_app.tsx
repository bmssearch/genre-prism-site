import "../styles/globals.scss";

import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import { useEffect } from "react";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00ABAD",
      contrastText: "#FFFFFF",
    },
  },
  overrides: {
    MuiButton: {
      contained: {
        boxShadow: "none",
        borderRadius: 6,
        fontWeight: "bold",
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  // Remove the server-side injected CSS.
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
