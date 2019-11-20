import React, { Component, Fragment, useEffect } from 'react';
import KeyFindings from './components/KeyFindings';
import FullResults from './components/FullResults';
import { BrowserRouter as Router, Switch, Route, Link, useLocation, withRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import './assets/scss/style.scss';
import NavLink from "./components/NavLink";
import SmoothScroll from "./components/SmoothScroll";

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
			headerIsVisible: true,
			black: false
		};

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


		if (!this.header_moved) {
			// the smooth scroll breaks fixed elements in the main div. this is a hack to move them out.
			document.querySelector('body').appendChild(document.querySelector('header'));
			this.header_moved = true;
		}

		new SmoothScroll('.scroll_container')
		document.querySelector('.scroll_container').style.width = `100%`;
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

	change_nav_background = (value) => {
		this.setState({
			black: value
		})
	}

	render(){
		return (
			<div className="main-wrap">
				<ScrollToTop />
				<div className="scroll_container">
					<div className="scroll_container__body">
						<header className={"transition header" +
						(this.state.headerIsVisible ? " header-visible" : " header-hidden") +
						(this.state.black ? " black" : "")
						} ref={this.header}>
							<ul className="menu">
								<li>
									<NavLink to="/">
										Key findings
									</NavLink>
								</li>
								<li>
									<NavLink to="/full_results">
										Full Results
									</NavLink>
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
									<KeyFindings change_nav_background={this.change_nav_background} />
								</Route>
							</Switch>
						</main>
						{/* Main content - End  */}
					</div>
					<div className="scroll_container--hitbox"/>
				</div>
			</div>

		);
	}
}

export default withRouter(App);