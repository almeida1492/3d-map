import data from "./data.json";

var createScene = function () {
  var scene = new BABYLON.Scene(engine);
  var camera = new BABYLON.ArcRotateCamera(
    "camera1",
    0,
    0,
    0,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.setPosition(new BABYLON.Vector3(-50.0, 80.0, -140.0));
  camera.attachControl(canvas, true);
  var light = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(0.0, 1.0, 1.0),
    scene
  );
  light.intensity = 0.75;
  light.specular = BABYLON.Color3.Black();

  var mapSubX = 50;
  var mapSubZ = 50;

  var paths = [];
  for (var l = 0; l < mapSubZ; l++) {
    var path = [];
    for (var w = 0; w < mapSubX; w++) {
      var x = (w - mapSubX * 0.5) * 2.0;
      var z = (l - mapSubZ * 0.5) * 2.0;
      var y = data[l][w].elevation / 60;

      path.push(new BABYLON.Vector3(x, y, z));
    }
    paths.push(path);
  }

  var map = BABYLON.MeshBuilder.CreateRibbon(
    "m",
    { pathArray: paths, sideOrientation: 2 },
    scene
  );
  map.position.y = -1.0;
  var mapMaterial = new BABYLON.StandardMaterial("mm", scene);
  mapMaterial.diffuseTexture = new BABYLON.Texture(
    "blob:https://playground.babylonjs.com/51550204-a42b-43b6-838a-e2a5bfd41e69",
    scene
  );
  map.material = mapMaterial;

  return scene;
};
