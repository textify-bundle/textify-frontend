import ProjectCard from "./shared/ui/project-card/ProjectCard";

const App = () => {
  const handleRestore = () => {
    console.log('Project restored');
  };

  const handleClick = () => {
    console.log('Project card clicked');
  };

  return (
    <div style={{display: 'flex',
      'flexDirection': 'row',
      'gap': '20px',
    }}> 
      <ProjectCard
        isRemoved={true}
        imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1200px-Cat_August_2010-4.jpg"
        lastEntryTime={new Date().toISOString()}
        projectName="Sample Project"
        onRestore={handleRestore}
        onClick={handleClick}
      />
      <ProjectCard
        imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1200px-Cat_August_2010-4.jpg"
        lastEntryTime={new Date().toISOString()}
        projectName="Active Project"
        onClick={handleClick}
      />
      <ProjectCard
        imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1200px-Cat_August_2010-4.jpg"
        lastEntryTime={new Date().toISOString()}
        projectName="Active Project"
        onClick={handleClick}
      />
      <ProjectCard
        isRemoved={true}
        imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1200px-Cat_August_2010-4.jpg"
        lastEntryTime={new Date().toISOString()}
        projectName="Sample Project"
        onRestore={handleRestore}
        onClick={handleClick}
      />
      <ProjectCard
        imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1200px-Cat_August_2010-4.jpg"
        lastEntryTime={new Date().toISOString()}
        projectName="Active Project"
        onClick={handleClick}
      />
    </div>
  );
};

export default App;