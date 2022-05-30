'use strict';

let kaishin;
let miracle;
let swordAttack = 0;                                        //装備攻撃力
let magicAttack;
let recoilDamage;                                           //反動ダメージ要素
let stuckNumber;
let stuck = false;

function Sword(gSword){
  kaishin = 0;
  magicAttack = null;
  miracle = 0;
  stuckNumber = null;
  swordAttack = 0;
  if(gSword == 0){
    return;
  }
  
  if(gSword == 1){                                 //奇跡の剣攻撃処理
    kaishin = Math.floor(Math.random() * 5);
    //console.log('会心数' + kaishin);
    if(kaishin == 1){
      miracle = Math.floor(Math.random() * 20);
      //console.log('奇跡数' + miracle);
      if(miracle == 7){
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
    swordAttack = Math.floor(25 + Math.random() * 11);
    kaishin = Math.floor(Math.random() * 10);
    stuckNumber = Math.floor(Math.random() * 5);
    if(kaishin == 1){
      swordAttack += Math.floor(50 + Math.random() * 10);
    }
    return;
  }

  if(gSword == 3){                                 //ヒュドラの魔剣 攻撃処理
    magicAttack = Math.floor(Math.random() * 3);
    //console.log('魔法攻撃判定 ' + magicAttack);
    if(magicAttack == 1){
      swordAttack = 70;
      stuckNumber = Math.floor(Math.random() * 5);
      return;
    } else {}
  }
}

//魔剣使用の反動ダメージ関数
function recoil(gHP){
  //console.log('gHP = ' + gHP);
  if(gHP > 10){
    //console.log('HPが10より上なので体力を一桁まで削ります');
    recoilDamage = Math.floor( 1 + Math.random() * 9);
    //console.log('反動ダメージ要素 = ' + recoilDamage);
  } else {
    //console.log('HPが10以下なので体力を1まで削ります');
    recoilDamage = 1;
  }
  return recoilDamage;
}