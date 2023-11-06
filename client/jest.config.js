module.exports = {
    type: 'module',
    testEnvironment: 'node',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    transform: {
    //   '^.+\\.jsx?$': 'babel-jest', // You might need to install the 'babel-jest' package
    "^.+\\.jsx?$": "babel-jest"
    },
    moduleNameMapper: {
        '^axios$': '<rootDir>/axios.js',
    },
};