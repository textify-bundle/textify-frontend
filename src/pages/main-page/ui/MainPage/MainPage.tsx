import React from "react";
import './MainPage.scss';
import UserProjectList from "../../../../widgets/user-project-list/UserProjectList";
import LastProjectList from "../../../../widgets/last-project-list/LastProjectList";

const MainPage: React.FC = () => {

    return (
        <>
            <div className="latest-projects-text text">
                Последние проекты
            </div>
            <div className="last-projects">
                <LastProjectList />
            </div>
            <UserProjectList />
        </>
    );
};

export default MainPage;