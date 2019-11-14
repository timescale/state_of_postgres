import React, { Component } from 'react';
import VisibilitySensor from 'react-visibility-sensor'

import {Model, Drone, Phone, Flowers, Teamwork, Swimming} from "./Model";
import {Container, Row, Col, Form} from 'react-bootstrap'

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
			this.text.current.classList.remove('fadeOut');
		} else {
			this.text.current.classList.add('fadeOut');
			this.text.current.classList.remove('fadeIn');
		}

	};

	render() {
		return (
			<Container fluid={true}>
				<Row style={{height: 850}}>
					<Col md={{ span: 6, order: this.props.reverse ? 2 : 1 }}
						 className="d-flex justify-content-center align-items-center">
						<GetModel model={this.props.model}/>
					</Col>
					<Col md={{ span: 6, order: this.props.reverse ? 1 : 2 }}
						 className="d-flex justify-content-center align-items-center">
						<VisibilitySensor onChange={this.fade} offset={{top:5, bottom:5}}>
							<div ref={this.text} className="text animated" style={{animationDuration: "0.3s"}}>
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
					<Col md={{ span: 6, order: this.props.reverse ? 2 : 1 }}
						 className="d-flex justify-content-center align-items-center">
						<GetModel model={this.props.model} black={this.props.black}/>
					</Col>
					<Col md={{ span: 6, order: this.props.reverse ? 1 : 2 }}
						 className="d-flex justify-content-center align-items-center">
						<VisibilitySensor onChange={this.fade} offset={{top:5, bottom:5}}>
							<div ref={this.text} className='text quote animated' style={{animationDuration: "0.3s"}}>
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
					<Col md={{ span: 4, offset: 4 }}
						 className="d-flex justify-content-center"
						 style={{flexDirection: "column"}}>
						<div className='text1'>
							Like postgres?
						</div>
						<div className='text2'>
							Sign up to get notified for survey next year. And in the meantime get helpful Postgres tips
						</div>
						<Form>
							<Form.Group controlId="formBasicEmail">
								<Form.Label>Enter email</Form.Label>
								<Form.Control type="email" placeholder="Email" />
							</Form.Group>
						</Form>
					</Col>
				</Row>
			</Container>
		);
	}
}

export {Section, QuoteSection, EmailForm};
