//html endorsement
const cards = document.getElementsByTagName('div');
const total = document.querySelector('.totalMoves');
const moves = document.querySelector('.moves');
const lost = document.querySelector('.lostModal');
const win = document.querySelector('.winModal');
const resets = document.querySelectorAll('.restart');
const images = document.querySelectorAll('.gridItem img');
const paras = document.querySelectorAll('.gridItem p');


//ensuring that the order of items are never the same any time the page loads
window.addEventListener('load', () => {
  for(let card of cards) {
    card.style.order = Math.floor(Math.random() * 17);
  }
});


//adding functionality to cards
for (let card of cards) {
  card.addEventListener('click', flip);
}
//flipping function, once flip starts show image
function flip(e) {
  e.target.classList.add('flip');
  e.target.addEventListener('animationstart', showImage);
  //update number of moves
  moves.textContent = Number(moves.textContent) + 1;
  //if you run out of moves you lose 😝
  if(moves.textContent == total.textContent) {
    setTimeout(() => {
      lost.showModal();
    }, 800);
  }
  //if you guess all correctly you win
  won();
}
//image is displayed a couple of milliseconds after click and text is hidden; pass the card, it's image, text and title arguments to the checkMatch function
function showImage(e) {
    let children = e.target.childNodes;
    setTimeout(() => {
       children[1].style.display = 'none';
        children[3].style.display = 'block';
        }, 420);
    let item = e.target;
    let obj = e.target.title;
    checkMatch(item, children[3],children[1], obj);
}
//initialize count for switch statment
let count = 0;
//initialize variables to store the previous card, it's image, text and title
let former = '';
let formerImage = '';
let formerPara = '';
let formerTitle = '';
//"matchmaker" function 😂
function checkMatch(gridItem, image, para, data) {
  //first the switch statement to account for the current and previously clicked cards
  switch(count) {
    case 0:
      //on clicking for the first time, store a reference to the current card and it's details, then increment count
      former = gridItem;
      formerImage = image;
      formerPara = para;
      formerTitle = data;
      count++;
    break;
    
    case 1:
      //on clicking the second time i.e. a new card, if the titles are the same for current and previous cards, add the check class(not really necessary, just makes sense)
      if(gridItem.title == formerTitle) {
        gridItem.classList.add('check');
        former.classList.add('check');
      }
      //if the titles are different, remove 'flip' class, so that they can swivel again like they did at the very start
      else {
        setTimeout(() => {
          gridItem.classList.remove('flip');
          former.classList.remove('flip')
        }, 600);
        //add a swivel action in the reverse direction
        setTimeout(() => {
          gridItem.classList.add('flipBack');
          former.classList.add('flipBack');
        }, 650);
        //display question marks and hide images
        setTimeout(() => {
          formerImage.style.display = 'none';
          image.style.display = 'none';
          para.style.display = 'block';
          formerPara.style.display = 'block';
          //remove the reverse swivel - ensures that the game accounts for more than one failed guess
          gridItem.classList.remove('flipBack');
          former.classList.remove('flipBack');
        }, 1450);
      }
      //initialize count
      count = 0;
    break;
  }
}


//winning function
//check if all the cards have the class name "flip", if they do, declare victory 🙌
function won() {
  let array = [];
  for(let card of cards) {
    if(card.classList.contains('flip')) {
      array.push('yes');
    }
  }
  if(array.length == 16) {
    setTimeout(() => {
      win.showModal();
      //if the player opens all cards successfully on the 40th move, the lost modal should not appear cus he/she barely won
      lost.close();
    }, 810);
  }
}


//reset time 🎯
for(let reset of resets) {
  reset.addEventListener('click', ohayo);
}
//reset function
function ohayo() {
  //close modals
  win.close();
  lost.close();
  //remove flip class, remove images and display text; also, cards are scattered to ensure that the same order is never repeated
  for(let card of cards) {
    card.classList.remove('flip');
    card.style.order = Math.floor(Math.random() * 17);
  }
  for (let image of images) {
    image.style.display = 'none';
  }
  for (let para of paras) {
    para.style.display = 'block';
  }
  //reset moves board
  moves.textContent = 0;
}
