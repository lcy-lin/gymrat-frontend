import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TagBadge from '../TagBadge';
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

const columns = [
  {
    id: 'id',
    label: 'ID',
    minWidth: 30,
    align: 'center',
  },
  {
    id: 'time',
    label: 'Time',
    minWidth: 30,
    align: 'center',
  },
  {
    id: 'tags',
    label: 'Tags',
    align: 'center',
    minWidth: 60,
  },
  {
    id: 'description',
    label: 'Description',
    align: 'center',
    minWidth: 200,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'calories',
    label: 'Calories Consumed',
    align: 'center',
    minWidth: 100,
  },
  {
    id: 'publicity',
    label: 'Public',
    minWidth: 90,
    align: 'center',
  },
];

function createData(id, time, tags, description, calories, publicity) {
  calories = -calories;
  time = time.split(' ')[0].replaceAll('-', '/');
  publicity = publicity === 0 ? '✅' : '❌';
  return { id, time, tags, description, calories, publicity };
};

// const rows = [
//   createData('1', '2021-10-01 12:00:00',['arms', 'chest'], 'new pr 100kg 5 reps', -200, 'true'),
//   createData('2', '2021-10-02 12:00:00',['legs'], 'new pr 200kg 10 reps', -350, 'false'),
// ];


export default function ActTable({selectedTag, actData}) {
  const rows = actData
  ? actData?.map((activity) =>
      createData(
        activity.id,
        activity.created_at,
        activity.tags,
        activity.description,
        -200,
        activity.publicity
      )
    )
  : [];
  const [preferredTheme, setPreferredTheme] = React.useState('light');

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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="w-full">
      <span>
        <p className="text-xl font-semibold m-4 dark:text-white">{selectedTag?.emoji} {selectedTag?.category}</p>
      </span>
      <ThemeProvider theme={preferredTheme === 'dark' ? darkTheme : lightTheme}>
        <Paper 
          sx={{
            width: '95%',
            overflow: 'hidden',
            height: 'fit-content',
            borderRadius: '0.5rem',
            boxShadow: '0 0 0 1px rgb(0 0 0 / 5%), 0 2px 4px rgb(0 0 0 / 5%)',
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgb(31 41 55)' : theme.palette.background.default,
          }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow
                  sx={{
                    ".css-pengl1-MuiTableCell-root":  {
                      backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgb(17 24 39)' : theme.palette.background.default,
                    }
                  }}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ 
                        minWidth: column.minWidth,
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {Array.isArray(value) 
                                ? value.map((tag, index) => <TagBadge key={index} tag={tag} />)
                                : <TagBadge tag={value} />}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </ThemeProvider>
    </div>
    
  );
}