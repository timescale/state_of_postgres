import React, { useState } from 'react';
import submitForm from '../utils/submit';
import { Col, Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

const [UNFILLED, SUBMITTING, SUCCEEDED, FAILED, INVALID_EMAIL] = ['unfilled', 'submitting', 'succeeded', 'failed', 'invalid email'];

const setSuccess = (setFormState) => () => {
  setFormState(SUCCEEDED);
};

const setFailure = (setFormState) => (response) => {
  if (response.status === 510) {
    setFormState(INVALID_EMAIL);
  } else {
    setFormState(FAILED);
  }
}

const TimescaleEmail = () => {
    const [open, setOpen] = useState(false);
    const [formState, setFormState] = useState(UNFILLED);
    const [fields, setFields] = useState({email: ''});

    const handleChange = (e) => {
      setFields({ email: e.target.value });
    }

    const onClick = async (e) => {
      e.preventDefault();
      const submitBody = Object.entries(fields).map(([name, value]) => {
        return {name, value};
      });
      setFormState(SUBMITTING);
      await submitForm({
        submitBody,
        onSuccess: setSuccess(setFormState),
        onFailure: setFailure(setFormState),
      });
    }

    return (
        <div id="timescale">
            <div className="trigger d-flex" onClick={() => { setOpen(!open); }}>
                <img  alt="Timescale logo" src="img/timescale.svg"/><FontAwesomeIcon icon={open ? faChevronDown : faChevronUp}/>
            </div>
            
            <div className="content" style={{ display: (open ? 'block' : 'none') }}>
                <p className="head">Stay connected!</p>
                <p className="subhead">Sign up for the Timescale Newsletter to get new technical content, SQL tips, and more.</p>
                <Form>
                    <Form.Row>
                        <EmailFieldBox
                          handleChange={handleChange}
                          formState={formState}
                          email={fields.email}
                          onSubmit={onClick}
                        />
                    </Form.Row>
                </Form>
            </div>
        </div>
    );
}

const EmailFieldBox = ({
  handleChange,
  formState,
  email,
  onSubmit,
  className = 'd-flex btn-col',
}) => {
  if ([UNFILLED, SUBMITTING].includes(formState)) {
    return (
      <>
        <Col md="8">
          <Form.Control onChange={handleChange} value={email} type="email" placeholder="Email" />
        </Col>
        <Col className={className}>
            <Button onClick={onSubmit} type="submit" variant="primary">{formState === UNFILLED ? 'Submit' : 'Sending...'}</Button>
        </Col>
      </>
    );
  } else {
    let formResponse = {}
    switch (formState) {
      case FAILED:
        formResponse = {
          main: 'Oops!',
          subtext: 'Something went wrong.',
        };
        break;
      case INVALID_EMAIL:
        formResponse = {
          main: 'Oops!',
          subtext: 'That email address is not valid.'
        };
        break;
      default:
        formResponse = {
          main: 'Thanks!',
          subtext: 'Your response was submitted.',
        };
    }
    return (
      <p className="response">
        <span className="head main">{formResponse.main} </span>
        <span class="head subtext">{formResponse.subtext}</span>
      </p>
    )
  }
}

const EmailForm = ({ black }) => {
    const [newsletter, setNewsletter] = useState(false);
    const [email, setEmail] = useState('');
    const [formState, setFormState] = useState(UNFILLED);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormState(SUBMITTING);
        const submitBody = [
            { name: 'newsletter', value: newsletter },
            { name: 'stateofpostgres', value: true },
            { name: 'email', value: email },
        ];
        await submitForm({
          submitBody,
          onSuccess: setSuccess(setFormState),
          onFailure: setFailure(setFormState),
        });
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
                    <EmailFieldBox
                      handleChange={(e) => { setEmail(e.target.value); }}
                      formState={formState}
                      email={email}
                      onSubmit={handleSubmit}
                      className="d-flex"
                    />
                </Form.Row>
            </Form>
        </div>
    );
};


export {TimescaleEmail, EmailForm};
