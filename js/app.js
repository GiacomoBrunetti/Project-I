$(() => {
  console.log('all working boss');
  let divNumber = null;
  let className = null;
  const $caught = $('#caught').get(0);
  const $byeLife = $('#lifeLost').get(0);
  const $divs = $('div');
  const $play = $('#play');
  const $stopTrack = $('#stop');
  const $RedPlanet = $('#soundtrack').get(0);
  const $lives = $('.lives');
  const $score = $('.score');
  const $section = $('section');
  let score = 0;
  const livesNumber = ['&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;'];
  let x = 0;
  console.log(livesNumber.length);
  $section.hide();
  $divs.hide();
  $score.hide();
  $play.focus();
  $play.on('click', ()=> {
    $section.show();
    $divs.show();
    $score.show();
    $play.hide();
    $stopTrack.hide();
  });
  $stopTrack.on('click', () => {
    $RedPlanet.pause();
  });

  $lives.html(livesNumber);
//move net function
  $('body').keydown(function(e) {

      //keypress rigth moves right
    if (e.keyCode === 39) {
      if (x < 5) {
        console.log('pressed right');
        x= x+1;
        $('.box'+ (42+x)).addClass('net');
        $('.box'+ (42+x-1)).removeClass('net');
        console.log(x);
      }
    //keypress left moves left
    } else if(e.keyCode === 37) {
      if(x >0){
        console.log('pressed left');
        x= x-1;
        $('.box'+ (42+x)).addClass('net');
        $('.box'+ (42+x+1)).removeClass('net');
        console.log(x);
        // console.log(x);
      }
    }

  });

//generate the animal
  function generateAnimal() {
    divNumber = Math.floor(Math.random()*6);
    className = Math.random() > 0.5 ? 'cat' : 'dog';
    $(`.box${divNumber}`).addClass(className);
  }
  console.log(divNumber);

  $play.on('click', () => {
    generateAnimal();
    fallOne();
  });

  // Make the animal fall
  let falltime = 250;

  function fallOne() {
    // if (livesNumber>=0){
    if (falltime>= 150){
      falltime--;
    }
    setTimeout(() => {
      if (divNumber <= 41) {
        if (className==='cat'){
          $(`.box${divNumber}`).removeClass('cat');
          divNumber += 6;
          $(`.box${divNumber}`).addClass('cat');
          // console.log('fallOne', divNumber);
          fallOne();
        } else {
          $(`.box${divNumber}`).removeClass('dog');
          divNumber += 6;
          $(`.box${divNumber}`).addClass('dog');
          // console.log('fallOne', divNumber);
          fallOne();
        }
      } else {
        checkCatch();
        generateAnimal();
        fallOne();
      }
    }, falltime);
  }

  function checkCatch() {
    switch($(`.box${divNumber}`).hasClass('net')) {
      case true:
        console.log('you caught an animal'+`.box${divNumber}`);
        score = score+1;
        $caught.play();
        $score.text(score);
        break;
      case false:
        console.log('you lost a life');
        $byeLife.play();
        livesNumber.pop();
        $lives.html(livesNumber);
        console.log(livesNumber.length);

    } ($(`.box${divNumber}`).removeClass('cat dog'));
  }

});
