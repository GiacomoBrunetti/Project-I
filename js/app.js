$(() => {
  console.log('all working boss');
  let divNumber = null;
  const $box30 = $('#30');
  const $box31 = $('#31');
  const $box32 = $('#32');
  const $box33 = $('#33');
  const $box34 = $('#34');
  const $box35 = $('#35');
  const $play = $('button');
  const $lives = $('.lives');
  const $score = $('.score');
  let score = 0;
  const livesNumber = ['&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;'];
  let x = 1;

  $play.focus();

  $lives.html(livesNumber);
//move net function
  $('body').keydown(function(e) {
    // if (divNumber>=29) {
      //keypress rigth moves right
    if (e.keyCode === 39) {
      console.log('pressed right');
      $('.box'+ (30+x)).addClass('net');
      $('.box'+ (30+x-1)).removeClass('net');
      x= x+1;
      console.log(x);
    //keypress left moves left
    } else if(e.keyCode === 37) {
      console.log('pressed left');
      $('.box'+ (30+x-1)).addClass('net');
      $('.box'+ (30+x)).removeClass('net');
      x= x-1;
      console.log(x);
    }
    //}
  });

//select random div to generate animal
  function randomDiv() {
    divNumber = Math.floor(Math.random()*6);
  }

//generate the animal
  function generateAnimal() {
    randomDiv();
    $('.box'+divNumber).addClass('cat');
  }
  console.log(divNumber);

  $play.on('click', ()=>{
    generateAnimal();
    fallOne();
    // keepGoing();

  });
// create loop
  // function keepGoing() {
  //   while (livesNumber.length>0) {
  //     generateAnimal();
  //     fallOne();
  //   }
  // }

  // Make the animal fall
  function fallOne() {
    let falltime = 1000;
    fallTime();
    function fallTime() {
      if (fallTime>=300){
        var timerId2 = setInterval(() => {
          falltime = falltime - 100;
        }, 30000);
      } clearInterval(timerId2);
    }

    var timerId = setInterval(() => {

      if (divNumber<=35){
        $('.box'+(divNumber)).removeClass('cat');
        divNumber += 6;

        $('.box'+(divNumber)).addClass('cat');
        console.log('fallOne', divNumber);

      } else
      clearInterval(timerId);

      // function to make you lose lifes
      function lifeLoss() {

        const $bottom = [$box30.attr('class').toString(), $box31.attr('class').toString(), $box32.attr('class').toString(), $box33.attr('class').toString(), $box34.attr('class').toString(), $box35.attr('class').toString()];

        console.log($bottom);
        if ($bottom.includes('box30 net cat')||$bottom.includes('box31 net cat')||$bottom.includes('box32 net cat')||$bottom.includes('box33 net cat')||$bottom.includes('box34 net cat')||$bottom.includes('box35 net cat')) {

          console.log('you caught a cat!');
          score = score+1;
          $score.text(score);

        } else if ($bottom.includes('box30 cat')||$bottom.includes('box31 cat')||$bottom.includes('box32 cat')||$bottom.includes('box33 cat')||$bottom.includes('box34 cat')||$bottom.includes('box35 cat')) {

          alert('you lost a life');

          livesNumber.pop();
          $lives.html(livesNumber);
        }
      }
      lifeLoss();
    }, falltime);
    function clear() {
      
    }
    clear();
  }








  // keepGoing();

});
