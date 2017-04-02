import React from 'react';
// import './toolBar.scss';


const MenuButton = (props) => {

    return (
        <div className="menu-button">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
        </div>
    );
};

const ToolBar = (props) => {


    return (
        <div className="toolbar-container">
            <div className="master-width-wrapper">

                <div className="menu-button-container">
                    <MenuButton />
                </div>

            </div>
        </div>
    );
};

export default ToolBar;