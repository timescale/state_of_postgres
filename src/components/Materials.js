import React, { Component, Fragment} from 'react';

import ElephantAnimation from './ElephantAnimation';
import HeadAnimation from './HeadAnimation';
import CircleAnimation from './CircleAnimation';
import Circle2Animation from './Circle2Animation';
import VisibilitySensor from 'react-visibility-sensor'

class Materials extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        this.style = {marginBottom: '50px'};

        return (
            <Fragment>
                <VisibilitySensor partialVisibility={true}>
                    {
                        ({isVisible}) =>
                            <div style={{marginBottom: '50px', visibility: isVisible ? "visible": "hidden" }} >
                                <CircleAnimation />
                            </div>
                    }
                </VisibilitySensor>

                <VisibilitySensor partialVisibility={true}>
                    {
                        ({isVisible}) =>
                            <div style={{marginBottom: '50px', visibility: isVisible ? "visible": "hidden" }} >
                                <Circle2Animation />
                            </div>
                    }
                </VisibilitySensor>

                <VisibilitySensor>
                    {
                        ({isVisible}) =>
                            <div style={{marginBottom: '50px', visibility: isVisible ? "visible" : "hidden"}}>
                                <HeadAnimation/>
                            </div>
                    }
                </VisibilitySensor>

                <VisibilitySensor>
                    {
                        ({isVisible}) =>
                            <div style={{marginBottom: '50px', visibility: isVisible ? "visible" : "hidden"}}>
                                <ElephantAnimation/>
                            </div>
                    }
                </VisibilitySensor>

            </Fragment>
        );
    }
}

export default Materials;
