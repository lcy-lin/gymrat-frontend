import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function RowDialog({rowData, openDialog, handleClose}) {
    return(
        <Dialog
          fullWidth={true}
          maxWidth="xl"
          open={openDialog}
          onClose={handleClose}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <DialogTitle>Detail Information</DialogTitle>
          </div>
          <DialogContent sx={{ paddingTop: "0" }}>
            {rowData && (
              <div>
                <p>id: {rowData.id}</p>
                <p>time: {rowData.time}</p>
                <p>description: {rowData.description}</p>
                <p>calories consumed: {rowData.calories}</p>
                <p>publicity: {rowData.publicity}</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
    );
}