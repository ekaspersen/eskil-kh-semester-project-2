/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}'],
    theme: {
        colors: {
            white: '#FFFFFF',
            black: '#000000',
            dark100: '#111111',
            dark200: '#222222',
            dark300: '#333333',
            secondary: '#D98AFE',
            white50op: 'rgba(255, 255, 255, 0.5)',
            black80op: 'rgba(0, 0, 0, 0.8)',
        },
        fontFamily: {
            mainFont: '"Montserrat", sans-serif',
        },
        screens: {
            xxsMQ: '417px',
            mdListing: '650px',
            lgListing: '960px',
        },
        extend: {},
    },
    plugins: [],
};
