import fs from "fs";
import https from "https";

const options = {
  headers: {
    "User-Agent": "curl/7.68.0"
  }
};

https.get(process.argv[2], options, (res) => {
  let data = "";
  res.on("data", (chunk) => data += chunk);
  res.on("end", () => console.log(data));
});
