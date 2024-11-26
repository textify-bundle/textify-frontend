import React from "react";
import './MainPage.scss';
import LayoutWrapper from '../../../layout-wrapper/ui/LayoutWrapper/LayoutWrapper';
import UserProjectList from "../../../../widgets/user-project-list/UserProjectList";
import LastProjectList from "../../../../widgets/last-project-list/LastProjectList";


const MainPage: React.FC = () => {
    
    return(
        <LayoutWrapper layout={['main']}>
            <div className="latest-projects-text text">
                Последние проекты
            </div>
            <div className="last-projects">
                <LastProjectList />
            </div>
            <div className="your-projects-text text">
                Ваши проекты
            </div>
            <div className="your-projects">
            <UserProjectList />
            </div>
        </LayoutWrapper>
    );
};

export default MainPage;