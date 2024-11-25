import React from "react";
import './MainPage.scss';
import LayoutWrapper from '../../../layout-wrapper/ui/LayoutWrapper/LayoutWrapper';
import LastProjectCard from '../../../../shared/ui/last-project-card/LastProjectCard';

const MainPage: React.FC = () => {
    

    return(
        <LayoutWrapper layout={['main']}>
            <div>
                <p className="latest-projects text">
                Последние проекты
                </p>
            </div>
            <div>
                <LastProjectCard
                    title="Nomer 1"
                    imageUrl="https://via.placeholder.com/150"
                />
            </div>
            <div>
                <p className="your-projects text">
                Ваши проекты
                </p>
            </div>
            <div>
            
            </div>
        </LayoutWrapper>
    );
};

export default MainPage;