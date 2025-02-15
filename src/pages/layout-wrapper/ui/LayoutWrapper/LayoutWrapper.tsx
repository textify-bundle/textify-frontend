import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PagesTree from '../../../../shared/ui/pages-tree/PagesTree';
import ActionBar from '../../../../widgets/header/action-bar/ActionBar';
import NewSearch from '../../../../shared/ui/search-bar/SearchBar';
import store, { RootState } from '../../../../store';
import Editor from '../../../../widgets/editor/Editor';
import { useSelector } from 'react-redux';
import { MainPage } from '../../../main-page';
import { TrashBin } from '../../../trash-bin';
import { ILayoutWrapperProps } from './ts';

const LayoutWrapper: React.FC<ILayoutWrapperProps> = ({ layout }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const { backgroundColor, fontSize, fontFamily, textColor, barColor } =
    useSelector((state: RootState) => state.settings);
  const { tree } = useSelector((state: RootState) => state.pages);
  const users = [
    { id: '1', name: 'weg' },
    { id: '2', name: 'qwOleg' },
    { id: '3', name: 'Oleg' },
  ];
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--background-color',
      backgroundColor,
    );
    document.documentElement.style.setProperty('--font-size', fontSize);
    document.documentElement.style.setProperty(
      '--background-bar-color',
      barColor,
    );
    document.documentElement.style.setProperty('--text-color', textColor);
    document.documentElement.style.setProperty('--font-family', fontFamily);
  }, [backgroundColor, fontSize, fontFamily, barColor, textColor]);

  const layoutMap: { [key: string]: React.FC } = {
    main: MainPage,
    trash: TrashBin,
  };

  const LayoutComponent = layoutMap[layout] || null;

  // Получение имени текущей страницы
  const getCurrentPageName = (): string => {
    const currentPageId = new URLSearchParams(location.search).get('page');
    for (const project of tree) {
      if (project.items) {
        const page = project.items.find((item) => item.id?.toString() === currentPageId);
        if (page) {
          return page.name;
        }
      }
    }
    return 'Unknown Page';
  };

  const [currentPageName, setCurrentPageName] = useState(getCurrentPageName());

  useEffect(() => {
    setCurrentPageName(getCurrentPageName());
  }, [location]);

  return (
    <div style={{ display: 'flex', background: 'var(--background-color)' }}>
      <div
        style={{
          background: '#F8F7F5',
          height: '100vh',
          position: 'relative',
          width: isSidebarVisible ? '260px' : '0',
          transition: 'width 0.3s',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginInline: 15,
            marginTop: 15,
            fontSize: 12,
          }}
        >
          <div
            style={{
              borderRadius: '40px',
              width: '40px',
              height: '40px',
              marginRight: 20,
              backgroundColor: 'var(--background-bar-color)',
            }}
          ></div>

          {store.getState().auth.user?.email || 'example@mail.ru'}
        </div>
        <div style={{ marginLeft: 11, marginTop: 20, width: 200 }}>
          <NewSearch />
        </div>
        <PagesTree />
        <div
          style={{
            width: '100%',
            height: 40,
            bottom: 0,
            position: 'absolute',
            background: 'var(--background-bar-color)',
          }}
        ></div>
      </div>

      <button
        onClick={toggleSidebar}
        style={{
          position: 'absolute',
          top: '50%',
          left: isSidebarVisible ? '230px' : '10px',
          transform: 'translateY(-50%)',
          zIndex: 1000,
          backgroundColor: '#F0F0F0',
          color: '#0751D8',
          border: '1px solid #0751D8',
          borderRadius: '50%',
          padding: 0,
          width: '32px',
          height: '32px',
          fontSize: '18px',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        {isSidebarVisible ? '⟨' : '⟩'}
      </button>

      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <div>
            <ActionBar users={users} />
          </div>
        </div>
        {LayoutComponent ? <LayoutComponent /> : null}
        {layout === 'project' && (
          <div
            style={{ marginTop: '100px', width: '85%', margin: '100px auto' }}
          >
            <h1>
              {currentPageName}
              <hr />
            </h1>
            <Editor />
          </div>
        )}
      </div>
    </div>
  );
};

export default LayoutWrapper;
