const axios = require("axios");
const nmap = require("node-nmap");
const SplunkLogger = require("splunk-logging").Logger;

// Configure Splunk logger
const config = {
  token: "YOUR_SPLUNK_HEC_TOKEN",
  url: "https://your-splunk-instance:8088",
};

const logger = new SplunkLogger(config);

function sendToSplunk(message) {
  logger.send(message, function (err, resp, body) {
    if (err) {
      console.error("Error sending to Splunk:", err);
    } else {
      console.log("Successfully sent to Splunk:", body);
    }
  });
}

// Function to check for SQL Injection vulnerability
async function checkSqlInjection(url) {
  try {
    const response = await axios.get(`${url}?id=' OR '1'='1`);
    if (response.status === 200 && response.data.includes("SQL syntax")) {
      console.log("SQL Injection vulnerability found!");
      sendToSplunk({ message: "SQL Injection vulnerability found at " + url });
    } else {
      console.log("No SQL Injection vulnerability found.");
    }
  } catch (error) {
    console.error("Error checking SQL Injection:", error);
  }
}

// Function to run Nmap scan
function runNmapScan(target) {
  const quickscan = new nmap.NmapScan(target);

  quickscan.on("complete", function (data) {
    console.log("Nmap scan data:", data);
    sendToSplunk({ message: "Nmap scan complete", data: data });
  });

  quickscan.on("error", function (error) {
    console.error("Nmap scan error:", error);
    sendToSplunk({ message: "Nmap scan error", error: error });
  });

  quickscan.startScan();
}

// Main function to run the scans
async function runScans() {
  const targetUrl = "https://demo.testfire.net/";
  //   const targetUrl = "http://crackme.cenzic.com";
  await checkSqlInjection(targetUrl);
  runNmapScan(targetUrl);
}

runScans();

// whats left

// Log into your Splunk instance.
// Navigate to the search bar and search for the logs you sent from your Node.js script.
// Use the search term index=<your-index> sourcetype=<your-sourcetype> to find your logs.
