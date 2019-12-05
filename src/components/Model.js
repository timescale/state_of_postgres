import React, {Component} from 'react';
import {ProgressBar} from 'react-bootstrap'
import VisibilitySensor from 'react-visibility-sensor'
import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

import {Water} from './models/Water.js';
import water_texture from './models/waternormals.jpg'
import Queue from 'js-queue'

let queue = new Queue();

class Model extends Component {
    state = {
        now: 0
    };
    initial_visible = false;
    constructor(props) {
        super(props);
        this.el = React.createRef();
        this.number = React.createRef();
        this.info = React.createRef();
        this.description = React.createRef();
        this.onWindowResize = this.onWindowResize.bind(this)
    }

    onWindowResize() {
        if (this.el && this.camera && this.renderer) {
            this.camera.aspect = this.el.parentElement.parentElement.offsetWidth / this.el.parentElement.parentElement.offsetHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.el.parentElement.parentElement.offsetWidth, this.el.parentElement.parentElement.offsetHeight, true);
        }
    }

    center_of_canvas = () => {
        let values = this.el.getBoundingClientRect();
        let perc_100 = window.innerHeight;
        let position = (values.height / 2) - values.y;
        let percentage = Math.round(position/perc_100 *100) / 100;
        if (percentage > 1) {
            percentage = 1
        } else if (percentage < 0) {
            percentage = 0
        }
        console.log(percentage);
        this.percentage = percentage
    };

    // componentWillUnmount() {
    //      window.removeEventListener( 'resize', this.onWindowResize, false);
    //      window.removeEventListener( 'orientationchange', this.onWindowResize, false);
    // }

    componentDidMount() {
        this.loader = new GLTFLoader();
        if (!this.props) {
            return
        }
        queue.add(() => {
            if (!this.file) {
                queue.next();
                return
            }
            this.loader.load(this.file, (gltf) => {
                queue.next();
                this.gltf = gltf;
                this.clock = new THREE.Clock();
                this.get_scene();
                this.get_camera();
                this.get_mesh();
                this.get_light();
                this.get_mixer();

                this.get_render();

                window.addEventListener( 'resize', this.onWindowResize, false);
                window.addEventListener( 'orientationchange', this.onWindowResize, false);
            }, xhr => {
                let percentage = Math.round(xhr.loaded / (xhr.total || xhr.loaded) * 100);
                this.setState({now: percentage});
            }, error => {
                queue.next();
                console.log( 'An error happened' );
            })
        });
    }
    get_mesh() {
        this.mesh = this.scene.children[0].children[0];
    }
    get_light() {}

    activate_animation = (isVisible) => {
        if (!this.scene) {
            return
        }
        if (isVisible) {
            this.show_mesh()
        } else {
            this.hide_mesh();
        }
    };

    get_scene() {
        this.scene = new THREE.Scene();
        this.scene.add(this.gltf.scene)
    };

    get_dimention() {
        this.width = this.el.parentElement.parentElement.offsetWidth;
        this.height = this.el.parentElement.parentElement.offsetHeight;
    }

    get_aspect(){
        return this.width / this.height
    }

    get_render() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.el,
            powerPreference: "high-performance",
            alpha: true
        });

        this.get_dimention();
        this.renderer.setSize(this.width, this.height, true);
        this.renderer.setPixelRatio(2.5);
        this.renderer.gammaOutput = true;
        this.renderer.gammaFactor = 2.2;
        this.camera.aspect = this.get_aspect();
        this.camera.updateProjectionMatrix();
        this.scene.visible = this.initial_visible;
        this.renderer.render(this.scene, this.camera);
    };

    get_mixer() {};

    get_camera() {
        let camera = this.gltf.cameras;
        if (camera.length > 0) {
            this.camera = camera[0]
        } else {
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        }

        // let controls = new OrbitControls(this.camera, this.el );
        // controls.maxPolarAngle = Math.PI * 0.9;
        //
        // controls.update();
    }
    animate() {
        if (this.gltf === undefined) {
            return;
        }
        if (this.renderer === undefined) {
            return;
        }
        this.animation_id = requestAnimationFrame(()=>this.animate());

        if (this.mixer) {
            this.mixer.update(this.clock.getDelta());
        }

        this.renderer.render(this.scene, this.camera);
    };

    hide_mesh() {
        if (this.animation_id) {
            cancelAnimationFrame( this.animation_id );
            this.animation_id = null;
        }
        this.scene.visible = false;
        this.renderer.render(this.scene, this.camera)
    };

    show_mesh() {
        this.scene.visible = true;
        this.renderer.render(this.scene, this.camera)
    };


    render() {
        return (
            <VisibilitySensor partialVisibility={true} onChange={this.activate_animation} minTopValue={this.minTopValue || 100}>
                <div>
                    <div className="progress-bar-div" hidden={!this.file || this.state.now === 100} >
                        <ProgressBar now={this.state.now}/>
                    </div >
                    <canvas ref={ref => (this.el = ref)} hidden={this.state.now !== 100} />
                </div>
            </VisibilitySensor>
        )

    }
}

class AnimationModel extends Model {
    loop = true;

    get_mesh_animator() {
        return this.scene
    }

    get_mixer() {
        if (this.gltf.animations.length === 0) {
            return
        }
        this.mixer = new THREE.AnimationMixer(this.get_mesh_animator());
        this.action = this.mixer.clipAction(this.gltf.animations[0]);

        if (!this.loop) {
            this.action.setLoop(THREE.LoopOnce);
        }

        this.action.clampWhenFinished = true;
        this.action.play();
    };

    show_mesh() {
        super.show_mesh();
        if (!this.animation_id && this.scene) {
            this.animate()
        }
    };
    hide_mesh() {
        if (this.animation_id && this.loop) {
            cancelAnimationFrame( this.animation_id );
            this.animation_id = null;
        }
        this.scene.visible = false;
        this.renderer.render(this.scene, this.camera)
    };
}

class Drone extends AnimationModel {
    file = '/objects/drone.glb';

    get_camera() {
        super.get_camera();
        this.camera.position.z = 0.038;
    }

        animate() {
        if (this.gltf === undefined) {
            return;
        }
        if (this.renderer === undefined) {
            return;
        }
        this.animation_id = requestAnimationFrame(()=>this.animate());

        if (this.mixer) {
            this.mixer.update(this.clock.getDelta() / 2);
        }

        this.renderer.render(this.scene, this.camera);
    };

}

class Phone extends AnimationModel {
    loop = false;
    file = '/objects/phone.glb';

    get_camera() {
        super.get_camera();
        this.camera.position.z = 4.8
    }
}

class Flowers extends AnimationModel {
    loop = false;
    file = '/objects/flower.glb';
    minTopValue = window.innerHeight*0.7;

    hide_mesh() {
        if (this.animation_id) {
            cancelAnimationFrame( this.animation_id );
            this.animation_id = null;
        }

    };

    show_mesh() {
        if (!this.animation_id && this.scene) {
            this.scene.visible = true;
            this.animate()
        }
    };

    get_render() {
        super.get_render();
        this.scene.visible = true;
        this.renderer.render(this.scene, this.camera);
    }

    get_camera() {
        super.get_camera();
        this.camera.position.x = -0.02;
    }
}

class Teamwork extends AnimationModel {
    loop = false;
    file = '/objects/team.glb';
    initial_visible = true;

    get_camera() {
        super.get_camera();
        this.camera.position.set(-0.01500424301624303, 0.012377048023045067, 0);
    }
    get_mesh_animator() {
        return this.group
    }
    get_mixer() {
        if (this.gltf.animations.length === 0) {
            return
        }
        this.mixer = new THREE.AnimationMixer(this.group);
        this.action = this.mixer.clipAction(this.gltf.animations[0]);

        if (!this.loop) {
            this.action.setLoop(THREE.LoopOnce);
        }

        this.action.clampWhenFinished = true;
        this.action.play();
    };

    get_scene() {
        super.get_scene();
        this.mesh = this.scene.children[0].children[0].children[1];
        this.mesh.position.set(0.000417, 0, -0.000247);

        let mesh2 = this.mesh.clone();
        let mesh3 = this.mesh.clone();
        let mesh4 = this.mesh.clone();
        let mesh5 = this.mesh.clone();
        let mesh6 = this.mesh.clone();

        this.mesh.rotation.y = Math.PI * 2 / 6;
        mesh2.rotation.y = Math.PI * 2 / 6 * 2;
        mesh3.rotation.y = Math.PI * 2 / 6 * 3;
        mesh4.rotation.y = Math.PI * 2 / 6 * 4;
        mesh5.rotation.y = Math.PI * 2 / 6 * 5;
        mesh6.rotation.y = Math.PI * 2 / 6 * 6;

        this.mesh.parent.add(mesh2);
        this.mesh.parent.add(mesh3);
        this.mesh.parent.add(mesh4);
        this.mesh.parent.add(mesh5);
        this.mesh.parent.add(mesh6);


        this.group = new THREE.AnimationObjectGroup(this.mesh, mesh2, mesh3, mesh4, mesh5, mesh6);
    }
}

class Swimming extends AnimationModel {
    file = '/objects/swim.glb';
    minTopValue = 0;
    initial_visible = true;

    get_render() {
        super.get_render();
        this.renderer.antialias = true;
        this.renderer.autoClear = false;
        this.add_water();
    }

    get_camera() {
        this.flip = new THREE.Matrix4().makeScale(-1,-1,1);
        this.camera = this.scene.children[0].children[0].children[0];
        this.camera.rotation.set(-0.261, 0,3.141592653589793);

        this.camera.position.set(0.0003959743189625442, 0.009, 0.019);
        window.j = this.camera;
        this.mesh = this.scene.children[0].children[0].children[1];
        this.mesh.applyMatrix(this.flip);
        this.mesh.position.set(0.030,0.0115, -0.007034149952232838);
        this.mesh.scale.set(0.8, 0.8, 0.8)

    };
    get_scene() {
        super.get_scene();
        this.scene.matrixAutoUpdate = false;
    }

    add_water() {
        this.light = new THREE.DirectionalLight( 0xffffff, 1 );
        this.light.position.z = 3;
        this.scene.add( this.light );

        let waterGeometry = new THREE.PlaneBufferGeometry( 100, 100 );
        this.water = new Water(
            waterGeometry,
            {
                textureWidth: 5000,
                textureHeight: 5000,
                waterNormals: new THREE.TextureLoader().load( water_texture, function ( texture ) {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                } ),
                alpha: 0.3,
                sunDirection: this.light.position.clone().normalize(),
                sunColor: 0xfdeca6,
                waterColor: 0x72bedc,
                distortionScale: 20,
                fog: false
            }
        );
        this.water.rotation.x = - Math.PI / 2;
        this.scene.add(this.water);
        this.renderer.render(this.scene, this.camera);
    }
    animate = () => {
        this.new_mesh = this.scene.children[0].children[0].children[1];
        if (-0.1 < this.new_mesh.position.x && this.new_mesh.position.x < 0.04) {
            this.new_mesh.position.x -= 0.0001
        }
        this.time = performance.now() * 0.001;
        if (this.water) {
            this.water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
        }
        super.animate();
    }

}

class Flame extends AnimationModel {
    file = '/objects/flame.glb';

    get_camera() {
        super.get_camera();
        this.camera.position.z = 0.0005;
        this.camera.parent.children[1].rotation.y = 0.05;
    }
}

class Tail extends AnimationModel {
    file = '/objects/tailwag/tail_wag.glb'

    get_dimention() {
        super.get_dimention();
        this.height += 200
    }

    get_camera() {
        super.get_camera();
        this.camera.position.set(-0.007, 0.007386929847300051,  -0.0838123016059399);
        this.camera.parent.children[1].rotation.y = 0.08;
    }
}

class Circuit extends Model {

    constructor(props) {
        super(props);
        this.file = '/objects/circuit.glb'
    }
    get_camera() {
        super.get_camera();
        this.camera.position.set(0.0040,0.00021507726341951638, 0.05924616245925429);
        this.camera.parent.children[2].rotation.y += 0.18;
        this.camera.parent.children[1].rotation.y += 0.18;
    }
}

class Toyball extends AnimationModel {
    loop = false;
    file = '/objects/toy_ball.glb';

    get_dimention() {
        super.get_dimention();
        this.height += 100
    }

    get_camera() {
        super.get_camera();
    }
}


export {Model, Drone, Phone, Flowers, Teamwork, Swimming, Flame, Tail, Circuit, Toyball};