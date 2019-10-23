import React, { Component} from 'react';
import Fade  from 'react-reveal/Fade';

class FLowerVideo extends Component {

	constructor(props) {
		super(props);
		this.scrollPlay = this.scrollPlay.bind(this);
		this.loadVidMetaData = this.loadVidMetaData.bind(this);
	}

	componentDidMount() {
		this.frameNumber = 0;
		this.video.addEventListener('loadedmetadata', this.loadVidMetaData, false);
	}

	componentWillUnmount() {
		this.stop();
	}

	loadVidMetaData = () => {
		window.requestAnimationFrame(this.scrollPlay);
	}

	scrollPlay = () => {  
		let elHeight = this.videoContainer.clientHeight;
		let elTop = this.videoContainer.offsetTop;
		let elBottom = elTop + elHeight;

		let windowHeight = window.innerHeight;
		let windowTop = window.pageYOffset;
		let windowBottom = windowTop + windowHeight;

		let scrollPixels = 0;

		if(elTop < windowBottom - elHeight/1.5 && elBottom > windowTop){
			scrollPixels = windowBottom - elTop;
			// this.frameNumber = this.video.duration/1.7 / (windowHeight / (scrollPixels ));
			this.frameNumber = this.video.duration * ((scrollPixels - elHeight/1.5) / (windowHeight + elHeight - elHeight/1.5)) ;
		}
		else{
			scrollPixels = 0;
			if(elTop > windowTop){
				this.frameNumber = 0;
			}
			else {
				this.frameNumber = this.video.duration;
			}
		}

		this.video.currentTime = this.frameNumber;
		this.frameId = window.requestAnimationFrame(this.scrollPlay);
		
		// console.log("frameNumber", this.frameNumber);
	}

	stop = () => {
		cancelAnimationFrame(this.frameId);
	}

	render() {
		return (
			<section className="section ecosystem-tools" ref={(videoContainer) => {this.videoContainer = videoContainer}}>
				<div className="ecosystem-tools-content">
					<Fade bottom>
						<div className="video-wrap" >
							<video id="video" tabIndex="0" autobuffer="autobuffer" preload="preload" ref={(video) => {this.video = video}}>
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
