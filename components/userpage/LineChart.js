import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import UpdateWeightDialog from './UpdateWeightDialog';
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
    const [date, setDate] = useState(new Date().toISOString().slice(0, 7));
    const { cookies, userid, isUserPage } = props;
    const [xAxisData, setXAxisData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
    const [seriesData, setSeriesData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0]);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
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
      if (userid === undefined || cookies.accessToken === undefined) {
        return;
      };
      const year = new Date(date).getFullYear();
      const month = new Date(date).getMonth() + 1;
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/weights/search?user_id=${userid}&start_date=${year}-${month}-1&end_date=${year}-${month}-${day(year, month)}`,{
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      }).then((res) => {
        if (res.data.data.length === 0) {
          setXAxisData([1]);
          setSeriesData([0]);
          return;
        };
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
    },[cookies.accessToken, userid, cookies.userId, date]);
  return (
    <ThemeProvider theme={preferredTheme === 'dark' ? darkTheme : lightTheme}>
      <div className="flex flex-col items-start border dark:border-gray-600 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center mt-4 ml-4 ">
          <h1 className="text-black dark:text-white text-2xl font-semibold">Daily Weight Records</h1>
          {isUserPage && <EditIcon
            className="cursor-pointer"
            onClick={handleClickOpen}
            style={{ color: preferredTheme === 'dark' ? 'white' : 'black' }}
            />}
        </div>
        <span className='flex flex-row ml-4 mt-4 gap-2 items-center'>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type='month'
              className='border rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white'
            />
          </span>
        <UpdateWeightDialog
          open={open}
          onClose={handleClose}
          cookies={cookies}
          userid={userid}
          xAxisData={xAxisData}
          seriesData={seriesData}
          setXAxisData={setXAxisData}
          setSeriesData={setSeriesData}
        />
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
