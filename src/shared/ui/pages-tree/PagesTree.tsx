import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  List,
  ListItemButton,
  Collapse,
  ListItemText,
  IconButton,
  Button,
  TextField,
} from '@mui/material';
import { ExpandLess, ExpandMore, Add, Remove } from '@mui/icons-material';
import {
  Link as RouterLink,
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTreeData,
  createNewProjectAndPage,
  createNewPage,
  removePageFromTree,
} from '../../../store/slices/pagesSlice';
import './PagesTree.scss';
import type { AppDispatch, RootState } from '../../../store';
import TModal from '../../tmodal/TModal';
import NewSearch from '../search-bar/SearchBar';
import { deleteProject } from '../../api/sideBar/projectsService';

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
  onAddNewPage?: () => void;
  onDeletePage?: () => void;
  onDeleteProject?: () => void;
  onPageSelect?: (pageId: number) => void; // Callback for page selection
  isEditingNewPage: boolean;
  newPageName: string;
  setNewPageName: (name: string) => void;
  handleSaveNewPage: () => void;
  currentProjectId: number | null;
  onNewPageBlur: () => void;
}

const PagesTree: React.FC<{ onPageSelect?: (pageId: number) => void }> = ({ onPageSelect }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const [searchParams] = useSearchParams();
  const pageId = searchParams.get('page');
  const { tree } = useSelector((state: RootState) => state.pages);
  const location = useLocation();
  const [openProjectDialog, setOpenProjectDialog] = useState<boolean>(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  );

  const [openStates, setOpenStates] = useState<{ [key: string]: boolean }>({});
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [isEditingNewItem, setIsEditingNewItem] = useState<boolean>(false);
  const [newItemName, setNewItemName] = useState('');
  const [isEditingNewPage, setIsEditingNewPage] = useState<boolean>(false);
  const [newPageName, setNewPageName] = useState('');
  const [currentProjectId, setCurrentProjectId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [menuPageId, setMenuPageId] = useState<number | null>(null);

  const newItemInputRef = useRef<HTMLInputElement>(null);
  const newPageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(fetchTreeData());
  }, [dispatch]);

  useEffect(() => {
    if (projectId) {
      setOpenStates((prev) => ({ ...prev, [projectId]: true }));
    }
  }, [projectId]);

  const handleClick = (item: TreeItem): void => {
    if (item.type === 'dropdown') {
      setOpenStates((prev) => ({ ...prev, [item.id!]: !prev[item.id!] }));
    } else if (item.type === 'link' && item.link) {
      setActiveLink(item.link);
      navigate(item.link);
      if (item.id && onPageSelect) {
        onPageSelect(item.id); // Notify LayoutWrapper of the selected page
      }
    }
  };

  const handleDeleteProject = async () => {
    if (selectedProjectId) {
      try {
        await deleteProject(selectedProjectId);
        dispatch(fetchTreeData());
        setOpenProjectDialog(false);
      } catch (error) {
        console.error('Ошибка при удалении проекта:', error);
        alert(
          `Ошибка при удалении проекта: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`,
        );
      }
    }
  };

  const handleOpenProjectDialog = (projectId: number) => {
    setSelectedProjectId(projectId);
    setOpenProjectDialog(true);
  };

  const handleAddNewItem = () => {
    setIsEditingNewItem(true);
    setTimeout(() => {
      newItemInputRef.current?.focus();
    }, 0);
  };

  const handleSaveNewItem = async () => {
    const projectName = newItemName.trim() || `Новый проект ${tree.length + 1}`;

    try {
      const result = await dispatch(
        createNewProjectAndPage(projectName),
      ).unwrap();
      setNewItemName('');
      setIsEditingNewItem(false);
      navigate(`/${result.project.id}?page=${result.page.id}`);
    } catch (error) {
      console.error('Не удалось создать новый проект:', error);
      alert(
        `Ошибка при создании проекта: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`,
      );
    }
  };

  const handleAddNewPage = (projectId: number) => {
    setCurrentProjectId(projectId);
    setIsEditingNewPage(true);
    setTimeout(() => {
      newPageInputRef.current?.focus();
    }, 0);
  };

  const handleSaveNewPage = async () => {
    if (currentProjectId) {
      const pageName = newPageName.trim() || `Новая страница`;
      try {
        await dispatch(
          createNewPage({ projectId: currentProjectId, title: pageName }),
        ).unwrap();
        setNewPageName('');
        setIsEditingNewPage(false);
        setCurrentProjectId(null);
      } catch (error) {
        console.error('Не удалось создать новую страницу:', error);
        alert(
          `Ошибка при создании страницы: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`,
        );
      }
    }
  };

  const handleDeletePage = async () => {
    if (menuPageId) {
      try {
        await dispatch(removePageFromTree(menuPageId)).unwrap();
        setOpenDialog(false);
      } catch (error) {
        console.error('Не удалось удалить страницу:', error);
        alert(
          `Ошибка при удалении страницы: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`,
        );
      }
    }
  };

  const handleOpenDialog = (pageId: number) => {
    setMenuPageId(pageId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setMenuPageId(null);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleNewItemBlur = () => {
    if (newItemName.trim() === '') {
      setIsEditingNewItem(false);
    }
  };

  const handleNewPageBlur = () => {
    if (newPageName.trim() === '') {
      setIsEditingNewPage(false);
      setCurrentProjectId(null);
    }
  };

  const ListItemLink: React.FC<ListItemLinkProps> = ({
    item,
    open,
    onClick,
    onAddNewItem,
    onAddNewPage,
    onDeleteProject,
    isEditingNewPage,
    newPageName,
    setNewPageName,
    handleSaveNewPage,
    currentProjectId,
    onNewPageBlur,
    onPageSelect,
  }) => {
    const isActive =
      item.type === 'dropdown'
        ? location.pathname === `/${item.id}`
        : item.link === `${location.pathname}${location.search}`;

    const handleItemClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (item.type === 'action' && item.icon === 'plus') {
        onAddNewItem?.();
      } else {
        onClick(item);
        if (item.id && onPageSelect) {
          onPageSelect(item.id); // Notify LayoutWrapper of the selected page
        }
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
          {item.type === 'dropdown' && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onClick(item);
              }}
            >
              {open ? (
                <ExpandLess fontSize="small" />
              ) : (
                <ExpandMore fontSize="small" />
              )}
            </IconButton>
          )}
          <ListItemText primary={item.name} className="list-item__text" />
          {item.type === 'dropdown' && (
            <>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddNewPage?.();
                }}
              >
                <Add fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteProject?.();
                }}
              >
                <Remove fontSize="small" />
              </IconButton>
            </>
          )}
          {item.type === 'link' &&
            item.name !== 'Главная' &&
            item.name !== 'Корзина' && (
              <IconButton
                size="small"
                onClick={() => handleOpenDialog(item.id!)}
              >
                <Remove fontSize="small" />
              </IconButton>
            )}
        </ListItemButton>
        {item.type === 'dropdown' &&
          isEditingNewPage &&
          currentProjectId === item.id && (
            <ListItemButton className="list-item__button" sx={{ pl: 4 }}>
              <TextField
                placeholder="Название новой страницы"
                value={newPageName}
                onChange={(e) => setNewPageName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSaveNewPage();
                  }
                }}
                onBlur={onNewPageBlur}
                fullWidth
                autoFocus
                inputRef={newPageInputRef}
                variant="standard"
                sx={{
                  '& .MuiInput-underline:before': { borderBottom: 'none' },
                  '& .MuiInput-underline:after': { borderBottom: 'none' },
                  '& .MuiInputBase-input': { padding: 0 },
                }}
              />
            </ListItemButton>
          )}
      </li>
    );
  };

  const filterTree = (items: TreeItem[], query: string): TreeItem[] => {
    return items.reduce((acc: TreeItem[], item) => {
      const matchesQuery = item.name
        .toLowerCase()
        .includes(query.toLowerCase());
      if (matchesQuery) {
        acc.push(item);
      } else if (item.items) {
        const filteredItems = filterTree(item.items, query);
        if (filteredItems.length > 0) {
          acc.push({ ...item, items: filteredItems });
        }
      }
      return acc;
    }, []);
  };

  const filteredTree = searchQuery ? filterTree(tree, searchQuery) : tree;

  useEffect(() => {
    if (searchQuery) {
      const expandAll = (items: TreeItem[]) => {
        items.forEach((item) => {
          if (item.type === 'dropdown') {
            setOpenStates((prev) => ({ ...prev, [item.id!]: true }));
            if (item.items) {
              expandAll(item.items);
            }
          }
        });
      };
      expandAll(filteredTree);
    } else {
      setOpenStates({});
    }
  }, [searchQuery, filteredTree]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: 224 }}>
      <div style={{ marginLeft: 11, marginTop: 20, width: 200 }}>
        <NewSearch
          onChange={handleSearchChange}
          value={searchQuery}
          placeholder="Поиск проектов и страниц"
        />
      </div>
      <Box sx={{ mt: 1 }} component="nav" aria-label="mailbox folders">
        <List>
          {filteredTree.map((item: TreeItem, index: number) => (
            <React.Fragment key={item.name}>
              {index === 2 && (
                <div
                  style={{
                    width: '100%',
                    height: '1px',
                    backgroundColor: 'rgba(0, 0, 0, 0.17)',
                  }}
                ></div>
              )}
              <ListItemLink
                item={item}
                open={openStates[item.id!]}
                onClick={() => handleClick(item)}
                active={
                  activeLink === item.link || item.id?.toString() === projectId
                }
                onAddNewItem={handleAddNewItem}
                onAddNewPage={() => handleAddNewPage(item.id!)}
                onDeletePage={handleDeletePage}
                onDeleteProject={() => handleOpenProjectDialog(item.id!)}
                isEditingNewPage={isEditingNewPage}
                newPageName={newPageName}
                setNewPageName={setNewPageName}
                handleSaveNewPage={handleSaveNewPage}
                currentProjectId={currentProjectId}
                onNewPageBlur={handleNewPageBlur}
                onPageSelect={onPageSelect}
              />

              {item.type === 'dropdown' && item.items && (
                <Collapse
                  component="li"
                  in={openStates[item.id!]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List disablePadding>
                    {item.items.map((subItem: TreeItem) => (
                      <ListItemLink
                        key={subItem.name}
                        item={subItem}
                        onClick={() => handleClick(subItem)}
                        active={
                          activeLink === subItem.link ||
                          subItem.id?.toString() === pageId
                        }
                        onDeletePage={handleDeletePage}
                        isEditingNewPage={false}
                        newPageName=""
                        setNewPageName={() => {}}
                        handleSaveNewPage={() => {}}
                        currentProjectId={null}
                        onNewPageBlur={() => {}}
                        onPageSelect={onPageSelect}
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
                onBlur={handleNewItemBlur}
                fullWidth
                autoFocus
                inputRef={newItemInputRef}
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

      <TModal
        isOpen={openDialog}
        onClose={handleCloseDialog}
        title={'Вы хотите удалить эту страницу?'}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button onClick={handleCloseDialog} color="primary">
            Отмена
          </Button>
          <Button onClick={handleDeletePage} color="primary">
            Удалить
          </Button>
        </Box>
      </TModal>

      <TModal
        isOpen={openProjectDialog}
        onClose={() => setOpenProjectDialog(false)}
        title={'Вы хотите удалить этот проект?'}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button onClick={() => setOpenProjectDialog(false)} color="primary">
            Отмена
          </Button>
          <Button onClick={handleDeleteProject} color="primary">
            Удалить
          </Button>
        </Box>
      </TModal>
    </Box>
  );
};

export default PagesTree;
