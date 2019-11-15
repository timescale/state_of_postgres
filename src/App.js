import React, { Component, Fragment, useEffect } from 'react';
import KeyFindings from './components/KeyFindings';
import FullResults from './components/FullResults';
import { BrowserRouter as Router, Switch, Route, Link, useLocation, withRouter } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import './assets/scss/style.scss';

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

class App extends Component {

	constructor(props) {
		super(props);

		this.header = React.createRef();
		this.lastPosition = 0;
		this.currentLocation = "";

		this.state = {
			headerIsVisible: true
		}

		this.toggleHeader = this.toggleHeader.bind(this);
	}

	componentDidMount() {
		window.addEventListener("scroll", this.toggleHeader, false);

		this.currentLocation = this.props.location.pathname;

		this.props.history.listen((location, action) => {
			if(this.currentLocation !== location.pathname){
	    		window.scrollTo(0, 0)
	    		this.currentLocation = location.pathname;
			}
	    });
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.toggleHeader, false);
	}

	toggleHeader(e) {

		let smallHeader = false;

		if(window.pageYOffset > this.header.current.clientHeight) {

			smallHeader = true;

			if(window.pageYOffset > this.lastPosition) {
				this.setState({
					headerIsVisible: false
				});
			}
			else {
				this.setState({
					headerIsVisible: true
				});
			}
			this.lastPosition = window.pageYOffset;
		}
		else {

			smallHeader = false;

			this.setState({
				headerIsVisible: true
			});
		}

		if(smallHeader){
			this.header.current.classList.add("header-small");
		}
		else {
			this.header.current.classList.remove("header-small");
		}
	}

	render(){
		return (

			<div className="main-wrap">
					<ScrollToTop />

					<header className={"header" + (this.state.headerIsVisible ? " header-visible" : " header-hidden")} ref={this.header}>
						<ul className="menu">
							<li>
								<Link to="/">Key findings</Link>
							</li>
							<li>
								<Link to="/full_results" className="button button-secondary button-sm">Full Results</Link>
							</li>
						</ul>
					</header>

					{/* Main content - Start  */}
					<main id="main">

						<Switch>
							<Route path="/full_results">
								<FullResults />
							</Route>
							<Route path="/" exact>
								<KeyFindings />
							</Route>
						</Switch>

					</main>
					{/* Main content - End  */}

			</div>

		);
	}
}

export default withRouter(App);