import React, { useEffect } from 'react';
import { Box, List, ListItemButton, Collapse, ListItemText, ListItemIcon, TextField, CircularProgress } from '@mui/material';
import { ExpandLess, ExpandMore, Add } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTreeData } from '../../../store/slices/pagesSlice';
import './PagesTree.scss';
import { AppDispatch, RootState } from '../../../store';

interface TreeItem {
  name: string;
  type: 'link' | 'dropdown' | 'action';
  link?: string;
  icon?: string;
  items?: TreeItem[];
}

interface ListItemLinkProps {
  item: TreeItem;
  open?: boolean;
  onClick: (link: string | undefined, index?: number) => void;
  active?: boolean;
  onAddNewItem?: (item: TreeItem) => void;
}

const PagesTree: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tree, loading } = useSelector((state: RootState) => state.pages);

  const [openStates, setOpenStates] = React.useState<boolean[]>([]);
  const [activeLink, setActiveLink] = React.useState<string | null>(null);
  const [isEditingNewItem, setIsEditingNewItem] = React.useState<boolean>(false);
  const [newItemName, setNewItemName] = React.useState('');
  const [parentItem, setParentItem] = React.useState<TreeItem | null>(null);

  useEffect(() => {
    dispatch(fetchTreeData());
  }, [dispatch]);

  const handleClick = (link: string | undefined, index?: number): void => {
    if (link) {
      setActiveLink(link);
    }

    if (index !== undefined && tree[index]?.type === 'dropdown') {
      setOpenStates((prevOpenStates) => {
        const newOpenStates = [...prevOpenStates];
        newOpenStates[index] = !newOpenStates[index];
        return newOpenStates;
      });
    }
  };

  const handleAddNewItem = (item: TreeItem) => {
    setParentItem(item);
    setIsEditingNewItem(true);
  };

  const handleSaveNewItem = () => {
    const itemName = newItemName.trim() || `New Project ${tree.length + 1}`;
    const newItem: TreeItem = {
      name: itemName,
      type: 'link',
      link: `/new-project-${Date.now()}`,
    };

    dispatch({
      type: 'pages/updateTree',
      payload: (prevTree: TreeItem[]) => {
        const updatedTree = [...prevTree];
        if (parentItem && parentItem.type === 'action') {
          updatedTree.push(newItem);
        }
        return updatedTree;
      },
    });

    setNewItemName('');
    setIsEditingNewItem(false);
  };

  if (loading) {
    return (
      <div>
        <CircularProgress sx={{ position: 'absolute', left: '6.5vw', top: '45vh' }} size={24} color="inherit" />
      </div>
    );
  }

  const ListItemLink: React.FC<ListItemLinkProps> = ({ item, open, onClick, active, onAddNewItem }) => {
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
        onClick(item.link); 
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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: 224 }}>
      <Box sx={{ mt: 1 }} component="nav" aria-label="mailbox folders">
        <List>
          {tree.map((item: TreeItem, index: number) => (
            <React.Fragment key={item.name}>
              {index === 2 && <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(0, 0, 0, 0.17)' }}></div>}
              <ListItemLink
                item={item}
                open={openStates[index]}
                onClick={(link: string | undefined) => handleClick(link, index)} 
                active={activeLink === item.link}
                onAddNewItem={handleAddNewItem}
              />

              {item.type === 'dropdown' && item.items && (
                <Collapse component="li" in={openStates[index]} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    {item.items.map((subItem: TreeItem) => (
                      <ListItemLink
                        key={subItem.name}
                        item={subItem}
                        onClick={(link: string | undefined) => handleClick(link, index)} 
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
  );
};

export default PagesTree;
