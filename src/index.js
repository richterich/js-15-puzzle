/**
 * @author      Alexander Richterich <richterich@yahoo.com>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import Phaser from 'phaser';
import GameConfig from './GameConfig';
import backgroundUrl from './BackgroundUrl';

window.addEventListener('load', () => {
    let radialGradient =
        'radial-gradient(circle at center, #302b63, #24243e, #0f0c29)';
    let body = document.getElementsByTagName('body')[0];
    let requestUrl = backgroundUrl();

    fetch(requestUrl)
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
                credit.textContent = 'background photo by ';
                profile_url.appendChild(username);
                credit.appendChild(profile_url);
            } else {
                body.style.backgroundImage = radialGradient;
            }
            new Phaser.Game(GameConfig);
        })
        .catch((err) => {
            body.style.backgroundImage = radialGradient;
            new Phaser.Game(GameConfig);
            throw err;
        });
});
