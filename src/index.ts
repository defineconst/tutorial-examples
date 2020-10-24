import 'regenerator-runtime';

import {
  WebGLEngine,
  Entity,
  SystemInfo,
} from 'oasis-engine';

import init from './game/index';

// 创建引擎
const engine = new WebGLEngine('oasis-demo');
// 设置引擎的 canvas 画布大小
engine.canvas.width = window.innerWidth * SystemInfo.devicePixelRatio;
engine.canvas.height = window.innerHeight * SystemInfo.devicePixelRatio;
// 创建一个 Entity 作为 RootEntity
const rootEntity = new Entity();
// 当前场景
const scene = engine.sceneManager.activeScene;
scene.addRootEntity(rootEntity);

// 初始化好后启动引擎主循环
init(engine, rootEntity).then(() => {
  engine.run();
});
