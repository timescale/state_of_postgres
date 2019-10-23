import React, { Component} from 'react';
import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
import Fade  from 'react-reveal/Fade';

class ElephantAnimation extends Component {

	constructor(props) {
		super(props);
		this.updateDimensions = this.updateDimensions.bind(this);
		this.startSpinAnimation = this.startSpinAnimation.bind(this);
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions, false);
		window.addEventListener("scroll", this.startSpinAnimation, false);

		this.myCanvasElephant = this.elementAnimationContainer;

		// Add Scene
		this.scene = new THREE.Scene();
		// Add Camera
		this.camera = new THREE.PerspectiveCamera(25, this.elementAnimationContainer.clientWidth / this.elementAnimationContainer.clientHeight,  0.1, 1000);
		this.camera.position.z = 4;
		// Add Renderer
		this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: this.myCanvasElephant });
		this.renderer.setClearColor('#000000');
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(this.elementAnimationContainer.clientWidth, this.elementAnimationContainer.clientHeight);
		// Add Lights
		this.light = new THREE.AmbientLight(0xffffff, 0.5);
		this.scene.add(this.light);
		this.light2 = new THREE.PointLight(0xffffff, 0.5);
		this.scene.add(this.light2);
		// Add Loader
		this.loader = new GLTFLoader();
		this.loader.load('objects/elephant.glb', this.handleLoad);

		this.startSpinAnimation();
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions, false);
		window.removeEventListener("scroll", this.startSpinAnimation, false);
		this.stop();
	}

	handleLoad = (gltf) => {
		this.mesh = gltf.scene;
		this.mesh.children[0].material = new THREE.MeshLambertMaterial();
		this.scene.add(this.mesh);
		this.mesh.position.z = -10;
		this.mesh.rotation.y = 1.5;
		this.renderer.render(this.scene, this.camera);
	}

	animate = () => {
		if (this.mesh) {
			this.mesh.rotation.y += 0.01;
		}
		this.renderer.render(this.scene, this.camera);
		this.frameId = window.requestAnimationFrame(this.animate);

		console.log("elephant anim");
	}

	start = () => {
		if (!this.frameId) {
			this.frameId = requestAnimationFrame(this.animate);
		}
	}

	stop = () => {
		cancelAnimationFrame(this.frameId);
	}

	updateDimensions = () => {
		this.camera.aspect = this.elementAnimationContainer.clientWidth / this.elementAnimationContainer.clientHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(this.elementAnimationContainer.clientWidth, this.elementAnimationContainer.clientHeight);
	}

	startSpinAnimation = () => {
		
		let elHeight = this.elementAnimationContainer.parentNode.clientHeight;
		let elTop = this.elementAnimationContainer.parentNode.offsetTop;
		let elBottom = elTop + elHeight;

		let windowHeight = window.innerHeight;
		let windowTop = window.pageYOffset;
		let windowBottom = windowTop + windowHeight;

		if(elTop + (elHeight / 2) < windowBottom && elBottom > windowTop){
			this.start();
			this.frameId = null;
		}
		else{
			this.stop();
		}
	}

	render() {
		return (
			<section className="animation3d-section">
				<Fade bottom>
					<div>
						<canvas id="myCanvasElephant" ref={(elementAnimationContainer) => {this.elementAnimationContainer = elementAnimationContainer}} />
					</div>
				</Fade>
			</section>
		);
	}
}

export default ElephantAnimation;
