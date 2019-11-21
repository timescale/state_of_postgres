import React, { Component, Fragment} from 'react';
import Fade  from 'react-reveal/Fade';
import VisibilitySensor from 'react-visibility-sensor'
import anime from "animejs";
import {Container, Row, } from 'react-bootstrap'

import {Section, QuoteSection, EmailForm} from "./Section";


class KeyFindings extends Component {

	constructor(props) {
		super(props);
		this.black_section = React.createRef();
	}

	componentDidMount() {
		window.addEventListener("scroll", this.animateText, false);
	}

	componentWillUnmount() {
		this.props.change_nav_background(false);
	}

	change_background = (is_visible) => {
		if (!this.black_section.current) {
			return
		}
		if(is_visible) {
			this.black_section.current.classList.add('black');
			this.props.change_nav_background(true);
		} else {
			this.black_section.current.classList.remove('black');
			this.props.change_nav_background(false);
		}
	};

	render() {
		return (
			<Fragment>
				<div id="key" className="transition" ref={this.black_section}>
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
									<p className="subtitle">We asked 500 members of the Postgres community about how they’re using the database in 2019. Here's what they said...</p>
								</div>
							</Row>
						</Container>
					</section>
					{/* Intro - End */}

					<Section number={1} info={'26% of respondents have been using Postgres for more than 10 years.'}
							 description={'The Postgres community is committed.'} reverse={true}
							 model="Drone"/>

					<Section number={2} info={'66% said they’re using Postgres more than they have in the past.'}
							 description={'Postgres is more popular than ever!'} reverse={false}
							 model="Drone"/>

					<Section number={3} info={'Postgres isn’t just for work. Over 80% of respondents use it for personal projects.'}
							 description={'Like running a demo on a Raspberry Pi.'} reverse={true}
							 model="Circuit"/>

					<Section number={4} info={'About 70% of all respondents use Postgres for app development.'}
							 description={'And 30% report using it for real-time analytics, dashboarding, and monitoring.'} reverse={true}
							 model="Phone"/>

					<Section number={5} info={'Only 9% have contributed code to Postgres...'}
							 description={'That may not sound like much, but this is actually an impressive amount considering the hundreds of thousands of people using Postgres worldwide.'} reverse={true} minTopValue={window.innerHeight*0.7} partialVisibility={true} show_info={true}
							 model="Flowers"/>

					{/* 11-13 title Technology - Start */}
					<section className="section text-section">
						<div className="container">
							<div className="text-wrap">
								<Fade bottom>
									<p className="info info-title">How they deploy</p>
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
					<VisibilitySensor minTopValue={window.innerHeight*0.9} partialVisibility={true} onChange={this.change_background}>
						<div>
							<section className="section text-section">
								<div className="container">

									<div className="text-wrap">
										<Fade bottom>
											<p className="info info-title">What do folks think about NoSQL?</p>
										</Fade>
									</div>

								</div>
							</section>

							<QuoteSection number={9} text={'If a project was using a NoSQL database, I would fire the entire team, burn the code base, and start over.'}
										  name={'- Anonymous'} reverse={false}
										  model="Flame"/>

							<QuoteSection number={10} text={'I never used it [NoSQL] because I was smart enough to smell the NoSQL bullsh*t early on.'}
										  name={'- Anonymous'} reverse={true}
										  model="Tail"/>

							<QuoteSection number={11} text={'I used to work with a guy who liked to say MySQL is a TOY database. I concur; probably throw MongoDB in there.'}
										  name={'- Anonymous'} reverse={true}
										  model="Swimming" />
							<EmailForm/>
						</div>

					</VisibilitySensor>
				</div>
			</Fragment>
		);
	}
}

export default KeyFindings;
