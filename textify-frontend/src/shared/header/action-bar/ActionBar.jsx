import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import './ActionBar.css';
import PropTypes from 'prop-types';

// const users = [
//     { id: 1, name: 'Heading 1', surname: 'Short description' },
//     { id: 9, name: 'deading 1', surname: 'Short description' },
//       { id: 5, name: '3eading 1', surname: 'Short description' },
// ];

const ActionBar = ({
            users
}) => {
    const pages = ['Отправить', 'Экспортировать', '...'];

    const colors = ['#4C84EA', '#2B8643', '#0751D8'];
    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const calculateMarginLeft = (userCount) => {
        return `${Math.min(userCount, 4) * 21 + 8}px`;
    };

    return (
        <AppBar
            position="static"
            className="action-bar"
        >
            <Container maxWidth={false} className="action-bar-container">
                <Toolbar disableGutters className="action-bar-toolbar">
                    <Box className="user-buttons-container">
                         {users.slice(0, 4).map((user, index) => (
                            <Button
                                key={user.id}
                                className="user-button"
                                sx={{
                                    backgroundColor: getRandomColor(),
                                    left: `${index * 21}px`,
                                }}
                            >
                                {user.name.charAt(0)}
                            </Button>
                        ))}

                        <Box
                            className="main-buttons-container"
                            style={{ marginLeft: calculateMarginLeft(users.length) }}
                        >
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    className={`main-button ${page === '...' ? 'three-dots-button' : ''}`}
                                >
                                    {page === '...' ? (
                                        <span className="dots-container">
                                            <span className="dot"></span>
                                            <span className="dot"></span>
                                            <span className="dot"></span>
                                        </span>
                                    ) : (
                                        page
                                    )}
                                </Button>
                            ))}
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
ActionBar.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,  
};

export default ActionBar;
