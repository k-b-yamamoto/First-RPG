'use strict';
let gShoes = 0;
let gPlusSpeed = 0;
let gPlusAvoid = 0;

function ShoesEffect(gShoes){
  if(gShoes == 1){
    SCROLL = 2;
    gPlusSpeed = hero1.getLv / 5;
    gPlusAvoid = hero1.getLv /5;
    return; 
  } else {
    SCROLL = 1;
    gPlusSpeed = 0;
    gPlusAvoid = 0;
    return;
  }
}