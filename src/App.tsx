import ProjectListPanel from './widgets/project-list-panel/ProjectListPanel';
const App = () => {
  const items = [
    { title: 'Nomer 1', description: 'Description for nomer 1' },
    { title: 'Nomer 2', description: 'Description for nomer 2' },
    { title: 'Nomer 3', description: 'Description for nomer 3' },
];

const handleItemClick = (index: number) => {
    console.log(`Item clicked: ${index}`);
};
  
  return (
    <div> 
      <ProjectListPanel
                imageSrc="./widgets/project-list-panel/img.png"
                projects={items}
                onClick={handleItemClick}
            />
    </div>
  );
};

export default App;