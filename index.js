const { search } = require('./searchText');
const { printResults } = require('./printResult');
const { translateInput } = require('./inputTranslate');
const { GREP_COMMAND } = require('./constants');

const ARGS_START_INDEX = 2;
const GREP_START_INDEX = 1;


async function main() {
    const args = process.argv.slice(ARGS_START_INDEX);
    if (isFirstArgumentGrepCommand(args)) {
        const translatedInput = translateInput(args.slice(GREP_START_INDEX));
        const results = await search(translatedInput);
        printResults(results);
    } else {
        console.log("Usage: grep [options] [word] [sources]");
    }
}

const isFirstArgumentGrepCommand = (args) => {
    return args.length > 0 && args[0] === GREP_COMMAND;
}

main();
