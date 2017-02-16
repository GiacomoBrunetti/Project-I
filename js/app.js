var rain = rain || {};

//------------------------- generate the animal --------------------------------
rain.generateAnimal = function generateAnimal() {
  this.divNumber = Math.floor(Math.random()*6);
  this.className = Math.random() > 0.5 ? 'cat' : 'dog';
  console.log(this.divNumber, this.className);
  $(`.box${this.divNumber}`).addClass(this.className);
};

  //------------------------ Make the animal fall -------------------------------
rain.fallOne = function fallOne() {
  let timerId = null;
  if (this.livesNumber.length>0) {
    if (this.falltime>= 100){
      this.falltime--;
    }
    timerId = setTimeout(() => {
      if (this.divNumber <= 41) {
        if (this.className==='cat'){
          $(`.box${this.divNumber}`).removeClass('cat');
          this.divNumber += 6;
          $(`.box${this.divNumber}`).addClass('cat');
          this.fallOne();
        } else {
          $(`.box${this.divNumber}`).removeClass('dog');
          this.divNumber += 6;
          $(`.box${this.divNumber}`).addClass('dog');
          this.fallOne();
        }
      } else {
        this.checkCatch();
        this.generateAnimal();
        this.fallOne();
      }
    }, this.falltime);
//---------------------------- if you run out of lives ----------------------------
  } else {
    clearTimeout(timerId);
    ($(`.box${this.divNumber}`).removeClass('cat dog'));
    this.$gameOver.show();
    this.$playAgain.show();
    this.$article.hide();
    this.$section.hide();
    this.$divs.hide();
    this.$portal.show();
    this.$pug.show();
    const width = this.$body.width();
    this.$pug.animate({
      marginLeft: '+='+(width-100).toString()+'px'
    }, 6000, () => {
      this.$pug.hide();
    });
  }
};
//------------------------ chech if you caught an animal---------------------
rain.checkCatch = function checkCatch() {
  switch($(`.box${this.divNumber}`).hasClass('net')) {
    case true:
      this.score = this.score+1;
      this.$caught.play();
      this.$score.text(this.score);
      if (this.score % 50 === 0){
        rain.$woohoo.play();
      }
      break;
//----------------------- if not take a life away ------------------------------
    case false:
      this.$byeLife.play();
      this.livesNumber.pop();
      this.$lives.html(this.livesNumber);
  } ($(`.box${this.divNumber}`).removeClass('cat dog'));
};

rain.setup = function() {
  console.log('all working boss');
  rain.$body = $('body');
  rain.$woohoo = $('#woohoo').get(0);
  rain.divNumber = null;
  rain.className = null;
  rain.$gameOver = $('.gameOver');
  rain.$article = $('article');
  rain.$caught = $('#caught').get(0);
  rain.$byeLife = $('#lifeLost').get(0);
  rain.$divs = $('div');
  rain.$play = $('#play');
  rain.$stopTrack = $('#stop');
  rain.$RedPlanet = $('#soundtrack').get(0);
  rain.$lives = $('.lives');
  rain.$score = $('.score');
  rain.$section = $('section');
  rain.$playAgain = $('#playAgain');
  rain.$left = $('#left');
  rain.$right = $('#right');
  rain.$pug = $('.pug');
  rain.$portal = $('.portal');
  rain.score = 0;
  rain.g = 1;
  rain.falltime = 250;
  rain.livesNumber = ['&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;'];
  rain.x = 0;
  console.log(rain.livesNumber.length);
  rain.$lives.html(rain.livesNumber);
  rain.$gameOver.hide();
  rain.$pug.hide();
  rain.$portal.hide();
  rain.$section.hide();
  rain.$divs.hide();
  rain.$score.hide();
  rain.$playAgain.hide();
  rain.$play.focus();
  rain.$article.show();
  rain.$right.hide();
  rain.$left.hide();

  // ----------------------------- start the game ----------------------------
  rain.$play.on('click', ()=> {
    $('html, body').animate({ scrollTop: $(document).height() }, 2000);
    this.$section.show();
    this.$divs.show();
    this.$score.show();
    this.$score.html(this.score);
    this.$play.hide();
    this.$right.show();
    this.$left.show();
    this.$stopTrack.hide();
    this.$article.show();
    this.$lives.html(this.livesNumber);
    this.generateAnimal();
    this.fallOne();
  });

  // ------------------------ show the score -------------------------
  rain.$gameOver.on('mouseover', ()=>{
    this.$gameOver.text(`${this.score}`);
  });
  rain.$gameOver.on('mouseout', ()=>{
    this.$gameOver.text('Game Over');
  });

  // ------------------------- Stop or Play music ------------------------
  rain.$stopTrack.on('click', () => {
    if ( this.g % 2 !== 0){
      this.$RedPlanet.pause();
      this.$stopTrack.html('Play music');
      this.g += 1;
    } else {
      this.$RedPlanet.play();
      this.$stopTrack.html('Stop music');
      this.g += 1;
    }console.log(this.g);
  });

  //--------------- move portal (net) function with arrow keys ------------------
  rain.$body.keydown(function(e) {
    console.log('inside body function');
    //keypress rigth moves right
    if (e.keyCode === 39) {

      if (rain.x < 5) {
        console.log('going in the if');

        rain.x = rain.x +1;
        $('.box'+ (42+rain.x)).addClass('net');
        $('.box'+ (42+rain.x-1)).removeClass('net');
      }
      //keypress left moves left
    } else if(e.keyCode === 37) {
      console.log('going in the else if');
      if(rain.x >0){
        rain.x= rain.x-1;
        $('.box'+ (42+rain.x)).addClass('net');
        $('.box'+ (42+rain.x+1)).removeClass('net');
      }
    }
  });
  //------------------ move the portal (net) with arrow buttons-----------------------
  rain.$right.on('click', () => {
    if (rain.x < 5) {
      rain.x = rain.x +1;
      $('.box'+ (42+rain.x)).addClass('net');
      $('.box'+ (42+rain.x-1)).removeClass('net');
    }
  });
  rain.$left.on('click', ()=> {
    if(rain.x >0){
      rain.x= rain.x-1;
      $('.box'+ (42+rain.x)).addClass('net');
      $('.box'+ (42+rain.x+1)).removeClass('net');
    }
  });
  //------------------------- click play again to show start ------------------------------
  rain.$playAgain.on('click', () => {
    this.livesNumber = ['&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;'];
    this.falltime = 250;
    this.score = 0;
    this.$play.show();
    this.$stopTrack.show();
    this.$gameOver.hide();
    this.$playAgain.hide();
    this.$portal.hide();
    this.$pug.stop().removeAttr('style').hide();
  });
};


$(rain.setup.bind(rain));
