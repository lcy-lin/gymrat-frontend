import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
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

export default function ChartBar(props) {
  const [preferredTheme, setPreferredTheme] = useState('light');
  const [records, setRecords] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [year, setYear] = useState(new Date().getFullYear());
  const { cookies, userid } = props;
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
    if(!cookies.accessToken || !userid || !year) {
      return;
    }
    
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/1.0.0/activities/records/${userid}?year=${year}`, {
      headers: {
        Authorization: `Bearer ${cookies.accessToken}`,
      },
    }).then((res) => {
      const count = res.data.records.map(item => ( item.activity_count));
      setRecords(count);
    }).catch((err) => {
      console.log(err);
    });
  }, [cookies.accessToken, userid, year]);
  return (
    <ThemeProvider theme={preferredTheme === 'dark' ? darkTheme : lightTheme}>
      <div className="flex flex-col items-start border dark:border-gray-600 dark:bg-gray-800 rounded-lg">
        <h1 className="text-black dark:text-white text-2xl font-semibold ml-4 mt-4">Activity Records</h1>
        <input
          type="number"
          className="border rounded-lg h-10 m-4 dark:bg-gray-800 dark:text-white"
          placeholder="Enter year" 
          value={year}
          onChange={(e) => setYear(e.target.value)}
          />
        <BarChart
          xAxis={[
            {
              id: 'barCategories',
              data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              scaleType: 'band',
            },
          ]}
          series={[
            {
              data: records,
            },
          ]}
          width={500}
          height={300}
        />
      </div>
    </ThemeProvider>
  );
}

