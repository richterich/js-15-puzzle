/**
 * @author      Alexander Richterich <alexander@richterich.dev>
 * @copyright   2020 Alexander Richterich
 * @license     {@link https://opensource.org/licenses/MIT|MIT License}
 */
import '../styles/main.css';
import donateImage from '../img/paypal_logo.png';
import Phaser from 'phaser';
import GameConfig from './GameConfig';

window.addEventListener('load', () => {
    bootGame();
});

function bootGame() {
    new Phaser.Game(GameConfig);
}

const donate = document.getElementById('donate');
donate.src = donateImage;

const repoStars = document.getElementById('repo-stars');
setInterval(() => {
    repoStars.classList.remove('shake');
    void repoStars.offsetWidth;
    repoStars.classList.add('shake');
}, 90000);

const howPlay = document.getElementById('how-play');
const infoPanel = document.getElementById('info-panel');
const close = document.getElementsByClassName('close')[0];
howPlay.onclick = () => {
    infoPanel.style.display = 'block';
};
close.onclick = () => {
    infoPanel.style.display = 'none';
};
window.onclick = (event) => {
    if (event.target == infoPanel) {
        infoPanel.style.display = 'none';
        return false;
    }
};
setInterval(() => {
    howPlay.classList.remove('shake');
    void howPlay.offsetWidth;
    howPlay.classList.add('shake');
}, 30000);
