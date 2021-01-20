/**
 * @author      Alexander Richterich <richterich@yahoo.com>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import backgroundUrl from './BackgroundUrl';

function applyBackground() {
    let body = document.getElementsByTagName('body')[0];
    let requestUrl = backgroundUrl();
    return fetch(requestUrl)
        .then((response) => {
            if (response.status !== 200) {
                return response.status;
            }
            return response.json();
        })
        .then((backgroundMeta) => {
            if (backgroundMeta.background) {
                body.style.backgroundImage = `url(${backgroundMeta.background})`;
                if (backgroundMeta.description) {
                    body.title = backgroundMeta.description;
                }
                let profile_url = document.createElement('a');
                profile_url.href = backgroundMeta.profile_url;
                profile_url.target = '_blank';
                profile_url.rel = 'noopener noreferrer';
                let username = document.createElement('strong');
                username.innerText = '@' + backgroundMeta.username;
                let credit = document.getElementById('credit');
                credit.textContent = 'Photo by ';
                profile_url.appendChild(username);
                credit.appendChild(profile_url);
            }
            return backgroundMeta;
        })
        .catch((err) => {
            throw err;
        });
}

export default applyBackground;
