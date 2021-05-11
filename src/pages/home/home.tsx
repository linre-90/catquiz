import React from "react";
import {AppButton, StyleEnum} from "../../components/button/button";
import {useHistory} from "react-router-dom";
import H from "history";
import i18n from "../../i18n";
import "./home.css";
import "./home_animations.css";
import "./home_questionmarks.css"



/**
 * Home page component. Address= /
 * @returns Home page functional component
 */
const HomePage: React.FC = () => {
	let history: H.History<History> = useHistory();

    	/**
	 * Eventhandler for buttons that change languages
	 * Buttons return value en or fi. Set language to i18n with direct event.currentTarget.value!
	 * @param React.MouseEvent <HTMLButtonElement>
	 */
  	const setLanguage = (event: React.MouseEvent<HTMLButtonElement>) => {
		i18n.changeLanguage(event.currentTarget.value);
		history.push("/difficulty");
  	}

    return(
        <div>
            <div className="home_body">
				{/*left side pawns*/}
				<span className="home_background_pawn_common home_background_pawn_one" ><i className="fas fa-paw home_background_pawn_one_rotation"></i></span>
				<span className="home_background_pawn_common home_background_pawn_two" ><i className="fas fa-paw home_background_pawn_two_rotation"></i></span>
				<span className="home_background_pawn_common home_background_pawn_three" ><i className="fas fa-paw home_background_pawn_three_rotation"></i></span>
				<span className="home_background_pawn_common home_background_pawn_four" ><i className="fas fa-paw home_background_pawn_four_rotation"></i></span>
				<span className="home_background_pawn_common home_background_pawn_five" ><i className="fas fa-paw home_background_pawn_five_rotation "></i></span>
				<span className="home_background_pawn_common home_background_pawn_six" ><i className="fas fa-paw home_background_pawn_six_rotation"></i></span>
				<span className="home_background_pawn_common home_background_pawn_seven" ><i className="fas fa-paw home_background_pawn_seven_rotation"></i></span>
				<span className="home_background_pawn_common home_background_pawn_eigth" ><i className="fas fa-paw home_background_pawn_eigth_rotation"></i></span>
				<span className="home_background_pawn_common home_background_pawn_nine" ><i className="fas fa-paw home_background_pawn_nine_rotation"></i></span>
				<span className="home_background_pawn_common home_background_pawn_ten" ><i className="fas fa-paw home_background_pawn_ten_rotation"></i></span>
				<span className="home_background_pawn_common home_background_pawn_eleven" ><i className="fas fa-paw home_background_pawn_eleven_rotation"></i></span>
				<span className="home_background_pawn_common home_background_pawn_twelve" ><i className="fas fa-paw home_background_pawn_twelve_rotation"></i></span>
				<span className="home_background_pawn_common home_background_pawn_thirteen" ><i className="fas fa-paw home_background_pawn_thirteen_rotation"></i></span>
				{/*Questionmark rain */}
				<div className="home_questionmarks_container">
					<i className="fas fa-question home_mark_common home_mark1"></i>
					<i className="fas fa-question home_mark_common home_mark2"></i>
					<i className="fas fa-question home_mark_common home_mark3"></i>
					<i className="fas fa-question home_mark_common home_mark4"></i>
					<i className="fas fa-question home_mark_common home_mark5"></i>
					<i className="fas fa-question home_mark_common home_mark6"></i>
					<i className="fas fa-question home_mark_common home_mark7"></i>
					<i className="fas fa-question home_mark_common home_mark8"></i>
					<i className="fas fa-question home_mark_common home_mark9"></i>
					<i className="fas fa-question home_mark_common home_mark10"></i>
					<i className="fas fa-question home_mark_common home_mark11"></i>
					<i className="fas fa-question home_mark_common home_mark12"></i>
				</div>
				{/*Header buttons*/}
				<h2 className="home_header">Valitse kieli / Select language</h2>
				<AppButton text="Suomeksi" btnValue="fi" btnStyle= {StyleEnum.white} behaviour={setLanguage}/>
				<AppButton text="English" btnValue="en" btnStyle= {StyleEnum.black} behaviour={setLanguage}/>
				{/*Lens and brand*/}
				<div className="home_lens_section">
					<div className="home_lens_back">
					<h3 className="home_lens_branding">Cat's opinion</h3>
						<div className="home_lens_base">
							<div className="home_lens_hole">
								<div className="home_lens_handle"></div>
							</div>
						</div>
					</div>
					
				</div>
				
      		</div>
        </div>
    );
}

export default HomePage;