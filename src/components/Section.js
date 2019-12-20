import React, { Component } from 'react';
import VisibilitySensor from 'react-visibility-sensor'


import {Drone, Phone, Flowers, Teamwork, Swimming, Spinner, Tail, Circuit, Toyball} from "./Model";
import {Row, Col} from 'react-bootstrap'

function GetModel(props) {
    const model = props.model;
    if (model === 'Drone') {
        return <Drone />;
    } else if (model === 'Phone') {
        return <Phone partialVisibility={true} minTopValue={100} />;
    } else if (model === 'Flowers') {
        return <Flowers  partialVisibility={true} minTopValue={100}  />;
    } else if (model === 'Teamwork') {
        return <Teamwork />;
    } else if (model === 'Swimming') {
        return <Swimming/>;
    } else if (model === 'Spinner') {
        return <Spinner/>;
    } else if (model === 'Tail') {
        return <Tail/>;
    } else if (model === 'Circuit') {
        return <Circuit/>;
    } else if (model === 'Toyball') {
        return <Toyball/>;
    }
    return <div/>;
}

class Section extends Component {

    constructor(props) {
        super(props);
        this.number = React.createRef();
        this.info = React.createRef();
        this.description = React.createRef();
    }

    fade = (is_visible) => {
        if (is_visible) {
            this.info.current.classList.add('fadeIn');
            this.description.current.classList.add('fadeIn');
        }
    };

    render() {
        return (
            <Row className="row_section" >

                <Col sm={{span: 12}} md={{ span: 6, order: this.props.reverse ? 2 : 1 }}
                     className="d-flex justify-content-center align-items-center model">
                    <GetModel model={this.props.model}/>
                </Col>

                <Col sm={{span: 12}} md={{ span: 6, order: this.props.reverse ? 1 : 2 }}
                     className="d-flex justify-content-center align-items-center text-section">
                    <VisibilitySensor partialVisibility={this.props.partialVisibility || false}
                                      onChange={this.fade} minTopValue={this.props.minTopValue} >
                        <div className="text">
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

class WaterSection extends Section {

    render() {
        return (
            <Row className="water_row_section">
                <Col sm={{span: 12}} md={{ span: 12 }}
                     className="d-flex model">
                    <GetModel model={this.props.model}/>
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
    fade = (is_visible) => {
        if (is_visible) {
            this.text.current.classList.add('fadeIn');
        }
    };
    render() {
        return (
            <Row ref={this.row} className='quote-section transition'>
                <Col sm={{span: this.props.model ? 12 : 0}} md={{ span: this.props.model ? 6 : 0, order: this.props.reverse ? 2 : 1 }}
                     className="d-flex justify-content-center model align-items-center">
                    <GetModel model={this.props.model}/>
                </Col>
                <Col sm={{span: 12}} md={{
                    span: this.props.model ? 6 : 10,
                    order: this.props.reverse ? 1 : 2,
                    offset: this.props.model ? 0 : 1,
                }}  style={{height: this.props.model ? '' : '400px'}}
                     className="d-flex justify-content-center align-items-center quote-text">
                    <VisibilitySensor onChange={this.fade}>
                        <div ref={this.text} className='text quote animated' style={{animationDuration: "1s", opacity: 0 }}>
                            <div>
                                <div className="curly-quotes-wrapper">
                                    <div className={this.props.model ? 'curly-quotes ' :  'bigger curly-quotes'}>
                                        <p className="info">{ this.props.text }</p>
                                    </div>
                                </div>
                                <p className="name">{ this.props.name }</p>
                            </div>
                        </div>
                    </VisibilitySensor>
                </Col>
            </Row>
        );
    }
}

export {Section, QuoteSection, WaterSection};
