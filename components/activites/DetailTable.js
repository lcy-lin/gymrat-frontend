import * as React from 'react';
import { memo } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { Remove } from '@mui/icons-material';
import { Add } from '@mui/icons-material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ThemeProvider } from '@mui/material';

function createData(name, numOfSets, repsGoal, weight, description, sets) {
  return {
    name,
    numOfSets,
    repsGoal,
    weight,
    description,
    sets,
  };
}

const Row = memo(function Row(props) {

  const { row, idx, updatedActivityData, setUpdatedActivityData, editMode } = props;
  const [open, setOpen] = React.useState(false);

  const handleDeleteLastSet = () => {
    setUpdatedActivityData({
      ...updatedActivityData,
      movements: updatedActivityData.movements.map((m, i) => {
        if (i === idx && m.sets.length > 1) {
          const newSets = [...m.sets];
          newSets.pop();
          return {
            ...m,
            num_of_sets: m.num_of_sets - 1,
            sets: newSets,
          };
        }
        return m;
      }),
    });
  };
  
  
  const handleAddSet = () => {
    setUpdatedActivityData({
      ...updatedActivityData,
      movements: updatedActivityData.movements.map((m, i) => {
        if (i === idx) {
          return {
            ...m,
            num_of_sets: m.num_of_sets + 1,
            sets: [
              ...m.sets,
              {
                set_num: m.sets.length + 1,
                reps_achieved: '',
                str_left: '',
              },
            ],
          };
        }
        return m;
      }),
    });
  }; 
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
            {editMode ? (
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  defaultValue={updatedActivityData.movements[idx].name}
                  onBlur={(e) => setUpdatedActivityData({ ...updatedActivityData, movements: updatedActivityData.movements.map((m, i) => i === idx ? { ...m, name: e.target.value } : m) })}
                />
              ) : (
              <p>{row.name}</p>
            )}
        </TableCell>
        <TableCell>
          {editMode ? (
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={updatedActivityData.movements[idx].num_of_sets}
                    onChange={(e) => setUpdatedActivityData({ ...updatedActivityData, movements: updatedActivityData.movements.map((m, i) => i === idx ? { ...m, num_of_sets: e.target.value } : m) })}
                />
              ) : (
              <p>{row.numOfSets}</p>
            )}
        </TableCell>
        <TableCell>
          {editMode ? (
                  <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={updatedActivityData.movements[idx].reps_goal}
                    onChange={(e) => setUpdatedActivityData({ ...updatedActivityData, movements: updatedActivityData.movements.map((m, i) => i === idx ? { ...m, reps_goal: e.target.value } : m) })}
                />
              ) : (
              <p>{row.repsGoal}</p>
            )}
            </TableCell>
        <TableCell>
        {editMode ? (
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-16 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={updatedActivityData.movements[idx].weight}
              onChange={(e) => setUpdatedActivityData({ ...updatedActivityData, movements: updatedActivityData.movements.map((m, i) => i === idx ? { ...m, weight: e.target.value } : m) })}
            />
          ) : (
              <p>{row.weight}</p>
            )}
          </TableCell>
        <TableCell>
        {editMode ? (
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={updatedActivityData.movements[idx].description}
            onChange={(e) => setUpdatedActivityData({ ...updatedActivityData, movements: updatedActivityData.movements.map((m, i) => i === idx ? { ...m, description: e.target.value } : m) })}
          />
        ) : (
        <p>{row.description}</p>
      )}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Sets
                {editMode && 
                  <>
                    <IconButton onClick={() => handleAddSet()}>
                      <Add />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteLastSet()}>
                      <Remove />
                    </IconButton> 
                  </>
                }
              </Typography>
              
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell align='center'>Reps Done</TableCell>
                    <TableCell align='center'>Strength Left</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.sets
                    .sort((a, b) => a.set_num - b.set_num)
                    .map((set, index) => (
                    <TableRow key={set.set_num}>
                      <TableCell component="th" scope="row">
                        {set.set_num}
                      </TableCell>
                      <TableCell align='center'>
                        {editMode ? (
                          <input
                                type="text"
                                className="self-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                value={updatedActivityData.movements[idx].sets[index]?.reps_achieved}
                                onChange={(e) => setUpdatedActivityData({ ...updatedActivityData, movements: updatedActivityData.movements.map((m, i) => i === idx ? { ...m, sets: updatedActivityData.movements[idx].sets.map((s, j) => j === index ? { ...s, reps_achieved: e.target.value } : s) } : m) })}
                              />
                        ) : (
                          set.reps_achieved
                        )}
                        </TableCell>
                      <TableCell align='center'>
                        {editMode ? (
                          <input
                          type="text"
                          id="first_name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                          value={updatedActivityData.movements[idx].sets[index]?.str_left}
                          onChange={(e) => setUpdatedActivityData({ ...updatedActivityData, movements: updatedActivityData.movements.map((m, i) => i === idx ? { ...m, sets: updatedActivityData.movements[idx].sets.map((s, j) => j === index ? { ...s, str_left: e.target.value } : s) } : m) })}
                        />
                        ) : (
                          set.str_left
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
});

export default function DetailTable({ movements, updatedActivityData, setUpdatedActivityData, editMode, preferredTheme, darkTheme, lightTheme }) {
  const rows = updatedActivityData.movements?.map((movement) => {
      return createData(movement.name, movement.num_of_sets, movement.reps_goal, movement.weight, movement.description, movement.sets);  
  })
  const theme = preferredTheme === 'dark' ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead style={{ backgroundColor: preferredTheme === 'dark' ? "rgb(31 41 55)" : "inherit"}}>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Number of Sets</TableCell>
              <TableCell>Reps Goal</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: preferredTheme === 'dark' ? "rgb(31 41 55)" : "inherit"}}>
            {rows.map((row, idx) => (
              <Row key={row.name} idx={idx} editMode={editMode} updatedActivityData={updatedActivityData} setUpdatedActivityData={setUpdatedActivityData} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
    
  );
}
