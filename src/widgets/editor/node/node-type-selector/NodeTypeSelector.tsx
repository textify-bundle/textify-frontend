import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateNode } from '../../../../store/slices/blockSlice';
import { NodeType } from '../../../../shared/types/editor/node';

interface NodeTypeSelectorProps {
  nodeId: string;
}

const NodeTypeSelector: React.FC<NodeTypeSelectorProps> = ({ nodeId }) => {
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState<NodeType>('text');

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value as NodeType;
    setSelectedType(newType);
    dispatch(updateNode({ id: nodeId, type: newType, content: '', styles: {} }));
  };

  return (
    <select value={selectedType} onChange={handleTypeChange}>
      <option value="text">Text</option>
      <option value="heading">Heading</option>
      <option value="todo">Todo</option>
      <option value="quote">Quote</option>
      <option value="code">Code</option>
      <option value="divider">Divider</option>
      <option value="image">Image</option>
      <option value="video">Video</option>
      <option value="file">File</option>
      <option value="table">Table</option>
      <option value="callout">Callout</option>
      <option value="bookmark">Bookmark</option>
      <option value="link">Link</option>
      <option value="equation">Equation</option>
      <option value="none">None</option>
    </select>
  );
};

export default NodeTypeSelector;
