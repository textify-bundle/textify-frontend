import React, { useState, useEffect, useRef } from 'react';
import type { MediaContent } from '../../../../shared/types/editor/node';
import { CircularProgress } from '@mui/material';
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
  const [size, setSize] = useState({ width: 300, height: 200 });
  const [position, setPosition] = useState({ x: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragStart = useRef<{ x: number } | null>(null);

  useEffect(() => {
    const savedImageUrl = localStorage.getItem(`savedImageUrl_${nodeId}`);
    if (savedImageUrl) {
      setValue((prevValue) => ({ ...prevValue, url: savedImageUrl }));
    } else {
      setValue(content);
    }
  }, [content, nodeId]);

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
        if (uploadError) throw uploadError;

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

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    dragStart.current = {
      x: event.clientX - position.x,
    };
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!dragStart.current) return;
    const newX = event.clientX - dragStart.current.x;
    setPosition({ x: newX });
  };

  const handleMouseUp = () => {
    dragStart.current = null;
  };

  const handleCloseImage = () => {
    setValue({ ...value, url: '' });
    localStorage.removeItem(`savedImageUrl_${nodeId}`);
  };

  return (
    <div
      style={{
        width: '100%',
        height: `${size.height}px`,
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {value.url ? (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Resizable
            width={size.width}
            height={size.height}
            onResize={(_e, { size }) => setSize(size)}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                cursor: 'grab',
              }}
              onMouseDown={handleMouseDown}
            >
              <img
                src={value.url || '/placeholder.svg'}
                alt={value.altText}
                style={{
                  position: 'absolute',
                  left: `${position.x}px`,
                  top: '0',
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
              />
            </div>
          </Resizable>
          <button
            onClick={handleCloseImage}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'rgba(0,0,0,0.6)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              fontSize: '16px',
              zIndex: 20,
              pointerEvents: 'auto',
            }}
          >
            &times;
          </button>
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#f0f0f0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <p>Нет изображения</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            style={{
              marginTop: 8,
              padding: '6px 12px',
              background: 'var(--background-bar-color)',
              borderRadius: '6px',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              'Выбрать изображение'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageEditor;
