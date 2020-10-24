import { Script, Vector3, BoxCollider } from 'oasis-engine';

// 缓存数据
const tempPos = new Vector3();
const startPos = new Vector3();

export default class Ship extends Script {
  private _curMoveTime: number; // 当前总共移动时长
  private _moveTime: number; // 单次移动时长
  private _speed: number; // 飞船移动速度

  // 组件第一次触发为激活时调用，这里我们来做一些初始化操作
  onAwake() {
    this._curMoveTime = 0;
    this._moveTime = 80;
    this._speed = 1;
    tempPos.setValue(0, 0, 0);
    startPos.setValue(-10, 0, 0);

    // 添加碰撞组件
    const box = this.entity.addComponent(BoxCollider);
    // 设置碰撞体大小
    box.size = new Vector3(0.6, 0.6, 0.6);
  }

  // 引擎主循环的回调，我们在这里实现一些动画，让飞船动起来
  onUpdate() {
    const isLeft: boolean = Math.floor(this._curMoveTime / this._moveTime) % 2 === 0; 
    const t = this._curMoveTime % this._moveTime;
    const v = this._speed / this._moveTime;
    let x = tempPos.x;

    if (isLeft) {
      x = Math.min(t * v, this._speed);
    } else {
      x = Math.max((this._moveTime - t) * v, startPos.x);
    }

    this._curMoveTime++;
    tempPos.setValue(x, startPos.y, startPos.z);
    this.entity.transform.position = tempPos;
  }

  onDestroy() {

  }
}