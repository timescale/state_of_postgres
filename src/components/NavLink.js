import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import PropTypes from "prop-types";

class NavLinkNoContext extends React.Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
    };
    render() {
        const { location } = this.props;
        let isActive = location.pathname === this.props.to;
        let className = isActive ? 'active' : '';

        return(
            <Link className={className} {...this.props}>
                {this.props.children}
            </Link>
        );
    }
}
const NavLink = withRouter(NavLinkNoContext);

export default NavLink;