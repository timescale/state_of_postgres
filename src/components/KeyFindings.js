import React, { Component, Fragment} from 'react';
import Fade  from 'react-reveal/Fade';
// import Reveal from 'react-reveal/Reveal';
import LazyLoad from 'react-lazyload';
import anime from "animejs";
import { Link, Scroll } from 'react-scroll'
import ScrollAnimation from 'react-animate-on-scroll';

import ElephantAnimation from './ElephantAnimation';
import FlowerVideo from './FlowerVideo';
import Model from "./Model";
import Section from "./Section";

import elephant_model from './models/elephant.glb'

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
								<p className="subtitle" style={{width:600}}>We put out an open call for Postgres community members to tell us about their experiences -- and here are the results. </p>
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

				{/*<Section number={1} info={'26% of respondents have been using Postgres for more than 10 yrs.'}*/}
				{/*		 description={'The postgres community is committed.'} reverse={true}*/}
				{/*		 model={elephant_model}/>*/}

				<Section number={2} info={'66% said they’re using Postgres more than they have in the past.'}
						 description={'Postgres is more popular than ever!'} reverse={false}
						model="Drone"/>

				{/*<Section number={3} info={'Postgres isn’t just for work. Over 80% of respondents use it for personal projects.'}*/}
				{/*		 description={'Like Raspberry Pi.'} reverse={true}*/}
				{/*model={elephant_model}/>*/}

				<Section number={4} info={'About 70% of all respondents use Postgres for app development.'}
						 description={'And 30% report using it for real-time analytics, dashboarding, and monitoring'} reverse={true}
				model="Phone"/>
				<Section number={2} info={'66% said they’re using Postgres more than they have in the past.'}
						 description={'Postgres is more popular than ever!'} reverse={false}
						model="Drone"/>

				{/*<Section number={3} info={'Postgres isn’t just for work. Over 80% of respondents use it for personal projects.'}*/}
				{/*		 description={'Like Raspberry Pi.'} reverse={true}*/}
				{/*model={elephant_model}/>*/}

				<Section number={4} info={'About 70% of all respondents use Postgres for app development.'}
						 description={'And 30% report using it for real-time analytics, dashboarding, and monitoring'} reverse={true}
				model="Phone"/>

				{/*<Section number={'5a'} info={'Only 9% have contributed code to Postgres...'}*/}
				{/*		 description={'That may not sound like much, but this is actually an impressive amount considering the hundreds of thousands of people using Postgres worldwide '} reverse={true}*/}
				{/*model={elephant_model}/>*/}

				{/*<Section number={7} info={'The most common way to deploy Postgres (46%) is in a self-managed data center.'}*/}
				{/*		 description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit dui in nibh mattis sagittis quis pharetra diam.'} reverse={false}*/}
				{/*model={elephant_model}/>*/}

				{/*<Section number={8} info={'Among those who deploy on a cloud, over half (51%) use AWS'}*/}
				{/*		 description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit dui in nibh mattis sagittis quis pharetra diam.'} reverse={true}*/}
				{/*model={elephant_model}/>*/}

				{/*<Section number={9} info={'The next closest cloud provider was GCP at 18%'}*/}
				{/*		 description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit dui in nibh mattis sagittis quis pharetra diam.'} reverse={false}*/}
				{/*model={elephant_model}/>*/}


				{/* 11-13 title Technology - Start */}
				<section className="section text-section">
					<div className="container">
						<div className="text-wrap">
							<Fade bottom>
								<p className="info info-title">Deployment</p>
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
