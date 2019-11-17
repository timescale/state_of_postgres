import React, { Component } from 'react';
import VisibilitySensor from 'react-visibility-sensor'

import {Model, Drone, Phone, Flowers, Teamwork, Swimming, Flame, Tail, Circuit} from "./Model";
import {Container, Row, Col, Form, Button} from 'react-bootstrap'

function GetModel(props) {
	const model = props.model;
	if (model === 'Drone') {
		return <Drone />;
	} else if (model === 'Phone') {
		return <Phone />;
	} else if (model === 'Flowers') {
		return <Flowers />;
	} else if (model === 'Teamwork') {
		return <Teamwork />;
	} else if (model === 'Swimming') {
		return <Swimming black={props.black} />;
	} else if (model === 'Flame') {
		return <Flame black={props.black} />;
	} else if (model === 'Tail') {
		return <Tail black={props.black} />;
	} else if (model === 'Circuit') {
		return <Circuit/>;
	}
	return <Model />;
}

class Section extends Component {

	constructor(props) {
		super(props);
		this.text = React.createRef();
	}

	fade = (is_visible) => {
		if (is_visible) {
			this.text.current.classList.add('fadeIn');
		}
	};

	render() {
		return (
			<Container fluid={true}>
				<Row style={{height: 850}}>
					<Col sm={{span: 12}} md={{ span: 6, order: this.props.reverse ? 2 : 1 }}
						 className="d-flex justify-content-center align-items-center">
						<GetModel model={this.props.model}/>
					</Col>
					<Col sm={{span: 12}} md={{ span: 6, order: this.props.reverse ? 1 : 2 }}
						 className="d-flex justify-content-center align-items-center pr-0">
						<VisibilitySensor partialVisibility={this.props.partialVisibility || false}
										  onChange={this.fade} minTopValue={this.props.minTopValue} >
							<div ref={this.text} className="text animated" style={{animationDuration: "1s", opacity: 0}}>
								<p className="number">{ this.props.number }</p>
								<p className="info">{ this.props.info }</p>
								<p className="description">{ this.props.description }</p>
							</div>
						</VisibilitySensor>
					</Col>
				</Row>
			</Container>
		);
	}
}

class QuoteSection extends Section {
	render() {
		return (
			<Container fluid={true}>
				<Row style={{height: 850}} className={this.props.black ? 'black' : '' }>
					<Col sm={{span: 12}} md={{ span: 6, order: this.props.reverse ? 2 : 1 }}
						 className="d-flex justify-content-center align-items-center col-sm-push-6">
						<GetModel model={this.props.model} black={this.props.black}/>
					</Col>
					<Col sm={{span: 12}} md={{ span: 6, order: this.props.reverse ? 1 : 2 }}
						 className="d-flex justify-content-center align-items-center pr-0 quote-text">
						<VisibilitySensor onChange={this.fade}>
							<div ref={this.text} className='text quote animated' style={{animationDuration: "1s", opacity: 0 }}>
								<p className="number">{ this.props.number }</p>
								<div className="curly-quotes-wrapper">
									<div className="curly-quotes">
										<p className="info">{ this.props.text }</p>
									</div>
								</div>
								<p className="name">{ this.props.name }</p>
							</div>
						</VisibilitySensor>
					</Col>
				</Row>
			</Container>
		);
	}
}

class EmailForm extends Component {
	render() {
		return (
			<Container id="email-form">
				<Row style={{height: 850}} className={this.props.black ? 'black' : '' }>
					<Col sm={{ span: 12 }} md={{ span: 5, offset: 4 }}
						 className="d-flex justify-content-center">
						<div class="footer">
						<div className='text1'>
							Like postgres?
						</div>
						<div className='text2'>
							Sign up to get notified for our survey next year. And in the meantime get helpful Postgres tips delivered occasionally to your inbox.
						</div>
						<Form>
							<Form.Row>
								<Col md="8">
									<Form.Label>Email address</Form.Label>
									<Form.Control type="email" placeholder="Enter email" />
								</Col>
								<Col className="d-flex" style={{ alignItems: "flex-end"}}>
									<Button  type="submit" variant="primary">Submit</Button>
								</Col>
							</Form.Row>
						</Form>
						</div>
					</Col>
				</Row>
			</Container>
		);
	}
}

export {Section, QuoteSection, EmailForm};
