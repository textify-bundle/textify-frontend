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

interface User {
  id: string;
  name: string;
}

interface ActionBarProps {
  users: User[];
  onClick?: (index: number) => void;
}

const ActionBar: React.FC<ActionBarProps> = ({ users, onClick }) => {
  const colors = ['#4C84EA', '#2B8643', '#0751D8'];
  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  const shuffleArray = (array: User[]) => {
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
            {randomUsers.map((user: User, index: number) => (
              <Button
                key={user.id}
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
                  backgroundColor: getRandomColor(),
                  position: 'absolute',
                  left: `${index * 18}px`,
                  zIndex: randomUsers.length - index,
                }}
                onClick={() => onClick && onClick(index)}
              >
                {user.name.charAt(0).toUpperCase()}
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
