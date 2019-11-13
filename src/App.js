import React, { Component, Fragment, useEffect } from 'react';
import KeyFindings from './components/KeyFindings';
import Materials from './components/Materials';
import FullResults from './components/FullResults';
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
import MagicScroll from './components/Scroll'
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

		this.state = {
			headerIsVisible: true
		}

		this.toggleHeader = this.toggleHeader.bind(this);
	}

	componentDidMount() {
		document.querySelector("#main").addEventListener("scroll", this.toggleHeader, false);

		let magicScroll = new MagicScroll({
			target: document.querySelector("#main"),
			speed: 80,
			smooth: 12,
		});
	}

	componentWillUnmount() {
		document.querySelector("#main").removeEventListener("scroll", this.toggleHeader, false);
	}

	toggleHeader(e) {

		let smallHeader = false;
		let scrollPosition = document.querySelector("#main").scrollTop;
		let headerElement = this.header.current;

		if(scrollPosition > headerElement.clientHeight) {

			smallHeader = true;

			if(scrollPosition > this.lastPosition) {
				this.setState({
					headerIsVisible: false
				});
			}
			else {
				this.setState({
					headerIsVisible: true
				});
			}
			this.lastPosition = scrollPosition;
		}
		else {

			smallHeader = false;

			this.setState({
				headerIsVisible: true
			});
		}

		if(smallHeader){
			headerElement.classList.add("header-small");
		}
		else {
			headerElement.classList.remove("header-small");
		}
	}

	render(){
		return (
			<div className="main-wrap">
				<Router>
					<ScrollToTop />

					<header className={"header" + (this.state.headerIsVisible ? " header-visible" : " header-hidden")} ref={this.header}>
						<ul className="menu">
							<li>
								<Link to="/materials">Materials</Link>
							</li>
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
							<Route path="/materials">
								<Materials />
							</Route>
							<Route path="/full_results">
								<FullResults />
							</Route>
							<Route path="/" exact>
								<KeyFindings />
							</Route>
						</Switch>

					</main>
					{/* Main content - End  */}

				</Router>
			</div>
		);
	}
}

export default App;