import React, { Component, Fragment} from 'react';
import Fade  from 'react-reveal/Fade';

import anime from "animejs";
import {Container, Row, } from 'react-bootstrap'

import {Section, QuoteSection, EmailForm} from "./Section";

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
				<div id="key">
					{/* Intro - Start */}
					<section className="section intro">
						<Container>
							<Row className="intro-content justify-content-center align-items-center align-content-center">
								<div className="d-flex animated fadeIn">
									<h1>
										state
										<span>of</span>
										postgres
									</h1>
								</div>
								<div className="d-flex animated fadeIn">
									<p className="subtitle">We put out an open call for Postgres community members to tell us about their experiences -- and here are the results. </p>
								</div>
							</Row>
						</Container>
					</section>
					{/* Intro - End */}

					<Section number={1} info={'26% of respondents have been using Postgres for more than 10 yrs.'}
							 description={'The postgres community is committed.'} reverse={true}
							 model="Drone"/>

					<Section number={2} info={'66% said they’re using Postgres more than they have in the past.'}
							 description={'Postgres is more popular than ever!'} reverse={false}
							 model="Drone"/>

					<Section number={3} info={'Postgres isn’t just for work. Over 80% of respondents use it for personal projects.'}
							 description={'Like Raspberry Pi.'} reverse={true}
							 model="Circuit"/>

					<Section number={4} info={'About 70% of all respondents use Postgres for app development.'}
							 description={'And 30% report using it for real-time analytics, dashboarding, and monitoring'} reverse={true}
							 model="Phone"/>

					<Section number={5} info={'Only 9% have contributed code to Postgres...'}
							 description={'That may not sound like much, but this is actually an impressive amount considering the hundreds of thousands of people using Postgres worldwide '} reverse={true} minTopValue={500} partialVisibility={true}
							 model="Flowers"/>

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

					<Section number={6} info={'The most common way to deploy Postgres (46%) is in a self-managed data center.'}
							 description={''} reverse={true}
							 model="Swimming" />
					<Section number={7} info={'Among those who deploy on a cloud, over half (51%) use AWS'}
							 description={''} reverse={false}
							 model="Swimming" />
					<Section number={8} info={'The next closest cloud provider was GCP at 18%'}
							 description={''} reverse={true}
							 model="Swimming" />

					<section className="section text-section">
						<div className="container">
							<div className="text-wrap">
								<Fade bottom>
									<p className="info info-title">What do folks think about SQL?</p>
								</Fade>
							</div>
						</div>
					</section>

					<QuoteSection number={9} text={'If a project was using a NoSQL database, I would fire the entire team, burn the code base, and start over.'}
								  name={'- Anonymous'} reverse={false}
								  model="Flame"
								  black={true}/>

					<QuoteSection number={10} text={'I never used it [NoSQL] because I was smart enough to smell the NoSQL bullsh*t early on.'}
								  name={'- Anonymous'} reverse={true}
								  model="Tail"
								  black={true}/>

					<QuoteSection number={11} text={'I used to work with a guy who liked to say MySQL is a TOY database. I concur; probably throw MongoDB in there.'}
								  name={'- Anonymous'} reverse={true}
								  model="Swimming" />
					<EmailForm/>
				</div>
			</Fragment>
		);
	}
}

export default KeyFindings;
