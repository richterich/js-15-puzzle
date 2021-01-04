/**
 * @author      Alexander Richterich <richterich@yahoo.com>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import DeviceScreen from './DeviceScreen';

/**
 * @function backgroundParams - ...
 */
function backgroundParams() {
    let params = {
        searchterm: 'abstract',
        orientation: 'landscape',
        size: 'regular',
    };
    let deviceScreen = new DeviceScreen();
    params.orientation = deviceScreen.orientationType();
    params.size = deviceScreen.sizeType();
    return params;
}

export default backgroundParams;
