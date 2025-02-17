import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import './ActionBar.scss';
import ExportBox from '../../export/Export';
import Settings from '../settings/settings/Settings';
import ShareOverlay from '../../overlay/ShareOverlay';

interface ActionBarProps {
  users: string[];
  onClick?: (index: number) => void;
}

const ActionBar: React.FC<ActionBarProps> = ({ users, onClick }) => {

  const shuffleArray = (array: string[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const randomUsers = shuffleArray(users).slice(0, 4);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        width: '100%',
        height: '50px',
      }}
    >
      <Container maxWidth={false} sx={{ width: '100%', padding: '0 !important' }}>
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 12px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative', minWidth: '80px' }}>
            {randomUsers.map((user: string, index: number) => (
              <Button
                key={index}
                className="user-button"
                sx={{
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '35px',
                  width: '35px',
                  minWidth: '35px',
                  padding: 0,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  position: 'absolute',
                  left: `${index * 18}px`,
                  zIndex: randomUsers.length - index,
                }}
                onClick={() => onClick && onClick(index)}
              >
                {user.charAt(0).toUpperCase()}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ShareOverlay />
            <ExportBox />
            <Settings />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ActionBar;
