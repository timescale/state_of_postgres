import React, { Component} from 'react';
import Fade  from 'react-reveal/Fade';

class FLowerVideo extends Component {

	constructor(props) {
		super(props);
		this.playVideo = this.playVideo.bind(this);
		this.loadVidMetaData = this.loadVidMetaData.bind(this);
	}

	componentDidMount() {
		this.videoPlayed = false;
		this.video.addEventListener('loadedmetadata', this.loadVidMetaData, false);
		window.addEventListener("scroll", this.playVideo, false);
	}

	componentWillUnmount() {
		this.video.removeEventListener('loadedmetadata', this.loadedmetadata, false);
		window.removeEventListener("scroll", this.playVideo, false);
	}

	loadVidMetaData = () => {
		this.playVideo();
	}

	playVideo = () => {  
	
		let elHeight = this.videoContainer.clientHeight;
		let elTop = this.videoContainer.offsetTop;
		let elBottom = elTop + 750;

		let windowHeight = window.innerHeight;
		let windowTop = window.pageYOffset;
		let windowBottom = windowTop + windowHeight;


		if(!this.videoPlayed && elTop + (750 / 2) < windowBottom && elBottom > windowTop){
			this.video.play();
			this.videoPlayed = true;
		}
	}

	render() {
		return (
			<section className="section ecosystem-tools" ref={(videoContainer) => {this.videoContainer = videoContainer}}>
				<div className="ecosystem-tools-content">
					<Fade bottom>
						<div className="video-wrap" >
							<video id="video" tabIndex="0" muted="muted" autobuffer="autobuffer" preload="preload" ref={(video) => {this.video = video}}>
								<source type="video/mp4" src="/videos/bloom.mov" />
							</video>
						</div>
					</Fade>
					<div className="text-wrap">
						<Fade bottom>
							<div className="text">
								<p className="info"><span className="color-secondary">Only</span> 9% have contributed code to Postgres...</p>
								<p className="description">this is actually an impressive amount considering the hundreds of thousands of people using Postgres worldwide</p>
							</div>
						</Fade>
					</div>
				</div>
			</section>
		);
	}
}

export default FLowerVideo;
