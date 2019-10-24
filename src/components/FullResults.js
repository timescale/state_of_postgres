import React, { Component, Fragment} from 'react';
import Fade  from 'react-reveal/Fade';

class KeyFindings extends Component {

	constructor(props) {
		super(props);

		this.questions = [
			{
				id: 1,
				question: "Question"
			},
			{
				id: 2,
				question: "Question"
			},
			{
				id: 3,
				question: "Question"
			},
			{
				id: 4,
				question: "Question"
			},
			{
				id: 5,
				question: "Question"
			},
			{
				id: 6,
				question: "Question"
			},
			{
				id: 7,
				question: "Question"
			},
			{
				id: 8,
				question: "Question"
			},
			{
				id: 9,
				question: "Question"
			},
			{
				id: 10,
				question: "Question"
			},
			{
				id: 11,
				question: "Question"
			},
			{
				id: 12,
				question: "Question"
			},
			{
				id: 13,
				question: "Question"
			},
			{
				id: 14,
				question: "Question"
			},
			{
				id: 15,
				question: "Question"
			},
			{
				id: 16,
				question: "Question"
			},
			{
				id: 17,
				question: "Question"
			},
			{
				id: 18,
				question: "Question"
			},
			{
				id: 19,
				question: "Question"
			},
			{
				id: 20,
				question: "Question"
			},
		];
	}

	render() {
		return (
			<Fragment>
				{
					this.questions.map((question, index) => {
						return (
							<section className={"section question-section" + (index === this.questions.length - 1 ? " no-border" : "")} key={question.id}>
								<div className="container">
									<Fade bottom cascade>
										<div className="text-wrap">
											<p className="info">{question.question}</p>
										</div>
									</Fade>
								</div>
							</section>
						)
					})
				}
			</Fragment>
		);
	}
}

export default KeyFindings;
