import React from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

class TimescaleEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {clicked: false}
    }
    changeState = () => {
        this.setState({clicked: !this.state.clicked});
    };
    render() {
        return(
            <div id="timescale">
                <div className="trigger d-flex" onClick={this.changeState}>
                    <img src="img/timescale.svg"/><FontAwesomeIcon icon={this.state.clicked ? faChevronDown : faChevronUp}/>
                </div>
                <div className="content" style={{display: this.state.clicked ? "block" : "none"}}>
                    <p className="head">Stay connected!</p>
                    <p className="subhead">Sign up for the Timescale Newsletter to get new technical content, SQL tips, and more.</p>
                    <Form>
                        <Form.Row>
                            <Col md="8">
                                <Form.Control type="email" placeholder="Email" />
                            </Col>
                            <Col className="d-flex btn-col">
                                <Button  type="submit" variant="primary">Submit</Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </div>
            </div>
        );
    }
}

export default TimescaleEmail;