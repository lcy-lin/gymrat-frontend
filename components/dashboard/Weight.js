import React, { useState, useRef } from 'react';
import DateComponent from './DatePicker';
import { parseCookies } from 'nookies';
import AlertMessages from '@/utils/alertMessages';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Weight() {
  const [date, setDate] = useState(new Date());
  const weightRef = useRef(null);
  const cookies = parseCookies();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/1.0.0/weights/create`,{
            data: {
                user_id: cookies.userId,
                weight: weightRef.current.value,
                created_at: formattedDate
            },
        },{
            headers: {
                'Authorization': `Bearer ${cookies.accessToken}`
            }
        });
        Swal.fire({
            title: 'Weight added!',
            text: "You can now view your weight in the user page.",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Go to user page'
        }).then((result) => {
            setDate(new Date());
            weightRef.current.value = '';
            if (result.isConfirmed) {
                window.location.href = `/userpage/${cookies.userId}`;
            }
        });
    }
    catch (err) {
        console.error(err);
        AlertMessages.error(err);
    }
  };
  return (
    <div>
      <form className="p-4 bg-gray-200 dark:bg-gray-700 flex flex-col items-center rounded-xl" onSubmit={handleSubmit}>
        <div className="w-full mb-2">
            <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Weight(kg)
            </label>
            <input ref={weightRef} type="number" step="0.1" id="weight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="56" required />
        </div>
        <div className="w-full mb-2">
            <DateComponent setDate={setDate} />
        </div>
        <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Submit
        </button>
      </form>
    </div>
  );
}
