import React, { Component} from 'react';
import * as THREE from 'three';

class HeadAnimation extends Component {

	constructor(props) {
		super(props);
		this.updateDimensions = this.updateDimensions.bind(this);
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions, false);

		this.myCanvasHead = this.headAnimationContainer;

		// Add Scene
		this.scene = new THREE.Scene();
		// Add Camera
		this.camera = new THREE.PerspectiveCamera(40, this.headAnimationContainer.clientWidth / this.headAnimationContainer.clientHeight, 1, 500);
		this.camera.position.z = 200;
		// Add Renderer
		this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: this.myCanvasHead });
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(this.headAnimationContainer.clientWidth, this.headAnimationContainer.clientHeight);
		// Add Material
		this.material = new THREE.MeshBasicMaterial({ color: 0xe0e0ff, wireframe: true });
		// Add Loader
		this.loader = new THREE.BufferGeometryLoader();
		this.loader.load('objects/WaltHeadLo_buffergeometry.json', this.handleLoad);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions, false);
		this.stop();
	}

	handleLoad = (geometry) => {
		this.mesh = new THREE.Mesh(geometry, this.material);
		this.mesh.position.set(0, 10, 0);
		this.scene.add(this.mesh);

		geometry.removeAttribute('normal');
		geometry.removeAttribute('uv');

		this.start();
	}

	animate = () => {
		this.frameId = window.requestAnimationFrame(this.animate);
		this.mesh.rotation.y += 0.01;
		this.renderer.render(this.scene, this.camera);

		console.log("head anim");
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
		this.camera.aspect = this.headAnimationContainer.clientWidth / this.headAnimationContainer.clientHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(this.headAnimationContainer.clientWidth, this.headAnimationContainer.clientHeight);
	}
	
	render() {
		return (
			<section className="animation3d-section">
				<canvas id="myCanvasHead" ref={(headAnimationContainer) => {this.headAnimationContainer = headAnimationContainer}} />
			</section>
		);
	}
}

export default HeadAnimation;
