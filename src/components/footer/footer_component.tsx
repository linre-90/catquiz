import React from "react";
import "./footer.css";



const FooterComponent: React.FC = () => {
    return(
        <div className="footer_background">
            <h2 className="footer_header">App by Cat's Opinion</h2>
            <a className="footer_link" href="https://www.catsopinion.com">Visit us: catsopinion.com</a>
            <p><i className="far fa-copyright"></i> Juho Lindemark</p>
            <p><i>This app is for entertainment purposes only!</i></p>
            <p><i>Tämä appi on vain viihde tarkoitukseen!</i></p>
        </div>


    );



}


export default FooterComponent;