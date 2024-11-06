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

const ListItemLink = ({ item, open, onClick, active }) => {
  let icon = null;
  if (item.type === 'dropdown') {
    icon = open ? <ExpandLess className="icon" /> : <ExpandMore className="icon" />;
  } else if (item.type === 'action' && item.icon === 'plus') {
    icon = <Add className="icon" />;
  }

  return (
    <li>
      <ListItemButton
        component={item.type === 'link' ? RouterLink : 'button'}
        to={item.type === 'link' ? item.link : undefined}
        onClick={() => onClick(item.link)}
        className={`listItemButton ${active ? 'active' : ''}`}
      >
        <ListItemText
          primary={item.name}
          className="listItemText"
        />
        {icon && <ListItemIcon className="addIcon">{icon}</ListItemIcon>}
      </ListItemButton>
    </li>
  );
};

ListItemLink.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['link', 'action', 'dropdown']).isRequired,
    link: PropTypes.string,
    action: PropTypes.string,
    icon: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['link']).isRequired,
      link: PropTypes.string.isRequired,
    })),
  }).isRequired,
  open: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
};

const RouterBreadcrumbs = ({ tree }) => {
  const [openStates, setOpenStates] = React.useState(
    tree.map(() => false)
  );
  const [activeItem, setActiveItem] = React.useState(null);

  const handleClick = (to, index) => {
    setActiveItem(to);
    if (index !== undefined && tree[index].type === 'dropdown') {
      setOpenStates((prevOpenStates) => {
        const newOpenStates = [...prevOpenStates];
        newOpenStates[index] = !newOpenStates[index];
        return newOpenStates;
      });
    }
  };

  return (
    <MemoryRouter initialEntries={[tree[0].link]} initialIndex={0}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: 197 }}>
        <Box
          sx={{ bgcolor: 'background.paper', mt: 1 }}
          component="nav"
          aria-label="mailbox folders"
        >
          <List>
            {tree.map((item, index) => (
              <React.Fragment key={item.name}>
                <ListItemLink
                  item={item}
                  open={openStates[index]}
                  onClick={(to) => handleClick(to, index)}
                  active={activeItem === item.link}
                />
                {item.type === 'dropdown' && (
                  <Collapse component="li" in={openStates[index]} timeout="auto" unmountOnExit>
                    <List disablePadding>
                      {item.items.map((subItem) => (
                        <ListItemLink
                          key={subItem.name}
                          item={subItem}
                          onClick={(to) => handleClick(to)}
                          active={activeItem === subItem.link}
                        />
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Box>
    </MemoryRouter>
  );
};

RouterBreadcrumbs.propTypes = {
  tree: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['link', 'action', 'dropdown']).isRequired,
    link: PropTypes.string,
    action: PropTypes.string,
    icon: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['link']).isRequired,
      link: PropTypes.string.isRequired,
    })),
  })).isRequired,
};

export default RouterBreadcrumbs;