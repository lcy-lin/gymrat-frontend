import { useEffect, useState } from "react";
import Header from "@/components/Header";
import MealTable from "@/components/meals/MealTable";
import getDateString from "@/utils/getDateString";
import { createTheme } from "@mui/material";
import axios from "axios";
import { parseCookies } from "nookies";

export default function MealsPage() {
    const cookies = parseCookies();
    const [records, setRecords] = useState([]);
    const [preferredTheme, setPreferredTheme] = useState('dark');
    const currentDate = new Date();
    const defaultStartDate = new Date(currentDate);
    defaultStartDate.setMonth(currentDate.getMonth() - 1);

    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(currentDate);


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
        const start_date = getDateString(startDate);
        const end_date = getDateString(endDate);
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/1.0.0/cals/search?user_id=${cookies.userId}&start_date=${start_date}&end_date=${end_date}`, {
            headers: {
                Authorization: `Bearer ${cookies.accessToken}`
            }
        }).then((res) => {
            const sortedRecords = res.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            console.log(sortedRecords);
            setRecords(sortedRecords);
        }).catch((err) => {
            console.log(err);
        })

    }, [cookies.accessToken, cookies.userId, endDate, startDate])
    return (
        <div className="min-h-screen dark:bg-gray-800 flex flex-col">
            <Header />
            <span className="w-5/6 self-center">
                
                <MealTable
                    records={records}
                    preferredTheme={preferredTheme}
                    darkTheme={darkTheme}
                    lightTheme={lightTheme}
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />
            </span>
            
        </div>
    )
}