import React, { Component } from 'react';

class WaterText extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {

    }

    render() {
        return (
            <div className="water-text">
                <div className="percentage">
                    <span className="number">{this.props.number}</span> <span className="percent">%</span>
                </div>
                <div className="text">{this.props.text}</div>
            </div>
        )
    }
}

export default WaterText;