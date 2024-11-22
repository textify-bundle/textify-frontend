import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import './ActionBar.scss';
import ExportBox from '../../export/Export.tsx';  
import Settings from '../settings/settings/Settings.tsx';
import ShareOverlay from '../../overlay/ShareOverlay.tsx';
 
interface User {
    id: string;
    name: string;
}

interface ActionBarProps {
    users: User[];
    onClick?: (index: number) => void;
}

const ActionBar: React.FC<ActionBarProps> = ({ users, onClick = () => {} }) => {
    
   
    const colors = ['#4C84EA', '#2B8643', '#0751D8'];

    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const calculateMarginLeft = (userCount: number) => {
        return `${Math.min(userCount, 4) * 21 + 8}px`;
    };

    const shuffleArray = (array: User[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const randomUsers = shuffleArray([...users]).slice(0, 4);

     

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: "transparent",
                boxShadow: 'none',
                width: '345.5px',
                height: '31px',
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
                    <Box>
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
                                    zIndex: 1,
                                    backgroundColor: getRandomColor(),
                                    left: `${index * 21 - 100}px`,   
                                }}
                            >
                                {user.name.charAt(0)}
                            </Button>
                        ))}

                        <Box
                            className="main-buttons-container"
                            style={{ marginLeft: calculateMarginLeft(randomUsers.length) }}
                        >
                           <ShareOverlay />
                           <ExportBox /> 
                            <Settings/>
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default ActionBar;
