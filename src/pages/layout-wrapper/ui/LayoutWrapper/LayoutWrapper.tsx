import { useState } from 'react';
import PagesTree from "../../../../shared/ui/pages-tree/PagesTree";
import ActionBar from "../../../../widgets/header/action-bar/ActionBar";
import NewSearch from "../../../../shared/ui/search-bar/SearchBar";
import store from "../../../../store";
import Editor from "../../../../widgets/editor/Editor";

const LayoutWrapper = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const testToMerge=0;

  const users = [
    { id: '1', name: 'wleg' },
    { id: '2', name: 'qwOleg' },
    { id: '3', name: 'Oleg' },
  ];

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{
          background: '#F8F7F5',
          height: '100vh',
          position:'relative',
          width: isSidebarVisible ? '260px' : '0',
          transition: 'width 0.3s',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginInline: 15, marginTop: 15, fontSize: 12 }}>
          <div
            style={{
              borderRadius: '40px',
              width: '40px',
              height: '40px',
              marginRight: 20,
              backgroundColor: '#0751D8',
            }}
          ></div>
          
        
          {store.getState().auth.user?.email || 'example@mail.ru'}
        </div>
        <div style={{ marginLeft: 11, marginTop: 20, width: 200 }}>
          <NewSearch />
        </div>
        <PagesTree />
        <div style={{width:'100%', height:40,bottom:0,position:'absolute', background:'#0751D8'}}></div>
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
        <div style={{ marginTop: '100px', width: "85%", margin: '100px auto' }}>
          <h1>
            Project Title
            <hr />
          </h1>
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default LayoutWrapper;
