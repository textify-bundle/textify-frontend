import React from "react";
import './MainPage.scss';
import LayoutWrapper from '../../../layout-wrapper/ui/LayoutWrapper/LayoutWrapper';
import LastProjectCard from "../../../../shared/ui/last-project-card/LastProjectCard";
import ProjectCard from "../../../../shared/ui/project-card/ProjectCard";

const MainPage: React.FC = () => {
    
    return(
        <LayoutWrapper layout={['main']}>
            <div className="latest-projects-text text">
                Последние проекты
            </div>
            <div className="last-projects" style={{ width: '847px', display: 'flex', flexWrap: 'wrap',  justifyContent: 'flex-start', }}>

            </div>
            <div className="your-projects-text text">
                Ваши проекты
            </div>
            <div className="your-projects" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start',}}>

            </div>
        </LayoutWrapper>
    );
};

export default MainPage;