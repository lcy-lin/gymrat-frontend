import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

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

function checkLeapYear(year) {

  if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
    return true
  }
  return false
}



const day = (year, month) => {
  if (month == 2) {
    if (checkLeapYear(year)) {
      return 29
    }
    return 28
  }
  if (month == 4 || month == 6 || month == 9 || month == 11) {
    return 30
  }
  return 31
}

export default function BasicLineChart(props) {
    const [preferredTheme, setPreferredTheme] = useState('light');
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const { cookies } = props;
    const [xAxisData, setXAxisData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
    const [seriesData, setSeriesData] = useState([50, 49.3, 49.5, 49.8, 50.1, 50.2, 50.3, 50.4, 50.5, 50.6, 50.7, 50.8, 50.9, 51, 51.1, 51.2, 51.3, 51.4, 51.5, 51.6, 51.7, 51.8, 51.9, 52, 52.1, 52.2, 52.3, 52.4, 52.5, 52.6, 52.7]);
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
    useEffect(() => {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/weights/search?user_id=${cookies.userId}&start_date=${year}-${month}-1&end_date=${year}-${month}-${day(year, month)}`,{
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      }).then((res) => {
        const data = res.data.data.map(item => ({
          date: item.created_at,
          weight: item.weight,
        }));
    
        const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
    
        const xAxisData = sortedData.map(item => new Date(item.date).getDate());
        const seriesData = sortedData.map(item => (item.weight));
    
        setXAxisData(xAxisData);
        setSeriesData(seriesData);
      }).catch((err) => {
        console.log(err);
      });
    },[]);
  return (
    <ThemeProvider theme={preferredTheme === 'dark' ? darkTheme : lightTheme}>
      <div className="flex flex-col items-start border dark:border-gray-600 dark:bg-gray-800 m-2 rounded-lg">
        <h1 className="text-black dark:text-white text-2xl font-semibold ml-4 mt-4">Daily Weight Records</h1>
        <LineChart
          xAxis={[
            { data: xAxisData }
          ]}
          series={[
            {
              data: seriesData,
            },
          ]}
          width={500}
          height={300}
        />
      </div>
    </ThemeProvider>
  );
}
