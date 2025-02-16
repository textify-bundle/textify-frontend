import React, { useEffect, useState } from 'react';
import PagesTree from '../../../../shared/ui/pages-tree/PagesTree';
import ActionBar from '../../../../widgets/header/action-bar/ActionBar';
import store, { RootState, AppDispatch } from '../../../../store';
import Editor from '../../../../widgets/editor/Editor';
import { useSelector, useDispatch } from 'react-redux';
import { MainPage } from '../../../main-page';
import { TrashBin } from '../../../trash-bin';
import { ILayoutWrapperProps } from './ts';
import { updatePageTitle } from '../../../../store/slices/pagesSlice';

const LayoutWrapper: React.FC<ILayoutWrapperProps> = ({ layout }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const [currentPageId, setCurrentPageId] = useState<number | null>(null);
  const { backgroundColor, fontSize, fontFamily, textColor, barColor } =
    useSelector((state: RootState) => state.settings);
  const { tree } = useSelector((state: RootState) => state.pages);
  const dispatch = useDispatch<AppDispatch>();

  const users = [
    { id: '1', name: 'weg' },
    { id: '2', name: 'qwOleg' },
    { id: '3', name: 'Oleg' },
  ];

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

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    if (currentPageId !== null) {
      dispatch(updatePageTitle({ pageId: currentPageId, title: pageTitle }));
    }
  };

  const handlePageSelect = (pageId: number) => {
    setCurrentPageId(pageId);
    const selectedPage = tree.flatMap(project => project.items || []).find(page => page.id === pageId);
    if (selectedPage) {
      setPageTitle(selectedPage.name);
    }
  };

  useEffect(() => {
    const initialPageId = parseInt(new URLSearchParams(window.location.search).get('page') || '0', 10);
    const initialPage = tree.flatMap(project => project.items || []).find(page => page.id === initialPageId);
    if (initialPage) {
      setPageTitle(initialPage.name);
      setCurrentPageId(initialPageId);
    }
  }, [tree]);

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
        <div style={{ marginLeft: 11, marginTop: 20, width: 200 }}></div>
        <PagesTree onPageSelect={handlePageSelect} />
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
            {isEditingTitle ? (
              <input
                type="text"
                value={pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
                onBlur={handleTitleBlur}
                autoFocus
              />
            ) : (
              <h1 onClick={handleTitleClick}>
                {pageTitle}
                <hr />
              </h1>
            )}
            <Editor />
          </div>
        )}
      </div>
    </div>
  );
};

export default LayoutWrapper;
