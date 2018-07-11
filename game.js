function initScene(canvas, engine) {
  var scene = new BABYLON.Scene(engine);
  console.log("Initialized raw scene.");
  scene.clearColor = new BABYLON.Color3(0.7, 0.7, 0.7);

  // var camera = new BABYLON.WebVRFreeCamera(
  //   "vr_cam",
  //   new BABYLON.Vector3(0, 0, 0),
  //   scene
  // );

  var camera = new BABYLON.VRDeviceOrientationFreeCamera(
    "vr_cam",
    new BABYLON.Vector3(0, 0, 0),
    scene
  );

  // Create lighting
  var light1 = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(0, 0, 1),
    scene
  );
  var light2 = new BABYLON.HemisphericLight(
    "light2",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  var light3 = new BABYLON.HemisphericLight(
    "light3",
    new BABYLON.Vector3(1, 0, 0),
    scene
  );

  //   // Skybox
  //   var skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, scene);
  //   var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
  //   skyboxMaterial.backFaceCulling = false;
  //   skyboxMaterial.disableLighting = true;
  //   skybox.material = skyboxMaterial;
  //   skybox.infiniteDistance = true;
  //   skyboxMaterial.disableLighting = true;
  //   skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
  //     "textures/skybox",
  //     scene
  //   );
  //   skyboxMaterial.reflectionTexture.coordinatesMode =
  //     BABYLON.Texture.SKYBOX_MODE;

  //   // Ground
  //   var ground = BABYLON.MeshBuilder.CreateGround("ground", {}, scene);
  //   var material = new BABYLON.StandardMaterial("material1", scene);
  //   material.wireframe = true;
  //   ground.material = material;

  var env = scene.createDefaultEnvironment({
    createGround: true,
    groundColor: BABYLON.Color3.Black(),
    enableGroundShadow: true,
    createSkybox: true,
    skyboxColor: BABYLON.Color3.Teal(),
    groundYBias: 0.01,
    enableGroundMirror: true
  });
  //env.setMainColor(BABYLON.Color3.Teal());
  BABYLON.SceneLoader.ImportMesh(
    "",
    "assets/",
    "bow-arrow.babylon",
    scene,
    function(newMeshes) {
      newMeshes.forEach(function(mesh) {
        // mesh.rotation = new BABYLON.Vector3(BABYLON.Tools.ToRadians(45), 0, 0);
        var meshPosition = camera.position;
        var meshOffset = new BABYLON.Vector3(0.1, 0.3, 0.75);
        meshPosition = meshOffset.add(mesPosition);
      });
    }
  );
  scene.onPointerDown = function() {
    scene.onPointerDown = undefined;
    camera.attachControl(canvas, true);
  };
  return scene;
}

function shootArrow(scene) {}

function destroyTarget(scene) {}

function initTarget(scene, x, y, z) {
  var black = new BABYLON.Color3.Black();
  black = black.toColor4();
  var blue = new BABYLON.Color3.Blue();
  blue = blue.toColor4();
  var options = [
    {
      height: 0.1,
      diameter: 1,
      faceColors: [
        new BABYLON.Color4(0.9, 0.9, 0.9, 0.8), // Bottom cap
        new BABYLON.Color4(0.1, 0.1, 0.1, 1), // Tube
        new BABYLON.Color4(0.9, 0.9, 0.9, 0.8)
      ]
    },

    {
      height: 0.2,
      diameter: 0.8,
      faceColors: [
        black, // Bottom cap
        new BABYLON.Color4(0.1, 0.1, 0.1, 1), // Tube
        black
      ]
    },

    {
      height: 0.3,
      diameter: 0.4,
      faceColors: [
        blue, // Bottom cap
        new BABYLON.Color4(0.1, 0.1, 0.1, 1), // Tube
        blue
      ]
    }
  ];
  var target = [
    new BABYLON.MeshBuilder.CreateCylinder("target0", options[0], scene),
    new BABYLON.MeshBuilder.CreateCylinder("target1", options[1], scene),
    new BABYLON.MeshBuilder.CreateCylinder("target2", options[2], scene)
  ];
  target[0].position = new BABYLON.Vector3(x, y, z);
  target[0].rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.WORLD);
  target[1].position = new BABYLON.Vector3(x, y, z - 0.1);
  target[1].rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.WORLD);
  target[2].position = new BABYLON.Vector3(x, y, z - 0.2);
  target[2].rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.WORLD);
}

window.addEventListener("DOMContentLoaded", main());

function main() {
  var canvas = document.getElementById("canvas");
  var engine = new BABYLON.Engine(canvas, true);
  var scene = initScene(canvas);
  scene.debugLayer.show();

  //initTarget(scene, 0, -3, 15);
  initTarget(scene, 0, 0.65, 5);
  // Render loop
  engine.runRenderLoop(function() {
    scene.render();
  });
}
