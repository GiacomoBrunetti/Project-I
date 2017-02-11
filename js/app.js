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
  const livesNumber = ['&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;','&hearts;'];

  $lives.html(livesNumber);





//select random div to generate animal
  function randomDiv() {
    divNumber = Math.floor(Math.random()*6);
  }






//generate the animal
  function generateAnimal() {
    randomDiv();
    $('.box'+divNumber).addClass('cat');
    console.log(divNumber);

  }
  $play.on('click', ()=>{
    generateAnimal();
    fallOne();
    keepGoing();

  });
// create loop
  function keepGoing() {
    while(livesNumber>0){
      generateAnimal();
      fallOne();
    }
  }





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

      function lifeLoss() {

        const $bottom = [$box30.attr('class').toString(), $box31.attr('class').toString(), $box32.attr('class').toString(), $box33.attr('class').toString(), $box34.attr('class').toString(), $box35.attr('class').toString()];

        console.log($bottom);

        if ($bottom.includes('box30 cat')||$bottom.includes('box31 cat')||$bottom.includes('box32 cat')||$bottom.includes('box33 cat')||$bottom.includes('box34 cat')||$bottom.includes('box35 cat')) {
          alert('you lost a life');
          livesNumber.pop();
          $lives.html(livesNumber);
        }
      }

      lifeLoss();



      // function to make you lose lifes

    }, falltime);
  }










});
