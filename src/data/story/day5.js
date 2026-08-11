/**
 * Day 5 — the main conflict: three stages (fallout, decision, resolution).
 * A cafe photo leaks, the school's no-fraternization policy puts Alisa's job at risk.
 */

export const day5_1 = {
  start: { afterDay: 'day4' },
  steps: [
    {
      type: 'notification',
      id: 'friendMisha',
      name: 'Миша',
      textKey: 'Бро, тебя спалили) кто-то скинул в чат фотку - ты с училкой англ в кафе сидел. все обсуждают 😱',
      icon: '👤'
    },
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'Слушай, тут ситуация' },
        { sender: 'alisa', textKey: 'Кто-то из кафе скинул нашу фотку знакомым' },
        { sender: 'alisa', textKey: 'А те - дальше' },
        { sender: 'alisa', textKey: 'Мне уже написала руководитель школы' },
        { sender: 'alisa', textKey: 'Спрашивает, что происходит' }
      ]
    },
    { type: 'photo', url: 'res/chat3.png', blurred: true },
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'У нас в контракте пункт про личные отношения' },
        { sender: 'alisa', textKey: 'С действующими учениками' },
        { sender: 'alisa', textKey: 'Формально это могут посчитать нарушением.' },
        { sender: 'alisa', textKey: 'Я не паникую, но... это серьёзно' },
        { sender: 'alisa', textKey: 'Ты как вообще? нормально?' }
      ]
    },
    {
      type: 'choice',
      id: 'day5_1_choice',
      options: [
        { id: 's1_1', labelKey: 'Я спокоен. мы просто разговаривали, ничего плохого' },
        { id: 's1_2', labelKey: 'Если честно, мне важно было тебя увидеть', hidden: true },
        { id: 's1_3', labelKey: 'Может, скажем, что ты просто помогала мне из вежливости?', hidden: true },
        { id: 's1_5', labelKey: 'Давай я сам поговорю с руководителем', hidden: true, cost: 2 }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day5_1_choice',
      branches: {
        s1_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ты прав. мы правда ничего плохого не сделали' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но объясняться всё равно придётся.' },
          { type: 'reaction', sender: 'alisa', textKey: 'Держись, я разберусь' },
          { type: 'stats', changes: { success: 5, romance: 2, humor: 0 } },
          { type: 'flags', set: { allHonest: true, calmUnderPressure: true } }
        ],
        s1_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ты серьёзно сейчас это написал...' },
          { type: 'reaction', sender: 'alisa', textKey: 'Мне тоже было важно.' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но давай сначала разберёмся с этим' },
          { type: 'reaction', sender: 'alisa', textKey: 'А потом договорим' },
          { type: 'stats', changes: { success: 0, romance: 10, humor: 0 } },
          { type: 'flags', set: { earlyVulnerability: true } }
        ],
        s1_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'То есть соврать руководителю?' },
          { type: 'reaction', sender: 'alisa', textKey: 'Так себе план, но... ладно, если надо' },
          { type: 'reaction', sender: 'alisa', textKey: 'Просто не хочу' },
          { type: 'reaction', sender: 'alisa', textKey: 'Чтобы это стало привычкой между нами' },
          { type: 'stats', changes: { success: -5, romance: -3, humor: 0 } },
          { type: 'flags', set: { downplayedRelationship: true } }
        ],
        s1_5: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ты... правда готов это сделать? для меня?' },
          { type: 'reaction', sender: 'alisa', textKey: 'Спасибо. дай подумать, как лучше.' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но это очень много значит' },
          { type: 'stats', changes: { success: 5, romance: 8, humor: 0 } },
          { type: 'flags', set: { protectivePlayer: true } }
        ]
      }
    },
    { type: 'achievement' },
    { type: 'goto', day: 'day5_2' }
  ]
};

export const day5_2 = {
  start: { afterDay: 'day5_1' },
  steps: [
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'Я поговорила с руководителем' },
        { sender: 'alisa', textKey: 'Сказала, что это было дополнительное занятие' },
        { sender: 'alisa', textKey: 'Вне расписания. вроде поверила' },
        { sender: 'alisa', textKey: 'Но предупредила, что будет следить.' },
        { sender: 'alisa', textKey: 'Если что-то ещё всплывёт - разговор будет другой' }
      ]
    },
    {
      type: 'if',
      check: { hasFlag: 'downplayedRelationship' },
      then: [
        { type: 'message', sender: 'alisa', textKey: 'Если честно, врать было неприятно.' },
        { type: 'message', sender: 'alisa', textKey: 'Давай больше так не будем' }
      ]
    },
    { type: 'message', sender: 'alisa', textKey: 'Как думаешь, нам вообще стоит продолжать' },
    { type: 'message', sender: 'alisa', textKey: 'Переписываться так, как сейчас?' },
    { type: 'message', sender: 'alisa', textKey: 'Или лучше поостыть?' },
    {
      type: 'choice',
      id: 'day5_2_choice',
      options: [
        { id: 's2_1', labelKey: 'Давай просто быть осторожнее, но не пропадать' },
        { id: 's2_2', labelKey: 'А что если официально попросить перевести меня к другому преподавателю?', hidden: true },
        { id: 's2_3', labelKey: 'Может, правда лучше остановиться, чтобы не рисковать?', hidden: true },
        { id: 's2_4', labelKey: 'Предлагаю режим "секретных агентов". шифруемся' }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day5_2_choice',
      branches: {
        s2_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ладно, договорились.' },
          { type: 'reaction', sender: 'alisa', textKey: 'Просто будь аккуратнее с уведомлениями на людях' },
          { type: 'stats', changes: { success: 5, romance: 8, humor: 0 } }
        ],
        s2_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'О. это... на самом деле неплохая идея' },
          { type: 'reaction', sender: 'alisa', textKey: 'Тогда формально у нас вообще не будет' },
          { type: 'reaction', sender: 'alisa', textKey: 'Конфликта интересов. дай подумать' },
          { type: 'stats', changes: { success: 10, romance: 6, humor: 0 } },
          { type: 'flags', set: { requestedReassignment: true } }
        ],
        s2_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'Наверное, ты прав. так безопаснее для нас обоих' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но мне будет не хватать этих разговоров.' },
          { type: 'reaction', sender: 'alisa', textKey: 'Если что - я всегда отвечу' },
          { type: 'stats', changes: { success: 0, romance: -6, humor: 0 } },
          { type: 'flags', set: { pulledBack: true } }
        ],
        s2_4: [
          { type: 'reaction', sender: 'alisa', textKey: 'Шифруемся, ха.' },
          { type: 'reaction', sender: 'alisa', textKey: 'Ладно, давай хотя бы без явных смайликов на людях' },
          { type: 'stats', changes: { success: 0, romance: 3, humor: 8 } }
        ]
      }
    },
    { type: 'achievement' },
    { type: 'goto', day: 'day5_3' }
  ]
};

export const day5_3 = {
  start: { afterDay: 'day5_2' },
  steps: [
    {
      type: 'if',
      check: { hasFlag: 'requestedReassignment' },
      then: [
        { type: 'message', sender: 'alisa', textKey: 'Кстати, по поводу перевода' },
        { type: 'message', sender: 'alisa', textKey: 'Руководитель не против' },
        { type: 'message', sender: 'alisa', textKey: 'Если ты правда захочешь' }
      ]
    },
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'У меня сейчас есть немного времени' },
        { sender: 'alisa', textKey: 'И я всё думаю о нас' },
        { sender: 'alisa', textKey: 'Какие бы слухи ни ходили' },
        { sender: 'alisa', textKey: 'Я рада, что мы встретились в субботу' },
        { sender: 'alisa', textKey: 'Скажи честно - чего ты на самом деле хочешь?' },
        { sender: 'alisa', textKey: 'Я не тороплю' }
      ]
    },
    {
      type: 'choice',
      id: 'day5_3_choice',
      options: [
        { id: 's3_1', labelKey: 'Ты мне дорога, но давай будем просто друзьями' },
        { id: 's3_2', labelKey: 'Мне важна ты, а не эта работа. рискнём?', hidden: true },
        { id: 's3_3', labelKey: 'Давай ты официально сменишь мне преподавателя', hidden: true },
        { id: 's3_4', labelKey: 'Без объявлений, но и прятаться не будем' }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day5_3_choice',
      branches: {
        s3_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'Дружба - это тоже ценно. правда' },
          { type: 'reaction', sender: 'alisa', textKey: 'Значит, остаёмся близкими людьми.' },
          { type: 'reaction', sender: 'alisa', textKey: 'А учёбу не забрасывай, ладно? 😉' },
          { type: 'stats', changes: { success: 10, romance: 5, humor: 0 } },
          { type: 'flags', set: { allHonest: true, chosePathFriends: true } }
        ],
        s3_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'Я боюсь. но... я тоже так думаю' },
          { type: 'reaction', sender: 'alisa', textKey: 'Работу я не готова терять.' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но тебя терять ещё меньше хочу' },
          { type: 'stats', changes: { success: 0, romance: 15, humor: 0 } },
          { type: 'flags', set: { chosePathRisk: true } }
        ],
        s3_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'Это самое взрослое решение' },
          { type: 'reaction', sender: 'alisa', textKey: 'Которое ты мог предложить' },
          { type: 'reaction', sender: 'alisa', textKey: 'Подам заявку завтра же.' },
          { type: 'reaction', sender: 'alisa', textKey: 'И тогда уже ничего официально нам не мешает' },
          { type: 'stats', changes: { success: 12, romance: 12, humor: 0 } },
          { type: 'flags', set: { chosePathClean: true } }
        ],
        s3_4: [
          { type: 'reaction', sender: 'alisa', textKey: 'Без объявлений - это по мне.' },
          { type: 'reaction', sender: 'alisa', textKey: 'Посмотрим, куда это приведёт' },
          { type: 'stats', changes: { success: 5, romance: 8, humor: 5 } },
          { type: 'flags', set: { chosePathCautious: true } }
        ]
      }
    },
    { type: 'achievement' },
    { type: 'goto', day: 'day6' }
  ]
};
