/**
 * @author      Alexander Richterich <richterich@yahoo.com>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
const MEDIUM = 1920; // any screen 1920 pixels.
const FULL = 'full'; // full image size
const REGULAR = 'regular'; // regular image type
const LANDSCAPE = 'landscape'; // default orientation is landscape
const SEPARATOR = '-'; //
/**
 * @class DeviceScreen
 */
class DeviceScreen {
    /**
     * @method orientationType - ...
     */
    orientationType() {
        let type = (window.screen.orientation || {}).type || LANDSCAPE;
        return type.split(SEPARATOR)[0];
    }
    /**
     * @method sizeType - ...
     */
    sizeType() {
        let width = window.screen.width * window.devicePixelRatio,
            height = window.screen.height * window.devicePixelRatio;
        let pixelAmount = width > height ? width : height;
        let type = pixelAmount <= MEDIUM ? REGULAR : FULL;
        return type;
    }
}

export default DeviceScreen;
