import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook,  } from '@fortawesome/free-brands-svg-icons'

class Share extends React.Component {

    render() {
        return(
            <div className="socialjs">
                <ul>
                    <li>
                        <a className="sharebutton facebook" data-sharetype="facebook"
                           data-text="The page title" title="Share this on Facebook" href="#">
                            <FontAwesomeIcon icon={faFacebook}/>
                            <span className="count"/>
                        </a>
                    </li>
                    <li>
                        <a className="sharebutton twitter" data-sharetype="twitter"
                           data-text="The page title" data-via="AndreasNorman" data-related="AndreasNorman"
                           title="Share this on Twitter" href="#"><i className=" fa fa-twitter"/> <span
                        className="count"/>
                        </a>
                    </li>
                    <li>
                        <a className="sharebutton linkedin" data-sharetype="linkedin"
                           data-text="The page title" data-referer="AndreasNorman" data-related="AndreasNorman"
                           title="Share this on LinkedIn" href="#"><i className=" fa fa-linkedin"/> <span
                        className="count"/>
                        </a>
                    </li>
                    <li>
                        <a className="sharebutton googleplus" data-sharetype="googleplus"
                           data-text="The page title" title="Share this on Google Plus" href="#"><i
                        className="fa fa-google-plus"/> <span className="count"/></a>
                    </li>
                    <li>
                        <a className="sharebutton reddit" data-sharetype="reddit"
                           data-text="The page title" title="Share on reddit" href="#"><i
                        className="fa fa-reddit"/> <span className="count"/></a>
                    </li>
                </ul>
                <p className="small">(The above numbers are spoofed to illustrate how it could look on very
                    popular website)</p>
            </div>
        );
    }
}

export default Share;