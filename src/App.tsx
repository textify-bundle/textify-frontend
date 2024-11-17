import ProjectListPanel from './widgets/block-list-panel/BlockListPanel';
const App = () => {
  const items = [
    { title: 'Heading 1', description: 'Description for nomer 1' },
    { title: 'Heading 2 too long, need check', description: 'Description for nomer 2' },
    { title: 'Heading 3', description: 'Description for nomer 3 too long, need check' },
];

const handleItemClick = (index: number) => {
    console.log(`Item clicked: ${index}`);
};
  
  return (
    <div> 
      <ProjectListPanel
                imageSrc=""
                blocks={items}
            />
    </div>
  );
};

export default App;