import { Box, Container } from '@mui/material';
import RouterBreadcrumbs from '../../shared/ui/pages-tree/PagesTree';
import Search from '../../shared/ui/search-bar/Search.tsx';
import imgSrc from '../catalog/img.png'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Стрелка назад
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Стрелка вперед

import ActionBar from '../header/action-bar/ActionBar.tsx';
const LayoutWrapper = () => {
  const users =[
    {
      id: 1,
      name: 'Oleg'
    },
    {
      id: 2,
      name: 'Oleg'
    },
    {
      id: 3,
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
      name: 'Nomer 1',
      type: 'dropdown',
      link: '/nomer1',
      items: [
        { name: 'Page 1', type: 'link', link: '/nomer1/page1' },
        { name: 'Page 2', type: 'link', link: '/nomer1/page2' },
        { name: 'Page 3', type: 'link', link: '/nomer1/page3' },
      ],
    },
    {
      name: 'Nomer 2',
      type: 'dropdown',
      link: '/nomer2',
      items: [
        { name: 'Page 1', type: 'link', link: '/nomer2/page1' },
        { name: 'Page 2', type: 'link', link: '/nomer2/page2' },
        { name: 'Page 3', type: 'link', link: '/nomer2/page3' },
      ],
    },
  ];

  const handleSearchChange = (value) => {
    console.log('Search input changed:', value);
  };

  const handleSearchEnter = (value) => {
    console.log('Search submitted:', value);
  };

  return (
    <>
    <Box sx={{
      position:'absolute', 
      left:'0',
      width:'197px',
      background: '#F8F7F5',
      height:'100vh'
    }}>
     <h2>  <img style={{borderRadius:'40px'}} src={imgSrc}></img>   User name</h2>  {/* вместо h2 реализовать компонент, где будет картинка+ имя пользователя */}
     
      <Search
        imageSrc="./src/shared/ui/search-bar/magnifyingGlass.png"
        onChange={handleSearchChange}
        onEnter={handleSearchEnter}
        placeholder="Введите запрос"
        value=""
      />
      <RouterBreadcrumbs tree={tree} />

      <img style={{width:'197px', height:'50px', bottom:'0', display:'block', position:'absolute', left:'0'}} src={imgSrc}></img>
      </Box>
      <Container >
        <h3 style={{position:'absolute', left:'220px'}}> <ArrowBackIcon/> Nomer 2 <ArrowForwardIcon/> </h3>   {/* вместо h3 реализовать компонент, где будет название действующего преокта и навигационные стрелки */}
        <ActionBar users={users} />
      </Container>
      <Box></Box>  {/* вместо Box реализовать компонент PageWrapper, где будет сказка */}
    </>
  );
};

export default LayoutWrapper;
