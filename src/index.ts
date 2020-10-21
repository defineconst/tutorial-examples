import * as o3 from "oasis-engine";

const engine = new o3.WebGLEngine("canvas");
engine.canvas.resizeByClientSize();
const root = engine.sceneManager.activeScene.createRootEntity();

const cameraEntity = root.createChild("camera");
const camera = cameraEntity.addComponent(o3.Camera);
camera.backgroundColor = new o3.Vector4(0.2, 0.2, 0.2, 1);

engine.run();
