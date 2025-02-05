import React, { useState } from 'react';
import { Button } from '@mui/material';
import NodeTypeDialog from './node-type-selector/NodeTypeDialog';

const AddNodeButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>New Block</Button>
      <NodeTypeDialog open={open} onClose={handleClose} />
    </>
  );
};

export default AddNodeButton;
