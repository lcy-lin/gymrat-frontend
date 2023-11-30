import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { ThemeProvider } from "@mui/material";
import ShowDialogContent from "./ShowDialogContent";
import { Button } from "@mui/material";
export default function RowDialog({rowData, activityData, openDialog, handleClose, handleClickDelete, preferredTheme, darkTheme, lightTheme}) {
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
            preferredTheme={preferredTheme}
            darkTheme={darkTheme}
            lightTheme={lightTheme}
          />
          <div style={{ backgroundColor: preferredTheme === 'dark' ? "rgb(31 41 55)" : "inherit"}}>
            <Button onClick={handleClose} variant="contained" sx={{ margin: "10px", color: "white"}}>Edit</Button>
            <Button onClick={() => handleClickDelete(activityData.id)} variant="contained" color="error" sx={{ margin: "10px" }}>Delete</Button>
          </div>
        </Dialog>
      </ThemeProvider>
    );
}