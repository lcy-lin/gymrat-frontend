import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
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
import TextField from '@mui/material/TextField';
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

function Row(props) {
  const { row, idx, updatedActivityData, setUpdatedActivityData, editMode } = props;
  const [open, setOpen] = React.useState(false);
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
        <TableCell component="th" scope="row">
            {editMode ? (
                <TextField
                    value={updatedActivityData.movements[idx].name}
                    onChange={(e) => setUpdatedActivityData({ ...updatedActivityData, movements: updatedActivityData.movements.map((m, i) => i === idx ? { ...m, name: e.target.value } : m) })}
                    multiline
                    variant="standard"
                    size="small"
                    sx={{ width: "8rem"}}
                />
              ) : (
              <p>{row.name}</p>
            )}
        </TableCell>
        <TableCell>
          {editMode ? (
                <TextField
                    value={updatedActivityData.movements[idx].num_of_sets}
                    onChange={(e) => setUpdatedActivityData({ ...updatedActivityData, movements: updatedActivityData.movements.map((m, i) => i === idx ? { ...m, num_of_sets: e.target.value } : m) })}
                    multiline
                    variant="standard"
                    size="small"
                    sx={{ width: "2rem"}}
                />
              ) : (
              <p>{row.numOfSets}</p>
            )}
        </TableCell>
        <TableCell>
          {editMode ? (
                <TextField
                    value={updatedActivityData.movements[idx].reps_goal}
                    onChange={(e) => setUpdatedActivityData({ ...updatedActivityData, movements: updatedActivityData.movements.map((m, i) => i === idx ? { ...m, reps_goal: e.target.value } : m) })}
                    multiline
                    variant="standard"
                    size="small"
                    sx={{ width: "2rem"}}
                />
              ) : (
              <p>{row.repsGoal}</p>
            )}
            </TableCell>
        <TableCell>
        {editMode ? (
            <TextField
                value={updatedActivityData.movements[idx].weight}
                onChange={(e) => setUpdatedActivityData({ ...updatedActivityData, movements: updatedActivityData.movements.map((m, i) => i === idx ? { ...m, weight: e.target.value } : m) })}
                multiline
                variant="standard"
                size="small"
                sx={{ width: "4rem"}}
            />
          ) : (
              <p>{row.weight}</p>
            )}
          </TableCell>
        <TableCell>
        {editMode ? (
          <TextField
              value={updatedActivityData.movements[idx].description}
              onChange={(e) => setUpdatedActivityData({ ...updatedActivityData, movements: updatedActivityData.movements.map((m, i) => i === idx ? { ...m, description: e.target.value } : m) })}
              multiline
              variant="standard"
              size="small"
              sx={{ width: "10rem"}}
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
                          <TextField
                            value={updatedActivityData.movements[idx].sets[index].reps_achieved}
                            onChange={(e) => setUpdatedActivityData({ ...updatedActivityData, movements: updatedActivityData.movements.map((m, i) => i === idx ? { ...m, sets: updatedActivityData.movements[idx].sets.map((s, j) => j === index ? { ...s, reps_achieved: e.target.value } : s) } : m) })}
                            multiline
                            variant="standard"
                            size="small"
                            sx={{ width: "2rem"}}
                          />
                        ) : (
                          set.reps_achieved
                        )}
                        </TableCell>
                      <TableCell align='center'>
                        {editMode ? (
                          <TextField
                            value={updatedActivityData.movements[idx].sets[index].str_left}
                            onChange={(e) => setUpdatedActivityData({ ...updatedActivityData, movements: updatedActivityData.movements.map((m, i) => i === idx ? { ...m, sets: updatedActivityData.movements[idx].sets.map((s, j) => j === index ? { ...s, str_left: e.target.value } : s) } : m) })}
                            multiline
                            variant="standard"
                            size="small"
                            sx={{ width: "2rem"}}
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
}

Row.propTypes = {
  row: PropTypes.shape({
    numOfSets: PropTypes.number.isRequired,
    weight: PropTypes.string.isRequired,
    repsGoal: PropTypes.number.isRequired,
    sets: PropTypes.arrayOf(
      PropTypes.shape({
        set_num: PropTypes.number.isRequired,
        reps_done: PropTypes.number.isRequired,
        str_left: PropTypes.number.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};


export default function DetailTable({ movements, updatedActivityData, setUpdatedActivityData, editMode, preferredTheme, darkTheme, lightTheme }) {
  const rows = movements?.map((movement) => {
      return createData(movement.name, movement.num_of_sets, movement.reps_goal, movement.weight, movement.description, movement.sets);  
  })
    
  return (
    <ThemeProvider theme={preferredTheme}>
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
