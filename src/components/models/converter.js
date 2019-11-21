const gltfPipeline = require('gltf-pipeline');
const fsExtra = require('fs-extra');
const glbToGltf = gltfPipeline.glbToGltf;
const glb = fsExtra.readFileSync('model.glb');
glbToGltf(glb)
    .then(function(results) {
        fsExtra.writeJsonSync('drone.glb', results.gltf);
    });