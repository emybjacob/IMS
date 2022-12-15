import graphQLFetch from '../graphQLFetch.js';
import { withRouter } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import React from 'react';


class AboutUs extends React.Component {

    render() {
        return (
            <div class="wrapper">
                <div class="body-class col-flex">
            <div class="gallery">
                <img src="../images/emy.jpg"/>
            <p>Emy Baby Jacob <br/>
            emybabyjacob@gmail.com <br/>
            5197291496</p>

            </div>

        </div>
        <div class="body-class col-flex">
            <div class="gallery">
                <img src="../images/sharan.jpg"/>

                <p>Sai Sharan Reddy Kuntla<br/>
            saisharan.reddy48@gmail.com <br/>
            6479363324</p>
            </div>

        </div>
        <div class="body-class col-flex">
            <div class="gallery">
                <img src="../images/aksha.jpg"/>
            <p>Aksha Kshitij Vyas<br/>
            avyas5112@conestogac.on.ca <br/>
            4379702275</p>
            </div>

        </div>
            </div>
        )
    }
}
export default withRouter(AboutUs);