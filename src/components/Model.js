import React, {Component} from 'react';
import {ProgressBar} from 'react-bootstrap'
import VisibilitySensor from 'react-visibility-sensor'
import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

import {Water} from './models/Water.js';
import water_texture from './models/waternormals.jpg'
import Queue from 'js-queue'

let queue = new Queue();

class Model extends Component {
    state = {
        now: 0
    };
    in_viewport = false;
    initial_visible = true;
    minTopValue = 0;
    color = "#FBFBFB";

    constructor(props) {
        super(props);
        this.el = React.createRef();
        this.onWindowResize = this.onWindowResize.bind(this)
    }

    onWindowResize() {
        if (this.el && this.camera && this.renderer) {
            this.get_dimension();
            this.camera.aspect = this.get_aspect();
            this.camera.updateProjectionMatrix();
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
        this.percentage = percentage
    };

    componentDidMount() {
        this.loader = new GLTFLoader();
        const dracoLoader  = new DRACOLoader();
        dracoLoader.setDecoderPath( 'https://stateofpostgres.com/decoder/' );
        this.loader.setDRACOLoader( dracoLoader );
        if (!this.props) {
            return
        }
        queue.add(() => {
            this.loader.load(this.file, (gltf) => {
                document.querySelector('.scroll_container__body').style.animationPlayState = "paused";
                this.gltf = gltf;
                this.clock = new THREE.Clock();
                this.get_scene();
                this.get_camera();
                this.get_mesh();
                this.get_light();
                this.get_mixer();

                if (this.in_viewport) {
                    this.get_render()
                }

                window.addEventListener( 'resize', this.onWindowResize, false);
                window.addEventListener( 'orientationchange', this.onWindowResize, false);
                setTimeout(function () {queue.next()},1000);
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
        this.in_viewport = isVisible;
        if (!this.scene) {
            return
        }
        if (!this.renderer) {
            this.get_render();
        }
        if (isVisible) {
            this.show_mesh()
        } else {
            this.hide_mesh();
        }
    };

    get_scene() {
        this.scene = new THREE.Scene();
        this.scene.add(this.gltf.scene);
        this.scene.background = new THREE.Color( this.color );
    };

    get_dimension() {
        this.width = this.el.offsetWidth;
        this.height = this.el.offsetHeight;
    }

    get_aspect(){
        return this.width / this.height
    }

    get_render() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.el,
            powerPreference: "low-power"
        });

        this.get_dimension();
        this.renderer.setSize(this.width, this.height, true);
        this.renderer.setPixelRatio(2.3);
        this.renderer.gammaOutput = true;
        this.renderer.gammaFactor = 2.2;
        this.camera.aspect = this.get_aspect();
        this.camera.updateProjectionMatrix();
        this.scene.visible = this.initial_visible;
        this.renderer.render(this.scene, this.camera);
        if (this.in_viewport) {
            this.animate()
        }
    };

    get_mixer() {};

    get_camera() {
        let camera = this.gltf.cameras;
        if (camera.length > 0) {
            this.camera = camera[0]
        } else {
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        }
        this.camera.far = 0.1;
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
            <VisibilitySensor partialVisibility={true} onChange={this.activate_animation} minTopValue={this.minTopValue}>
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

class Teamwork extends AnimationModel {
    loop = false;
    file = '/objects/team-processed.glb';
    initial_visible = true;

    get_camera() {
        super.get_camera();
        this.camera.position.set(-0.01400424301624303, 0.012377048023045067, 0);
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

class Drone extends AnimationModel {
    file = '/objects/drone-processed.glb';

}

class Phone extends AnimationModel {
    loop = false;
    file = '/objects/phone-processed.glb';

    get_camera() {
        super.get_camera();
        this.camera.far = 4;
        this.camera.position.z = 3.8
    }
}

class Circuit extends AnimationModel {
    file = '/objects/circuit-processed.glb';
    motion = 0.00002;
    acceleration = 1;

    get_camera() {
        super.get_camera();
        this.camera.position.set(0.0040,0.00021507726341951638, 0.04924616245925429);
        this.camera.parent.children[2].rotation.y += 0.18;
        this.camera.parent.children[1].rotation.y += 0.18;
    }

    get_mesh() {
        this.start_position_x = 0.008149999999999836;
        this.end_position_x = 0;
        this.mesh1 = this.scene.children[0].children[0].children[1];
        this.mesh2 = this.scene.children[0].children[0].children[2];
        this.mesh1.position.x = this.start_position_x;
        this.mesh2.position.x = this.start_position_x;
    }

    animate = () => {
        this.is_corner = this.mesh1.position.x > 0.008 || this.mesh1.position.x < 0.0035;
        this.acceleration_sign = this.mesh1.position.x < this.start_position_x / 2;
        if (this.mesh1.position.x > this.end_position_x)  {
            if (this.is_corner) {
                this.acceleration_value = 1.05
            } else {
                this.acceleration_value = 1.03
            }
            this.acceleration *= this.acceleration_sign ? 1/this.acceleration_value : this.acceleration_value;
            this.mesh1.position.x -= this.motion * this.acceleration;
            this.mesh2.position.x -= this.motion * this.acceleration;
        }

        super.animate();
    }
}

class Flowers extends AnimationModel {
    loop = false;
    file = '/objects/flower-processed.glb';

    get_camera() {
        super.get_camera();
        this.camera.position.x = -0.015;
    }
}

class Swimming extends AnimationModel {
    file = '/objects/swim-processed.glb';
    initial_visible = true;
    start_one_time_animation = false;
    color = "#469fcb";

    get_render() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.el,
            powerPreference: "high-performance",
            alpha: true
        });

        this.get_dimension();
        this.renderer.setSize(this.width, this.height, true);
        this.renderer.setPixelRatio(2.3);
        this.renderer.gammaOutput = true;
        this.renderer.gammaFactor = 2.2;
        this.camera.aspect = this.get_aspect();
        this.camera.updateProjectionMatrix();
        this.scene.visible = this.initial_visible;
        this.renderer.antialias = true;
        this.renderer.autoClear = false;
        this.add_water();
        this.renderer.render(this.scene, this.camera);

        if (this.in_viewport) {
            this.animate()
        }

    };

    get_scene() {
        this.scene = new THREE.Scene();
        this.scene.add(this.gltf.scene)
        this.scene.matrixAutoUpdate = false;
    };

    get_camera() {
        this.flip = new THREE.Matrix4().makeScale(-1,-1,1);
        this.camera = this.scene.children[0].children[0].children[0];
        this.camera.rotation.set(-0.261, 0,3.141592653589793);

        this.camera.position.set(0.0003959743189625442, 0.009, 0.019);
        this.mesh = this.scene.children[0].children[0].children[1];
        this.mesh.applyMatrix(this.flip);
        this.mesh.position.set(0.030,0.0115, -0.007034149952232838);
        this.mesh.scale.set(0.8, 0.8, 0.8)

    };

    get_mesh() {
        this.mesh = this.scene.children[0].children[0].children[1];
    }


    hide_mesh() {
        if (!this.start_one_time_animation) {
            super.hide_mesh();
        }
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
        this.start_one_time_animation = true;
    }

    is_swimming_position() {
        return -0.2 < this.mesh.position.x && this.mesh.position.x < 0.04
    }

    animate = () => {
        if (this.is_swimming_position() && this.start_one_time_animation) {
            this.mesh.position.x -= 0.00007;
        }
        this.time = performance.now() * 0.001;
        if (this.water) {
            this.water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
        }
        super.animate();
    };

    get_mixer() {
        this.get_render();
        return super.get_mixer();
    }
}

class Spinner extends AnimationModel {
    file = '/objects/spinner-processed.glb';
    color = "#F4F0E3";
    loop = false;

    get_camera() {
        this.camera = this.scene.children[0].children[0].children[0];
    }
}

class Tail extends AnimationModel {
    file = '/objects/tailwag/tail_wag-processed.glb';
    color = "#F4F0E3";

    animate() {
        if (window.animation_stopped) {
            return super.animate();
        }
        if (window.scroll_direction === "up" && this.mesh.children[1].rotation.x > -0.4) {
            this.mesh.children[1].rotation.x -= window.scroll_stopped ? 0.0001 : 0.005;
        } else if (window.scroll_direction === "down" && this.mesh.children[1].rotation.x < 0.4) {
            this.mesh.children[1].rotation.x += window.scroll_stopped ? 0.0001 : 0.005;
        }
        console.log(this.mesh.children[1].rotation.x);
        return super.animate();
    }
}

class Toyball extends AnimationModel {
    loop = false;
    file = '/objects/toy_ball-processed.glb';
    color = "#F4F0E3";
}


export {Model, Drone, Phone, Flowers, Teamwork, Swimming, Spinner, Tail, Circuit, Toyball};