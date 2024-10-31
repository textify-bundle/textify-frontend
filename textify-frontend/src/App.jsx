import ProjectCard from "./shared/ui/project-card/ProjectCard";
import RouterBreadcrumbs from "./shared/ui/pages-tree/PagesTree";


const App = () =>  {
    return <>
        <ProjectCard imageUrl={'https://ir-3.ozone.ru/s3/multimedia-m/c1000/6726566866.jpg'} lastEntryTime={new Date(2024, 9)} isRemoved={false}  />
        <RouterBreadcrumbs projects={['Nomer 1', 'Nomer 2']} pagesPerProject={[2, 3]} />
    </>;
}

export default App;