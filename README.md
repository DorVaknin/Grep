# Grep

## Overview
A Node.js implementation of the Unix grep command, offering powerful text search, capable of printing grep processing of files, given urls, folders, supporting different special functionalities such as case insensitive search and reverse search.

## Features
- **File grep:** Given a word and a file name, the Grep outputs all the occurrences of the given word in the file.
- **Folder grep:** Given a word and a file name, the Grep outputs all the occurrences of the given word in the folder (subdirectory recursive grep not implemented yet).
- **Url Fetch grep:** Given a word and a url to fetch from, the Grep outputs all the occurrences of the given word in the fetch response.
- **Multiple sources grep** Given a word and a url, file and folder (or any combination), output all the occurrences of the word in these sources.
- **Reverse search:** A flag that indicates whether it's a regular search (search for lines that include the word) or a reverse search (for lines that do not include the word).
- **Case sensitive search:** A flag that indicates whether the search is case sensitive or case insensitive.

## Technologies Used
- **Node.js:** The core technology used for the backend server.
- **fs:** The file read package that is used in order to read files.
- **axios:** The url fetching package used in order to fetch url info.

## Running the Application
1. **Install Dependencies:**
Navigate to the project directory and run:
npm install

2. **Run the program:**
- Folder: node index.js grep *word* folder:pathToFolder/folderName
- Url: node index.js grep *word* url:https://www.lipsum.com/
- File: node index.js grep *word* file:pathToFile/fileName
- Multiples sources simultaneously : File: node index.js grep *word* file:pathToFile/- fileName url:https://www.lipsum.com/ folder:pathToFolder/folderName
- Multiple sources with flags: File: node index.js grep -v -i *word* file:pathToFile/fileName url:https://www.lipsum.com/ folder:pathToFolder/folderName

3. **Run the tests:**
- Run the simple tests implemented via the following command: npm run test

## Author
Dor Vaknin
