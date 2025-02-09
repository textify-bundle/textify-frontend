import React, { useEffect } from 'react';
import { Box, List, ListItemButton, Collapse, ListItemText, ListItemIcon, TextField } from '@mui/material';
import { ExpandLess, ExpandMore, Add } from '@mui/icons-material';
import { Link as RouterLink, useNavigate, useParams, useSearchParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTreeData, createNewProjectAndPage } from '../../../store/slices/pagesSlice';
import './PagesTree.scss';
import { AppDispatch, RootState } from '../../../store';

interface TreeItem {
  name: string;
  type: 'dropdown' | 'link' | 'action';
  link?: string;
  action?: string;
  icon?: string;
  items?: TreeItem[];
  id?: number;
}

interface ListItemLinkProps {
  item: TreeItem;
  open?: boolean;
  onClick: (item: TreeItem) => void;
  active?: boolean;
  onAddNewItem?: () => void;
}

const PagesTree: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const [searchParams] = useSearchParams();
  const pageId = searchParams.get('page');
  const { tree } = useSelector((state: RootState) => state.pages);
  const location = useLocation();

  const [openStates, setOpenStates] = React.useState<{ [key: string]: boolean }>({});
  const [activeLink, setActiveLink] = React.useState<string | null>(null);
  const [isEditingNewItem, setIsEditingNewItem] = React.useState<boolean>(false);
  const [newItemName, setNewItemName] = React.useState('');

  useEffect(() => {
    dispatch(fetchTreeData());
  }, [dispatch]);

  useEffect(() => {
    if (projectId) {
      setOpenStates(prev => ({ ...prev, [projectId]: true }));
    }
  }, [projectId]);

  const handleClick = (item: TreeItem): void => {
    if (item.type === 'dropdown') {
      setOpenStates(prev => ({ ...prev, [item.id!]: !prev[item.id!] }));
    } else if (item.type === 'link' && item.link) {
      setActiveLink(item.link);
      navigate(item.link);
    }
  };

  const handleAddNewItem = () => {
    setIsEditingNewItem(true);
  };

  const handleSaveNewItem = async () => {
    const projectName = newItemName.trim() || `Новый проект ${tree.length + 1}`;
    
    try {
      const result = await dispatch(createNewProjectAndPage(projectName)).unwrap();
      setNewItemName('');
      setIsEditingNewItem(false);
      navigate(`/${result.project.id}?page=${result.page.id}`);
    } catch (error) {
      console.error('Не удалось создать новый проект:', error);
      alert(`Ошибка при создании проекта: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    }
  };

  const ListItemLink: React.FC<ListItemLinkProps> = ({ item, open, onClick, onAddNewItem }) => {
    let icon = null;
    if (item.type === 'dropdown') {
      icon = open ? <ExpandLess className="icon" /> : <ExpandMore className="icon" />;
    } else if (item.type === 'action' && item.icon === 'plus') {
      icon = <Add className="icon" />;
    }

    const isActive = item.type === 'dropdown' 
      ? location.pathname === `/${item.id}`
      : item.link === `${location.pathname}${location.search}`;

    const handleItemClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (item.type === 'action' && item.icon === 'plus') {
        onAddNewItem?.();
      } else {
        onClick(item);
      }
    };

    return (
      <li className="list-item">
        <ListItemButton
          component={item.type === 'link' ? RouterLink : 'button'}
          to={item.type === 'link' ? item.link : undefined}
          onClick={handleItemClick}
          className={`list-item__button ${isActive ? 'active' : ''}`}
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
                open={openStates[item.id!]}
                onClick={() => handleClick(item)}
                active={activeLink === item.link || (item.id?.toString() === projectId)}
                onAddNewItem={handleAddNewItem}
              />

              {item.type === 'dropdown' && item.items && (
                <Collapse component="li" in={openStates[item.id!]} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    {item.items.map((subItem: TreeItem) => (
                      <ListItemLink
                        key={subItem.name}
                        item={subItem}
                        onClick={() => handleClick(subItem)}
                        active={activeLink === subItem.link || (subItem.id?.toString() === pageId)}
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
                placeholder="Название нового проекта"
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

