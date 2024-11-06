import RouterBreadcrumbs from "./shared/ui/pages-tree/PagesTree";

const tree = [
    {
      name: 'Главная',
      type: 'link',
      link: '/main'
    },
    {
      name: 'Создать проект',
      type: 'action',
      action: 'create',
      icon: 'plus'
    },
    {
      name: 'Nomer 1',
      type: 'dropdown',
      link: '/nomer1',
      items: [
        { name: 'Page 1', type: 'link', link: '/nomer1/page1' },
        { name: 'Page 2', type: 'link', link: '/nomer1/page2' },
        { name: 'Page 3', type: 'link', link: '/nomer1/page3' }
      ]
    },
    {
      name: 'Nomer 2',
      type: 'dropdown',
      link: '/nomer2',
      items: [
        { name: 'Page 1', type: 'link', link: '/nomer2/page1' },
        { name: 'Page 2', type: 'link', link: '/nomer2/page2' },
        { name: 'Page 3', type: 'link', link: '/nomer2/page3' }
      ]
    }
  ];
  
  const App = () => {
    return (
      <div>
        <RouterBreadcrumbs tree={tree} />
      </div>
    );
  };

export default App;