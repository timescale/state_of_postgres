import React, { Component, useEffect } from 'react';
import KeyFindings from './components/KeyFindings';
import FullResults from './components/FullResults';
import { Switch, Route, useLocation, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import './assets/scss/style.scss';
import NavLink from './components/NavLink';
import SmoothScroll from './components/SmoothScroll';
import { TimescaleEmail } from './components/Forms';

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

class App extends Component {
	state = {
		headerIsVisible: true,
		color: 'white',
		mobileMenuVisible: false
	};
	constructor(props) {
		super(props);

		this.header = React.createRef();
		this.lastPosition = 0;
		this.currentLocation = '';

		this.toggleHeader = this.toggleHeader.bind(this);
		this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
		this.closeMobileMenu = this.closeMobileMenu.bind(this);
	}

	componentDidMount() {
		window.addEventListener('scroll', this.toggleHeader, false);
		window.addEventListener('resize', this.closeMobileMenu, false);

		this.currentLocation = this.props.location.pathname;

		this.props.history.listen((location, action) => {
			if (this.currentLocation !== location.pathname) {
				window.scrollTo(0, 0);
				this.currentLocation = location.pathname;

				this.closeMobileMenu();
			}
		});

		if (!this.header_moved) {
			// the smooth scroll breaks fixed elements in the main div. this is a hack to move them out.
			document
				.querySelector('body')
				.appendChild(document.querySelector('header'));
			this.header_moved = true;
		}
		this.scroll = new SmoothScroll('.scroll_container');
		setTimeout(() => {
			let offsetHeight = document.querySelector('.scroll_container__body')
				.offsetHeight;
			document.querySelector('.main-wrap').style.height = `${offsetHeight}px`;
		}, 500)
	}

	toggleHeader(e) {
		let smallHeader = false;

		if (window.pageYOffset > this.header.current.clientHeight) {
			smallHeader = true;

			if (window.pageYOffset > this.lastPosition) {
				this.setState({
					headerIsVisible: false
				});
			} else {
				this.setState({
					headerIsVisible: true
				});
			}
			this.lastPosition = window.pageYOffset;
		} else {
			smallHeader = false;

			this.setState({
				headerIsVisible: true
			});
		}

		if (smallHeader) {
			this.header.current.classList.add('header-small');
		} else {
			this.header.current.classList.remove('header-small');
		}
	}

	change_nav_background = value => {
		this.setState({
			color: value
		})
	}

	closeMobileMenu() {
		this.setState({
			mobileMenuVisible: false
		});
		document.body.classList.remove('overflow');
	}

	toggleMobileMenu() {
		this.setState(
			prevState => {
				return {
					mobileMenuVisible: !prevState.mobileMenuVisible
				};
			},
			() => {
				if (this.state.mobileMenuVisible) {
					document.body.classList.add('overflow');
				} else {
					document.body.classList.remove('overflow');
				}
			}
		);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.closeMobileMenu, false);
	}

	render() {
		const { mobileMenuVisible } = this.state;
		return (
			<div className={'main-wrap' + (mobileMenuVisible ? ' translated' : '')}>
				<ScrollToTop />
				<div className='scroll_container'>
					<div className='scroll_container__body'>
						<header
							id='header'
							className={
								'transition header ' +
								(this.state.headerIsVisible
									? ' header-visible '
									: ' header-hidden ') +
								this.state.color +
								(mobileMenuVisible ? ' header-translated' : '')
							}
							ref={this.header}
						>
							<button
								type='button'
								className='menu-btn'
								onClick={this.toggleMobileMenu}
							>
								<span></span>
								<span></span>
							</button>

							<ul className={'menu' + (mobileMenuVisible ? ' opened' : '')}>
								<li>
									<NavLink to='/'>Key findings</NavLink>
								</li>
								<li>
									<NavLink to='/full_results'>Full Results</NavLink>
								</li>
							</ul>
						</header>
						{/* Main content - Start  */}
						<main id='main'>
							<Switch>
								<Route path='/full_results'>
									<FullResults />
								</Route>
								<Route path='/' exact>
									<KeyFindings
										change_nav_background={this.change_nav_background}
									/>
								</Route>
							</Switch>
						</main>
						{/* Main content - End  */}
					</div>
					<div className='scroll_container--hitbox' />
					<TimescaleEmail />
				</div>
			</div>
		);
	}
}

export default withRouter(App);
