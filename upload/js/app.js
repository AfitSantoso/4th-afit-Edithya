const hamburger = document.querySelector('.header_hamburger');

const header = document.querySelector('.header');

hamburger.addEventListener("click", function () {
    hamburger.classList.toggle('open');
    header.classList.toggle('active');

});





// time

function ten(x){
    if((x/10)<1){
        return "0" + x;
    }
    return x;
}

const dy= document.getElementById("y");
const dm= document.getElementById("m");
const dw= document.getElementById("w");
const d= document.getElementById("d");
const dhr= document.getElementById("hr");
const dmin= document.getElementById("min");
const dsec= document.getElementById("sec");


// November 2, 2022 at 23:32 WIB (UTC+7).
const relationshipStart = new Date('2022-11-02T23:32:00+07:00');

function getCurrentTime() {
    const now = new Date(Math.max(Date.now(), relationshipStart.getTime()));
    let months = (now.getUTCFullYear() - relationshipStart.getUTCFullYear()) * 12
        + now.getUTCMonth() - relationshipStart.getUTCMonth();

    // UTC arithmetic keeps the anniversary fixed to WIB in every visitor's timezone.
    const anniversary = new Date(relationshipStart);
    anniversary.setUTCMonth(relationshipStart.getUTCMonth() + months);
    if (anniversary > now) {
        months--;
        anniversary.setTime(relationshipStart.getTime());
        anniversary.setUTCMonth(relationshipStart.getUTCMonth() + months);
    }

    let remaining = Math.floor((now - anniversary) / 1000);
    const days = Math.floor(remaining / 86400);
    remaining %= 86400;
    const hours = Math.floor(remaining / 3600);
    remaining %= 3600;
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;

    dy.innerText = ten(Math.floor(months / 12));
    dm.innerText = ten(months % 12);
    dw.innerText = ten(Math.floor(days / 7));
    d.innerText = ten(days % 7);
    dhr.innerText = ten(hours);
    dmin.innerText = ten(minutes);
    dsec.innerText = ten(seconds);
}

getCurrentTime();
window.setInterval(getCurrentTime, 1000);


// scroll

const scroll = document.querySelector(".scroll");

window.addEventListener('scroll',function(){
    const h = document.documentElement.clientHeight *0.5;
   if(window.scrollY > h){
    scroll.classList.remove('inactive-scroll');
       scroll.classList.add('active-scroll');
   }else{
        scroll.classList.remove('active-scroll');
        scroll.classList.add('inactive-scroll');
    
   }
   
})

// spinner

const spinner = document.querySelector('.spinning')
const spinBtn = document.querySelector('.spin-con button')


spinBtn.addEventListener('click',spinWheel)
let  deg = 0;
let newDeg= null;
let prize ;
function spinWheel(){
  let rotateDeg = deg +( (Math.random() * 1000) + 3333) ;
  console.log(rotateDeg)
  let pureDeg = rotateDeg%360;
 
  pureDeg = changeDeg(pureDeg,rotateDeg);
  
  checkDeg(pureDeg);
 if(newDeg) rotateDeg = newDeg;
 console.log(rotateDeg)
  console.log(prize)
  spinBtn.removeEventListener('click',spinWheel)
  spinner.style.transform = `rotate(${rotateDeg}deg)`;
deg = rotateDeg;
newDeg = null;
  setTimeout(function(){
    let winner = document.querySelector(`.spin-con_content:nth-of-type(${prize})`)
    let infoSpin = document.querySelector('.spin-info')
    winner.classList.add('won');
    let wItem = winner.children[0].innerText;
    infoSpin.innerText=`Congratulations, Edithya! Your gift is: ${wItem}!`
    // spinBtn.addEventListener('click',spinWheel)
  },5000)
}


function changeDeg(deg,rotateD){
  let degArr = [20.5,69.5,114,159,203,249,293,339.5];
  for (i=0;i<degArr.length;i++){
    if(deg>degArr[i] && deg<(degArr[i]+3)){
      newDeg = rotateD + 8;
      return deg + 8;
    }
    if(deg<degArr[i] && deg>(degArr[i]-3)){
      newDeg = rotateD - 8;
      return deg - 8;
    } 

  }
  return deg;
}

function checkDeg(deg){
   // 20.5,69.5,114,159,203,249,293,339.5
  if(deg>20.5 && deg<69.5){
    prize = '8';
  }else if(deg>69.5 && deg<114){
    prize = '7';
  }else if(deg>114 && deg<159){
    prize = '6';
  }else if(deg>159 && deg<203){
    prize = '5';
  }else if(deg>203 && deg<249){
    prize = '4';
  }else if(deg>249 && deg<293){
    prize = '3';
  }else if(deg>293 && deg<339.5){
    prize = '2';
  }else {
    prize = '1';
  }
}


// gallery zoom

const photosArr = document.querySelectorAll('.gal-box span') ;
const galOv = document.querySelector('.gal-big');
const galOvImg = document.querySelector('.gal-big img');

galOv.addEventListener('click',function(e){
  if(e.target==this){
    galOv.classList.remove('show-galbig');
  }
})

photosArr.forEach((p)=>{
  p.addEventListener('click',function(){
    let src = p.children[0].getAttribute('src');
    galOvImg.setAttribute('src',src)
    galOv.classList.add('show-galbig')
  })
})

// Try autoplay, then retry on the first user interaction if the browser blocks it.
const backgroundMusic = document.getElementById('background-music');
const musicStartEvents = ['click', 'touchend', 'keydown'];
let musicRequested = false;

function startBackgroundMusic() {
    if (!musicRequested || !backgroundMusic.paused) return;
    const playback = backgroundMusic.play();
    if (playback) playback.catch(() => {
        // Native audio controls remain available if playback is blocked.
    });
}

function removeMusicStartListeners() {
    musicStartEvents.forEach(event => {
        document.removeEventListener(event, startBackgroundMusic);
    });
}

musicStartEvents.forEach(event => {
    document.addEventListener(event, startBackgroundMusic);
});
backgroundMusic.addEventListener('playing', removeMusicStartListeners, { once: true });
startBackgroundMusic();


// A little greeting, a note, and a matching game before our story.
const opening = document.getElementById('opening');
const openingSteps = [...opening.querySelectorAll('.opening-step')];
const openingProgress = [...opening.querySelectorAll('.opening-progress li')];
opening.querySelectorAll('[data-next]').forEach(button => {
    button.addEventListener('click', () => {
        startBackgroundMusic();
        const step = Number(button.dataset.next);
        openingSteps.forEach((panel, index) => { panel.hidden = index !== step; });
        openingProgress.forEach((item, index) => {
            if (index === step) item.setAttribute('aria-current', 'step');
            else item.removeAttribute('aria-current');
        });
        opening.scrollTop = 0;
        openingSteps[step].querySelector('h1').focus({ preventScroll: true });
    });
});

const loveGame = document.getElementById('love-game');
const loveStatus = document.getElementById('love-game-status');
const lovePairs = [
    { symbol: '♡', name: 'Heart', message: 'A little love, found twice.' },
    { symbol: '✦', name: 'Star', message: 'You make my ordinary days sparkle.' },
    { symbol: '❀', name: 'Flower', message: 'My favorite thing to watch grow? Us.' }
];
const loveDeck = [...lovePairs, ...lovePairs];
for (let i = loveDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [loveDeck[i], loveDeck[j]] = [loveDeck[j], loveDeck[i]];
}
let revealedCards = [];
let matchedPairs = 0;
let gameLocked = false;
loveDeck.forEach((pair, index) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'love-card';
    card.setAttribute('aria-label', `Reveal card ${index + 1}`);
    card.innerHTML = `<span class="love-card-back" aria-hidden="true">♡</span><span class="love-card-face" aria-hidden="true">${pair.symbol}</span>`;
    card.addEventListener('click', () => {
        if (gameLocked || card.classList.contains('is-open')) return;
        card.classList.add('is-open');
        card.setAttribute('aria-label', `Card ${index + 1}: ${pair.name}`);
        revealedCards.push({ card, pair, index });
        if (revealedCards.length !== 2) return;
        if (revealedCards[0].pair.name === pair.name) {
            revealedCards.forEach(({ card }) => {
                card.classList.add('is-matched');
                card.setAttribute('aria-disabled', 'true');
            });
            matchedPairs++;
            loveStatus.textContent = `${matchedPairs} of 3 pairs found. ${pair.message}`;
            revealedCards = [];
            if (matchedPairs === 3) {
                loveStatus.textContent = '3 of 3 pairs found. A perfect match, just like Afit & Edithya!';
                document.getElementById('opening-complete').hidden = false;
            }
        } else {
            gameLocked = true;
            loveStatus.textContent = 'Not quite a match. Every try brings us a little closer.';
            window.setTimeout(() => {
                revealedCards.forEach(({ card, index }) => {
                    card.classList.remove('is-open');
                    card.setAttribute('aria-label', `Reveal card ${index + 1}`);
                });
                revealedCards = [];
                gameLocked = false;
                loveStatus.textContent = `${matchedPairs} of 3 pairs found. Try another little pair.`;
            }, 1000);
        }
    });
    loveGame.appendChild(card);
});
document.getElementById('enter-story').addEventListener('click', () => {
    if (matchedPairs !== 3) return;
    opening.hidden = true;
    document.getElementById('main-site').hidden = false;
    document.body.classList.remove('opening-active');
    window.scrollTo(0, 0);
    const title = document.querySelector('#show h1');
    title.setAttribute('tabindex', '-1');
    title.focus({ preventScroll: true });
});


// One Play button, then a full-screen 3 → 2 → 1 reveal.
const playIntro = document.getElementById('play-intro');
const playSurprise = document.getElementById('play-surprise');
const introCountdown = document.getElementById('intro-countdown');
playSurprise.addEventListener('click', () => {
    if (playSurprise.disabled) return;
    playSurprise.disabled = true;
    playSurprise.hidden = true;
    musicRequested = true;
    startBackgroundMusic();
    introCountdown.hidden = false;
    let count = 3;
    function showCount() {
        introCountdown.textContent = String(count);
        introCountdown.classList.remove('countdown-tick');
        // Restart the animation for each number.
        void introCountdown.offsetWidth;
        introCountdown.classList.add('countdown-tick');
        window.setTimeout(() => {
            count--;
            if (count > 0) showCount();
            else {
                playIntro.hidden = true;
                opening.hidden = false;
                openingSteps[0].querySelector('h1').focus({ preventScroll: true });
            }
        }, 1000);
    }
    showCount();
});
