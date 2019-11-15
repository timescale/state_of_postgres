import React, { Component, Fragment} from 'react';
import Fade  from 'react-reveal/Fade';
import Reveal from 'react-reveal/Reveal';
import { Link, Scroll } from 'react-scroll'

class KeyFindings extends Component {

	constructor(props) {
		super(props);
		this.question_list = React.createRef();

		this.questions = [
			{
				id: "1",
				type: "map",
				name: "Geography",
				question: "What is your primary geographic location?",
				info: null,
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
				name: "Career",
				question: "How many years have you been working as a developer?",
				info: null,
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
				name: "Job titles",
				question: "What is your current job title?",
				info: null,
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
				name: "Personal projects",
				question: "Do you use Postgres for personal projects?",
				info: null,
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
				name: "Work",
				question: "Do you use Postgres at work?",
				info: null,
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
				name: "Industries",
				question: "Which best describes the industry your organization is in?",
				info: null,
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
				name: "Motivation",
				question: "What is the main reason you choose to use Postgres over other options?",
				info: null,
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
				name: "Organizations",
				question: "How many total employees are in your organization?",
				info: null,
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
				name: "Teams",
				question: "How many people work in your team?",
				info: null,
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
				name: "Use cases",
				question: "How would you classify your use case?",
				info: null,
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
				name: "Discovery",
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
				name: "Usage",
				question: "Compared to two years ago, is Postgres being used more or less in your organization?",
				info: null,
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
				name: "How long",
				question: "How long have you been using Postgres?",
				info: null,
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
				name: "Contributions",
				question: "Have you ever contributed code to Postgres?",
				info: null,
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
				name: "Events",
				question: "What Postgres events do you go to?",
				info: null,
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
				name: "First time",
				question: "How would you rate your first experience with Postgres?",
				info: null,
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
				name: "Deploy",
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
				name: "Cloud",
				question: "What cloud provider(s) do you currently use?",
				info: null,
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
				name: "NoSQL",
				question: "Do you currently use or have you used any of the following NoSQL databases?",
				info: null,
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
				name: "Other tools",
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
			{
				id: "21",
				type: "circle_chart",
				name: "Advantages",
				question: "What is the biggest advantage to working with Postgres?",
				info: "(This was an open-ended question)",
				options: [
					{
						id: "21_1",
						title: "Open Source",
						type: "single_option",
						backgroundPattern: "pattern-left",
						percentage: 62
					},
					{
						id: "21_2",
						title: "Active Community",
						type: "single_option",
						backgroundPattern: "pattern-left",
						percentage: 53
					},
					{
						id: "21_3",
						title: "SQL",
						type: "single_option",
						backgroundPattern: "pattern-left",
						percentage: 45
					},
					{
						id: "21_4",
						title: "Flexibility",
						type: "single_option",
						backgroundPattern: "pattern-right",
						percentage: 49
					},
					{
						id: "21_5",
						title: "Other",
						type: "multiple_options",
						backgroundPattern: "pattern-right",
						percentage: 18,
						options: [
							{	
								id: "21_5_1",
								title: "Option 1",
								percentage: 10
							},
							{
								id: "21_5_2",
								title: "Option 2",
								percentage: 5
							},
							{
								id: "21_5_3",
								title: "Option 3",
								percentage: 3
							}
						]
					}
				]
			},
		];

		this.state = {
			otherOptionsOpened: false
		};

		this.toggleOtherOptions = this.toggleOtherOptions.bind(this);
		this.handleSetActive = this.handleSetActive.bind(this);
	}
    componentDidMount() {
	    // move question-list because it doesn't work with the smooth scrolling
        document.querySelector('.main-wrap').appendChild(document.querySelector('.question-list'))
    }
	toggleOtherOptions() {
		this.setState((prevState) => ({
			otherOptionsOpened: !prevState.otherOptionsOpened
		}));
	}

	handleSetActive() {
		// console.log("setActive");
		// SmoothScroll(null,120,19);
		// SmoothScroll(document,120,19);
	}

	render() {
		return (
			<Fragment>
				{
					this.questions.map((question, index) => {
						return (
							<section className="question-section" key={question.id} name={'question' + question.id}>

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

									{
										question.type === "bar_chart" ? (
											
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

										) : question.type === "map" ? (
											
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

										) : (
										
										<div className="circles-wrap">
											{
												question.options.map((option, index) => {
													return (
														option.type === "multiple_options" ? (

														<div key={option.id} className={"circle circle-" + (index + 1) + " " + option.backgroundPattern + (this.state.otherOptionsOpened ? " opened" : "") + (option.type ===  "multiple_options" ? " other" : "")} onClick={this.toggleOtherOptions}>
															<div>
																<span className="percentage">{option.percentage}%</span> 
																<span className="text">{option.title}</span> 
															</div>
															<ul>
																{
																	option.options.map((option, index) => {
																		return <li key={option.id}><span>{option.title}</span> <span>{option.percentage}%</span></li>
																	})
																}
														
															</ul>
														</div>

														) : (

														<div key={option.id} className={"circle circle-" + (index + 1) + " " + option.backgroundPattern}>
															<span className="percentage">{option.percentage}%</span> 
															<span className="text">{option.title}</span> 
														</div>

														)
													)
												})
											}
										</div>

										)
									}
				
								</div>

							</section>
						)
					})
				}

				<div ref={this.question_list} className="question-list">
					<ul>
						{
							this.questions.map((question, index) => {
								return (
									<li key={question.name}>
										<Link 
											to={'question' + question.id}
											activeClass="active"
											spy={true} 
											smooth={true} 
											offset={-20} 
											onSetActive={this.handleSetActive}
											duration={500}>
												{question.name}
										</Link>
									</li>
								)
							})
						}
					</ul>
				</div>

			</Fragment>
		);
	}
}

export default KeyFindings;