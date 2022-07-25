import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const key = 'videoplayer-current-time';
// console.log(player);

function playerCurrentTime(evt) {
  localStorage.setItem(key, evt.seconds);
  // console.log(evt.seconds);
}

player.setCurrentTime(Number(localStorage.getItem(key)));
player.on('timeupdate', throttle(playerCurrentTime, 1000));
// test/
