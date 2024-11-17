import NodeTypeList from './widgets/node-type-list/NodeTypeList';
const App = () => {
  const blocks = [
    {
        title: 'Block 1',
        description: 'This is the description for block 1.',
        imageSrc: '',
    },
    {
        title: 'Block 2, too long, need check',
        description: 'This is the description for block 2.',
        imageSrc: '',
    },
    {
        title: 'Block 3',
        description: 'This is the description for block 3.',
        imageSrc: '',
    },
];

  
  return (
    <div> 
      <NodeTypeList
                blocks={blocks}
            />
    </div>
  );
};

export default App;