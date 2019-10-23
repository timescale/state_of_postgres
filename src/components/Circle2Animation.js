import React, { Component} from 'react';
import * as THREE from 'three';

class Circle2Animation extends Component {

	constructor(props) {
		super(props);
		this.updateDimensions = this.updateDimensions.bind(this);
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions, false);

		this.myCanvasCircle2 = this.circleAnimationContainer;

		// Add Scene
		this.scene = new THREE.Scene();
		// Add Camera
		this.camera = new THREE.PerspectiveCamera(80, this.circleAnimationContainer.clientWidth / this.circleAnimationContainer.clientHeight, 1, 500);
		this.camera.position.z = 200;
		// Add Renderer
		this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: this.myCanvasCircle2 });
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(this.circleAnimationContainer.clientWidth, this.circleAnimationContainer.clientHeight);
		// Add Material
		this.material = new THREE.MeshNormalMaterial({ flatShading: true });
		// Add Geometry
		this.geometry = new THREE.SphereBufferGeometry(70, 32, 16);
		this.addMesh(this.geometry, this.material);
		// Add Lights
		this.scene.add(new THREE.AmbientLight(0x111111));
		this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.125);
		this.directionalLight.position.x = Math.random() - 0.5;
		this.directionalLight.position.y = Math.random() - 0.5;
		this.directionalLight.position.z = Math.random() - 0.5;
		this.directionalLight.position.normalize();
		this.scene.add(this.directionalLight);

		this.start();
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions, false);
		this.stop();
	}

	addMesh = (geometry, material) => {
		let mesh = new THREE.Mesh(geometry, material);
		this.object = mesh;
		this.scene.add(mesh);
	}

	handleLoad = () => {
		this.object.rotation.x += 0.01;
		this.object.rotation.y += 0.005;
		this.renderer.render(this.scene, this.camera);
	}

	animate = () => {
		this.frameId = window.requestAnimationFrame(this.animate);
		this.handleLoad();

		console.log("circle 2 anim");
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
		this.camera.aspect = this.circleAnimationContainer.clientWidth / this.circleAnimationContainer.clientHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(this.circleAnimationContainer.clientWidth, this.circleAnimationContainer.clientHeight);
	}
	
	render() {
		return (
			<section className="animation3d-section">
				<canvas id="myCanvasCircle2" ref={(circleAnimationContainer) => {this.circleAnimationContainer = circleAnimationContainer}} />
			</section>
		);
	}
}

export default Circle2Animation;
