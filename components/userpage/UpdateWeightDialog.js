import { useState, useRef } from "react";
import axios from "axios";
import { Dialog } from "@mui/material";
import { isValid, parseISO } from 'date-fns';
import AlertMessages from "@/utils/alertMessages";
import Swal from "sweetalert2";

export default function UpdateWeightDialog (props) {
    const { onClose, open, cookies, userid, xAxisData, setXAxisData, seriesData, setSeriesData } = props;
    const dateRef = useRef(null);
    const weightRef = useRef(null);
    const [error, setError] = useState(false);
    const handleClose = () => {
      onClose();
    };

    const handleUpdateClick = () => {
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      const enteredDate = dateRef.current.value;
    
      if (!datePattern.test(enteredDate)) {
        setError(true);
        return;
      } else {
        setError(!isValid(parseISO(enteredDate)));
      }
      axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/1.0.0/weights/${userid}`, {
          data: {
            weight: weightRef.current.value,
            created_at: enteredDate,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        }).then((res) => {
          const updatedData = {
            date: new Date(res.data.data.created_at).getDate(),
            weight: parseFloat(res.data.data.weight),
          };
          const newData = xAxisData.map((date, index) => {
            if (date === updatedData.date) {
              return updatedData;
            } else {
              return { date, weight: seriesData[index] };
            }
          });
          newData.sort((a, b) => new Date(a.date) - new Date(b.date));
          setXAxisData(newData.map(item => item.date));
          setSeriesData(newData.map(item => item.weight));

          handleClose();
          AlertMessages.success("Weight updated successfully");
        }).catch((err) => {
        console.log(err);
        });
      
    };
    
    return (
        <Dialog onClose={handleClose} open={open}>
          <div className="flex flex-col items-center border dark:border-gray-700 dark:bg-gray-800 p-2">
              <h1 className="font-bold dark:text-white">Update Weight</h1>
              <span className="flex flex-col">
                  <input
                    ref={weightRef}
                    className="my-2 rounded-lg border dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    type="number"
                    step="0.1"
                    placeholder="Weight"/>
                  <label htmlFor="dateInput">Enter Date (yyyy-mm-dd): </label>
                  <input
                    className="my-2 rounded-lg border dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    type="text"
                    id="dateInput"
                    ref={dateRef}
                    placeholder="yyyy-mm-dd"
                    maxLength="10"
                    pattern="\d{4}-\d{2}-\d{2}"
                    title="Enter a date in the format yyyy-mm-dd"
                    required
                  />
                  {error && (
                    <p className="text-red-500 text-sm">
                      Invalid date format.
                    </p>
                  )}
              </span>
              <button onClick={handleUpdateClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl my-2">Update</button>
          </div>
        </Dialog>
    );
}
  