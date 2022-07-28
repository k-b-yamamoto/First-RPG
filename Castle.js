'use strict';

function bossCastle(){
  if(IsBoss == 0){
    IsBoss = 1;
    AppearEnemy();                                        //ボスエンカウント
  } else if(gTalk == 0){
    setMessage ('城内を奇妙な静けさが支配している', 'ただ魔物たちが王を偲ぶ声だけが聞こえる');
    gTalk = 1;  
  }
}

function midBossCastle(){
  if(IsMid_Boss == 0){
    IsMid_Boss = 1;
    AppearEnemy();
  } else if(gTalk == 0){
    setMessage('城内に冷たい風が吹く', 'すすり泣きの声に似ている');
    gTalk = 1;
  }
}

function guardCastle(){
  if(gGuard == 0){
    gGuard = 1;
    AppearEnemy();
  }
}
function chest(){
  gItem = 1;                                                                //カギ入手処理
  setMessage ('” 魔王城へのカギ ” を手に入れた', null);
}


function gate(){
  if(gItem == 0){                                                           //カギ未所持の場合
    gPlayerY -= TILESIZE;                                                   //一マス上へ移動
    setMessage ('扉が閉ざされている', 'カギが必要なようだ');
  } else if(gItem == 1 && gGuard < 4){
    if(gTalk == 0){
      setMessage ('" 魔王城へのカギ "を差し込んだ','扉が開いた' );
      gTalk = 1;
    }
    gGuard = 3;
  }
}

function PlaceOfTB(){                                   //マス効果（裏ボス）
  if(IsTrueBoss == 1){
  IsTrueBoss ++;
  AppearEnemy();
  } else if(IsTrueBoss == 4){
  } else {
    setMessage('行き止まりだ', '波さえも静まりかえっている');
  }
}
