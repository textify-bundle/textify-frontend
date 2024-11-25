import React from "react";
import './MainPage.scss';
import LayoutWrapper from '../../../layout-wrapper/ui/LayoutWrapper/LayoutWrapper';
const MainPage: React.FC = () => {
    

    return(
        <LayoutWrapper layout={['main']}>
            <div>
                <p className="latest-projects text">
                Последние проекты
                </p>
            </div>
            <div>

            </div>
            <div>
            <p className="your-projects text">
            Ваши проекты
            </p>
            </div>
        </LayoutWrapper>
    );
};

export default MainPage;