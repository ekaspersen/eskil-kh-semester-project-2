import { resolve } from 'path';

const path = require('path');

export default {
    root: path.resolve(__dirname, 'src'),
    build: {
        rollupOptions: {
            input: {
                home: resolve(__dirname, 'src/index.html'),
                login: resolve(__dirname, 'src/login.html'),
                register: resolve(__dirname, 'src/register.html'),
                pfp: resolve(__dirname, 'src/pfp.html'),
            },
        },
    },
};
