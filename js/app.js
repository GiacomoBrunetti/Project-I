$(() => {
  console.log('all working boss');
  let divNumber = null;
  let className = null;
  const $gameOver = $('.gameOver');
  const $article = $('article');
  const $caught = $('#caught').get(0);
  const $byeLife = $('#lifeLost').get(0);
  const $divs = $('div');
  const $play = $('#play');
  const $stopTrack = $('#stop');
  const $RedPlanet = $('#soundtrack').get(0);
  const $lives = $('.lives');
  const $score = $('.score');
  const $section = $('section');
  const $playAgain = $('#playAgain');
  const $left = $('#left');
  const $right = $('#right');
  const $pug = $('.pug');
  const $portal = $('.portal');
  let score = 0;
  let g = 1;
  let falltime = 250;
  let livesNumber = ['&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;'];
  let x = 0;
  console.log(livesNumber.length);

  $right.on('click', () => {
    if (x < 5) {
      x= x+1;
      $('.box'+ (42+x)).addClass('net');
      $('.box'+ (42+x-1)).removeClass('net');
    }
  });

  $left.on('click', ()=> {
    if(x >0){
      x= x-1;
      $('.box'+ (42+x)).addClass('net');
      $('.box'+ (42+x+1)).removeClass('net');
    }
  });

  $lives.html(livesNumber);
  $gameOver.hide();
  $pug.hide();
  $portal.hide();
  $section.hide();
  $divs.hide();
  $score.hide();
  $playAgain.hide();
  $play.focus();
  $article.show();
  $right.hide();
  $left.hide();

  $play.on('click', ()=> {
    $('html, body').animate({ scrollTop: $(document).height() }, 2000);
    $section.show();
    $divs.show();
    $score.show();
    $play.hide();
    $right.show();
    $left.show();
    $stopTrack.hide();
    $article.show();
    $lives.html(livesNumber);
    generateAnimal();
    fallOne();
  });


  $gameOver.on('mouseover', ()=>{
    $gameOver.text(`${score}`);
  });
  $gameOver.on('mouseout', ()=>{
    $gameOver.text('Game Over');
  });


  $stopTrack.on('click', () => {
    if ( g%2 !== 0){
      $RedPlanet.pause();
      $stopTrack.html('Play music');
      g+=1;
    } else {
      $RedPlanet.play();
      $stopTrack.html('Stop music');
      g+=1;
    }console.log(g);
  });

  //move net function
  $('body').keydown(function(e) {

      //keypress rigth moves right
    if (e.keyCode === 39) {
      if (x < 5) {
        x= x+1;
        $('.box'+ (42+x)).addClass('net');
        $('.box'+ (42+x-1)).removeClass('net');
      }
    //keypress left moves left
    } else if(e.keyCode === 37) {
      if(x >0){
        x= x-1;
        $('.box'+ (42+x)).addClass('net');
        $('.box'+ (42+x+1)).removeClass('net');
      }
    }
  });

//generate the animal
  function generateAnimal() {
    divNumber = Math.floor(Math.random()*6);
    className = Math.random() > 0.5 ? 'cat' : 'dog';
    console.log(divNumber, className);
    $(`.box${divNumber}`).addClass(className);
  }

  // Make the animal fall
  function fallOne() {
    if (livesNumber.length>0) {
      if (falltime>= 100){
        falltime--;
      }
      setTimeout(() => {
        if (divNumber <= 41) {
          if (className==='cat'){
            $(`.box${divNumber}`).removeClass('cat');
            divNumber += 6;
            $(`.box${divNumber}`).addClass('cat');
            fallOne();
          } else {
            $(`.box${divNumber}`).removeClass('dog');
            divNumber += 6;
            $(`.box${divNumber}`).addClass('dog');
            fallOne();
          }
        } else {
          checkCatch();
          generateAnimal();
          fallOne();
        }
      }, falltime);
    } else {
      ($(`.box${divNumber}`).removeClass('cat dog'));
      $gameOver.show();
      $playAgain.show();
      $article.hide();
      $section.hide();
      $divs.hide();
      $portal.show();
      $pug.show();
      $pug.animate({
        marginLeft: '+=1700px'
      }, 6000);
    }
  }

  function checkCatch() {
    switch($(`.box${divNumber}`).hasClass('net')) {
      case true:
        score = score+1;
        $caught.play();
        $score.text(score);
        break;
      case false:
        $byeLife.play();
        livesNumber.pop();
        $lives.html(livesNumber);
    } ($(`.box${divNumber}`).removeClass('cat dog'));
  }

  $playAgain.on('click', () => {
    livesNumber = ['&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;'];
    falltime = 250;
    score = 0;
    $play.show();
    $stopTrack.show();
    $gameOver.hide();
    $playAgain.hide();
    $portal.hide();
    $pug.stop().removeAttr('style').hide();
  });
});
