/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { Scene } from 'phaser';
import CameraScale from '../components/CameraScale';
import Popup from '../components/Popup';
import AutoEvent from '../components/AutoEvent';

class Congratulation extends Scene {
  constructor () {
    super('congrats')
  }

  create () {
    // popupLayer
    const popupLayer = this.add.layer();

    // popupFrame
    const popupFrame = this.add.image(0, 0, 'congratulation');

    // message
    const message = this.add.text(0, 0, 'Won The Game!\nKeep Going!', {
      fontFamily: 'FreeSans',
      fontSize: '60px',
      fontStyle: 'bold',
      align: 'center',
      color: '#ffffee'
    });
    message.setOrigin(0.5, 0.5);

    // popupContainer
    const popupContainer = this.add.container(360, 640);
    popupContainer.add(popupFrame);
    popupContainer.add(message);
    popupLayer.add(popupContainer);

    // cameraScale (component)
    const cameraScale = new CameraScale(popupLayer);
    cameraScale.gameWidth = 720;
    cameraScale.gameHeight = 1280;

    // popup (component)
    const popup = new Popup(popupContainer);
    popup.tweenDuration = 150;
    popup.onPopupClose = 'close-popup';
    popup.onPopupOpen = 'open-popup';
    popup.onPopupClosed = 'popup-closed';
    popup.onPopupOpened = 'popup-opened';

    // autoEvent (component)
    const autoEvent = new AutoEvent(popupLayer);
    autoEvent.delay = 1850;
    autoEvent.eventName = 'next-game';

    this.events.emit('scene-awake');
  }
}

export default Congratulation;
