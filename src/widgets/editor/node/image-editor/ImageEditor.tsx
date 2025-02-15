import React from 'react';
import { useState, useEffect, useRef } from 'react';
import type { MediaContent } from '../../../../shared/types/editor/node';
import { Button, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { supabase } from '../../../../utils/client';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';

const ImageEditor = ({
  content,
  nodeId,
}: {
  content: MediaContent;
  nodeId: string;
}) => {
  const [value, setValue] = useState(content);
  const [isLoading, setIsLoading] = useState(false);
  const [size, setSize] = useState({ width: 100, height: 100 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragStartX = useRef<number>(0);

  useEffect(() => {
    const savedImageUrl = localStorage.getItem(`savedImageUrl_${nodeId}`);

    if (savedImageUrl) {
      setValue((prevValue) => ({ ...prevValue, url: savedImageUrl }));
    } else {
      setValue(content);
    }
  }, [content, nodeId]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      try {
        const fileName = file.name;
        const filePath = `images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, file, { upsert: true });

        if (uploadError) {
          throw uploadError;
        }

        const { data } = supabase.storage.from('images').getPublicUrl(filePath);

        if (data) {
          const newImageUrl = data.publicUrl;

          setValue({ ...value, url: newImageUrl });
          localStorage.setItem(`savedImageUrl_${nodeId}`, newImageUrl);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClose = () => {
    setValue({ ...value, url: '' });
    localStorage.removeItem(`savedImageUrl_${nodeId}`);
    localStorage.removeItem(`savedImageSize_${nodeId}`);
    localStorage.removeItem(`savedImagePosition_${nodeId}`);
  };

  const onResizeStart = () => {
    setIsResizing(true);
  };

  const onResize = (
    event: unknown,
    { size }: { size: { width: number; height: number } },
  ) => {
    setSize({ width: size.width, height: size.height });
    localStorage.setItem(`savedImageSize_${nodeId}`, JSON.stringify(size));
  };

  const onResizeStop = () => {
    setIsResizing(false);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    if (isResizing) return;

    dragStartX.current = event.clientX;
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isResizing || dragStartX.current === 0) return;

    const deltaX = event.clientX - dragStartX.current;
    dragStartX.current = event.clientX;

    const containerWidth = (event.currentTarget as HTMLElement).offsetWidth;
    const imageWidth = size.width;

    let newX = position.x + deltaX;
    const minX = 0;
    const maxX = containerWidth - imageWidth;

    newX = Math.max(minX, Math.min(newX, maxX));

    setPosition((prev) => {
      return { x: newX, y: prev.y };
    });
  };

  const handleMouseUp = () => {
    if (isResizing) return;

    localStorage.setItem(
      `savedImagePosition_${nodeId}`,
      JSON.stringify(position),
    );
    dragStartX.current = 0;
  };

  return (
    <div
      style={{ width: '100%', position: 'relative' }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {!value.url && (
        <Button
          variant="contained"
          onClick={handleButtonClick}
          disabled={isLoading}
          sx={{
            background: 'brown',
            color: 'white',
            marginBottom: 2,
            '&:hover': {
              background: 'darkbrown',
            },
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Выбрать изображение'
          )}
        </Button>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {value.url ? (
        <div style={{ position: 'relative', width: '100%' }}>
          <IconButton
            onClick={handleClose}
            style={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}
          >
            <CloseIcon />
          </IconButton>
          <Resizable
            width={size.width}
            height={size.height}
            onResize={onResize}
            onResizeStart={onResizeStart}
            onResizeStop={onResizeStop}
            minConstraints={[20, 20]}
            maxConstraints={[1000, 1000]}
          >
            <div
              style={{
                width: `${size.width}px`,
                height: `${size.height}px`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'grab',
                position: 'absolute',
                left: `${position.x}px`,
              }}
              onMouseDown={handleMouseDown}
            >
              <img
                src={value.url || '/placeholder.svg'}
                alt={value.altText}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>
          </Resizable>
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            height: '100px',
            background: '#f0f0f0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Нет изображения
        </div>
      )}
    </div>
  );
};

export default ImageEditor;
