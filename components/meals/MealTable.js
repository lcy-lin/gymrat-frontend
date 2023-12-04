import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { ThemeProvider } from '@mui/material/styles';
import DateComponent from '../dashboard/DatePicker';
import Tag from './Tag';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
function createData(date, calories, fat, carbs, protein, food) {
  return {
    date: date.replace(/-/g, '/'),
    calories,
    fat,
    carbs,
    protein,
    food,
  };
}

function Row(props) {
  const { row } = props;
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
        <TableCell>{row.date}</TableCell>
        <TableCell>{row.calories}</TableCell>
        <TableCell>{row.fat}</TableCell>
        <TableCell>{row.carbs}</TableCell>
        <TableCell>{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Food
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">Meal type</TableCell>
                    <TableCell align="center">Calories</TableCell>
                      <TableCell align="center">Fat (g)</TableCell>
                      <TableCell align="center">Carbs (g)</TableCell>
                      <TableCell align="center">Protien (g)</TableCell>
                      <TableCell align="right">Servings (g)</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.food.map((foodRow) => (
                    <TableRow key={foodRow.date}>
                      <TableCell component="th" scope="row">
                        {foodRow.name}
                      </TableCell>
                      <TableCell align="center"><Tag>{foodRow.meal_type}</Tag></TableCell>
                      <TableCell align="center">{foodRow.calories}</TableCell>
                      <TableCell align="center">{foodRow.fat}</TableCell>
                      <TableCell align="center">{foodRow.carbs}</TableCell>
                      <TableCell align="center">{foodRow.protein}</TableCell>
                      <TableCell align="right">{foodRow.servings}</TableCell>
                      
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



export default function MealTable(props) {
    
    const { preferredTheme, darkTheme, lightTheme, records, startDate, setStartDate, endDate, setEndDate } = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const rows = records?.map((record) => {
        const sortedFood = record.food.sort((a, b) => {
            const categoryOrder = { 'breakfast': 0, 'lunch': 1, 'dinner': 2, 'snack': 3 };
            return categoryOrder[a.meal_type] - categoryOrder[b.meal_type];
        });    
        return createData(record.date, record.calories, record.fat, record.carbs, record.protein, sortedFood);
    });

    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const displayedRows = rows.slice(startIndex, endIndex);

    
    return (
    <ThemeProvider theme={preferredTheme === 'dark' ? darkTheme : lightTheme}>
        <div className="flex justify-around my-4">
            <h1 className="dark:text-white font-bold text-2xl my-4">
                Records 🥦
            </h1>
            <span className='flex flex-row gap-4'>
                <span className="flex flex-col gap-2 items-center">
                    <span className="dark:text-white font-semibold">Start Date:</span>
                    <DateComponent date={startDate} setDate={setStartDate}/>
                </span>
                <span className="self-center">
                    👉
                </span>
                <span className="flex flex-col gap-2 items-center">
                    <span className="dark:text-white font-semibold">End Date:</span>
                    <DateComponent date={endDate} setDate={setEndDate}/>
                </span>
            </span>
        </div>
        <TableContainer
            component={Paper}
            sx={{
                width: '95%',
                overflow: 'hidden',
                height: 'fit-content',
                borderRadius: '0.5rem',
                boxShadow: '0 0 0 1px rgb(0 0 0 / 5%), 0 2px 4px rgb(0 0 0 / 5%)',
            }}>
            <Table aria-label="collapsible table"
                sx={{
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgb(17 24 39)' : theme.palette.background.default,
                }}>
                <TableHead 
                    sx={{
                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgb(17 24 39)' : theme.palette.background.default,
                    }}>
                    <TableRow>
                    <TableCell />
                    <TableCell>Date&nbsp;📅</TableCell>
                    <TableCell>Calories&nbsp;🔥</TableCell>
                    <TableCell>Fat&nbsp;(g)</TableCell>
                    <TableCell>Carbs&nbsp;(g)</TableCell>
                    <TableCell>Protein&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgb(55 65 81)' : theme.palette.background.default,}}>
                    {displayedRows.map((row) => (
                    <Row key={row.name} row={row} />
                    ))}
                </TableBody>
                <TableFooter
                    sx={{
                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgb(17 24 39)' : theme.palette.background.default,
                    }}>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                            sx={{
                                border: 'None',
                            
                            }}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
      </ThemeProvider>
    );
  }