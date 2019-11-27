import React from 'react';
import submitForm from '../utils/submit';
import { Col, Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

class TimescaleEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {clicked: false, buttonText: 'Submit', fields: {email: ''}}
        this.onClick = this.onClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    changeState = () => {
        this.setState({clicked: !this.state.clicked});
    };

    onSuccess = () => {
      this.setState({buttonText: 'Thanks!'});
    }

    onFailure = () => {
      this.setState({buttonText: 'Error!'});
    }

    handleChange = (e) => {
      this.setState({ fields: { email: e.target.value }});
    }

    onClick = async (e) => {
      e.preventDefault();
      const submitBody = Object.entries(this.state.fields).map(([name, value]) => {
        return {name, value};
      });
      await submitForm({submitBody, onSuccess: this.onSuccess, onFailure: this.onFailure});
    }

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
                                <Form.Control onChange={this.handleChange} value={this.state.email} type="email" placeholder="Email" />
                            </Col>
                            <Col className="d-flex btn-col">
                                <Button onClick={this.onClick} type="submit" variant="primary">{this.state.buttonText}</Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </div>
            </div>
        );
    }
}

export default TimescaleEmail;
