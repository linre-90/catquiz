import React from "react";
import "./headerbar.css"

/**
 * Renders header bar. Sticky component that is rendered once in App.tsx. No state.
 * @returns Functional component
 */
const HeaderBar: React.FC = () => {
    return(
        <div className="headerbar_background">
            <i className="fas fa-user-secret headerbar_iconback" ></i>
            <h1 className="headerbar_headline">Cat's opinions huge cat quiz!</h1>
        </div>
    );
}

export default HeaderBar;
