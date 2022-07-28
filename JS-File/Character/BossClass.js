'use strict';

let gBossHP;                                                //ボスクラスのHP
let gBossMHP;                                               //ボスクラスの初期HP
let dSP;                                                    //ボス級攻撃力要素
let M1;                                                     //ボスメッセージ要素
let M2;                                                     //ボスメッセージ要素

let BossClassNumber;                                                     //ボスクラス引数
let gImgBossClass;                                        //ボス級画像

// const Boss = class{
//   get getBossHP(){
//     return this.gBossHP;
//   }
//   set setBossHP(gBossHP){
//     this.gBossHP = gBossHP;
//   }

//   get getDSP(){
//     return this.dSP;
//   }
//   set setDSP(dSP){
//     this.dSP = dSP;
//   }
// }

const gFileBossClass = [
  {name : '魔王デマオン', url : 'Image/monster-image/m49.png', mHp : 100},            //ボス画像
  {name : '魔塔の番犬', url :'Image/monster-image/m50.png', mHp : 35},              //門番１
  {name : '魔王城の門番', url :'Image/monster-image/m64.png', mHp : 50},            //門番２
  {name : '薄氷の王女', url :'Image/monster-image/m79.png', mHp : 40},              //中ボス
  {name : '%E5%8B%87%E8%80%85', url :'Image/monster-image/m72.png', mHp : 300}     //裏ボス
];

const AppearMessageI = [                                                          //ボス出現時のセリフ
  {m1 : '「一人とは愚かな。看取る者なく消えるがいい」', m2 : ' 魔王デマオン が現れた！'},
  {m1 : '「ココ・・・通さナイ・・・」', m2 : ' 魔塔の番犬 が現れた'},
  {m1 : '「俺様の門をくぐれると思ったか！」', m2 : ' 魔王城の門番 が現れた'},
  {m1 : '「お前一人で私の相手になるとでも？」', m2 : ' 薄氷の王女 が現れた'},
  {m1 : '奇声と共に', m2 : '突然何者かが襲いかかってきた！'}
];

const leaveMessage = [
  {m1 : '魔王を倒し', m2 : '世界に平和が訪れた'},
  {m1 : '「魔王サマ・・ゴメンなさイ・・・」', m2 : '魔塔の番犬は倒れた'},
  {m1 : '「ちぇっ・・負けちまったよ・・・」', m2 : '魔王城の門番は倒れた'},
  {m1 : '「デマオン・・・悲しまないで」', m2 : '薄氷の王女は風に消えていった'},
  {m1 : '「%E5%AF%82%E3%81%97%E3%81%84」', m2 : '何かを呟いてそれは消えていった'}
];

function BossEvent(){
  if(IsBoss == 1 || IsMid_Boss == 1 || IsTrueBoss == 2 || gGuard == 1 || gGuard == 3){
    IsBossClass = true;
  } else {
    IsBossClass = false;
  }
  return;
}


function setBossNumber(IsBoss, IsMid_Boss, IsTrueBoss, gGuard){
  if(IsBoss == 1){
    BossClassNumber= 0;
  }
  if(gGuard == 1){
    BossClassNumber = 1;
  }
  if(gGuard == 3){
    BossClassNumber = 2;
  }
  if(IsMid_Boss == 1){
    BossClassNumber = 3;
  }
  if(IsTrueBoss == 2){
    BossClassNumber = 4;
  }
  return BossClassNumber;
}

function setBossHP(BossClassNumber){
  //console.log('BN = ' + BossClassNumber);
  gBossMHP = gFileBossClass[BossClassNumber].mHp;
  gBossHP = gBossMHP;
}

function getBossMessage(BossClassNumber, gPhase){
  //console.log('bn = ' + BOssClassNumber);
  if(gPhase == 1){
    M1 = AppearMessageI[BossClassNumber].m1;
    M2 = AppearMessageI[BossClassNumber].m2;
    return;
  }
  if(gPhase == 9){
    M1 = leaveMessage[BossClassNumber].m1;
    M2 = leaveMessage[BossClassNumber].m2;
    return;
  }
}

function BossPower(BossClassNumber){
  switch(BossClassNumber){
    case 0:
      dSP = Math.floor( 20 + (1 + Math.random() * 21));
    break;
    case 1:
      dSP = Math.floor( 3 + (1 + Math.random() * 20));
      break;
    case 2:
      dSP = Math.floor( 8 + (1 + Math.random() * 10));
      break;
    case 3:
      dSP = Math.floor( 4 + (1 + Math.random() * 12));
      break;
    case 4:
      dSP = Math.floor( 20 + (1 + Math.random() * 81));
      break;
  }
  return dSP;
}

function DrawBossClass(BossClassNumber,g){
  //console.log('BN = ' + BossClassNumber);
  gImgBossClass = new Image(); gImgBossClass.src = gFileBossClass[BossClassNumber].url; //ボス画像読み込み    
  if(BossClassNumber == 0){
    g.drawImage( gImgBossClass, WIDTH / 2 - gImgBossClass.width / 2.4, HEIGHT / 2 - gImgBossClass.height / 2.4, gImgBossClass.width / 1.2, gImgBossClass.height / 1.2);
  } else {
    g.drawImage( gImgBossClass, WIDTH / 2 - gImgBossClass.width / 4, HEIGHT / 2 - gImgBossClass.height / 4, gImgBossClass.width / 2, gImgBossClass.height / 2);
  }
}
