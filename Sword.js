'use strict';

let kaishin;
let miracle;
let swordAttack = 0;                               //装備攻撃力

function Sword(gSword){
  kaishin = 0;
  miracle = 0;
  swordAttack = 0;
  if(gSword == 0){
    return;
  }
  
  if(gSword == 1){                                 //奇跡の剣攻撃処理
    kaishin = Math.floor(Math.random() * 5);
    //console.log('会心数' + kaishin);
    if(kaishin == 0){
      miracle = Math.floor(Math.random() * 20);
      //console.log('奇跡数' + miracle);
      if(miracle == 7 || miracle == 77){
        swordAttack = 100;
        return swordAttack;
      } else {
        swordAttack = 50;
        return swordAttack;
      }
    } else {
      return;
    }
  }
  
  if(gSword == 2){                                 //勇者の剣攻撃処理
    swordAttack = 30;
    return swordAttack;
  }
}