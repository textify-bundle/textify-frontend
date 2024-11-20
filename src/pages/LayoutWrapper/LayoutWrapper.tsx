import PagesTree from "../../shared/ui/pages-tree/PagesTree";
import ActionBar from "../../widgets/header/action-bar/ActionBar";
import {  useState } from "react";
import NewSearch from "../../shared/ui/search/NewSearch";



const LayoutWrapper = () => {
  const [userEmail, setUserEmail] = useState<string | undefined>('stariy boh');


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

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ background: '#F8F7F5', height: '100vh', width: '260px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginInline: 15, marginTop: 15, fontSize: 12, height: ""}}>
      <img
            style={{ borderRadius: '40px', width: '40px', height: '40px', marginRight: 20 }}
            src="https://sm.ign.com/t/ign_nordic/review/p/persona-5-/persona-5-review_htue.1280.jpg"
          />
          {userEmail}
        </div>
        <div style={{ marginLeft: 11, marginTop: 20, width:200 }}>
          <NewSearch />
        </div>
        <PagesTree />
      </div>
      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <div style={{ width: '380px' }}>
            <ActionBar users={users} />
          </div>
        </div>
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
