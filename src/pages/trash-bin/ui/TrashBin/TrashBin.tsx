import React from "react";
import './TrashBin.scss';
import RemoteProjectList from "../../../../widgets/remote-project-list/RemoteProjectList";



const TrashBin: React.FC = () => {
    return (
        <>
            <div className="remote-projects-text text">
                Удаленные проекты
            </div>
            <div className="remote-projects">
                <RemoteProjectList />
            </div>
        </>
    );
};

export default TrashBin;