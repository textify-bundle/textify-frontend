import * as React from 'react';
import { Box, List, ListItemButton, Collapse, ListItemText, ListItemIcon } from '@mui/material';
import { ExpandLess, ExpandMore, Add } from '@mui/icons-material';
import { Link as RouterLink, MemoryRouter } from 'react-router-dom';
import './PagesTree.scss';

interface Item {
  name: string;
  type: 'link' | 'action' | 'dropdown' ;
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
    <li className="list-item">
    <ListItemButton
     component={item.type === 'link' ? RouterLink : 'button'}
     to={item.type === 'link' ? item.link : undefined}
     onClick={() => onClick(item.link ?? '', undefined)}
     className={`list-item__button ${active ? 'active' : ''}`}
    >
        <ListItemText primary={item.name} className="list-item__text" />
        {icon && <ListItemIcon className="list-item__add-icon">{icon}</ListItemIcon>}
      </ListItemButton>
    </li>
  );
};

interface PagesTreeProps {
  tree: Item[];
}

const PagesTree: React.FC<PagesTreeProps> = ({ tree }) => {
  const [openStates, setOpenStates] = React.useState<boolean[]>(tree.map(() => false));
  const [activeLink, setActiveLink] = React.useState<string | null>(null);

  const handleClick = (link: string | undefined, index?: number) => {
    if (link) {
      setActiveLink(link);
    }

    if (index !== undefined && tree[index].type === 'dropdown') {
      setOpenStates((prevOpenStates) => {
        const newOpenStates = [...prevOpenStates];
        newOpenStates[index] = !newOpenStates[index];
        return newOpenStates;
      });
    }
  };

  return (
    <MemoryRouter initialEntries={[tree[0]?.link || '/']} initialIndex={0}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: 197 }}>
        <Box sx={{ bgcolor: 'background.paper', mt: 1 }} component="nav" aria-label="mailbox folders">
          <List>
            {tree.map((item, index) => (
              <React.Fragment key={item.name}>
                <ListItemLink
                  item={item}
                  open={openStates[index]}
                  onClick={(to) => handleClick(to, index)}
                  active={activeLink === item.link}
                />
                {item.type === 'dropdown' && item.items && (
                  <Collapse component="li" in={openStates[index]} timeout="auto" unmountOnExit>
                    <List disablePadding>
                      {item.items.map((subItem) => (
                        <ListItemLink
                          key={subItem.name}
                          item={subItem}
                          onClick={(to) => handleClick(to)}
                          active={activeLink === subItem.link} 
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