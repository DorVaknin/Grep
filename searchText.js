const fs = require('fs').promises;
const axios = require('axios');
const { getReadingFileError, getFetchingUrlError, getReadingFolderError } = require('./errors');
const { FILE_PREFIX, FOLDER_PREFIX, URL_PREFIX} = require('./constants');

const UTF8_ENCODING = 'utf8';
const NEW_LINE = '\n';

async function search(input) {
    const results = {};
    for (const source of input.sources) {
        const lines = await getSourceLines(source);
        results[source] = filterMatchingLines(lines, input);
    }
    return results;
}

async function getSourceLines(source) {
    if(source.startsWith(FOLDER_PREFIX)) {
        return await readFolderLines(source.substring(FOLDER_PREFIX.length));
    }
    else if (source.startsWith(FILE_PREFIX)) {
        return await readFileLines(source.substring(FILE_PREFIX.length));
    } else if (source.startsWith(URL_PREFIX)) {
        return await fetchUrlLines(source.substring(URL_PREFIX.length));
    }
    return [];
}


async function readFolderLines(folderPath) {
    try {
        const files = await fs.readdir(folderPath);
        let allLines = [];

        for (const file of files) {
            const filePath = `${folderPath}/${file}`;
            const fileLines = await readFileLines(filePath);
            allLines = allLines.concat(fileLines);
        }

        return allLines;
    } catch (err) {
        console.error(getReadingFolderError(folderPath, err));
        return [];
    }
}

async function readFileLines(filePath) {
    try {
        const fileData = await fs.readFile(filePath, UTF8_ENCODING);
        return fileData.split(NEW_LINE);
    } catch (err) {
        console.error(getReadingFileError(filePath, err));
        return [];
    }
}

async function fetchUrlLines(url) {
    try {
        const response = await axios.get(url);
        return response.data.split(NEW_LINE);
    } catch (err) {
        console.error(getFetchingUrlError(url, err));
        return [];
    }
}

function filterMatchingLines(lines, input) {
    const {  word, isInsensitive, isReversed } = input;
    const targetWord = isInsensitive ? word.toLowerCase() : word;
    return lines.filter(line => {
        const contentLine = isInsensitive ? line.toLowerCase() : line;
        const containsWord = contentLine.includes(targetWord);
        return isReversed ? !containsWord : containsWord;
    });
}

module.exports = { search };
