import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addNode } from '../../../../store/slices/nodeSlice';
import { NodeType } from '../../../../shared/types/editor/node';

interface NodeTypeDialogProps {
  open: boolean;
  onClose: () => void;
}

const NodeTypeDialog: React.FC<NodeTypeDialogProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState<NodeType>('text');

  const handleTypeChange = (event: SelectChangeEvent<NodeType>) => {
    setSelectedType(event.target.value as NodeType);
  };

  const handleAddNode = () => {
    const id = Date.now().toString();
    const newNode = {
      id,
      type: selectedType,
      content: selectedType === 'text' ? `Node ${id}` : '',
      styles: {},
    };
    dispatch(addNode(newNode));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Node Type</DialogTitle>
      <DialogContent>
        <Select value={selectedType} onChange={handleTypeChange} fullWidth>
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="heading">Heading</MenuItem>
          <MenuItem value="todo">Todo</MenuItem>
          <MenuItem value="quote">Quote</MenuItem>
          <MenuItem value="code">Code</MenuItem>
          <MenuItem value="divider">Divider</MenuItem>
          <MenuItem value="image">Image</MenuItem>
          <MenuItem value="video">Video</MenuItem>
          <MenuItem value="file">File</MenuItem>
          <MenuItem value="table">Table</MenuItem>
          <MenuItem value="callout">Callout</MenuItem>
          <MenuItem value="bookmark">Bookmark</MenuItem>
          <MenuItem value="link">Link</MenuItem>
          <MenuItem value="equation">Equation</MenuItem>
          <MenuItem value="none">None</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddNode}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NodeTypeDialog;
