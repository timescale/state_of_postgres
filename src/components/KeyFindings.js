import React, { Component, Fragment} from 'react';
import Fade  from 'react-reveal/Fade';
// import Reveal from 'react-reveal/Reveal';
import LazyLoad from 'react-lazyload';
import anime from "animejs";
import { Link, Scroll } from 'react-scroll'
import ScrollAnimation from 'react-animate-on-scroll';

import ElephantAnimation from './ElephantAnimation';
import FlowerVideo from './FlowerVideo';

class KeyFindings extends Component {

	constructor(props) {
		super(props);
		this.animatedTextList = [];
		this.animatedSectionList = [];

		this.animateText = this.animateText.bind(this);
		this.changeDocumentBackground = this.changeDocumentBackground.bind(this);
	}

	componentDidMount() {

		this.animatedSectionList.push(document.querySelectorAll(".anim-sect"));
		this.animatedTextList.push(document.querySelectorAll(".animate-text"));
		this.animatedTextList[0].forEach(function(element, index) {
			element.innerHTML = element.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
		});

		window.addEventListener("scroll", this.animateText, false);

		this.animateText();
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.animateText, false);
	}

	animateText() {

		this.animatedSectionList[0].forEach(function(element, index) {

			let elHeight = element.clientHeight;
			let elTop = element.offsetTop;
			let elBottom = element.offsetTop + elHeight;

			let windowTop = window.pageYOffset;
			let windowBottom = window.pageYOffset + window.outerHeight;

			if(windowTop > (elTop - elHeight/2) && windowBottom < (elBottom + elHeight/2)){
				element.classList.add("visible");
			}
			else{
				element.classList.remove("visible");
			}
		});

		this.animatedTextList[0].forEach(function(element, index) {
			setTimeout(function(){
				if(element.parentNode.classList.contains("animateText") && !element.parentNode.classList.contains("completed")){
					element.parentNode.classList.add("completed");
					anime.timeline({loop: false}).add({
						targets: element.children,
						opacity: [0,1],
						translateZ: 0,
						easing: "easeOutExpo",
						duration: 800,
						delay: (function (el, i) {
							return 40 * i;
						})
					});
				}
			}, 100);
		});
	}

	changeDocumentBackground(v) {
		if(v.inViewport){
			document.body.classList.add("bg-dark");
		}
		else{
			document.body.classList.remove("bg-dark");
		}
	}

	render() {
		return (
			<Fragment>

				{/* Intro - Start */}
				<section className="section intro">
					<div className="container">
						<div className="intro-content">
							<Fade bottom>
								<p className="year">2019</p>
							</Fade>
							<Fade bottom delay={200} duration={1300}>
								<h1>
									state
									<span>of</span>
									postgres
								</h1>
							</Fade>
							<Fade bottom delay={1000}>
								<p className="subtitle">A survey from Timescale</p>
							</Fade>
							<Fade bottom delay={1000}>
								<p className="scroll-text">
									Scroll to continue or <br /> view the raw data 
									<Link className="link color-highlight scroll-down-btn" to="dev-profiles-1" smooth={true} duration={600}>&nbsp;here</Link>
									<br />
									<Link className="btn-icon scroll-down-btn" to="dev-profiles-1" smooth={true} duration={600}><i className="icon-arrow-down"></i></Link>
								</p>
							</Fade>
						</div>
					</div>
				</section>
				{/* Intro - End */}
			
				{/* 1 Developer profiles - Start */}
				<section className="section img-left-section dev-profiles-1 anim-sect" name="dev-profiles-1">
					<div className="container">
						<div className="img-wrap">
							<div>
								<LazyLoad offset={2000}>
									<img src="/img/elephant-img-1.png" alt="Elephant" />
								</LazyLoad>	
							</div>
						</div>
						<div className="fixed-text">
							<div className="text-wrap anim-text">
								<p className="info">26% of respondents have been using Postgres for more than 10 yrs.</p>
								<p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
							</div>
						</div>
					</div>
				</section>
				{/* Developer profiles - End */}

				{/* 2 Developer profiles - Start */}
				<section className="section img-right-section dev-profiles-2 anim-sect">
					<div className="container">
						<div className="fixed-text">
							<div className="text-wrap anim-text">
								<p className="info">Over 80% of respondents use Postgres for personal projects</p>
								<p className="description">Like Raspberry Pi.</p>
							</div>
						</div>
						<div className="img-wrap">
							<div>
								<LazyLoad offset={2000}>
									<img src="/img/scheme.png" alt="Scheme" />
								</LazyLoad>
							</div>
						</div>
					</div>
				</section>
				{/* Developer profiles - End */}

				{/* 3 Use cases - Start */}
				<section className="section img-left-section use-cases-2 anim-sect">
					<div className="container">
						<div className="img-wrap">
							<div>
								<LazyLoad offset={2000}>
									<img src="/img/elephant-img-2.png" alt="Elephant" />
								</LazyLoad>		
							</div>
						</div>
						<div className="fixed-text">
							<div className="text-wrap anim-text">
								<p className="description">Postgres is more popular than ever.</p>
								<p className="info">66% say they’re using Postgres more than they have in the past.</p>
							</div>
						</div>
					</div>
				</section>
				{/* Use cases - End */}

				{/* 4 Use cases - Start */}
				<section className="section img-right-section use-cases-3 anim-sect">
					<div className="container">
						<div className="fixed-text">
							<div className="text-wrap anim-text">
								<p className="info">About 70% of all respondents use Postgres for app development</p>
								<p className="description">And 30% report using it for real-time analytics, dashboarding, and monitoring</p>
							</div>
						</div>
						<div className="img-wrap">
							<div>
								<LazyLoad offset={2000}>
									<img src="/img/elephant-img-3.png" alt="Elephant" />
								</LazyLoad>	
							</div>
						</div>
					</div>
				</section>
				{/* Use cases - End */}

				{/* 5 Ecosystem & Tools - Start */}
				<FlowerVideo />
				{/* Ecosystem & Tools - End */}

				{/* 6 Technology - Start */}
				<section className="section text-section">
					<div className="container">		
						<div className="text-wrap">
							<Fade bottom delay={500}>
								<ScrollAnimation animateIn="animateText" animateOnce={true}>
									<p className="info animate-text">Over ⅔ (66%) of respondents have never been to a Postgres event, however the most popular (19%) event among the listed options were meetups involving Postgres</p>
								</ScrollAnimation>
								<ScrollAnimation animateIn="animateText" animateOnce={true}>
									<p className="description animate-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit dui in nibh mattis sagittis quis pharetra diam.</p>
								</ScrollAnimation>
							</Fade>
						</div>
					</div>
				</section>
				{/* Technology - End */}

				{/* 7 Technology - Start */}
				<section className="section text-section">
					<div className="container">		
						<div className="text-wrap">
							<Fade bottom>
							<ScrollAnimation animateIn="animateText" animateOnce={true}>
								<p className="info animate-text">The largest amount of respondents choose to (46%) deploy privately in a self-managed data center</p>
							</ScrollAnimation>
							<ScrollAnimation animateIn="animateText" animateOnce={true}>
								<p className="description animate-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit dui in nibh mattis sagittis quis pharetra diam.</p>
							</ScrollAnimation>
							</Fade>
						</div>
					</div>
				</section>
				{/* Technology - End */}

				{/* 8 Technology - Start */}
				<section className="section text-section">
					<div className="container">		
						<div className="text-wrap">
							<Fade bottom>
								<ScrollAnimation animateIn="animateText" animateOnce={true}>
									<p className="info animate-text">Among those who deploy on a cloud, over half (51%) use AWS</p>
								</ScrollAnimation>
								<ScrollAnimation animateIn="animateText" animateOnce={true}>
									<p className="description animate-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit dui in nibh mattis sagittis quis pharetra diam.</p>
								</ScrollAnimation>
							</Fade>
						</div>
					</div>
				</section>
				{/* Technology - End */}

				{/* 9 Technology - Start */}
				<section className="section text-section">
					<div className="container">		
						<div className="text-wrap">
							<Fade bottom>
								<ScrollAnimation animateIn="animateText" animateOnce={true}>
									<p className="info animate-text">Of those who currently use or have previously used a NoSQL database before, half of the respondents have used Redis (50%) followed by MongoDB (40%)</p>
								</ScrollAnimation>
								<ScrollAnimation animateIn="animateText" animateOnce={true}>
									<p className="description animate-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit dui in nibh mattis sagittis quis pharetra diam.</p>
								</ScrollAnimation>
							</Fade>
						</div>
					</div>
				</section>
				{/* Technology - End */}

				{/* 10 Technology - Start */}
				<section className="section text-section">
					<div className="container">		
						<div className="text-wrap">
							<Fade bottom>
								<ScrollAnimation animateIn="animateText" animateOnce={true}>
									<p className="info animate-text">Almost ¼ (24%) have never used a NoSQL database before.</p>
								</ScrollAnimation>
								<ScrollAnimation animateIn="animateText" animateOnce={true}>
									<p className="description animate-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit dui in nibh mattis sagittis quis pharetra diam.</p>
								</ScrollAnimation>
							</Fade>
						</div>
					</div>
				</section>
				{/* Technology - End */}
				
				{/* 11-13 title Technology - Start */}
				<section className="section text-section">
					<div className="container">		
						<div className="text-wrap">
							<Fade bottom>
								<p className="info info-title">In their own words</p>
							</Fade>
						</div>
					</div>
				</section>
				{/* Technology - End */}

				{/* 11 Competitive Landscape - Start */}
				<section className="section quote-section">
					<div className="container">
						<div className="text-wrap">
							<Fade bottom delay={500}>
								<ScrollAnimation animateIn="animateText" animateOnce={true}>
									<p className="quote animate-text">“Never used it [NoSQL] because I was smart enough to smell the NoSQL bullshit early on.”</p>
								</ScrollAnimation>
							</Fade>
							<Fade bottom delay={600}>
								<p className="autor">- Anonymous</p>
							</Fade>			
						</div>
						<div className="img-wrap">
							<Fade bottom>
								<div>
									<LazyLoad offset={2000}>
										<img src="/img/elephant-img-4.png" alt="Elephant" />
									</LazyLoad>		
								</div>
							</Fade>
						</div>
					</div>
				</section>
				{/* Competitive Landscape - End */}

				{/* 12 Technology - Start */}
				<section className="section quote-section">
					<div className="container">
						<div className="text-wrap">
							<Fade bottom delay={500}>
								<ScrollAnimation animateIn="animateText" animateOnce={true}>
									<p className="quote animate-text">“I used to work with a guy who liked to say MySQL is a TOY database. I concur; probably throw MongoDB in there.”</p>
								</ScrollAnimation>
							</Fade>
							<Fade bottom delay={600}>
								<p className="autor">- Anonymous</p>
							</Fade>				
						</div>
						<div className="img-wrap">
							<Fade bottom>
								<div>		
									<LazyLoad offset={2000}>
										<img src="/img/elephant-img-5.png" alt="Elephant" />
									</LazyLoad>
								</div>
							</Fade>
						</div>
					</div>
				</section>
				{/* Technology - End */}

				{/* 13 Competitive Landscape - Start */}
				<ScrollAnimation 
					animateIn="animateBgIn" 
					animateOut="animateBgOut"
					animateOnce={false} 
					offset={200}
					afterAnimatedIn={this.changeDocumentBackground}
					afterAnimatedOut={this.changeDocumentBackground}>
						<section className="section quote-section quote-section-dark">
							<div className="container">
								<div className="img-wrap">
									<Fade bottom>
										<div>
											<LazyLoad offset={2000}>
												<img src="/img/elephant-img-6.png" alt="Elephant" />
											</LazyLoad>
										</div>
									</Fade>
								</div>
								<div className="text-wrap">	
									<Fade bottom delay={500}>
										<ScrollAnimation animateIn="animateText" animateOnce={true}>
											<p className="quote animate-text">“If a project was using a NoSQL database, I would fire the entire team, burn the code base, and start over.”</p>
										</ScrollAnimation>
									</Fade>
									<Fade bottom delay={600}>
										<p className="autor">- Anonymous</p>
									</Fade>			
								</div>
							</div>
						</section>
				</ScrollAnimation>
				{/* Competitive Landscape - End */}

				{/* 14 Empty section - Start */}
				<section className="section"></section>
				{/* Empty section - End */}

				{/* 15 Technology 3D animation - Start */}
				<ElephantAnimation />
				{/* Technology 3D animation - End */}

				{/* Footer - Start */}
				<footer className="footer">
					<div className="container text-center">
						<a href="#" className="btn btn-bordered btn-lg">CTA to Raw Data</a>
					</div>
				</footer>
				{/* Footer - End */}
			</Fragment>
		);
	}
}

export default KeyFindings;
