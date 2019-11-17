import React, { Component} from 'react';
// import Reveal from 'react-reveal/Reveal';
// import AOS from 'aos';
import VisibilitySensor from 'react-visibility-sensor'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import drone from './models/drone.glb'
import phone from './models/phone.glb'
import flowers from './models/flowers.glb'
import teamwork from './models/flowers.glb'
import swimming from './models/swimming_full.glb'
import flame from './models/flame.glb'
import tail from './models/tail_wag.glb'
import circuit from './models/circuit.glb'
import { OrbitControls } from './models/orbit.js';

class Model extends Component {
    constructor(props) {
        super(props);
    }

    onWindowResize() {
        if (this.camera && this.renderer) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize( window.innerWidth, window.innerHeight );
        }
    }

    componentDidMount() {
        const loader = new GLTFLoader();
        loader.load(this.state.file, gltf => {
            this.delta = 0;
            this.gltf = gltf;
            this.clock = new THREE.Clock();
            this.get_scene();
            this.get_camera();
            this.get_mesh();
            this.change_material();
            this.get_render();
            this.get_mixer();
            // this.loader();
            this.get_light();
            window.addEventListener( 'resize', () => {this.onWindowResize()}, false );
            // this.renderer.render(this.scene, this.camera);
        })
    }
    get_mesh() {
        this.mesh = this.scene.children[0].children[0]
    }

    change_material() {
        this.material = new THREE.MeshBasicMaterial( {
            color: 0x818181,
            wireframe: true
        } );
    };

    activate_animation = (isVisible) => {
        if (isVisible) {
            this.show_mesh()
        } else {
            this.hide_mesh();
        }
    };

    get_scene() {
        this.scene = new THREE.Scene();
        if (this.props.black) {
            this.scene.background = new THREE.Color(0x080808);
        } else {
            this.scene.background = new THREE.Color(0xfbfbfb);
        }
        this.scene.add(this.gltf.scene)
    };

    get_render() {
        //RENDERER
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.el,
            powerPreference: "high-performance",
        });
        this.renderer.setClearColor(0x000000);
        // this.renderer.setSize(window.innerWidth/2, window.innerHeight/2, true);
        this.renderer.setSize(window.innerWidth/2, window.innerHeight/2, true);
        this.renderer.setPixelRatio(2)
        this.renderer.render(this.scene, this.camera);

    };
    get_mixer() {
        if (this.gltf.animations.length === 0) {
            return
        }
        this.mixer = new THREE.AnimationMixer(this.scene);
        this.action = this.mixer.clipAction(this.gltf.animations[0]);
        if (this.state.loopOnce) {
            this.action.setLoop( THREE.LoopOnce );
            this.action.clampWhenFinished = true;
        }

        this.action.play();
    };
    get_camera() {
        let camera = this.gltf.cameras;
        if (camera.length > 0) {
            this.camera = camera[0]
        } else {
            this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        }


        // let controls = new OrbitControls(this.camera, this.el );
        // controls.maxPolarAngle = Math.PI * 0.9;
        //
        // controls.update();
    };

    get_light() {
        this.light = new THREE.DirectionalLight( 0xffffff, 1 );
        this.scene.add( this.light );
    }

    loader() {
        this.geometries.forEach(geometry => {
            this.mesh = new THREE.Mesh( geometry, this.material );
            this.scene.add( this.mesh );
            this.mesh.position.z = -10;
        });

    };

    animate() {
        if (this.gltf === undefined) {
            return;
        }
        if (this.renderer === undefined) {
            return;
        }
        this.animation_id = requestAnimationFrame(()=>this.animate());
        this.delta++;
        if (this.mixer) {
            // this.mesh.rotation.y += 0.01;
            this.mixer.update(this.clock.getDelta());
            //animation mesh
            // mesh.morphTargetInfluences[ 0 ] = Math.sin(delta) * 20.0;
        }
        // this.camera.aspect = 1;
        // this.camera.updateProjectionMatrix();
        // this.renderer.setSize( 850, 850, 2 );
        this.renderer.render(this.scene, this.camera);
        if (this.stats) {
            this.stats.update();
        }
    };

    hide_mesh() {
        if (this.animation_id) {
            cancelAnimationFrame( this.animation_id );
            this.animation_id = null;
        }

    };

    show_mesh() {
        if (!this.animation_id) {
            this.animate()
        }
    };


    render() {
        return (
            <VisibilitySensor partialVisibility={true} onChange={this.activate_animation} minTopValue={this.minTopValue || 0}>
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
}

class Phone extends Drone {
    constructor(props) {
        super(props);
        this.state = {
            file: phone,
            loopOnce: true
        }
    }
    loader = () => {
        this.scene.children[0].children.forEach(mesh => {
            mesh.material = this.material
        });
        this.scene.children[0].children[0].children.forEach(mesh => {
            mesh.material = this.material
        })
    };
}

class Flowers extends Model {
    constructor(props) {
        super(props);
        this.minTopValue = 550;
        this.state = {
            file: flowers,
            loopOnce: true,
        }
    }
}

class Teamwork extends Model {
    constructor(props) {
        super(props);
        this.state = {file: teamwork}
    }
}

class Swimming extends Model {
    constructor(props) {
        super(props);
        this.state = {file: swimming}
    }
    get_render() {
        super.get_render();
        this.renderer.antialias = true;
        this.renderer.autoClear = false;
    }

    get_camera() {
        this.camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 20000 );
        this.camera.position.set( 30, -1, 600 );
        // let controls = new OrbitControls(this.camera, this.el );
        // controls.maxPolarAngle = Math.PI * 0.9;
        // controls.target.set( 0, 10, 0 );
        // controls.minDistance = 40.0;
        // controls.maxDistance = 200.0;
        // controls.update();
    };
    get_scene() {
        this.gltf.scene.position.y = -150;
        super.get_scene();
        this.scene.matrixAutoUpdate = false;
        this.add_water();
    }

    add_water() {

    }
    animate() {
        // this.water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
        super.animate();
    }
}


class Flame extends Model {
    constructor(props) {
        super(props);
        this.state = {file: flame}
    }
}


class Tail extends Model {
    constructor(props) {
        super(props);
        this.state = {file: tail}
    }
}

class Circuit extends Model {
    constructor(props) {
        super(props);
        this.state = {file: circuit}
    }
}

export {Model, Drone, Phone, Flowers, Teamwork, Swimming, Flame, Tail, Circuit};