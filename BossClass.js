'use strict';

let gBossHP;                                                //ボスクラスのHP
let gBossMHP;                                               //ボスクラスの初期HP
let dSP;                                                    //ボス級攻撃力要素
let M1;                                                     //ボスメッセージ要素
let M2;                                                     //ボスメッセージ要素

let gImgBossClass;                                        //ボス級画像
const gFileBossClass = [
  {name : '魔王デマオン', url : 'image/monster-image/m49.png', mHp : 100},            //ボス画像
  {name : '魔塔の番犬', url :'image/monster-image/m50.png', mHp : 25},              //門番１
  {name : '魔王城の門番', url :'image/monster-image/m64.png', mHp : 35},            //門番２
  {name : '薄氷の王女', url :'image/monster-image/m79.png', mHp : 40},              //中ボス
  {name : '%E5%8B%87%E8%80%85', url :'image/monster-image/m72.png', mHp : 300}     //裏ボス
];

const AppearMessageI = [                                                          //ボス出現時のセリフ
  {m1 : '「一人とは愚かな。看取る者なく消えるがいい」', m2 : '" 魔王デマオン "が現れた！'},
  {m1 : '「ここ・・・通さナイ・・・」', m2 : '” 魔塔の番犬 ”が現れた'},
  {m1 : '「俺様の門をくぐれると思ったか！」', m2 : '" 魔王城の門番 "が現れた'},
  {m1 : '「お前一人で私の相手になるとでも？」', m2 : '" 薄氷の王女"が現れた'},
  {m1 : '奇声と共に', m2 : '突然何者かが襲いかかってきた！'}
];

const leaveMessage = [
  {m1 : '魔王を倒し', m2 : '世界に平和が訪れた'},
  {m1 : '「魔王サマ・・ゴメンなさイ・・・」', m2 : '魔塔の番犬は倒れた'},
  {m1 : '「ちぇっ・・負けちまったよ・・・」', m2 : '魔王城の門番は倒れた'},
  {m1 : '「デマオン•••悲しまないで」', m2 : '薄氷の王女は風に消えていった'},
  {m1 : '「%E5%AF%82%E3%81%97%E3%81%84」', m2 : '何かを呟いてそれは消えていった'}
];

function setBossNumber(IsBoss, IsMid_Boss, IsTrueBoss, gGuard){
  if(IsBoss == 1){
    BN = 0;
  }
  if(gGuard == 1){
    BN = 1;
  }
  if(gGuard == 3){
    BN = 2;
  }
  if(IsMid_Boss == 1){
    BN = 3;
  }
  if(IsTrueBoss == 2){
    BN = 4;
  }
  return BN;
}

function setBossHP(BN){
  console.log('BN = ' + BN);
  gBossMHP = gFileBossClass[BN].mHp;
  gBossHP = gBossMHP;
}

function getBossMessage(BN, gPhase){
  //console.log('bn = ' + BN);
  if(gPhase == 1){
    M1 = AppearMessageI[BN].m1;
    M2 = AppearMessageI[BN].m2;
    return;
  }
  if(gPhase == 9){
    M1 = leaveMessage[BN].m1;
    M2 = leaveMessage[BN].m2;
    return;
  }
}

function BossPower(BN){
  switch(BN){
    case 0:
      dSP = Math.floor( 20 + (1 + Math.random() * 21));
    break;
    case 1:
      dSP = Math.floor( 3 + (1 + Math.random() * 18));
      break;
    case 2:
      dSP = Math.floor( 8 + (1 + Math.random() * 9));
      break;
    case 3:
      dSP = Math.floor( 5 + (1 + Math.random() * 11));
      break;
    case 4:
      dSP = Math.floor( 20 + (1 + Math.random() * 81));
      break;
  }
  return dSP;
}

function DrawBossClass(BN,g){
  //console.log('BN = ' + BN);
  gImgBossClass = new Image(); gImgBossClass.src = gFileBossClass[BN].url; //ボス画像読み込み    
  if(BN == 0){
    g.drawImage( gImgBossClass, WIDTH / 2 - gImgBossClass.width / 2.4, HEIGHT / 2 - gImgBossClass.height / 2.4, gImgBossClass.width / 1.2, gImgBossClass.height / 1.2);
  } else {
    g.drawImage( gImgBossClass, WIDTH / 2 - gImgBossClass.width / 4, HEIGHT / 2 - gImgBossClass.height / 4, gImgBossClass.width / 2, gImgBossClass.height / 2);
  }
}