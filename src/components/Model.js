import React, {Component} from 'react';
// import Reveal from 'react-reveal/Reveal';
// import AOS from 'aos';
import {ProgressBar} from 'react-bootstrap'
import VisibilitySensor from 'react-visibility-sensor'
import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
// import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader';

import {Water} from './models/Water.js';
import {Sky} from './models/Sky.js';
import water_texture from './models/waternormals.jpg'
import Queue from 'js-queue'


let queue = new Queue();

class Model extends Component {
    state = {
        now: 0
    };

    onWindowResize() {
        if (!this.scene.visible) {
            return
        }

        if (this.camera && this.renderer) {
            this.camera.aspect = this.el.width / this.el.height;
            this.camera.updateProjectionMatrix();
        }
    }

    componentDidMount() {
        this.loader = new GLTFLoader();
        // const dracoLoader  = new DRACOLoader();
        // dracoLoader.setDecoderPath( 'http://138.197.96.251/decoder/' );
        // dracoLoader.setDecoderConfig( { type: 'js' } );
        // this.loader.setDRACOLoader( dracoLoader );
        // loader.setMeshoptDecoder( MeshoptDecoder );
        if (!this.state) {
            return
        }
        queue.add(() => {
            if (!this.state.file) {
                queue.next();
                return
            }
            this.loader.load(this.state.file, (gltf) => {
                queue.next();
                this.delta = 0;
                this.gltf = gltf;
                this.clock = new THREE.Clock();
                this.get_scene();
                this.get_camera();
                this.get_mesh();
                this.change_material();

                this.get_mixer();
                // this.loader();
                this.get_light();
                this.get_render();

                window.addEventListener( 'resize', () => {this.onWindowResize()}, false );
            }, xhr => {
                let percentage = Math.round(xhr.loaded / (xhr.total || xhr.loaded) * 100);
                this.setState({now: percentage});
            }, error => {
                queue.next();
                console.log( 'An error happened' );
            })
            // success(model)
        });
    }
    get_mesh() {
        this.mesh = this.scene.children[0].children[0];
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
        this.scene.add(this.gltf.scene)
    };

    is_in_viewport() {
        let bounding = this.el.getBoundingClientRect();
        if (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        ) {
            return true
        } else {
            return false
        }
    }

    get_dimention() {
        this.width = Math.max(window.innerWidth, window.innerHeight);
        this.height = Math.min(window.innerWidth, window.innerHeight);
    }

    get_render() {
        //RENDERER
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.el,
            powerPreference: "high-performance",
            alpha: true
        });

        // this.renderer.setSize(window.innerWidth/2, window.innerHeight/2, true);
        this.get_dimention();
        this.renderer.setSize(this.width/2, this.height/2, true);
        this.renderer.setPixelRatio(2);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        this.scene.visible = this.is_in_viewport();
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
        // this.hemispheric = new THREE.HemisphereLight( 0xffffff, 0x222222, 1.0 );
        // this.scene.add(this.hemispheric);
        // this.ambient = new THREE.AmbientLight( 0xffffff, 0.3 );
        // this.scene.add(this.ambient);
        // this.directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
        // this.directionalLight.position.set( 0.5, 0, 0.866 );
        // this.scene.add( this.directionalLight );
        this.scene.add( this.light );
    }

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
        // this.camera.updateProjectionMatrix();
        // this.renderer.setSize( 850, 850, 2 );

        this.renderer.render(this.scene, this.camera);
    };

    hide_mesh() {
        if (this.animation_id) {
            cancelAnimationFrame( this.animation_id );
            this.animation_id = null;
            this.scene.visible = false;
            this.renderer.render(this.scene, this.camera)
        }

    };

    show_mesh() {
        if (!this.animation_id && this.scene) {
            this.scene.visible = true;
            this.animate()
        }
    };


    render() {
        return (
            <VisibilitySensor partialVisibility={true} onChange={this.activate_animation} minTopValue={this.minTopValue || 0}>
                <div>
                    <div className="progress-bar-div" hidden={!this.state.file || this.state.now === 100} >
                        <ProgressBar now={this.state.now}/>
                    </div >
                    <canvas ref={ref => (this.el = ref)} hidden={this.state.now !== 100} />
                </div>
            </VisibilitySensor>
        )

    }
}

class Drone extends Model {
    constructor(props) {
        super(props);
        this.state = {file: '/objects/drone.glb'};
        this.start_fly_animation = this.start_fly_animation.bind(this);
    }

    get_dimention() {
        super.get_dimention();
        this.height = Math.min(window.innerWidth, window.innerHeight) + 900;
    }


    get_light() {
        // super.get_light();
        this.hemispheric = new THREE.HemisphereLight( 0xffffff, 0x222222, 1.0 );
        this.scene.add(this.hemispheric);
    }

    componentDidMount() {
        super.componentDidMount();
        window.addEventListener('scroll', this.start_fly_animation)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.start_fly_animation)
    }


    get_camera() {
        super.get_camera();
        this.camera.position.z = 9;
    }

    animate() {
        if (this.fly_animation) {
            if (this.camera.position.y > -10) {
                this.camera.position.y -= 0.01;
            } else {
                this.fly_animation = false;
                window.removeEventListener('scroll', this.start_fly_animation)
            }
        }
        return super.animate();
    }
    start_fly_animation() {
        if (this.el && this.el.getBoundingClientRect().y < 100 && this.scene && this.scene.visible) {
            this.fly_animation = true;
        }
    };

    render() {
        return (
            <VisibilitySensor partialVisibility={true} onChange={this.activate_animation} minTopValue={this.minTopValue || 0}>
                <div>
                    <div>
                        <div className="progress-bar-div" hidden={this.state.now === 100} >
                            <ProgressBar now={this.state.now}/>
                        </div>
                        <canvas ref={ref => (this.el = ref)} hidden={this.state.now !== 100} />
                    </div>
                </div>
            </VisibilitySensor>
        )

    }
}

class Phone extends Model {
    constructor(props) {
        super(props);
        this.state = {
            file: '/objects/phone.glb',
            loopOnce: true
        }
    }
}

class Flowers extends Model {
    constructor(props) {
        super(props);
        this.minTopValue = window.innerHeight*0.7;
        this.state = {
            file: '/objects/flowers.glb',
            loopOnce: true,
        }
    }

    get_dimention() {
        super.get_dimention();
        this.height += 100
    }
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
}

class Teamwork extends Model {
    constructor(props) {
        super(props);
        this.state = {
            file: '/objects/teamwork.glb',
            loopOnce: true
        }
    }

    get_dimention() {
        super.get_dimention();
        this.height += 100
    }
}

class Swimming extends Model {
    constructor(props) {
        super(props);
        this.state = {file: '/objects/swimming_full.glb'}
    }
    get_render() {
        super.get_render();
        this.renderer.antialias = true;
        this.renderer.autoClear = false;
        this.add_water();
    }

    get_camera() {
        this.camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 20000 );
        this.camera.position.set( 30, 90, 600 );
        this.camera.rotation.z =  180 * Math.PI / 180;

        this.camera.updateProjectionMatrix();

    };
    get_scene() {
        super.get_scene();
        this.scene.matrixAutoUpdate = false;
    }


    get_light() {
        this.light = new THREE.DirectionalLight( 0x08c0fd, 0.5 );
        this.light.position.x = 10;
        this.light.position.z = 10;
        this.scene.add( this.light );
    }

    add_water() {

        this.light = new THREE.DirectionalLight( 0x469fcb, 0.8 );
        this.scene.add( this.light );
        let flip = new THREE.Matrix4().makeScale(1,-1,1);
        let mesh = this.scene.children[0].children[0];
        mesh.applyMatrix(flip);
        mesh.position.y = 150;

        let waterGeometry = new THREE.PlaneBufferGeometry( 10000, 5000 );
        this.water = new Water(
            waterGeometry,
            {
                textureWidth: 512,
                textureHeight: 512,
                waterNormals: new THREE.TextureLoader().load( water_texture, function ( texture ) {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                } ),
                alpha: 0.9,
                sunDirection: this.light.position.clone().normalize(),
                sunColor: 0xffffff,
                waterColor: 0x028bf2,
                distortionScale: 3.7,
                fog: this.scene.fog !== undefined
            }
        );
        this.water.rotation.x = - Math.PI / 2;
        this.scene.add( this.water );
        // Skybox
        this.sky = new Sky();
        this.uniforms = this.sky.material.uniforms;
        this.uniforms[ 'turbidity' ].value = 0.1;
        this.uniforms[ 'rayleigh' ].value = 0.1;
        this.uniforms[ 'luminance' ].value = 0.1;
        this.uniforms[ 'mieCoefficient' ].value = 1.005;
        this.uniforms[ 'mieDirectionalG' ].value = 0.8;
        let parameters = {
            distance: 400,
            inclination: 0.49,
            azimuth: 0.205
        };
        this.cubeCamera = new THREE.CubeCamera( 0.1, 1, 512 );
        this.cubeCamera.renderTarget.texture.generateMipmaps = true;
        this.cubeCamera.renderTarget.texture.minFilter = THREE.LinearMipmapLinearFilter;
        this.scene.background = this.cubeCamera.renderTarget;
        let updateSun = () => {
            let theta = Math.PI * ( parameters.inclination - 0.5 );
            let phi = 2 * Math.PI * ( parameters.azimuth - 0.5 );
            this.light.position.x = parameters.distance * Math.cos( phi );
            this.light.position.y = parameters.distance * Math.sin( phi ) * Math.sin( theta );
            this.light.position.z = parameters.distance * Math.sin( phi ) * Math.cos( theta );
            this.sky.material.uniforms[ 'sunPosition' ].value = this.light.position.copy( this.light.position );
            this.water.material.uniforms[ 'sunDirection' ].value.copy( this.light.position ).normalize();
            this.cubeCamera.update( this.renderer, this.sky );
        };
        updateSun();
    }
    animate = () => {
        this.time = performance.now() * 0.001;
        if (this.water) {
            this.water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
        }
        super.animate();
    }
}

class Flame extends Model {
    constructor(props) {
        super(props);
        this.state = {file: '/objects/flame.glb'}
    }
    get_camera() {
        super.get_camera();
        this.camera.position.z += 0.1;
        this.camera.position.x += 0.9;
    }

    get_dimention() {
        super.get_dimention();
        this.height += 400
    }
}

class Tail extends Model {
    constructor(props) {
        super(props);
        this.state = {file: '/objects/tail_wag.glb'}
    }

    get_dimention() {
        super.get_dimention();
        this.height += 200
    }

    get_camera() {
        super.get_camera();
        // this.camera.position.z += 0.5;
    }
}

class Circuit extends Model {
    constructor(props) {
        super(props);
        this.state = {file: '/objects/circuit.glb'}
    }
}

class Toyball extends Model {
    constructor(props) {
        super(props);
        this.state = {
            file: '/objects/toy_ball.glb',
            loopOnce: true
        }
    }

    get_dimention() {
        super.get_dimention();
        this.height += 100
    }

    get_camera() {
        super.get_camera();
        this.camera.position.x = 1;
        this.camera.position.y = 0;
        this.camera.position.z = -1;
    }
}




export {Model, Drone, Phone, Flowers, Teamwork, Swimming, Flame, Tail, Circuit, Toyball};