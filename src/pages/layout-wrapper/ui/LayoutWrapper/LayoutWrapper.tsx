import React from 'react';
import PagesTree from "../../../../shared/ui/pages-tree/PagesTree";
import ActionBar from "../../../../widgets/header/action-bar/ActionBar";
import NewSearch from "../../../../shared/ui/search-bar/SearchBar";
import store from "../../../../store";
import Editor from "../../../../widgets/editor/Editor";
import { ILayoutWrapperProps } from '../LayoutWrapper/ts/interfaces';
import MainPage from '../../../main-page/ui/MainPage/MainPage';
import TrashBin from '../../../../pages/trash-bin/ui/TrashBin/TrashBin'; 
 

const LayoutWrapper: React.FC<ILayoutWrapperProps> = ({layout}) => {

  const users = [
    {
      id: '1',
      name: 'wleg',
    },
    {
      id: '2',
      name: 'qwOleg',
    },
    {
      id: '3',
      name: 'Oleg',
    },
  ];

  const layoutMap: { [key: string]: React.FC } = {
    main: MainPage,
    trash: TrashBin,
  };

  const LayoutComponent = layoutMap[layout] || null;

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ background: '#F8F7F5', height: '100vh', width: '260px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginInline: 15, marginTop: 15, fontSize: 12, height: "" }}>
          <div style={{ borderRadius: '40px', width: '40px', height: '40px', marginRight: 20, backgroundColor: '#0751D8' }} ></div>
          {store.getState().auth.user?.email || 'example@mail.ru'}
        </div>
        <div style={{ marginLeft: 11, marginTop: 20, width: 200 }}>
          <NewSearch />
        </div>
        <PagesTree />
      </div>
      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <div style={{}}>
            <ActionBar users={users} />
          </div>
        </div>
        {LayoutComponent ? <LayoutComponent /> : null}
        {layout === 'project' && (
          <div style={{ marginTop: '100px', width: "85%", margin: '100px auto' }}>
            <h1>
              Project Title
              <hr />
            </h1>
            <Editor />
          </div>
        )}
      </div>
      <div style={{
        backgroundColor: '#0751D8',
        height: 40,
        width: 220,
        position: 'fixed',
        bottom: 0,
        left: 0,
      }}></div>
    </div>
  );
};

export default LayoutWrapper;