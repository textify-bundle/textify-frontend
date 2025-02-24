import { FC } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { actions } from '../../../shared/config/actions';

const ActionBar: FC = () => {
  const dispatch = useDispatch();

  const handleAction = (actionId: string) => {
    dispatch({ type: `app/${actionId}` });
  };

  return (
    <Box role="toolbar" sx={{ display: 'flex', gap: 1 }}>
      {Object.values(actions).map((action) => (
        <Tooltip key={action.id} title={action.label}>
          <IconButton onClick={() => handleAction(action.id)}>
            {action.label}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
};

export default ActionBar;
