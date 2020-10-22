import * as o3 from "oasis-engine";
import "regenerator-runtime";

const engine = new o3.WebGLEngine("canvas");
engine.canvas.resizeByClientSize();
const root = engine.sceneManager.activeScene.createRootEntity();

const cameraEntity = root.createChild("camera");
const camera = cameraEntity.addComponent(o3.Camera);
camera.backgroundColor = new o3.Vector4(0.2, 0.2, 0.2, 1);

function wait() {
	return new Promise((resolve) => {
    setTimeout(()=>{
      resolve()
    }, 3000)
  });
}

async function test(abc: string) {
  await wait();
  console.log(abc)
}

test("abc");

engine.run();
