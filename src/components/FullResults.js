import React, { Component } from 'react';
import Fade  from 'react-reveal/Fade';
import Reveal from 'react-reveal/Reveal';
import { Link } from 'react-scroll'
import ModalComponent from "./shared/Modal";
import questions from "./shared/Questions";

class KeyFindings extends Component {

    constructor(props) {
        super(props);

        this.questions = questions;

        this.state = {
            otherOptionsOpened: false,
            methodologyModalOpened: false,
            downloadModalOpened: false
        };

        this.toggleOtherOptions = this.toggleOtherOptions.bind(this);
        this.openMethodologyModal = this.openMethodologyModal.bind(this);
        this.closeMethodologyModal = this.closeMethodologyModal.bind(this);
        this.openDownloadModal = this.openDownloadModal.bind(this);
        this.closeDownloadModal = this.closeDownloadModal.bind(this);
    }

    componentDidMount() {
        // move question-list because it doesn't work with the smooth scrolling
        this.navBarNode = document.querySelector('.question-list');
        let bodyNode = document.querySelector('body');
        this.navBarNode.removeAttribute('hidden');
        let has_node = bodyNode.childNodes.forEach(child => {
            if (child.classList && child.classList.contains('question-list')) {
                return true
            }
        });
        if (!has_node) {
            bodyNode.appendChild(this.navBarNode);
        }
    }

    componentWillUnmount() {
        this.navBarNode.setAttribute('hidden', true)
    }

    toggleOtherOptions() {
        this.setState((prevState) => ({
            otherOptionsOpened: !prevState.otherOptionsOpened
        }));
    }

    openMethodologyModal() {
        this.setState({ methodologyModalOpened: true });
    }
     
    closeMethodologyModal() {
        this.setState({ methodologyModalOpened: false });
    }

    openDownloadModal() {
        this.setState({ downloadModalOpened: true });
    }
     
    closeDownloadModal() {
        this.setState({ downloadModalOpened: false });
    }

    render() {
        const { methodologyModalOpened, downloadModalOpened } = this.state;

        return (
            <>

                <div id="full_page_header">
                    <div>The full results from our survey are below.</div>
                    <div>You can also <a onClick={this.openDownloadModal}>download</a> the raw data or read about our <a onClick={this.openMethodologyModal}>methodology</a>.</div>
                </div>

                <ModalComponent
                  open={downloadModalOpened}
                  onClose={this.closeDownloadModal}
                >
                    <div className="download-modal">
                        <h2 className="modal-title">2019 State of Postgres Survey Results</h2>
                        <a href="/files/state_of_postgres_2019.xlsx" target="_blank" download className="link link-primary">Download excel data</a>
                    </div>
                </ModalComponent>

                <ModalComponent
                  open={methodologyModalOpened}
                  onClose={this.closeMethodologyModal}
                >
                    <div className="methodology-modal">
                        <h2 className="modal-title">Survey Methodology</h2>
                        <p><a href="https://www.timescale.com/?utm_source=state-of-postgres&utm_medium=website&utm_campaign=state-of-postgres2019&utm_content=methodology" target="_blank" className="link link-primary">Timescale</a>, the company behind the leading open-source time-series SQL database TimescaleDB, created and distributed the State of Postgres 2019 survey. The survey ran  for six weeks, between August 9, 2019 through September 20, 2019.</p>
                        <p>During that time, 500 Postgres users provided responses, which Timescale aggregated to generate this report. Please note that some of the percentages are rounded to the nearest full number for simplicity.</p>
                        <p>This is the inaugural State of Postgres report. The Timescale team will continue to issue the survey and report annually, as well as develop vendor-agnostic resources for the Postgres community as a whole*.</p>
                        <p>*Past projects include <a href="https://postgrescheatsheet.com/?utm_source=state-of-postgres&utm_medium=website&utm_campaign=state-of-postgres2019&utm_content=methodology" target="_blank" className="link link-primary">Postgres Cheatsheet</a>, a quick reference guide compilation of essential Postgres and psql commands with click-to-copy functionality. And <a href="https://pgschema.com/?utm_source=state-of-postgres&utm_medium=website&utm_campaign=state-of-postgres2019&utm_content=methodology" target="_blank" className="link link-primary">PG Schema</a>, an easy-to-use tool that helps you generate a schema for PostgreSQL and TimescaleDB.</p>
                    </div>
                </ModalComponent>

                <div className="full-results">
                    {
                        this.questions.map((question, index) => {
                            return (
                                <section className="question-section" key={question.id} name={'question' + question.id}>

                                    <div className="container">

                                        <Fade>
                                            <div className="text-wrap">
                                                <p className="question">
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
                                                                        <div className="answer">{option.title}</div>
                                                                        <div className="bar-row">
                                                                            <div className="bar" style={{width: 550*option.percentage/100}}>
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

                    <div className="question-list">
                        <ul>
                            {
                                this.questions.map((question, index) => {
                                    return (
                                        <li key={question.name}>
                                            <Link
                                                to={'question' + question.id}
                                                activeClass="active"
                                                spy={true}
                                                offset={50}
                                                duration={500}>
                                                {question.name}
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>

            </>
        );
    }
}

export default KeyFindings;