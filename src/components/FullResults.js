import React, { Component, Fragment} from 'react';
import Fade  from 'react-reveal/Fade';

class KeyFindings extends Component {

	constructor(props) {
		super(props);

		this.questions = [
			{
				id: 1,
				question: "What is your primary geographical location?"
			},
			{
				id: 2,
				question: "How many years have you been working as a developer?"
			},
			{
				id: 3,
				question: "What is your current job title (or most accurately fits your job description)?"
			},
			{
				id: 4,
				question: "Do you use Postgres for personal projects?"
			},
			{
				id: 5,
				question: "Do you use Postgres at work?"
			},
			{
				id: 6,
				question: "Which best describes the industry your organization is in?"
			},
			{
				id: 7,
				question: "How many total employees are in your organization?"
			},
			{
				id: 8,
				question: "How big is your team?"
			},
			{
				id: 9,
				question: "How would you classify your use case?"
			},
			{
				id: 10,
				question: "Compared to two years ago, is Postgres being used more or less in your organization?"
			},
			{
				id: 11,
				question: "How did you first find out about Postgres?"
			},
			{
				id: 12,
				question: "How long have you been using Postgres?"
			},
			{
				id: 13,
				question: "Have you ever contributed code to Postgres?"
			},
			{
				id: 14,
				question: "What Postgres events do you go to?"
			},
			{
				id: 15,
				question: "How would you rate your first experience with Postgres?"
			},
			{
				id: 16,
				question: "What is the main reason you choose to use Postgres over other options?"
			},
			{
				id: 17,
				question: "How do you deploy Postgres?"
			},
			{
				id: 18,
				question: "What cloud provider(s) do you currently use?"
			},
			{
				id: 19,
				question: "Do you currently use or have you used any of the following NoSQL databases?"
			},
			{
				id: 20,
				question: "What language(s) and/or tool(s) do you most frequently use to query Postgres?"
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
