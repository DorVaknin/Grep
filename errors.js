module.exports = {
    getReadingFolderError: (folderPath, err) => `Error reading folder ${folderPath}: ${err}`,
    getFetchingUrlError: (url, err) => `Error fetching URL ${url}: ${err.message}`,
    getReadingFileError: (path, err) => `Error reading file ${path}: ${err.message}`
}