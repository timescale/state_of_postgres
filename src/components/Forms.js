import React, { useState } from 'react';
import submitForm from '../utils/submit';
import { Col, Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

class TimescaleEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { clicked: false, buttonText: 'Submit', fields: { email: '' }}
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    changeState = () => {
        this.setState({ clicked: !this.state.clicked });
    };

    onSuccess = () => {
        this.setState({ buttonText: 'Thanks!' });
    }

    onFailure = () => {
        this.setState({ buttonText: 'Error!' });
    }

    handleChange = (e) => {
        this.setState({ fields: { email: e.target.value }});
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const submitBody = Object.entries(this.state.fields).map(([name, value]) => {
            return {name, value};
        });
        await submitForm({
          submitBody,
          route: '/v2/newsletter',
          onSuccess: this.onSuccess,
          onFailure: this.onFailure,
        });
    }

    render() {
        return(
            <div id="timescale">
                <div className="trigger d-flex" onClick={this.changeState}>
                    <img alt="Timescale logo" src="img/timescale.svg"/><FontAwesomeIcon icon={this.state.clicked ? faChevronDown : faChevronUp}/>
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
                                <Button onClick={this.onSubmit} type="submit" variant="primary">{this.state.buttonText}</Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </div>
            </div>
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
            { name: 'stateofpostgres', value: true },
            { name: 'email', value: email },
        ];
        await submitForm({submitBody});
        setIsSubmitting(false);
    }

    return (
        <div id="email-form" className={black ? 'black' : '' }>
            <div className='text1'>
                Sign up to get notified about the next State of Postgres survey.
            </div>
            <Form>
                <Form.Row>
                    <Col md="12">
                        <div className='text2'>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" checked={newsletter} onChange={() => { setNewsletter(!newsletter); }} label="I'd like to get the Timescale Newsletter (new technical content, SQL tips, and more)." />
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
    );
};


export {TimescaleEmail, EmailForm};
