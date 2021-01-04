/**
 * @author      Alexander Richterich <richterich@yahoo.com>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import backgroundParams from './BackgroundParams';

const API_PATH = 'http://localhost:8443/bg'; // path to background fetch api

/**
 * @function backgroundUrl - ...
 */
function backgroundUrl() {
    let url = new URL(API_PATH);
    let params = backgroundParams();
    url.search = new URLSearchParams(params).toString();
    return url;
}

export default backgroundUrl;
