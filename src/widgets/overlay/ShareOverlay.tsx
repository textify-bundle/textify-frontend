import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails, 
  Radio, RadioGroup, FormControlLabel, FormControl, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import './ShareOverlay.scss';
import TModal from '../../shared/tmodal/TModal';
import { supabase } from '../../utils/client';
import { useSearchParams } from 'react-router-dom';

interface Token {
  id: number;
  token: string;
  canWrite: boolean;
  user_mail?: string; 
}

interface PageShareProps {
  title?: string;
  link?: string;
  pageId: number;
  userName: string;
}

const ShareOverlay: React.FC<PageShareProps> = ({ title = "Отправить", userName }) => {
  const [selectedItem, setSelectedItem] = useState<string>('Только чтение');
  const [expanded, setExpanded] = useState<string | false>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [generatedLink, setGeneratedLink] = useState<string>('');
  const [searchParams] = useSearchParams();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [openUsersDialog, setOpenUsersDialog] = useState<boolean>(false);
  
  const isSharedView = searchParams.has("token");

  useEffect(() => {
    if (openUsersDialog) {
      fetchTokens();
    }
  }, [openUsersDialog]);

  const fetchTokens = async () => {
    const pageId = searchParams.get("page");
  
    if (!pageId) {
      console.error("Ошибка: отсутствует идентификатор страницы.");
      return;
    }
  
    const { data: tokensData, error: tokensError } = await supabase
      .from("notes_tokens")
      .select("id, token, canWrite")
      .eq("pageId", pageId);
  
    if (tokensError) {
      console.error("Ошибка при загрузке токенов:", tokensError);
      return;
    }
  
    setTokens(tokensData || []);
  };
  
  const delToken = async (id: number) => {
    const { error } = await supabase.from("notes_tokens").delete().eq("id", id);
  
    if (error) {
      console.error("Ошибка при удалении токена:", error);
      return;
    }
  
    fetchTokens(); 
  };
  
  const columns: GridColDef[] = [
    { field: "token", headerName: "Токен пользователя", flex: 1 },
    {
      field: "canWrite",
      headerName: "Доступ",
      flex: 1,
      renderCell: (params) => (params.value ? "Редактирование" : "Чтение"),
    },
    {
      field: "actions",
      headerName: "Действие",
      flex: 1,
      renderCell: (params) => (
        <Button color="secondary" onClick={() => delToken(params.row.id)}>
          Удалить
        </Button>
      ),
    },
  ];
  
  const [clickCount, setClickCount] = useState<number>(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/start-session`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName }),
    })
        .then(response => response.json())
        .then(data => setClickCount(data.clicks))
        .catch(() => {
         
        });

    return () => {
        fetch(`${API_URL}/end-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName }),
        }).catch(() => {
       
        });
    };
  }, [userName, API_URL]);

  const generateToken = async () => {
    const token = Math.random().toString(36).substring(2, 15) + 
                 Math.random().toString(36).substring(2, 15);
    const canWrite = selectedItem === 'Редактирование';

    try {
      const { error } = await supabase
        .from('notes_tokens')
        .insert([
          {
            token: token,
            pageId: searchParams.get('page'),
            canWrite: canWrite
          }
        ])
        .single();

      if (error) throw error;

      const shareableLink = `${window.location.origin}/shared/?token=${token}`;
      setGeneratedLink(shareableLink);
      return shareableLink;

    } catch (error) {
      console.error('Error generating share link:', error);
      return null;
    }
  };

  const handleSendButtonClick = async () => {
    try {
        const response = await fetch(`${API_URL}/click`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName }),
        });
        const data = await response.json();
        setClickCount(data.clicks);
    } catch {
        /* Игнорируем ошибку обновления счетчика */
    }

    setOpenDialog(true);
  };

  const handleCopyLink = async () => {
    if (!generatedLink) {
      const newLink = await generateToken();
      if (newLink) {
        navigator.clipboard.writeText(newLink)
          .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          })
          .catch(err => console.error("Failed to copy link", err));
      }
    } else {
      navigator.clipboard.writeText(generatedLink)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => console.error("Failed to copy link", err));
    }
  };

  const handleItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedItem(event.target.value);
    setGeneratedLink('');
  };

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className='share'>
      {!isSharedView && <div className="share-button-wrapper">
        <Button 
          className="send-button" 
          onClick={handleSendButtonClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {title}
        </Button>
        <div className={`count-tooltip ${showTooltip ? 'visible' : ''}`}>
          Total Clicks: {clickCount}
        </div>
      </div> }

      <TModal isOpen={openDialog} onClose={() => setOpenDialog(false)} title="Поделиться">
        <Box className="share-dialog__access">
          <Typography variant="body1" className="share-dialog__label">У кого есть ссылка</Typography>
          <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
            <AccordionSummary className='share-dialog__accordion' expandIcon={<ExpandMoreIcon />}>{selectedItem}</AccordionSummary>
            <AccordionDetails>
              <FormControl>
                <RadioGroup className='share-dialog__accordion-radio' value={selectedItem} onChange={handleItemChange}>
                  <FormControlLabel value="Только чтение" control={<Radio />} label="Только чтение" />
                  <FormControlLabel value="Редактирование" control={<Radio />} label="Редактирование" />
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Button className='share-dialog__copy-btn' variant="contained" onClick={handleCopyLink}>
          {copied ? "Скопировано!" : "Копировать ссылку"}
        </Button>
        <Button className='share-dialog__user-btn' variant="contained" onClick={() => setOpenUsersDialog(true)}>
          Пользователи
        </Button>
      </TModal>
      <TModal isOpen={openUsersDialog} onClose={() => setOpenUsersDialog(false)} title="Пользователи">
        <Paper style={{ height: 400, width: '100%' }}>
          <DataGrid rows={tokens} columns={columns} pageSizeOptions={[5, 10]} />
        </Paper>
      </TModal>
    </div>
  );
};

export default ShareOverlay;