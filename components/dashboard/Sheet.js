import { useState, useRef } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import Row from "./sheet/Row";
import ActSettings from "./actSettings/ActSettings";
import Swal from "sweetalert2";
import AlertMessages from "@/utils/alertMessages";

export default function Sheet() {
  const cookie = parseCookies();
  const [numOfRows, setNumOfRows] = useState(1);
  const [tags, setTags] = useState([]);
  const descriptionRef = useRef();
  const [publicity, setPublicity] = useState(false);
  const [rowData, setRowData] = useState(Array.from({ length: 1 }, () => ({})));
  const addMove = () => {
    setNumOfRows(prevNum => prevNum + 1);
  };
  const deleteMove = () => {
    setNumOfRows((prevNum) => Math.max(prevNum - 1, 1));
    if (rowData[-1] === undefined)
      return;
    rowData.pop();
  };
  const handleRowDataChange = (index, data) => {
    const newRowData = [...rowData];
    newRowData[index] = data;
    setRowData(newRowData);
  };

  const createWorkout = async () => {
    if (tags.length === 0) {
      AlertMessages.error("Please select at least one tag!");
      return;
    }
    if (descriptionRef.current.value === "") {
      AlertMessages.error("Please enter a description!");
      return;
    }
    if (rowData.length === 0) {
      AlertMessages.error("Please enter at least one movement!");
      return;
    }
  
    try {
      for (const movement of rowData) {
        if (movement.name === undefined || movement.name === "") {
          AlertMessages.error("Please enter a name for each movement!");
          return;
        }
        if (movement.rep_goal === undefined || movement.rep_goal === "") {
          AlertMessages.error("Please enter a number of reps for each movement!");
          return;
        }
        if (movement.num_of_sets === undefined || movement.num_of_sets === "") {
          AlertMessages.error("Please enter a number of sets for each movement!");
          return;
        }
        if (movement.weight === undefined || movement.weight === "") {
          AlertMessages.error("Please enter a weight for each movement!");
          return;
        }
        if (movement.description === undefined || movement.description === "") {
          AlertMessages.error("Please enter a description for each movement!");
          return;
        }
  
        for (const set of movement.sets) {
          if (set.reps_achieved === undefined || set.reps_achieved === "") {
            AlertMessages.error("Please enter a number of reps for each set!");
            return;
          }
          if (set.str_left === undefined || set.str_left === "") {
            AlertMessages.error("Please enter everything for each set!");
            return;
          }
        }
      }
  
      const data = {
        user_id: cookie.userId,
        tags: tags,
        description: descriptionRef.current.value,
        publicity: publicity === true ? 1 : 0,
        movements: rowData,
      };
  
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/activities/create`,
        { data: data },
        {
          headers: {
            Authorization: `Bearer ${cookie.accessToken}`,
          },
        }
      );
  
      Swal.fire({
        title: "Workout created!",
        text: "You can now view your workout in the activities page.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Go to activities page",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/activities";
        }
      });
    } catch (err) {
      AlertMessages.error("Workout creation failed!");
      console.error(err);
    }
  };
  
  return (

    <div className="flex flex-col items-center mb-2">
      <ActSettings
        setTags={setTags}
        publicity={publicity}
        setPublicity={setPublicity}
        descriptionRef={descriptionRef}
      />
        {Array.from({ length: numOfRows }).map((_, index) => (
            <Row
                key={index}
                num={index + 1}
                data={rowData[index]}
                index={index}
                onInputChange={handleRowDataChange}
            />
        ))}
      <div className="flex flex-row gap-2">
        <button onClick={addMove} type="button" className="text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-gray-400 dark:focus:ring-blue-800">
            Add move 🟢
        </button>
        <button disabled={numOfRows===1} onClick={deleteMove} type="button" className="disabled:cursor-not-allowed text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-gray-400 dark:focus:ring-blue-800">
            Delete move 🔴
        </button>
        <button onClick={createWorkout} type="button" className="text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-gray-400 dark:focus:ring-blue-800">
            Create workout 🟡
        </button>
      </div>
      
    </div>
  );
}