import React, { useState } from "react";
import { render, Box, Text, useApp } from "ink";
import { Spinner, TextInput, StatusMessage } from "@inkjs/ui";
// import { Select } from "@inkjs/ui";
import { downloadBook } from "./downloadBook.js";
function App() {
  const {
    exit
  } = useApp();
  const [selectState, setSelectState] = useState("options"); // options || urlInput
  const [url, setURL] = useState("");
  const [value, setValue] = useState();
  const [isFetching, setIsFetching] = useState(false);
  // const [isDownloadComplete, setIsDownloadComplete] = useState(null);
  const [downloadStatus, setDownloadStatus] = useState(null); // DOWNLOADING || COMPLETE

  const updateUrl = bookUrl => {
    console.log(bookUrl, "sdfdsf");
    setIsFetching(true);
    downloadBook({
      DOWNLOAD_URL: bookUrl,
      setIsFetching,
      setDownloadStatus
    });
    exit();
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Box, {
    justifyContent: "center"
  }, /*#__PURE__*/React.createElement(Text, null, "Ebangla Library Downloader")), /*#__PURE__*/React.createElement(Box, {
    flexDirection: "column"
  }, isFetching ? /*#__PURE__*/React.createElement(Spinner, {
    label: "Loading"
  }) : /*#__PURE__*/React.createElement(TextInput, {
    placeholder: "Enter Ebook URL...",
    onSubmit: updateUrl
  })), /*#__PURE__*/React.createElement(Box, {
    flexDirection: "column",
    padding: 2
  }, downloadStatus === "COMPLETE" && /*#__PURE__*/React.createElement(StatusMessage, {
    variant: "success"
  }, "Success")));
}
const app = render( /*#__PURE__*/React.createElement(App, null));
await app.waitUntilExit();
