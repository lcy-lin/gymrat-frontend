import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import RowDialog from '../activities/RowDialog';
import axios from 'axios';
import { parseCookies } from 'nookies';

export default function ActCard({data}) {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [preferredTheme, setPreferredTheme] = React.useState('light');
    const [activityData, setActivityData] = React.useState(null);
    const [updatedActivityData, setUpdatedActivityData] = React.useState(null);
    const cookies = parseCookies();
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
    React.useEffect(() => {
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
    const parts = {
        'chest': 'bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white',
        'back': 'bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500',
        'legs': 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500',
        'arms': 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500',
        'shoulders': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500',
        'others': 'bg-white/[.1] text-white', 
      };
    const childrens = data?.tags.map(element => {
        return element;
    });
    const handleClickOpen = async (id) => {
        setOpenDialog(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/1.0.0/activities/${data?.user_id}/${id}`,{
              headers: {
                'Authorization': `Bearer ${cookies.accessToken}`
              },
            });
            setActivityData(response.data.activity);
            setUpdatedActivityData(response.data.activity);
          }
          catch (err) {
            console.log(err);
          }
    };
    const handleClose = async () => {
        setOpenDialog(false);
    };
    return (
        <div className="flex flex-col bg-white m-2 border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="p-4 md:p-7">
                {childrens.map((child, id) => (
                    <span key={id} className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${parts[child]}`}>{child}</span>
                ))}
                <p className="max-w-5/6 mt-2 text-gray-500 dark:text-gray-400">
                    {data?.description ? data.description : 'No Description Yet!'}
                </p>
                <span
                    onClick={() => handleClickOpen(data.id)}
                    className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                    Details
                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </span>
            </div>
            <RowDialog
                cookies={cookies}
                activityData={activityData}
                updatedActivityData={updatedActivityData}
                openDialog={openDialog}
                handleClose={handleClose}
                preferredTheme={preferredTheme}
                darkTheme={darkTheme}
                lightTheme={lightTheme}
                post={true}
              />
        </div>
    
    );
}