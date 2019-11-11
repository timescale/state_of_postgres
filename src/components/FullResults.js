import React, { Component, Fragment} from 'react';
import Fade  from 'react-reveal/Fade';
import Reveal from 'react-reveal/Reveal';

class KeyFindings extends Component {

	constructor(props) {
		super(props);

		this.questions = [
			{
				id: "1",
				type: "map",
				question: "What is your primary geographic location?",
				info: "",
				options: [
					{
						id: "1_1",
						title: "EMEA (Europe, Middle East, Africa)",
						percentage: 51
					},
					{
						id: "1_2",
						title: "North America",
						percentage: 28
					},
					{
						id: "1_3",
						title: "South America",
						percentage: 9
					},
					{
						id: "1_4",
						title: "APAC (Asia-Paciﬁc)",
						percentage: 9
					}
				]
			},
			{
				id: "2",
				type: "bar_chart",
				question: "How many years have you been working as a developer?",
				info: "",
				options: [
					{
						id: "2_1",
						title: "5-10 years",
						percentage: 24
					},
					{
						id: "2_2",
						title: "10-15 years",
						percentage: 23
					},
					{
						id: "2_3",
						title: "20+ years",
						percentage: 20
					},
					{
						id: "2_4",
						title: "15-20 years",
						percentage: 16
					},
					{
						id: "2_5",
						title: "0-5 years",
						percentage: 15
					}
				]
			},
			{
				id: "3",
				type: "bar_chart",
				question: "What is your current job title?",
				info: "",
				options: [
					{
						id: "3_1",
						title: "Software developer/engineer",
						percentage: 47
					},
					{
						id: "3_2",
						title: "Software architect",
						percentage: 19
					},
					{
						id: "3_3",
						title: "Database administrator",
						percentage: 10
					},
					{
						id: "3_4",
						title: "Information technologies / systems engineer",
						percentage: 6
					},
					{
						id: "3_5",
						title: "Database administrator",
						percentage: 3
					}
				]
			},
			{
				id: "4",
				type: "bar_chart",
				question: "Do you use Postgres for personal projects?",
				info: "",
				options: [
					{
						id: "4_1",
						title: "Yes",
						percentage: 80
					},
					{
						id: "4_2",
						title: "No",
						percentage: 19
					}
				]
			},
			{
				id: "5",
				type: "bar_chart",
				question: "Do you use Postgres at work?",
				info: "",
				options: [
					{
						id: "5_1",
						title: "Yes",
						percentage: 93
					},
					{
						id: "5_2",
						title: "No",
						percentage: 7
					}
				]
			},
			{
				id: "6",
				type: "bar_chart",
				question: "Which best describes the industry your organization is in?",
				info: "",
				options: [
					{
						id: "6_1",
						title: "Software",
						percentage: 49
					},
					{
						id: "6_2",
						title: "Finance",
						percentage: 8
					},
					{
						id: "6_3",
						title: "Education",
						percentage: 7
					},
					{
						id: "6_4",
						title: "IoT",
						percentage: 6
					},
					{
						id: "6_5",
						title: "Healthcare/ Pharmacuticals",
						percentage: 5
					}
				]
			},
			{
				id: "7",
				type: "bar_chart",
				question: "What is the main reason you choose to use Postgres over other options?",
				info: "",
				options: [
					{
						id: "7_1",
						title: "Reliability",
						percentage: 62
					},
					{
						id: "7_2",
						title: "SQL",
						percentage: 53
					},
					{
						id: "7_3",
						title: "Usability",
						percentage: 49
					},
					{
						id: "7_4",
						title: "Ecosystem",
						percentage: 45
					},
					{
						id: "7_5",
						title: "Other",
						percentage: 18
					}
				]
			},
			{
				id: "8",
				type: "bar_chart",
				question: "How many total employees are in your organization?",
				info: "",
				options: [
					{
						id: "8_1",
						title: "10-15",
						percentage: 30
					},
					{
						id: "8_2",
						title: "0-10",
						percentage: 21
					},
					{
						id: "8_3",
						title: "100-500",
						percentage: 16
					},
					{
						id: "8_4",
						title: "1,000-5,000",
						percentage: 9
					},
					{
						id: "8_5",
						title: "50-100",
						percentage: 8
					}
				]
			},
			{
				id: "9",
				type: "bar_chart",
				question: "How many people work in your team?",
				info: "",
				options: [
					{
						id: "9_1",
						title: "2-10",
						percentage: 72
					},
					{
						id: "9_2",
						title: "10-20",
						percentage: 11
					},
					{
						id: "9_3",
						title: "Just me",
						percentage: 8
					},
					{
						id: "9_4",
						title: "20-50",
						percentage: 5
					},
					{
						id: "9_5",
						title: "50+",
						percentage: 1
					}
				]
			},
			{
				id: "10",
				type: "bar_chart",
				question: "How would you classify your use case?",
				info: "",
				options: [
					{
						id: "10_1",
						title: "Work or colleague",
						percentage: 41
					},
					{
						id: "10_2",
						title: "Technical forum",
						percentage: 15
					},
					{
						id: "10_3",
						title: "Google search",
						percentage: 14
					},
					{
						id: "10_4",
						title: "School",
						percentage: 10
					},
					{
						id: "10_5",
						title: "Postgres community",
						percentage: 10
					}
				]
			},
			{
				id: "11",
				type: "bar_chart",
				question: "How did you first find out about Postgres?",
				info: "(Respondents could pick as many answers as they wanted)",
				options: [
					{
						id: "11_1",
						title: "App development",
						percentage: 69
					},
					{
						id: "11_2",
						title: "Dashboarding",
						percentage: 30
					},
					{
						id: "11_3",
						title: "Monitoring",
						percentage: 29
					},
					{
						id: "11_4",
						title: "Real-time analytics",
						percentage: 29
					},
					{
						id: "11_5",
						title: "DevOps",
						percentage: 27
					}
				]
			},
			{
				id: "12",
				type: "bar_chart",
				question: "Compared to two years ago, is Postgres being used more or less in your organization?",
				info: "",
				options: [
					{
						id: "12_1",
						title: "More",
						percentage: 46
					},
					{
						id: "12_2",
						title: "About the same",
						percentage: 31
					},
					{
						id: "12_3",
						title: "A lot more",
						percentage: 19
					},
					{
						id: "12_4",
						title: "Less",
						percentage: 2
					},
					{
						id: "12_5",
						title: "A lot less",
						percentage: 0
					}
				]
			},
			{
				id: "13",
				type: "bar_chart",
				question: "How long have you been using Postgres?",
				info: "",
				options: [
					{
						id: "13_1",
						title: "2-5 years",
						percentage: 28
					},
					{
						id: "13_2",
						title: "5-10 years",
						percentage: 28
					},
					{
						id: "13_3",
						title: "10-15 years",
						percentage: 16
					},
					{
						id: "13_4",
						title: "1-2 years",
						percentage: 10
					},
					{
						id: "13_5",
						title: "15+ years",
						percentage: 10
					}
				]
			},
			{
				id: "14",
				type: "bar_chart",
				question: "Have you ever contributed code to Postgres?",
				info: "",
				options: [
					{
						id: "14_1",
						title: "No",
						percentage: 90
					},
					{
						id: "14_2",
						title: "Yes, once or twice",
						percentage: 6
					},
					{
						id: "14_3",
						title: "Yes, several times",
						percentage: 3
					}
				]
			},
			{
				id: "15",
				type: "bar_chart",
				question: "What Postgres events do you go to?",
				info: "",
				options: [
					{
						id: "15_1",
						title: "I've never been to a Postgres event",
						percentage: 66
					},
					{
						id: "15_2",
						title: "Meetups involving Postgres",
						percentage: 18
					},
					{
						id: "15_3",
						title: "One or more PGConferences in the EU",
						percentage: 11
					},
					{
						id: "15_4",
						title: "One or more PGConferences in the US",
						percentage: 9
					},
					{
						id: "15_5",
						title: "PostgresOpen",
						percentage: 3
					}
				]
			},
			{
				id: "16",
				type: "bar_chart",
				question: "How would you rate your first experience with Postgres?",
				info: "",
				options: [
					{
						id: "16_1",
						title: "Fairly easy",
						percentage: 44
					},
					{
						id: "16_2",
						title: "Medium",
						percentage: 30
					},
					{
						id: "16_3",
						title: "Extremely easy",
						percentage: 12
					},
					{
						id: "16_4",
						title: "A little difficult",
						percentage: 11
					},
					{
						id: "16_5",
						title: "Very difficult",
						percentage: 1
					}
				]
			},
			{
				id: "17",
				type: "bar_chart",
				question: "How do you deploy Postgres?",
				info: "(Respondents could pick as many answers as they wanted)",
				options: [
					{
						id: "17_1",
						title: "Self-managed in a private data center",
						percentage: 45
					},
					{
						id: "17_2",
						title: "Self-managed on-site",
						percentage: 40
					},
					{
						id: "17_3",
						title: "Managed Postgres service (AWS RDS, Azure Postgres, etc.)",
						percentage: 37
					},
					{
						id: "17_4",
						title: "Self-managed Postgres on a public cloud (AWS, GCP, Azure, etc.)",
						percentage: 33
					},
					{
						id: "17_5",
						title: "Other",
						percentage: 2
					}
				]
			},
			{
				id: "18",
				type: "bar_chart",
				question: "What cloud provider(s) do you currently use?",
				info: "",
				options: [
					{
						id: "18_1",
						title: "AWS",
						percentage: 51
					},
					{
						id: "18_2",
						title: "I do not use a cloud provider",
						percentage: 27
					},
					{
						id: "18_3",
						title: "GCP",
						percentage: 18
					},
					{
						id: "18_4",
						title: "Digital Ocean",
						percentage: 15
					},
					{
						id: "18_5",
						title: "Other",
						percentage: 13
					}
				]
			},
			{
				id: "19",
				type: "bar_chart",
				question: "Do you currently use or have you used any of the following NoSQL databases?",
				info: "",
				options: [
					{
						id: "19_1",
						title: "Redis",
						percentage: 50
					},
					{
						id: "19_2",
						title: "MongoDB",
						percentage: 40
					},
					{
						id: "19_3",
						title: "Elasticsearch",
						percentage: 39
					},
					{
						id: "19_4",
						title: "Never used a NoSQL database",
						percentage: 24
					},
					{
						id: "19_5",
						title: "Cassandra",
						percentage: 12
					}
				]
			},
			{
				id: "20",
				type: "bar_chart",
				question: "What language(s) and/or tool(s) do you most frequently use to query Postgres?",
				info: "(Respondents could pick as many answers as they wanted)",
				options: [
					{
						id: "20_1",
						title: "SQL",
						percentage: 84
					},
					{
						id: "20_2",
						title: "psql/command line",
						percentage: 62
					},
					{
						id: "20_3",
						title: "GUI based editor (PGAdmin/DBeaver/Postico)",
						percentage: 44
					},
					{
						id: "20_4",
						title: "Python",
						percentage: 39
					},
					{
						id: "20_5",
						title: "Java",
						percentage: 22
					}
				]
			},
		];

		this.state = {
			otherOptionsOpened: false
		};

		this.showOtherOptions = this.showOtherOptions.bind(this);
	}

	showOtherOptions() {
		this.setState((prevState) => ({
			otherOptionsOpened: !prevState.otherOptionsOpened
		}));
	}

	render() {
		return (
			<Fragment>
				{
					this.questions.map((question, index) => {
						return (
							<section className={"question-section" + (index === this.questions.length - 1 ? " no-border" : "")} key={question.id}>

								<div className="container">

									<Fade>
										<div className="text-wrap">
											<p className="question">
												<span className="question-number">Question {index + 1}</span>
												{question.question}
											</p>
											{question.info && 
												<p className="info-text">{question.info}</p>
											}
										</div>
									</Fade>

									{question.type === "bar_chart" ? (

										<div className="chart-wrap">
											<ul>
												{
													question.options.map((option, index) => {
														return (
															<li key={option.id}>
																<p className="answer">{option.title}</p>
																<div className="bar-row">
																	<div className="bar" style={{width: 600*option.percentage/100}}>
																		<Reveal effect="animateWidth">
																			<div />
																		</Reveal>
																	</div>
																	<span className="percentage">{option.percentage}%</span>
																</div>
															</li>
														)
													})
												}
											</ul>
										</div>

										) : (

										<div className="map-wrap">
											<div className="map-img-wrap">
												<img src="/img/world-map.png" alt="World map" />
											</div>
											<ul>
												{
													question.options.map((option, index) => {
														return (
															<li key={option.id}>
																<p className="answer">{option.title}</p>
																<span className="percentage">{option.percentage}%</span>
															</li>
														)
													})
												}
											</ul>
										</div>

										)
									}
				
								</div>

							</section>
						)
					})
				}

				<section className="question-section no-border">

					<div className="container">

						<Fade>
							<div className="text-wrap">

								<p className="question">
									<span className="question-number">Question {this.questions.length + 1}</span>
									What is the biggest advantage to working with Postgres?
								</p>
								<p className="info-text">(This was an open-ended question)</p>
							</div>
						</Fade>

						<div className="circles-wrap">

							<div className="circle circle-1 pattern-left">
								<span className="percentage">62%</span> 
								<span className="text">Open Source</span> 
							</div>

							<div className="circle circle-2 pattern-left">
								<span className="percentage">53%</span> 
								<span className="text">Active Community</span> 
							</div>

							<div className="circle circle-3 pattern-left">
								<span className="percentage">45%</span> 
								<span className="text">SQL</span> 
							</div>

							<div className="circle circle-4 pattern-right">
								<span className="percentage">49%</span> 
								<span className="text">Flexibility</span> 
							</div>

							<div className={"circle circle-5 pattern-right other" + (this.state.otherOptionsOpened ? " opened" : "")} onClick={this.showOtherOptions}>
								<div>
									<span className="percentage">18%</span> 
									<span className="text">Other</span> 
								</div>
								<ul>
									<li><span>Option 1</span> <span>10%</span></li>
									<li><span>Option 2</span> <span>5%</span></li>
									<li><span>Option 3</span> <span>3%</span></li>
								</ul>
							</div>
						
						</div>
	
					</div>

				</section>
			</Fragment>
		);
	}
}

export default KeyFindings;