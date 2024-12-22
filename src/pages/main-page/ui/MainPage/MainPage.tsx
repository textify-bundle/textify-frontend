import React, { useState } from "react";
import './MainPage.scss';
import UserProjectList from "../../../../widgets/user-project-list/UserProjectList";
import LastProjectList from "../../../../widgets/last-project-list/LastProjectList";

const MainPage: React.FC = () => {
    const [hasActiveProjects, setHasActiveProjects] = useState(false);

    return (
        <>
            <div className="latest-projects-text text">
                Последние проекты
            </div>
            <div className="last-projects">
                <LastProjectList />
            </div>
            <UserProjectList onProjectsAvailable={(hasProjects) => setHasActiveProjects(hasProjects)} />
            {hasActiveProjects && (
                <>
                    <div className="your-projects-text text">
                        Ваши проекты
                    </div>
                    <div className="your-projects">
                        <UserProjectList />
                    </div>
                </>
            )}
        </>
    );
};

export default MainPage;