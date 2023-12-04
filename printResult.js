function printResults(results) {
    for (const [source, lines] of Object.entries(results)) {
        if (lines.length > 0) {
            lines.forEach(line => {
                console.log(`${source} : ${line}`);
            });
        }
    }
}

module.exports = { printResults };
