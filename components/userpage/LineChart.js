import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function BasicLineChart() {
    const [preferredTheme, setPreferredTheme] = useState('light');

    useEffect(() => {
      const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
      const setThemeBasedOnBrowserPreference = () => {
        setPreferredTheme(darkModeMediaQuery.matches ? 'dark' : 'light');
      };
  
      setThemeBasedOnBrowserPreference();
  
      const mediaQueryChangeListener = (event) => {
        setThemeBasedOnBrowserPreference();
      };
  
      darkModeMediaQuery.addEventListener('change', mediaQueryChangeListener);
  
      return () => {
        darkModeMediaQuery.removeEventListener('change', mediaQueryChangeListener);
      };
    }, []);
  return (
    <ThemeProvider theme={preferredTheme === 'dark' ? darkTheme : lightTheme}>
      <div className="flex flex-col items-start border dark:border-gray-600 m-2 rounded-lg">
        <h1 className="text-black dark:text-white text-2xl font-semibold ml-4 mt-4">Daily Weight Records</h1>
        <LineChart
          xAxis={[
            { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31] }
          ]}
          series={[
            {
              data: [50, 49.3, 49.5, 49.8, 50.1, 50.2, 50.3, 50.4, 50.5, 50.6, 50.7, 50.8, 50.9, 51, 51.1, 51.2, 51.3, 51.4, 51.5, 51.6, 51.7, 51.8, 51.9, 52, 52.1, 52.2, 52.3, 52.4, 52.5, 52.6, 52.7],
            },
          ]}
          width={500}
          height={300}
        />
      </div>
    </ThemeProvider>
  );
}
