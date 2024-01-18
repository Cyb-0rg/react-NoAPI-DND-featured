// @flow
import * as React from 'react';
import { NavLink } from 'react-router-dom'; 
 
export class pageNotFound extends React.Component{
  render() {
    return (


            <div className="pageNotFound">

                <p>Looks like you came to wrong page on our server</p>
                <NavLink exact to="/home">Home</NavLink> <br/>
                <img src="https://horecainbusiness.nl/wp-content/themes/residential/assets/img/404.png" height="400" width="500" alt="not found page 404" />
            </div>
 
    );
  };
};

export default pageNotFound;
