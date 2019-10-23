import React, { Component, Fragment} from 'react';

import ElephantAnimation from './ElephantAnimation';
import HeadAnimation from './HeadAnimation';
import CircleAnimation from './CircleAnimation';
import Circle2Animation from './Circle2Animation';

class Materials extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Fragment>

				<div style={{marginBottom: '50px'}}>
					<CircleAnimation />
				</div>
	
				<div style={{marginBottom: '50px'}}>
					<Circle2Animation />
				</div>

				<div style={{marginBottom: '50px'}}>
					<HeadAnimation />
				</div>

				<div style={{marginBottom: '50px'}}>
					<ElephantAnimation />
				</div>

			</Fragment>
		);
	}
}

export default Materials;
