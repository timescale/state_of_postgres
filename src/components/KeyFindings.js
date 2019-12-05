import React, { Component, Fragment} from 'react';
import Fade  from 'react-reveal/Fade';
import VisibilitySensor from 'react-visibility-sensor'
import { Container, Row, Col } from 'react-bootstrap'
import { Section, QuoteSection, WaterSection } from "./Section";
import WaterText from "./WaterText";
import { EmailForm } from "./Forms"
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
} from 'react-share';
import {
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
} from 'react-share';


class KeyFindings extends Component {

    constructor(props) {
        super(props);
        this.change_color_section = React.createRef();
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        this.change_background_white(true)
    }

    scroll_direction() {
        var lastScrollTop = 0;
// element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
        window.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
            var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
            if (st > lastScrollTop){
                this.scroll_direction = 'down'
            } else {
                this.scroll_direction = 'up'
            }
            lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        }, false);
    }

    change_background(is_visible, color) {
        let colors = ['white', 'black', 'blue'];
        if (!this.change_color_section.current) {
            return
        }
        if(is_visible) {
            colors.forEach(col => {
                this.change_color_section.current.classList.remove(col);
            });
            this.change_color_section.current.classList.add(color);
        } else {
            this.change_color_section.current.classList.remove(color);
        }
        console.log(color);
        let classes = this.change_color_section.current.classList.toString().replace('container-fluid');
        this.props.change_nav_background(classes);
    };

    change_background_black = (is_visible) => {
        this.change_background(is_visible, 'black')
    };

    change_background_blue = (is_visible) => {
        this.change_background(is_visible, 'blue')
    };

    change_background_white = (is_visible) => {
        this.change_background(is_visible, 'white')
    };

    render() {
        const share_url = "https://stateofpostgres.com";
        return (
            <Fragment>
                <div id="key">
                    <Container fluid={true}  className="transition" ref={this.change_color_section}>
                        {/* Intro - Start */}
                        <VisibilitySensor minTopValue={400} partialVisibility={true} scrollCheck={true}
                                          onChange={this.change_background_white}>
                            <div>
                                <section className="section intro">
                                    <Container>
                                        <div className="intro-content justify-content-center align-items-center align-content-center">
                                            <div className="d-flex animated fadeIn">
                                                <h1>
                                                    state
                                                    <span>of</span>
                                                    postgres
                                                </h1>
                                            </div>
                                            <div className="d-flex animated fadeIn">
                                                <p className="subtitle">We asked 500 members of the Postgres community how they use the database in 2019. Here's what they said.</p>
                                            </div>
                                        </div>
                                    </Container>
                                </section>
                                {/* Intro - End */}

                                <Section info={'26% of respondents have been using Postgres for more than 10 years.'}
                                         description={'The Postgres community is committed.'} reverse={true}
                                         model="Teamwork"/>

                                <Section info={'66% said they’re using Postgres more now than they have in the past.'}
                                         description={"Postgres' popularity is sky-high."} reverse={false}
                                         model="Drone"/>

                                <Section info={'Postgres isn’t just for work. Over 80% of respondents use it for personal projects, too.'}
                                         description={'Like running a demo on a Raspberry Pi.'} reverse={true}
                                         model="Circuit"/>

                                <Section info={'70% of respondents use Postgres for app development.'}
                                         description={'And 30% report using it for ' +
                                         'real-time analytics, dashboarding, and monitoring.'}
                                         reverse={false}
                                         model="Phone"/>

                                <Section info={'Only 9% have contributed code to Postgres...'}
                                         description={'Which is actually an impressive number. Many open source projects fail to generate enough interest to remain sustainable.'} reverse={true} minTopValue={200} partialVisibility={true} show_info={true}
                                         model="Flowers"/>
                            </div>
                        </VisibilitySensor>

                        {/* 11-13 title Technology - Start */}
                        <div id="water">
                            <section className="section text-section">
                                <div className="container">
                                    <div className="text-wrap">
                                        <Fade bottom>
                                            <p className="info info-title">How they deploy</p>
                                        </Fade>
                                    </div>
                                </div>
                            </section>
                            {/* Technology - End */}
                            <div className="blue transition">
                                <WaterSection
                                    info={'The most common way to deploy Postgres (46%) is in a self-managed data center.'}
                                    model="Swimming" />
                                <Row id="water-texts">
                                    <Col sm={12} md={4}>
                                        <WaterText number="46">
                                            deploy Postgres in a <br /> self-managed data center.
                                        </WaterText>
                                    </Col>
                                    <Col sm={12} md={4}>
                                        <WaterText number="51">
                                            deploy Postgres <br /> with AWS.
                                        </WaterText>
                                    </Col>
                                    <Col sm={12} md={4}>
                                        <WaterText number="18">
                                            deploy Postgres <br /> with GCP.
                                        </WaterText>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <VisibilitySensor minTopValue={400} partialVisibility={true} scrollCheck={true}
                                          onChange={this.change_background_black}>
                            <div>
                                <section className="section text-section blue transition" id="quote">
                                    <div className="container">

                                        <div className="text-wrap">
                                            <Fade bottom>
                                                <p className="info info-title">What do folks think about NoSQL?</p>
                                            </Fade>
                                        </div>

                                    </div>
                                </section>

                                <QuoteSection number={9} text={'If a project was using a NoSQL database, I would fire the entire team, burn the code base, and start over.'}
                                              name={'— Anonymous'} reverse={false}
                                              model="Flame"/>

                                <QuoteSection number={10} text={'I never used it because I was smart enough to smell the NoSQL bullsh*t early on.'}
                                              name={'— Anonymous'} reverse={true}
                                              model="Tail"/>

                                <QuoteSection number={11} text={'I used to work with a guy who liked to say MySQL is a TOY database. I concur; probably throw MongoDB in there.'}
                                              name={'— Anonymous'} reverse={false}
                                              model="Toyball" />


                                <Container id="footer">
                                    <EmailForm/>
                                    <div id="share-div">
                                        <FacebookShareButton
                                            quote="Check out the State of Postgres 2019 Report - developed with ❤️ by @timescaledb:"
                                            hashtag="#stateofpostgres2019"
                                            url={share_url}
                                        ><FacebookIcon round size={32}/></FacebookShareButton>
                                        <TwitterShareButton
                                            title="Check out the State of Postgres 2019 Report - developed with ❤️ by @timescaledb:"
                                            hashtags={['stateofpostgres2019']}
                                            url={share_url}
                                        ><TwitterIcon round size={32}/></TwitterShareButton>
                                        <LinkedinShareButton url={share_url}><LinkedinIcon round size={32}/></LinkedinShareButton>
                                    </div>
                                </Container>
                            </div>
                        </VisibilitySensor>
                    </Container>
                </div>
            </Fragment>
        );
    }
}

export default KeyFindings;
