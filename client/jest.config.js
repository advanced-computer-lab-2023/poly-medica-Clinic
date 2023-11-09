
module.exports = {
    type: 'module',
    testEnvironment: 'node',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    moduleDirectories: ['node_modules', 'src'],
    testEnvironment: 'jsdom',
    transform: {
    "^.+\\.jsx?$": "babel-jest"
    },
    moduleNameMapper: {
        "^axios$": "<rootDir>/src/__mocks__/axios.js"
    },
};