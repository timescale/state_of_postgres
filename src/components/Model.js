import React, { Component} from 'react';
// import Reveal from 'react-reveal/Reveal';
// import AOS from 'aos';
import VisibilitySensor from 'react-visibility-sensor'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import drone from './models/drone.glb'
import phone from './models/phone.glb'

class Model extends Component {
    constructor(props) {
		super(props);
	}

    componentDidMount() {
        const loader = new GLTFLoader();
        loader.load(this.state.file, gltf => {
            this.gltf = gltf;
            // this.geometries = [];
            // gltf.scene.children.forEach(child => {
            //     this.geometries.push(child.geometry)
            // });
            // this.geometries.push(gltf.scene.children[0].children[0].geometry)
            this.scene = gltf.scene;
            this.scene.background = new THREE.Color(0xfbfbfb);
            this.material = new THREE.MeshBasicMaterial( {
                color: 0x818181,
                wireframe: true
            } );
            this.camera = this.scene.children[1];
            this.scene.children[0].children.forEach(mesh => {
                mesh.material = this.material;
            })
            this.renderer();
            // this.camera();
            // this.scene();
            this.loader();
            this.lights();
            this.animate();
        })
    }

    activate_animation = (isVisible) => {
        if (isVisible) {
            this.show_mesh()
        } else {
            this.hide_mesh();
        }
    };

    scene = () => {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xfbfbfb);
    };

    renderer = () => {
        //RENDERER
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.el,
            powerPreference: "low-power",
        });
        this.renderer.setClearColor(0x000000);
        this.renderer.setSize(window.innerWidth/2, window.innerHeight/2, true);
        this.renderer.setPixelRatio(2)

    };

    camera = () => {
        this.camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000 );
    };

    lights = () => {
        let light = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(light);

        let light2 = new THREE.PointLight(0xffffff, 0.5);
        this.scene.add(light2);

        if (this.add_lights) {
            this.scene.add(this.add_lights);
        }
    };

    loader = () => {
        this.geometries.forEach(geometry => {
            this.mesh = new THREE.Mesh( geometry, this.material );
            this.scene.add( this.mesh );
            this.mesh.position.z = -10;
        });

    };

    lines = () => {
        let geometry = this.mesh.geometry;
        let edges = new THREE.EdgesGeometry( geometry );
        let line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
        this.scene.add( line );
    };

    animate = () =>{
        if (this.renderer.render === undefined) {
            return
        }
        this.animation_id = requestAnimationFrame(()=>this.animate());
        this.delta++;
        if (this.mesh) {
            this.mesh.rotation.y += 0.01;
            //animation mesh
            // mesh.morphTargetInfluences[ 0 ] = Math.sin(delta) * 20.0;
        }
        this.renderer.render(this.scene, this.camera);
        if (this.stats) {
            this.stats.update();
        }
    };

    hide_mesh = () => {
        if (this.animation_id) {
            cancelAnimationFrame( this.animation_id );
            this.animation_id = null;
        }

    };

    show_mesh = () => {
        if (!this.animation_id) {
            this.animate()
        }
    };


    render() {
        return (
            <VisibilitySensor partialVisibility={true} onChange={this.activate_animation}>
                <canvas ref={ref => (this.el = ref)} />
            </VisibilitySensor>
        )

    }
}

class Drone extends Model {
    constructor(props) {
		super(props);
		this.state = {file: drone}
	}
    scene = () => {
        this.scene = this.gltf.scene;
        this.scene.background = new THREE.Color(0xfbfbfb);
    };
    camera = () => {
        this.camera = this.scene.children[1];
    };
    lights = () => {};
    loader = () => {
        this.scene.children[0].children.forEach(mesh => {
            mesh.material = this.material;
        })
    };
}

class Phone extends Drone {
    constructor(props) {
		super(props);
		this.state = {file: phone}
	}
	loader = () => {
        this.scene.children[0].children.forEach(mesh => {
            mesh.material = this.material
        })
        this.scene.children[0].children[0].children.forEach(mesh => {
            mesh.material = this.material
        })
    };
}

export {Model, Drone, Phone};