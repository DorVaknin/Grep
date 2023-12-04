const { URL_PREFIX, FILE_PREFIX, FOLDER_PREFIX, GREP_COMMAND } = require('./constants')

const REVERSED_COMMAND = '-v';
const INSENSITIVE_COMMAND = '-i';

function translateInput(args) {
    const translated = {
        isInsensitive: false,
        isReversed: false,
        word: '',
        sources: []
    };

    args.forEach(arg => {
        if (arg === INSENSITIVE_COMMAND) {
            translated.isInsensitive = true;
        } else if (arg === REVERSED_COMMAND) {
            translated.isReversed = true;
        } else if (arg.startsWith(FOLDER_PREFIX) || arg.startsWith(FILE_PREFIX) || arg.startsWith(URL_PREFIX)) {
            translated.sources.push(arg);
        } else if (arg !== GREP_COMMAND) {
            translated.word = arg;
        }
    });

    return translated;
}

module.exports = { translateInput };
