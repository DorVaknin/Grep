
const { expect } = require('chai');
const sinon = require('sinon');
const fs = require('fs').promises;
const axios = require('axios');
const { search } = require('../searchText');

describe('Grep Functionality Tests', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('Grep on Files', () => {
        it('should find a word in file sources', async () => {
            const mockFileContent = 'Hello world\nThis is a test file\nGrep test line';
            const mockFilePath = 'test.txt';
            const mockFileArgumentValue = `file:${mockFilePath}`
            const wordToSearch = 'Grep';

            // Mocking file system read operation
            sinon.stub(fs, 'readFile').resolves(mockFileContent);

            const input = {
                word: wordToSearch,
                sources: [mockFileArgumentValue]
            };

            const result = await search(input);

            // Check if the result contains the expected line with the word
            expect(result[mockFileArgumentValue]).to.include('Grep test line');
        });
    });

    describe('Grep on URLs', () => {
        it('should find a word in URL sources', async () => {
            const mockUrlContent = `Example text\nAnother line\nLine containing Standard and Poor's`;
            const mockUrl = 'http://example.com/test';
            const mockFileArgumentValue = `url:${mockUrl}`
            const wordToSearch = 'Standard';

            // Mocking axios for URL fetching
            sinon.stub(axios, 'get').resolves({ data: mockUrlContent });

            const input = {
                word: wordToSearch,
                sources: [mockFileArgumentValue]
            };

            const result = await search(input);

            // Check if the result contains the expected line with the word
            expect(result[mockFileArgumentValue]).to.include(`Line containing Standard and Poor's`);
        });
    });
});