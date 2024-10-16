import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// CustomDialog Component
// Props:
// - open: Boolean that controls whether the dialog is open or closed.
// - onClose: Function to close the dialog, triggered when the user clicks the close button.
// - children: The content to be displayed inside the dialog.
const CustomDialog = ({ open, onClose, children }) => {
  return (
    // The MUI Dialog component: acts as a modal popup.
    // - `onClose`: The function called when the dialog is requested to be closed.
    // - `open`: Controls whether the dialog is open (true) or closed (false).
    // - `fullWidth`: Makes the dialog take up the full width of the screen (within the maxWidth).
    // - `maxWidth="md"`: Limits the maximum width of the dialog to the "md" (medium) breakpoint.
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="md">
      
      {/* DialogTitle contains the title area of the dialog, which includes the close button */}
      <DialogTitle>
        {/* IconButton that contains the close icon (X) */}
        <IconButton
          edge="end" // Aligns the button to the end of the dialog title bar
          color="inherit" // Inherits the color (typically default text color)
          onClick={onClose} // Calls onClose function to close the dialog when clicked
          aria-label="close" // Accessibility label for screen readers
        >
          <CloseIcon /> {/* The close (X) icon from Material UI */}
        </IconButton>
      </DialogTitle>

      {/* DialogContent contains whatever content (children) is passed into the dialog */}
      <DialogContent>
        {/* `children` refers to the nested content passed between opening and closing tags of <CustomDialog> */}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;


