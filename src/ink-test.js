import React, { useState } from "react";
import { render, Box, Text, useApp } from "ink";
import { Spinner, TextInput, StatusMessage } from "@inkjs/ui";
// import { Select } from "@inkjs/ui";
import { downloadBook } from "./downloadBook.js";

function App() {
  const { exit } = useApp();
  const [selectState, setSelectState] = useState("options"); // options || urlInput
  const [url, setURL] = useState("");
  const [value, setValue] = useState();
  const [isFetching, setIsFetching] = useState(false);
  // const [isDownloadComplete, setIsDownloadComplete] = useState(null);
  const [downloadStatus, setDownloadStatus] = useState(null); // DOWNLOADING || COMPLETE

  const updateUrl = (bookUrl) => {
    console.log(bookUrl, "sdfdsf");
    setIsFetching(true);
    downloadBook({ DOWNLOAD_URL: bookUrl, setIsFetching, setDownloadStatus });
    exit();
  };

  return (
    <>
      <Box justifyContent="center">
        <Text>Ebangla Library Downloader</Text>
      </Box>

      <Box flexDirection="column">
        {isFetching ? (
          <Spinner label="Loading" />
        ) : (
          <TextInput placeholder="Enter Ebook URL..." onSubmit={updateUrl} />
        )}
      </Box>

      <Box flexDirection="column" padding={2}>
        {downloadStatus === "COMPLETE" && (
          <StatusMessage variant="success">Success</StatusMessage>
        )}
      </Box>

      {/* <Box flexDirection="column" gap={1}>
        {selectState === "options" && (
          <Box padding={2} flexDirection="column" gap={1}>
            <Select
              options={[
                {
                  label: "Use a default image",
                  value: "default",
                },
                {
                  label: "Provide an Image URL",
                  value: "url",
                },
              ]}
              onChange={(value) => {
                setValue(value);
                setSelectState("urlInput");
              }}
            />

            <Text>Selected value: {value}</Text>
          </Box>
        )}

        {value === "url" && (
          <>
            <Box flexDirection="column">
              <TextInput
                placeholder="Enter Image URL..."
                onSubmit={(url) => {
                  setURL(url);
                }}
              />
            </Box>

            <Box flexDirection="column">
              <Text>Image URL: "{url}"</Text>
            </Box>
          </>
        )}
      </Box> */}
    </>
  );
}

const app = render(<App />);
await app.waitUntilExit();
