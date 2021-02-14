export const stages = ["無興趣階段", "自在階段", "階段間的切換", "交往階段"];

export const groups = [
  {
    index: 0,
    content: "先調整自我外在, 談吐, 其他客觀條件, 嘗試改變女方的印象",
    stage: stages[0],
  },
  {
    index: 1,
    content: "下次見面時嘗試跟對方打招呼, 點頭或攀談",
    stage: stages[0],
  },
  {
    index: 2,
    content: "試著跟她攀談, 從兩人共通的社交議題開始",
    stage: stages[0],
  },
  {
    index: 3,
    content: "試著跟她攀談, 話題可以談工作與已知的個人狀態",
    stage: stages[0],
  },
  {
    index: 4,
    content: "嘗試找出你與她的共同點",
    stage: stages[0],
  },
  {
    index: 5,
    content: "嘗試找出兩人可以輕鬆聊天的話題",
    stage: stages[1],
  },
  {
    index: 6,
    content: "嘗試建立兩人交集與習慣",
    stage: stages[1],
  },
  {
    index: 7,
    content: "嘗試找出你身上讓她好奇的特質, 並讓她對你感興趣或好奇",
    stage: stages[1],
  },
  {
    index: 8,
    content: "嘗試多談你的個人故事, 看她是否會繼續詢問, 或分享他的人生",
    stage: stages[1],
  },
  {
    index: 9,
    content: "嘗試針對她有興趣的活動經常性邀約",
    stage: stages[1],
  },
  {
    index: 10,
    content: "嘗試輕微的調情, 談話有曖昧的味道, 但不要講出喜歡或愛的字眼",
    stage: stages[1],
  },
  {
    index: 11,
    content: "嘗試肢體上的些微接觸",
    stage: stages[1],
  },
  {
    index: 12,
    content: "嘗試肢體上比較長時間的碰觸",
    stage: stages[1],
  },
  {
    index: 13,
    content:
      "若你喜歡對方, 此時已處在女方認可的交往階段, 若你不喜歡對方, 請小心進行不要傷害對方",
    stage: stages[2],
  },
];

export const steps = {
  "-100": {
    title: "直接表示對你的厭惡",
    content: "看到你出現, 態度明顯有厭惡, ",
    point: -100,
    groups: groups[0],
  },
  "-20": {
    title: "看到你時，眼神有敵意或反感",
    content:
      "雖然沒有表現出明顯的排斥態度，但對方會在眼神或話語中隱約露出對自己的厭惡",
    point: -20,
    groups: groups[0],
  },
  "-10": {
    title: "會刻意迴避你",
    content: "看到你出現，她會假裝忙碌，離開座位，或離開那個場所",
    point: -10,
    groups: groups[0],
  },
  "-8": {
    title: "看到你時，眼神會顯得不太自在或戒備感",
    content: "雖然沒有沒有表現出明顯的排斥態度，但對自己卻有戒備的態度",
    point: -8,
    groups: groups[0],
  },
  "-6": {
    title: "談話時會不斷小心的跟你保持適當距離",
    content: "兩人說話時，會感覺她會不斷調整兩人距離以免靠得太近",
    point: -6,
    groups: groups[0],
  },
  "-4": {
    title: "對坐談話時你若略往前頃，她會下意識後退",
    content: "兩人面對面隔桌子對坐時，若你稍微前傾，對方會無意識的往後退一些",
    point: -4,
    groups: groups[0],
  },
  "-2": {
    title: "與她無法建立對話",
    content:
      "你試著跟對方攀談，但總是一下就聊不下去了(有LINE或其他聯絡方式時，你大部份傳的訊息都已獨不回)",
    point: -2,
    groups: groups[0],
  },
  0: {
    title: "看到你無任何表情變化",
    content:
      "每次看到你並沒有任何特別的表情(在她心中你還只是背景或任意的陌生人)",
    point: 0,
    groups: groups[1],
  },
  1: {
    title: "她根本不記得你",
    content:
      "雖然自己常在對方面前出現,也可能有談過話(如店員)但對方似乎毫無印象",
    point: 1,
    groups: groups[1],
  },
  3: {
    title: "她有意識到你的存在",
    content:
      "有辦法認出你，知道你這個人(還看出是否有好感，但也沒有發現負面的感覺)，表示你不再是背景或是任意陌生人了",
    point: 3,
    groups: groups[1],
  },
  5: {
    title: "她會對你點頭，微笑或是打招呼",
    content: "看到你時，有認出你而且還會露出友善的態度",
    point: 5,
    groups: groups[2],
  },
  8: {
    title: "雖然兩人能建立對話但內容非常社交性",
    content:
      "能交談，但對話僅限於天氣好不好，今天真冷，公司附近餐館都很貴類話題(店員，隔壁部門同事，電梯遇到的別層工作人員)",
    point: 8,
    groups: groups[3],
  },
  10: {
    title: "她能記得你的名字，或知道你是誰",
    content: "看到你時，有認識你並能記得你的名字",
    point: 10,
    milestone: true,
    groups: groups[3],
  },
  13: {
    title: "兩人話題能跟彼此生活稍有連結",
    content: "如談各自的工作，好久沒看到你都在忙什麼，你最近在忙什麼案子之類",
    point: 13,
    groups: groups[3],
  },
  16: {
    title: "兩人能有社交或工作之外的輕鬆話題",
    content:
      "能稍微聊些比較個人或輕鬆的話題，惟還不涉及個人隱私，如超商集點，她的小狗，最近什麼電影好，在看什麼書之類的",
    point: 16,
    groups: groups[4],
  },
  18: {
    title: "能跟她建立關聯",
    content:
      "你在她心理有個明確的形象，與定位，如好同學，可信任的鄰居好相處的同事等",
    point: 18,
    groups: groups[5],
  },
  20: {
    title: "談話不需要靠你不斷的丟疑問句也能自然持續",
    content:
      "不用一直問她問題，也能自然的開展話題，重點在於:她也會提出新話題(她有興趣想稍微聊解你)",
    point: 20,
    milestone: true,
    groups: groups[5],
  },
  22: {
    title: "能交談機會時，兩人通常都能快速建立話題",
    content:
      "(需有三到五次)每次跟她說話時(線上也可以)不會有明顯的尷尬感，兩人會自然地找話題",
    point: 22,
    groups: groups[5],
  },
  24: {
    title: "能多次與她維持10-15鐘以上的愉快交談",
    content:
      "每次跟她說話，話題不會一下就講完，會能自在的聊一段時間(如10-15分鐘)",
    point: 24,
    groups: groups[6],
  },
  25: {
    title: "會跟你開玩笑或嬉鬧",
    content:
      "開始會跟你開玩笑，你稍微的虧她，或開她玩笑，她不會生氣，也能用開玩笑回應",
    point: 25,
    groups: groups[6],
  },
  28: {
    title: "你透過非口語的訊息傳遞，她持續會有回應",
    content:
      "透過Line，簡訊，Eamil之類非口語交談的方式跟她對話，她會回應(但未必是聊天)而非已讀不回",
    point: 28,
    groups: groups[6],
  },
  30: {
    title: "能跟她的生活建立某種習慣或制約",
    content:
      "比方一起吃飯，遛狗會碰到，下午總會在樓下咖啡廳碰面，會固定找她申請報支單，下午茶一起點雞排的搭檔等",
    point: 30,
    milestone: true,
    groups: groups[7],
  },
  32: {
    title: "能跟她建立習慣的溝通模式或溝通管道",
    content:
      "如常傳LINE，每天會寫Email，每天定時講電話，某個時間會在辦公室茶水間閒聊幾句等",
    point: 32,
    groups: groups[7],
  },
  34: {
    title: "會回應你關於個人議題的談話",
    content: "你問到她的個人喜好，興趣，想法，觀點，她會有所回應",
    point: 34,
    groups: groups[7],
  },
  35: {
    title: "她會常講自己的事情給你聽",
    content: "她會主動告訴你很多她的事情，尤其是她的想法與感覺",
    point: 35,
    groups: groups[7],
  },
  36: {
    title: "會跟你透過間接方式持續聊天(傳訊息，MSN，Email，電話)",
    content:
      "Line或是傳訊息會持續很長一段時間，而且是感覺她對這樣聊天是興致的，不會一下就說要去洗澡",
    point: 36,
    groups: groups[7],
  },
  38: {
    title: "她會分享一般照片給你看",
    content:
      "可能會傳一些群體合照，或吃飯蛋糕之類的照片給你看，透過照片分享她的生活給你知道",
    point: 38,
    groups: groups[8],
  },
  40: {
    title: "對你的事情她主動有了解的興趣(或好奇心)",
    content:
      "會開始問你一些問題，問你的看法，尤其對你會感覺好奇(如過往人生，做的工作，目前生活等)",
    point: 40,
    milestone: true,
    groups: groups[8],
  },
  43: {
    title: "告訴你她的夢想或是正在悄悄努力的目標",
    content:
      "告訴你她打算做什麼，正在努力什麼，想成為怎麼樣的人，將來想達成的目標，這些事情可能對別人羞於訴說，或是覺得別人無法理解",
    point: 43,
    groups: groups[8],
  },
  45: {
    title: "會跟你談心情或感性的議題",
    content:
      "會告訴你自己心情很低落，很雀躍，或很生氣，並分享這些心情背後的原因",
    point: 45,
    groups: groups[8],
  },
  47: {
    title: "會願意告訴你她過去丟臉的事情或任何挫敗",
    content:
      "會告訴你今天她做了什麼丟臉的事情，我今天好笨喔...不過不要告訴別人喔，你能聽更多她的小秘密",
    point: 47,
    groups: groups[8],
  },
  48: {
    title: "會因為跟你出來而特別打扮(或準備)",
    content: "發現她明顯有為了出來見你而特別打扮過",
    point: 48,
    groups: groups[9],
  },
  50: {
    title: "兩人獨處時，話題冷下來她也會努力找話題",
    content:
      "聊天時你若停止說話，她會不斷找話題跟你聊，希望讓聊天的氣氛能延續下去",
    point: 50,
    milestone: true,
    groups: groups[9],
  },
  53: {
    title: "食物會主動想分你吃",
    content: "主動說這很好吃，然後切給你，或掰給你",
    point: 53,
    groups: groups[10],
  },
  56: {
    title: "嬉鬧時會裝作要打你",
    content: "會跟你調笑，你講了某些事情會作勢要打你",
    point: 56,
    groups: groups[10],
  },
  58: {
    title: "嬉鬧時會真的打到你",
    content: "會跟你調笑，你講了某些事情她會嗔怒並輕打你",
    point: 58,
    groups: groups[10],
  },
  60: {
    title: "會記得很多你的事情",
    content:
      "會記得你過去聊天講到很多細節，如記得你吃或不吃什麼東西，或問你某個小事狀況",
    point: 60,
    milestone: true,
    groups: groups[10],
  },
  63: {
    title: "會在談話時拍打你手臂或大腿(膝蓋端)",
    content:
      "坐你旁邊說話時，可能會拍打你的手臂，膝蓋，或大腿，站立時說話，可能會以手臂碰觸你的手臂",
    point: 63,
    groups: groups[11],
  },
  66: {
    title: "明明你講的東西很無聊她也會笑",
    content: "她會覺得你講的事情都很有趣，就算稍微無聊的議題，她也會想聊",
    point: 66,
    groups: groups[11],
  },
  70: {
    title: "能持續進行兩人有共通興趣的活動",
    content:
      "會跟你多次進行某些她感興趣的活動，可以是她主動邀約，也可以是你邀約但她答應",
    point: 70,
    milestone: true,
    groups: groups[11],
  },
  73: {
    title: "肩部與手部碰觸有觸碰時，她不會直覺閃避",
    content:
      "行進或是講話時你碰到她身體非敏感區域(手臂上半部或肩部)，她不會立刻警覺往反方向撤離",
    point: 73,
    groups: groups[11],
  },
  76: {
    title: "會傳自拍照給你看",
    content: "會傳些自拍照問你的看法或單純與你分享",
    point: 76,
    groups: groups[11],
  },
  78: {
    title: "可以接受肩部與手臂的碰觸",
    content: "你碰觸她的手臂或是肩部，她會允許你的手方在那位置",
    point: 78,
    groups: groups[11],
  },
  80: {
    title: "會跟你撒嬌",
    content: "會較多尾音，會講討厭，會用疊字名詞，有跟朋友家人說話時不同的語調",
    point: 80,
    milestone: true,
    groups: groups[12],
  },
  82: {
    title: "吃飯時不排斥你切分盤中的食物給她",
    content: "你若以自己的刀叉分盤中的食物給她(但不是一人咬一口)，她會樂意接受",
    point: 82,
    groups: groups[12],
  },
  83: {
    title: "看你的眼神帶有某種光亮",
    content: "她會專注看你，所以眼神會特別晶亮",
    point: 83,
    groups: groups[12],
  },
  85: {
    title: "人多的場合目光會跟隨你",
    content:
      "很多人時候，你若到處遊走或聚會中與他人聊天，轉頭看她可能會發現她也有在注視你",
    point: 85,
    groups: groups[12],
  },
  87: {
    title: "可以接受短暫腰部或背部的碰觸",
    content: "能接受你的手短暫放在背部或腰部，不會閃躲或迴避",
    point: 87,
    groups: groups[12],
  },
  88: {
    title: "頭部與臉部觸摸不會閃躲",
    content: "如幫她順臉頰兩邊的頭髮",
    point: 88,
    groups: groups[12],
  },
  90: {
    title: "答應跟你單獨去較危險的約會地點或活動",
    content: "如單獨跟你去看夜景，甚至你的住處",
    point: 90,
    milestone: true,
    groups: groups[12],
  },
  95: {
    title: "會幫你整理衣服與儀容",
    content: "她會無意識的想伸手幫你調整領帶或領子",
    point: 95,
    groups: groups[12],
  },
  120: {
    title: "她會1.主動的 2.持續的 3.以各種理由試圖跟你聯絡",
    content: "她會1.主動的 2.持續的 3.以各種理由試圖跟你聯絡",
    point: 120,
    groups: groups[13],
  },
};
