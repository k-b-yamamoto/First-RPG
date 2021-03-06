'use strict';

const villMessage = [                                                            //村メッセージ
  {vM1 : '祈っていましょう', vM2 : 'きっと死者たちが守ってくださる'},
  {vM1 : '魔王を倒して！', vM2 : null},
  {vM1 : 'その昔、たった一人の勇者が世界を救った', vM2 : '彼女は自らの剣を何処かに残したそうじゃ'},
  {vM1 : '助けてください！', vM2 : '北の城から来る魔物で街はめちゃくちゃです'},
  {vM1 : 'ダメだ もうおしまいなんだぁ〜', vM2 : null},
  {vM1 : '魔物が近寄らなくなりました！', vM2 : "本当にありがとう！"},
  {vM1 : '勇者様、本当にありがとう！', vM2 : "村をあげて歓迎いたしますわ！"},
  {vM1 : '魔王が死んだぞ！', vM2 : '今日は宴だぁ〜！'},
  {vM1 : '最近このあたりでおぞましい叫び声がするわ', vM2 : 'きっと死者たちがお怒りなのよ'},
  {vM1 : '叫び声が止んだわ', vM2 : '私たちの祈りが通じたのね'},
  {vM1 : '久しぶりに会いたいのう', vM2 : '彼女は元気じゃったか？'},
  {vM1 : '先代の勇者は内気な娘での', vM2 : '人々の歓迎も避けてすぐに去ってしまった'}
];

function village(vN){                                       //マス効果（村１
  hero1.setHp = hero1.getMhp;                                                               //街で休憩
  Save();
  setMessage(villMessage[vN].vM1, villMessage[vN].vM2);
}