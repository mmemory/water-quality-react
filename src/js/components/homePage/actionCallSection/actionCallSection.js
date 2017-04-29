import React from 'react';
import {Link} from 'react-router-dom';

const ActionCallSection = () => {
    return (
        <section className="action-call">
            <Link to="/map">
                <div className="ghost-btn btn-medium">
                    See For Yourself
                </div>
            </Link>
        </section>
    )
};

export default ActionCallSection;