import * as React from 'react';
import { Box, List, ListItemButton, Collapse, ListItemText, ListItemIcon } from '@mui/material';
import { ExpandLess, ExpandMore, Add } from '@mui/icons-material';
import { Link as RouterLink, MemoryRouter } from 'react-router-dom';
import './PagesTree.scss';

interface Item {
  name: string;
  type: string ;
  link?: string;
  action?: string;
  icon?: string;
  items?: Item[];
}

interface ListItemLinkProps {
  item: Item;
  open?: boolean;
  onClick: (to: string, index?: number) => void;
  active?: boolean;
}

const ListItemLink: React.FC<ListItemLinkProps> = ({ item, open, onClick, active }) => {
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
        onClick={() => onClick(item.link ?? '', undefined)}
        className={`listItemButton ${active ? 'active' : ''}`}
      >
        <ListItemText primary={item.name} className="listItemText" />
        {icon && <ListItemIcon className="addIcon">{icon}</ListItemIcon>}
      </ListItemButton>
    </li>
  );
};

interface PagesTreeProps {
  tree: Item[];
}

const PagesTree: React.FC<PagesTreeProps> = ({ tree }) => {
  const [openStates, setOpenStates] = React.useState<boolean[]>(tree.map(() => false));
  const [activeItem, setActiveItem] = React.useState<string | null>(null);

  const handleClick = (to: string, index?: number) => {
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
    <MemoryRouter initialEntries={[tree[0].link || '/']} initialIndex={0}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: 197 }}>
        <Box sx={{ bgcolor: 'background.paper', mt: 1 }} component="nav" aria-label="mailbox folders">
          <List>
            {tree.map((item, index) => (
              <React.Fragment key={item.name}>
                <ListItemLink
                  item={item}
                  open={openStates[index]}
                  onClick={(to) => handleClick(to, index)}
                  active={activeItem === item.link}
                />
                {item.type === 'dropdown' && item.items && (
                  <Collapse component="li" in={openStates[index]} timeout="auto" unmountOnExit>
                    <List disablePadding>
                      {item.items.map((item) => (
                        <ListItemLink
                          key={item.name}
                          item={item}
                          onClick={(to) => handleClick(to)}
                          active={activeItem === item.link}
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

export default PagesTree;