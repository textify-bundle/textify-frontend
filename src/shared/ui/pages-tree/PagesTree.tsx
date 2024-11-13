import * as React from 'react';
import {Box,  List,  ListItemButton,  Collapse,  ListItemText,  ListItemIcon,  TextField,} from '@mui/material';
import { ExpandLess, ExpandMore, Add } from '@mui/icons-material';
import { Link as RouterLink, MemoryRouter } from 'react-router-dom';
import './PagesTree.scss';

interface Item {
  name: string;
  type: 'link' | 'action' | 'dropdown' | string;
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
  onAddNewItem?: (parentItem: Item) => void;
}

const ListItemLink: React.FC<ListItemLinkProps> = ({
  item,
  open,
  onClick,
  active,
  onAddNewItem,
}) => {
  let icon = null;
  if (item.type === 'dropdown') {
    icon = open ? <ExpandLess className="icon" /> : <ExpandMore className="icon" />;
  } else if (item.type === 'action' && item.icon === 'plus') {
    icon = <Add className="icon" />;
  }

  const handleItemClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.type === 'action' && item.icon === 'plus') {
      onAddNewItem?.(item);
    } else {
      onClick(item.link ?? '', undefined);
    }
  };

  return (
    <li className="list-item">
      <ListItemButton
        component={item.type === 'link' ? RouterLink : 'button'}
        to={item.type === 'link' ? item.link : undefined}
        onClick={handleItemClick}
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

const PagesTree: React.FC<PagesTreeProps> = ({ tree: initialTree }) => {
  const [tree, setTree] = React.useState<Item[]>(initialTree);
  const [openStates, setOpenStates] = React.useState<boolean[]>(tree.map(() => false));
  const [activeLink, setActiveLink] = React.useState<string | null>(null);
  const [isEditingNewItem, setIsEditingNewItem] = React.useState<boolean>(false);
  const [newItemName, setNewItemName] = React.useState('');
  const [parentItem, setParentItem] = React.useState<Item | null>(null);

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

  const handleAddNewItem = (item: Item) => {
    setParentItem(item);
    setIsEditingNewItem(true); 
  };

  const handleSaveNewItem = () => {
    const itemName = newItemName.trim() || `New Project ${tree.length + 1}`;
    const newItem: Item = {
      name: itemName,
      type: 'link',
      link: `/new-project-${Date.now()}`,
    };

    setTree((prevTree) => {
      const updatedTree = [...prevTree];
      if (parentItem && parentItem.type === 'action') {
        updatedTree.push(newItem);
      }
      return updatedTree;
    });

    setNewItemName('');
    setIsEditingNewItem(false);
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
                  onAddNewItem={handleAddNewItem}
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
                          onAddNewItem={handleAddNewItem}
                        />
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            ))}
            {isEditingNewItem && (
              <ListItemButton className="list-item__button" sx={{ pl: 4 }}>
                <TextField
                  placeholder="New Project Name"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSaveNewItem();
                    }
                  }}
                  fullWidth
                  autoFocus
                  variant="standard"
                  sx={{
                    '& .MuiInput-underline:before': { borderBottom: 'none' },
                    '& .MuiInput-underline:after': { borderBottom: 'none' },
                    '& .MuiInputBase-input': { padding: 0 },
                  }}
                />
              </ListItemButton>
            )}
          </List>
        </Box>
      </Box>
    </MemoryRouter>
  );
};

export default PagesTree;
