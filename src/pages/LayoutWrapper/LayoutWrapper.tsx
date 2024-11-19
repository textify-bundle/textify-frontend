
import PagesTree from "../../shared/ui/pages-tree/PagesTree";
import ActionBar from "../../widgets/header/action-bar/ActionBar";
import { supabase } from "../../utils/client";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import NewSearch from "../../shared/ui/search/NewSearch";


const LayoutWrapper = () => {

  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);

      try {
        const { data } = await supabase.auth.getUser();
        setUserEmail(data.user?.email)
      } catch (err) {
        
      } finally{
        setIsLoading(false);
      }
    }
    fetchUser();
    }, []);

  const users =[
    {
      id: '1',
      name: 'Oleg'
    },
    {
      id: '2',
      name: 'Oleg'
    },
    {
      id: '3',
      name: 'Oleg'
    },
  ]
  const tree = [
    {
      name: 'Главная',
      type: 'link',
      link: '/main',
    },
    {
      name: 'Корзина',
      type: 'link',
      link: '/trash',
    },
    {
      name: 'Создать проект',
      type: 'action',
      action: 'create',
      icon: 'plus',
    },
    {
      name: 'Number 1',
      type: 'dropdown',
      link: '/number1',
      items: [
        { name: 'Page 1', type: 'link', link: '/number1/page1' },
        { name: 'Page 2', type: 'link', link: '/number1/page2' },
        { name: 'Page 3', type: 'link', link: '/number1/page3' },
      ],
    },
    {
      name: 'Number 2',
      type: 'dropdown',
      link: '/number2',
      items: [
        { name: 'Page 1', type: 'link', link: '/number2/page1' },
        { name: 'Page 2', type: 'link', link: '/number2/page2' },
        { name: 'Page 3', type: 'link', link: '/number2/page3' },
      ],
    },
  ];

  if(isLoading){
    return <div >
      <CircularProgress sx={{position:'absolute', left:'47vw' , top:'45vh'}} size={24} color="inherit" />

    </div>;
  }

  return (
    <div style={{ display: 'flex',}}>
      <div style={{background: '#F8F7F5', height:'100vh', width:'260px'}}>
        <div style={{display:'flex', alignItems:'center', marginLeft:20, marginTop:20}}><img style={{borderRadius:'40px', width: '40px', height: '40px', marginRight:20}} src='https://sm.ign.com/t/ign_nordic/review/p/persona-5-/persona-5-review_htue.1280.jpg'></img> 
        {userEmail}
        </div>
        <div style={{marginLeft:20, marginTop:20}}>
          <NewSearch />
        </div>
        <PagesTree tree={tree} />
      </div>
      <div style={{width: '100%'}}>
        <div style={{ display: 'flex', justifyContent: 'end'}}>
          <div style={{width: '380px'}}>
          <ActionBar users={users} />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default LayoutWrapper;