const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
    entry: './src/user.properties.validator.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: [
                    '/node_modules/',
                    '/build/',
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts'],
    },
    target: 'node',
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }

    return config;
};
