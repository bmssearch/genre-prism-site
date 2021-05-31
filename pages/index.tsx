import { Box, Button, CircularProgress, TextField } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";

import Head from "next/head";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import styles from "./index.module.scss";

export default function Home() {
  const [input, setInput] = useState("Drum'n'Bass");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isLoading) return;
      setIsLoading(true);
      const json = await fetchResult(input);
      setResponse(json);
      setIsLoading(false);
    },
    [input, isLoading]
  );

  useEffect(() => {
    (async () => {
      const json = await fetchResult(input);
      setResponse(json);
    })();
  }, []);

  return (
    <div className={styles.container}>
      <NextSeo
        title="BMS SEARCH genre prism"
        description="Genre name resolver"
        openGraph={{
          url: "https://genreprism.bmssearch.net/",
          title: "BMS SEARCH genre prism",
          description: "Genre name resolver",
          images: [
            {
              url: "https://genreprism.bmssearch.net/ogp.png",
            },
          ],
          site_name: "BMS SEARCH genre prism",
        }}
        twitter={{
          cardType: "summary",
        }}
      />

      <main className={styles.main}>
        <h1 className={styles.title}>
          <img
            src="/genreprism.svg"
            alt="BMS SEARCH genre prism"
            className={styles.logo}
          />
        </h1>

        <code className={styles.code}>
          https://api.genreprism.bmssearch.net/genres?name=
          <span style={{ fontWeight: "bold" }}>GenreName</span>
        </code>

        <Box marginTop={8} style={{ width: "100%" }}>
          <Box display="flex" style={{ width: "100%", height: 56 }} clone>
            {isLoading ? (
              <Box justifyContent="center">
                <CircularProgress />
              </Box>
            ) : (
              <form onSubmit={onSubmit}>
                <TextField
                  label="Genre Name"
                  variant="outlined"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  autoCorrect="off"
                  spellCheck={false}
                  style={{ flex: 1, marginRight: 8 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                  style={{ width: 80 }}
                >
                  Try
                </Button>
              </form>
            )}
          </Box>

          <Editor
            className={styles.editor}
            style={{ marginTop: 8 }}
            mode="json"
            theme="nord_dark"
            readOnly={true}
            width="100%"
            height="300"
            setOptions={{ useWorker: false }}
            value={response}
          />
        </Box>
      </main>
    </div>
  );
}

const Editor = dynamic(
  async () => {
    const ace = await import("react-ace");
    require("ace-builds/src-noconflict/mode-json");
    require("ace-builds/src-noconflict/theme-nord_dark");
    return ace;
  },
  { ssr: false }
);

const fetchResult = async (input: string) => {
  const res = await fetch(
    `https://api.genreprism.bmssearch.net/genres?name=${encodeURIComponent(
      input
    )}`
  );
  const json = await res.json();
  return JSON.stringify(json, null, 2);
};
