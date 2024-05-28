# Vulnerability Scanner

This project is a simple vulnerability scanner that checks for SQL Injection vulnerabilities and runs an Nmap scan on a target URL. It logs the results to a Splunk instance.

## Getting Started

1. Clone the repository.
2. Install the dependencies by running `npm install` in the project root directory.
3. Replace `"YOUR_SPLUNK_HEC_TOKEN"` and `"https://your-splunk-instance:8088"` in `index.js` with your actual Splunk HEC token and instance URL.
4. Run the scanner by executing `node index.js` in the terminal.

## Methods

- `sendToSplunk(message)`: This function sends a message to the configured Splunk instance. The message should be an object with the data to log.

- `checkSqlInjection(url)`: This is an asynchronous function that checks the provided URL for SQL Injection vulnerabilities.

- `runNmapScan(target)`: This function runs an Nmap scan on the provided target URL. It logs the scan results to Splunk.

- `runScans()`: This is the main function that runs the scans. It calls `checkSqlInjection` and `runNmapScan` with a target URL.

## Dependencies

- `axios`: Used to make HTTP requests.
- `nmap` and `node-nmap`: Used to run Nmap scans.
- `splunk-logging`: Used to log data to a Splunk instance.

## Note

After running the scans, log into your Splunk instance and navigate to the search bar to search for the logs sent from the Node.js script. Use the search term `index=<your-index> sourcetype=<your-sourcetype>` to find your logs.
