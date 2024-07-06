# Ebangla Library Downloader

This Node.js library enables users to download books from [Ebangla Library](https://www.ebanglalibrary.com/) as EPUB files for offline reading. It converts the online books available on the platform into a portable e-book format.

We extend our sincere gratitude to the Ebangla Library team for their dedication in making Bengali literature accessible to a wider audience. Their efforts have significantly contributed to the preservation and dissemination of Bengali books.

Note: This tool is intended for personal use only. Please respect copyright laws and support authors and publishers whenever possible.

## System Requirement:

- Node.js must be installed on your computer to use this library.

## Usage:

- Update the `DOWNLOAD_URL` variable inside the `src/config.js` file. It should be the Ebook URL of the specific book.

- For example for [ব্রেজিলের কালো বাঘ ও অন্যান্য](https://www.ebanglalibrary.com/books/%e0%a6%ac%e0%a7%8d%e0%a6%b0%e0%a7%87%e0%a6%9c%e0%a6%bf%e0%a6%b2%e0%a7%87%e0%a6%b0-%e0%a6%95%e0%a6%be%e0%a6%b2%e0%a7%8b-%e0%a6%ac%e0%a6%be%e0%a6%98-%e0%a6%93-%e0%a6%85%e0%a6%a8%e0%a7%8d%e0%a6%af/), we will update the `config.js` to

```
export const DOWNLOAD_URL = "https://www.ebanglalibrary.com/books/%e0%a6%ac%e0%a7%8d%e0%a6%b0%e0%a7%87%e0%a6%9c%e0%a6%bf%e0%a6%b2%e0%a7%87%e0%a6%b0-%e0%a6%95%e0%a6%be%e0%a6%b2%e0%a7%8b-%e0%a6%ac%e0%a6%be%e0%a6%98-%e0%a6%93-%e0%a6%85%e0%a6%a8%e0%a7%8d%e0%a6%af/";
```

- Run the nodejs script with `npm run bundle`

Files Validated with https://www.bookmarketing.pro/epub-validator.html

Greatly inspired from the work of Readlist https://github.com/jimniels/readlists

This article helped a lot understanding Epub architecture https://www.edrlab.org/open-standards/anatomy-of-an-epub-3-file/
