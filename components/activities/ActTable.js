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
import RowDialog from './RowDialog';
import Toggle from './Toggle';
import Swal from 'sweetalert2';
import AlertMessages from '@/utils/alertMessages';
import axios from 'axios';
import Image from 'next/image';
import { parseCookies } from 'nookies';

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
    id: 'publicity',
    label: 'Public',
    minWidth: 90,
    align: 'center',
  },
];

const columnsInStudentMode = [
  {
    id: 'id',
    label: 'ID',
    minWidth: 30,
    align: 'center',
  },
  {
    id: 'name',
    label: 'Name',
    minWidth: 30,
    align: 'center',
  },
  {
    id: 'picture',
    label: 'Picture',
    minWidth: 10,
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
    id: 'publicity',
    label: 'Public',
    minWidth: 90,
    align: 'center',
  },
];

function createData(id, time, tags, description, publicity) {
  time = time.split(' ')[0].replaceAll('-', '/');
  publicity = publicity === 1 ? '✅' : '🔒';
  return { id, time, tags, description, publicity };
};

function createDataInStudentMode(id, user_id, name, picture, time, tags, description, publicity) {
  time = time.split(' ')[0].replaceAll('-', '/');
  publicity = publicity === 1 ? '✅' : '🔒';
  picture = picture ? `${process.env.NEXT_PUBLIC_S3_URL}/${picture}` : '/avatar.png';
  return { id, user_id, name, picture, time, tags, description, publicity };
};

export default function ActTable({selectedTag, actData, studentMode, setStudentMode, selectedStudent, setSelectedStudent, coach}) {
  const rows = actData
  ? !studentMode
    ? actData
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map((activity) =>
          createData(
            activity.id,
            activity.created_at,
            activity.tags,
            activity.description,
            activity.publicity
          )
        )
    : actData
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map((activity) =>
          createDataInStudentMode(
            activity.id,
            activity.user_id,
            activity.name,
            activity.picture,
            activity.created_at,
            activity.tags,
            activity.description,
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
  const [openDialog, setOpenDialog] = React.useState(false);
  const [rowData, setRowData] = React.useState(null);
  const [activityData, setActivityData] = React.useState(null);
  const [updatedActivityData, setUpdatedActivityData] = React.useState(null);
  const [editMode, setEditMode] = React.useState(false);
  const cookies = parseCookies();

  const handleClickOpen = async (row) => {
    await setRowData(row);
    setOpenDialog(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/1.0.0/activities/${cookies.userId}/${row.id}`,{
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
  const handleClickDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to recover this activity!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/1.0.0/activities/${cookies.userId}/${id}`,{
          headers: {
            'Authorization': `Bearer ${cookies.accessToken}`
          },
        });
        setActivityData(null);
        Swal.fire(
          'Deleted!',
          'Your activity has been deleted.',
          'success'
        ).then(() => {
          setOpenDialog(false);
          window.location.reload();
        });
        
      }
    }).catch((err) => {
      AlertMessages.error(err);
    });
  };
  const handleClose = async () => {
    setOpenDialog(false);
    setActivityData(null);
    setEditMode(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="w-full">
      <span className="flex flex-row items-center justify-between w-11/12">
        {studentMode ? (
          selectedStudent ? (
            <div className="flex flex-row gap-2 items-center dark:text-white m-4">
                <Image
                  src={ selectedStudent?.picture ? `${process.env.NEXT_PUBLIC_S3_URL}/${selectedStudent?.picture}` : '/avatar.png'}
                  alt={selectedStudent?.name}
                  width={40}
                  height={40}
                  className="rounded-full w-12 h-12 object-cover"
                />
              {selectedStudent?.name}
            </div>
          ) : (
            <h1 className="text-2xl font-semibold m-4 dark:text-white">Student Records</h1>
          )
        ) : (
          <p className="text-xl font-semibold m-4 dark:text-white">
            {selectedTag?.emoji} {selectedTag?.category}
          </p>
        )}

        {coach && <Toggle studentMode={studentMode} setStudentMode={setStudentMode} setSelectedStudent={setSelectedStudent}/>}
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
                  {studentMode  && !selectedStudent 
                    ? (columnsInStudentMode.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ 
                            minWidth: column.minWidth,
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))) 
                    : (columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ 
                            minWidth: column.minWidth,
                          }}
                        >
                          {column.label}
                        </TableCell>
                      )))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        onClick={() => handleClickOpen(row)}>
                          {studentMode && !selectedStudent
                            ? (columnsInStudentMode.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                    {column.id === 'picture' ? (
                                        <span className='flex justify-center w-full'>
                                          <Image src={value} alt="Student" className="w-8 h-8 object-cover rounded-full" width={40} height={40} />
                                        </span>
                                        
                                      ) : Array.isArray(value) ? (
                                        value.map((tag, index) => <TagBadge key={index} tag={tag} />)
                                      ) : (
                                        <p className="text-xs">{value}</p>
                                      )}
                                </TableCell>
                              );
                            }))
                            : (columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell key={column.id} align={column.align}>
                                    {Array.isArray(value) 
                                      ? value.map((tag, index) => <TagBadge key={index} tag={tag} />)
                                      : <TagBadge tag={value} />}
                                  </TableCell>
                                );
                              }))}
                      </TableRow>
                    );
                  })}
              </TableBody>
              <RowDialog
                cookies={cookies}
                rowData={rowData}
                activityData={activityData}
                setActivityData={setActivityData}
                updatedActivityData={updatedActivityData}
                setUpdatedActivityData={setUpdatedActivityData}
                openDialog={openDialog}
                handleClose={handleClose}
                handleClickDelete={handleClickDelete}
                editMode={editMode}
                setEditMode={setEditMode}
                preferredTheme={preferredTheme}
                darkTheme={darkTheme}
                lightTheme={lightTheme}
                studentMode={studentMode}
              />
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