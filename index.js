const { default: axios } = require("axios");
const fs = require("fs");

const data = [];

const initialLat = 45.367858;
const finalLat = 45.496929;
const initialLng = 10.902851;
const finalLng = 11.087134;

function writeResults(data) {
  console.log("Stringifying results");
  const json = JSON.stringify(data, undefined, 4);

  console.log("Writing results to file");
  fs.writeFile("data.json", json, "utf8", (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function writeLog(message) {
  fs.appendFile("log.txt", message, "utf8", (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function task(i) {
  setTimeout(function () {
    const lat = initialLat + ((finalLat - initialLat) / 50) * i;
    const url = `https://api.opentopodata.org/v1/eudem25m?locations=${lat},${initialLng}|${lat},${finalLng}&samples=50`;
    console.log("🚀 Sending request for lat =", lat);
    console.log("URL: ", url);

    axios
      .get(url)
      .then(function (response) {
        const logMessage = `Successfully fetched ${response.data.results.length} results for lat=${lat}\n`;
        writeLog(logMessage);
        data.push(response.data.results);
        if (data.length === 50) {
          writeResults(data);
        }
      })
      .catch(function (error) {
        console.error(error);
        const errorMessage = `Got error while fetching data for lat=${lat}\n`;
        writeLog(errorMessage);
        data.push([{ error: lat }]);
      });
  }, 2000 * i);
}

console.log("Starting tasks for fething data");
for (let i = 0; i < 50; i++) {
  task(i);
}
