import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const CURRENT_TIME_KEY = 'videoplayer-current-time';
// console.log(player);

function playerCurrentTime(evt) {
  localStorage.setItem(CURRENT_TIME_KEY, evt.seconds);
  // console.log(evt.seconds);
}

player.setCurrentTime(Number(localStorage.getItem(CURRENT_TIME_KEY)));
player.on('timeupdate', throttle(playerCurrentTime, 1000));
// test/
