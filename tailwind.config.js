/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          "100": "#1a1a1a",
          "200": "rgba(255, 255, 255, 0.07)",
          "300": "rgba(26, 26, 26, 0.52)",
          "400": "rgba(35, 35, 35, 0.46)",
          "500": "rgba(255, 255, 255, 0.33)",
          "600": "rgba(255, 255, 255, 0.2)",
          "700": "rgba(255, 255, 255, 0.13)",
        },
        white: "#fff",
        whitesmoke: "#e9e9e9",
        darkorchid: "#b95dfe",
      },
      animation: {
        'twinkle': 'twinkle 4s infinite',
        'launch': 'launch 2s forwards',
        'blast-inner': 'blast-inner 1.5s forwards',
        'blast-outer': 'blast-outer 1.5s forwards',
        'trail': 'trail 1s infinite',
        'spin': 'spin 1s linear infinite',
        'fade-in-out': 'fadeInOut 3s ease-in-out',
        'size-increase': 'sizeIncrease 3s ease-in-out',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        launch: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50vh)' },
        },
        'blast-inner': {
          '0%': { transform: 'scale(0)', opacity: 1 },
          '50%': { transform: 'scale(1)', opacity: 0.8 },
          '100%': { transform: 'scale(1.5)', opacity: 0 },
        },
        'blast-outer': {
          '0%': { transform: 'scale(0)', opacity: 1 },
          '50%': { transform: 'scale(1.2)', opacity: 0.8 },
          '100%': { transform: 'scale(2)', opacity: 0 },
        },
        trail: {
          '0%': { opacity: 1, height: '10px' },
          '50%': { opacity: 0.5, height: '20px' },
          '100%': { opacity: 0, height: '10px' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fadeInOut: {
          '0%': { opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        sizeIncrease: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.1)', opacity: 1 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, hsla(246, 54%, 23%, 1) 70%, hsla(296, 66%, 17%, 1) 100%)',
      },
      fontFamily: {
        poppins: "Poppins",
        barlow: "Barlow",
        outfit: "Outfit",
        "plus-jakarta-sans": "'Plus Jakarta Sans'",
      },
      borderRadius: {
        "3xs-7": "9.7px",
        "lgi-3": "19.3px",
        "18xl": "37px",
        xl: "20px",
        "41xl-6": "60.6px",
        "34xl-7": "53.7px",
        "13xl-6": "32.6px",
      },
      fontSize: {
        "6xl-9": "25.9px",
        "45xl": "64px",
        "21xl": "40px",
        "4xl-5": "23.5px",
        "13xl-9": "32.9px",
        "5xl": "24px",
        "17xl": "36px",
        "13xl": "32px",
        xl: "20px",
        "9xl-6": "28.6px",
        "49xl": "68px",
        inherit: "inherit",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
}
