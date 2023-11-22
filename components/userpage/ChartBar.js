// import * as React from 'react';
// import { BarChart } from '@mui/x-charts/BarChart';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });

// export default function ChartBar() {
//   return (
//     <ThemeProvider theme={darkTheme}>
//       <div className="flex flex-col items-start border dark:border-gray-600 m-2 rounded-lg">
//       <h1 className="text-black dark:text-white text-2xl font-semibold ml-4 mt-4">Activity Records</h1>
//         <BarChart
//           xAxis={[
//             {
//               id: 'barCategories',
//               data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//               scaleType: 'band',
//             },
//           ]}
//           series={[
//             {
//               data: [2, 5, 3, 4, 6, 3, 7, 4, 5, 6, 6, 1],
//             },
//           ]}
//           width={500}
//           height={300}
//           theme={(outerTheme) => ({
//             ...outerTheme,
//             components: {
//               ...outerTheme.components,
//               MuiAxis: {
//                 styleOverrides: {
//                   root: {
//                     '& line': {
//                       stroke: theme.palette.mode === 'dark' ? '#fff' : '#000',
//                     },
//                     '& text': {
//                       fill: theme.palette.mode === 'dark' ? '#fff' : '#000',
//                     },
//                   },
//                 },
//               },
//             },
//           })}
//         />
//       </div>
      
//     </ThemeProvider>
//   );
// }
import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
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

export default function ChartBar() {
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
      <div className="flex flex-col items-start border dark:border-gray-600 dark:bg-gray-800 m-2 rounded-lg">
        <h1 className="text-black dark:text-white text-2xl font-semibold ml-4 mt-4">Activity Records</h1>
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
              data: [2, 5, 3, 4, 6, 3, 7, 4, 5, 6, 6, 1],
            },
          ]}
          width={500}
          height={300}
        />
      </div>
    </ThemeProvider>
  );
}

