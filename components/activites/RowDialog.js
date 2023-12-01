import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { ThemeProvider } from "@mui/material";
import ShowDialogContent from "./ShowDialogContent";
import { Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import AlertMessages from "@/utils/alertMessages";
export default function RowDialog({cookies, rowData, activityData, setActivityData, updatedActivityData, setUpdatedActivityData, openDialog, handleClose, handleClickDelete, editMode, setEditMode, preferredTheme, darkTheme, lightTheme}) {
    const handleClickUpdate = async (id) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You are about to update this activity",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, update it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await handleUpdate(id);
          Swal.fire(
            'Updated!',
            'Your activity has been updated.',
            'success'
          ).then(() => {
            setActivityData(updatedActivityData);
            setEditMode(false);
            window.location.reload();
          });
        }
      })
    }
    const handleUpdate = async (id) => {
      try {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/1.0.0/activities/${cookies.userId}/${id}`, {
          activity: updatedActivityData
        },{
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`
          }
        });
      }
      catch (err) {
        AlertMessages.error(err);
      }
    } 
    const handleCancel = () => {
      setUpdatedActivityData(activityData);
      setEditMode(false);
    }
    return(
      <ThemeProvider theme={preferredTheme === 'dark' ? darkTheme : lightTheme}>
        <Dialog
          fullWidth={true}
          maxWidth="md"
          open={openDialog}
          onClose={handleClose}
          sx = {{ zIndex: 2 }}
          >
          <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: preferredTheme === 'dark' ? "rgb(31 41 55)" : "inherit", }}>
            <DialogTitle sx={{ fontSize: "28px", fontWeight: "600"}}>Detail Information</DialogTitle>
            <Button onClick={handleClose} variant="text" color="error" sx={{ margin: "10px" }}>❌</Button>
          </div>
          <ShowDialogContent
            rowData={rowData}
            activityData={activityData}
            updatedActivityData={updatedActivityData}
            setUpdatedActivityData={setUpdatedActivityData}
            editMode={editMode}
            setEditMode={setEditMode}
            preferredTheme={preferredTheme}
            darkTheme={darkTheme}
            lightTheme={lightTheme}
          />
          <div style={{ backgroundColor: preferredTheme === 'dark' ? "rgb(31 41 55)" : "inherit"}}>
            {editMode ? (
              <>
                <Button onClick={handleCancel} variant="contained" color="error" sx={{ margin: "10px", color: "white"}}>Cancel</Button>
                <Button onClick={() => handleClickUpdate(activityData.id)} variant="contained" sx={{ margin: "10px", color: "white"}}>Update</Button>
              </>
            ) : (
              <Button onClick={() => setEditMode(!editMode)} variant="contained" sx={{ margin: "10px", color: "white"}}>Edit</Button>
            )}
            
            <Button onClick={() => handleClickDelete(activityData.id)} variant="contained" color="error" sx={{ margin: "10px" }}>Delete</Button>
          </div>
        </Dialog>
      </ThemeProvider>
    );
}