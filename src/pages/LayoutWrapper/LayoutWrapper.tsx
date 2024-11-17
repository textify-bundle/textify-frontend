import PagesTree from "../../shared/ui/pages-tree/PagesTree";
import ActionBar from "../../widgets/header/action-bar/ActionBar";

const LayoutWrapper = () => {
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
      name: 'Main',
      type: 'link',
      link: '/main',
    },
    {
      name: 'Trash',
      type: 'link',
      link: '/trash',
    },
    {
      name: 'Create Project',
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

  return (
    <div style={{ display: 'flex', }}>
      <div>
        <h2><img style={{borderRadius:'40px', width: '40px', height: '40px'}} src='https://sm.ign.com/t/ign_nordic/review/p/persona-5-/persona-5-review_htue.1280.jpg'></img>   User name</h2>
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