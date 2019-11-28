import React, { Component, useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor'
import submitForm from '../utils/submit';

import {Model, Drone, Phone, Flowers, Teamwork, Swimming, Flame, Tail, Circuit, Toyball} from "./Model";
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
		return <Swimming/>;
	} else if (model === 'Flame') {
		return <Flame/>;
	} else if (model === 'Tail') {
		return <Tail/>;
	} else if (model === 'Circuit') {
		return <Circuit/>;
	} else if (model === 'Toyball') {
		return <Toyball/>;
	}
	return <Model />;
}

class Section extends Component {

	constructor(props) {
		super(props);
		this.number = React.createRef();
		this.info = React.createRef();
		this.description = React.createRef();
	}

	fade = (is_visible) => {
		if (is_visible && this.number.current) {
			this.number.current.classList.add('fadeIn');
			this.info.current.classList.add('fadeIn');
			this.description.current.classList.add('fadeIn');
		} else if (is_visible && this.text.current) {
			this.text.current.classList.add('fadeIn');
		}
	};

	render() {
		return (
			<Row className="row_section" >
				<Col sm={{span: 12}} md={{ span: 6, order: this.props.reverse ? 2 : 1 }}
					 className="d-flex justify-content-center align-items-center">
					<GetModel model={this.props.model}/>
				</Col>
				<Col sm={{span: 12}} md={{ span: 6, order: this.props.reverse ? 1 : 2 }}
					 className="d-flex justify-content-center align-items-center text-section">
					<VisibilitySensor partialVisibility={this.props.partialVisibility || false}
									  onChange={this.fade} minTopValue={this.props.minTopValue} >
						<div className="text">
							<p className={'number ' + (this.props.show_info ? '' : 'animated')}
							   ref={this.number}
							   style={this.props.show_info ? {opacity: 1} : {}}>
								{ this.props.number }
							</p>
							<p className={'info ' + (this.props.show_info ? '' : 'animated')} ref={this.info}
							   style={this.props.show_info ? {opacity: 1} : {}}>
								{ this.props.info }
							</p>
							<p className="description animated"  ref={this.description}>
								{ this.props.description }
							</p>
						</div>
					</VisibilitySensor>
				</Col>
			</Row>
		);
	}
}

class QuoteSection extends Section {
	constructor(props) {
		super(props);
		this.text = React.createRef();
		this.row = React.createRef();
	}

	render() {
		return (
			<Container className="section" fluid={true}>
				<Row ref={this.row} className="transition">
					<Col sm={{span: 12}} md={{ span: 6, order: this.props.reverse ? 2 : 1 }}
						 className="d-flex justify-content-center align-items-center p-0 col-sm-push-6">
						<GetModel model={this.props.model} black={this.props.black}/>
					</Col>
					<Col sm={{span: 12}} md={{ span: 6, order: this.props.reverse ? 1 : 2 }}
						 className="d-flex justify-content-center align-items-center quote-text">
						<VisibilitySensor onChange={this.fade}>
							<div ref={this.text} className='text quote animated' style={{animationDuration: "1s", opacity: 0 }}>
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

const EmailForm = ({black}) => {
	const [newsletter, setNewsletter] = useState(false);
	const [email, setEmail] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		const submitBody = [
			{ name: 'newsletter', value: newsletter },
			{ name: 'email', value: email },
		];
		await submitForm({submitBody});
		setIsSubmitting(false);
	}

	return (
		<Row id="email-form" className={black ? 'black' : '' }>
			<Col sm={{ span: 12 }} md={{ span: 6, offset: 3 }}
				 className="d-flex justify-content-center">
				<div className="footer">
					<div className='text1'>
						Sign up to get notified about the next State of Postgres survey.
					</div>
					<Form>
						<Form.Row>
							<Col md="12">
								<div className='text2'>
									<Form.Group controlId="formBasicCheckbox">
										<Form.Check type="checkbox" checked={newsletter} onClick={() => { setNewsletter(!newsletter); }} label="I'd like to get the Timescale Newsletter (new technical content, SQL tips, and more)." />
									</Form.Group>
								</div>
							</Col>
							<Col md="8">
								<Form.Control type="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value); }}/>
							</Col>
							<Col className="d-flex">
								<Button type="submit" onClick={handleSubmit} variant="primary">Submit</Button>
							</Col>
						</Form.Row>
					</Form>
				</div>
			</Col>
		</Row>
	);
}

export {Section, QuoteSection, EmailForm};
