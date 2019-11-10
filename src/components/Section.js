import React, { Component } from 'react';
import VisibilitySensor from 'react-visibility-sensor'

import {Model, Drone, Phone} from "./Model";
import {Container, Row, Col} from 'react-bootstrap'

function GetModel(props) {
  const model = props.model;
  if (model === 'Drone') {
    return <Drone />;
  } else if (model === 'Phone') {
    return <Phone />;
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
			// this.text.current.addEventListener('animationend', () => {
			//    this.text.current.classList.remove('animating');
			// }, {once : true});

		} else {
			this.text.current.classList.add('fadeOut');
			this.text.current.classList.remove('fadeIn');
		}

	};

	render() {
		return (
				<Container fluid={true}>
					<Row>
						<Col md={{ span: 6, order: this.props.reverse ? 2 : 1 }}
							 className="d-flex justify-content-center align-items-center">
							<GetModel model={this.props.model}/>
						</Col>
						<Col md={{ span: 6, order: this.props.reverse ? 1 : 2 }} style={{height: 600}}
							 className="d-flex justify-content-center align-items-center">
							<VisibilitySensor onChange={this.fade} offset={{top:5, bottom:5}}>
								<div ref={this.text} className="text animated" style={{"animation-duration": "1s"}}>
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

export default Section;
