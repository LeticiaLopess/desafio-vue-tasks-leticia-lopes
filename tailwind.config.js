/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', 'sans-serif'],
            },
            colors: {
                primary: {
                50: '#e9eef7',
                100: '#c8d5eb',
                200: '#a3b9de',
                300: '#7e9dd1',
                DEFAULT: '#294181', 
                500: '#223670',
                600: '#1c2c5f',
                700: '#15214b',
                800: '#0f1738',
                },
                secondary: {
                50: '#f2f6ea',
                100: '#dfe8ca',
                200: '#c9d9a7',
                300: '#b3ca84',
                DEFAULT: '#7a9b31',  
                500: '#688228',
                600: '#566a20',
                700: '#425217',
                800: '#2f3a0f',
                },
                light: {
                    50: '#ffffff',
                    100: '#f5f6f8',
                    200: '#f0f2f4',
                    300: '#eaecf1',
                    DEFAULT: '#e9ecef', 
                    500: '#d1d6db',
                    600: '#b9c0c7',
                    700: '#a1aab3',
                    800: '#89949f',
                },
                cloudy: {
                    50: '#e8eaed',
                    100: '#c5cad2',
                    200: '#9ea7b5',
                    300: '#778498',
                    DEFAULT: '#0D1B2A',  
                    500: '#0a1621',
                    600: '#081218',
                    700: '#060d11',
                    800: '#04080a',
                },
            }
        },
    },
    plugins: [],
}