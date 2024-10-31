import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  List,
  ListItemButton,
  Collapse,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { ExpandLess, ExpandMore, Add } from '@mui/icons-material';
import {
  Link as RouterLink,
  MemoryRouter
} from 'react-router-dom';
import './index.scss';

const ListItemLink = ({ to, open, onClick, active, primary }) => {
  let icon = null;
  if (open != null) {
    icon = open ? <ExpandLess /> : <ExpandMore />;
  }

  return (
    <li>
      <ListItemButton
        component={RouterLink}
        to={to}
        onClick={onClick}
        className={`listItemButton ${active ? 'active' : ''}`}
      >
        <ListItemText
          primary={primary}
          className="listItemText"
        />
        {icon}
      </ListItemButton>
    </li>
  );
};

ListItemLink.propTypes = {
  open: PropTypes.bool,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  primary: PropTypes.string.isRequired,
};

const RouterBreadcrumbs = ({ projects, pagesPerProject }) => {
  const [openStates, setOpenStates] = React.useState(
    projects.map(() => false)
  );
  const [activeItem, setActiveItem] = React.useState(null);

  const handleClick = (to, projectIndex) => {
    setActiveItem(to);
    if (projectIndex !== undefined) {
      setOpenStates((prevOpenStates) => {
        const newOpenStates = [...prevOpenStates];
        newOpenStates[projectIndex] = !newOpenStates[projectIndex];
        return newOpenStates;
      });
    }
  };

  return (
    <MemoryRouter initialEntries={[`/${projects[0]}`]} initialIndex={0}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: 197 }}>
        <Box
          sx={{ bgcolor: 'background.paper', mt: 1 }}
          component="nav"
          aria-label="mailbox folders"
        >
          <List>
            <ListItemLink
              to="/"
              onClick={() => handleClick('/')}
              active={activeItem === '/'}
              primary="Главная"
            />
            <ListItemButton className="listItemButton">
              <ListItemText
                primary="Создать проект"
                className="listItemText"
              />
              <ListItemIcon className="addIcon">
                <Add />
              </ListItemIcon>
            </ListItemButton>
            {projects.map((project, projectIndex) => (
              <React.Fragment key={project}>
                <ListItemLink
                  to={`/${project}`}
                  open={openStates[projectIndex]}
                  onClick={() => handleClick(`/${project}`, projectIndex)}
                  active={activeItem === `/${project}`}
                  primary={project}
                />
                <Collapse component="li" in={openStates[projectIndex]} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    {Array.from({ length: pagesPerProject[projectIndex] }, (_, pageIndex) => (
                      <ListItemLink
                        key={`${project}-Page ${pageIndex + 1}`}
                        to={`/${project}/Page ${pageIndex + 1}`}
                        onClick={() => handleClick(`/${project}/Page ${pageIndex + 1}`)}
                        active={activeItem === `/${project}/Page ${pageIndex + 1}`}
                        primary={`Page ${pageIndex + 1}`}
                      />
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Box>
    </MemoryRouter>
  );
};

RouterBreadcrumbs.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.string).isRequired,
  pagesPerProject: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default RouterBreadcrumbs;