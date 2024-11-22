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

  const calculateMarginLeft = (userCount: number) => `${Math.min(userCount, 4) * 21 + 8}px`;

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
        width: '345.5px',
        height: '50px', 
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: '100%',
          padding: '0 !important',
        }}
      >
        <Toolbar disableGutters>
          <Box sx={{ position: 'relative' }}>
            {randomUsers.map((user: User, index: number) => (
              <Button
                key={user.id}
                className="user-button"
                sx={{
                  color: 'white',
                  display: 'block',
                  height: '31px',
                  minWidth: '31px',
                  padding: 0,
                  borderRadius: '50%',
                  position: 'absolute',
                  zIndex: randomUsers.length - index, 
                  backgroundColor: getRandomColor(),
                  left: `${index * 25}px`, 
                }}
                onClick={() => onClick && onClick(index)}
              >
                {user.name.charAt(0).toUpperCase()}
              </Button>
            ))}

            <Box
              className="main-buttons-container"
              sx={{
                marginLeft: calculateMarginLeft(randomUsers.length),
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <ShareOverlay />
              <ExportBox />
              <Settings />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ActionBar;
