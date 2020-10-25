import {
  Event,
  Script,
  Entity
} from 'oasis-engine';

// 要用到的消息
const gameStartEvent = new Event('game_start');
const gamePlayEvent = new Event('game_play');
const gameOverEvent = new Event('game_over');

/**
 * 使用时再重写，性能可以得到提升
 */
export default class GameController extends Script {
  private _ship: Entity;
  private _coins: Entity;

  /**
   * 第一次触发可用状态时调用,只调用一次。
   */
  onAwake() {
    const { entity, engine } = this;

    this._ship = entity.findByName('body');
    this._coins = entity.findByName('coins');

    this.bindEvent();

    // 主动触发一次启动
    engine.trigger(gameStartEvent);
  }

  // 监听业务层消息
  bindEvent() {
    const { entity, engine } = this;

    // 启动游戏
    engine.addEventListener('game_start', () => {
      this._ship.trigger(gameStartEvent);
      this._coins.trigger(gameStartEvent);
    });

    // 发射飞船
    engine.addEventListener('game_play', () => {
      this._ship.trigger(gamePlayEvent);
      this._coins.trigger(gamePlayEvent);

      entity.trigger(gamePlayEvent);
    });

    // 游戏结束
    this._ship.addEventListener('game_over', () => {
      entity.trigger(gameOverEvent);
    });
  }

  /**
   * 在被销毁帧的最后调用。
   */
  onDestroy() {
    this.engine.removeAllEventListeners();
  }
}
