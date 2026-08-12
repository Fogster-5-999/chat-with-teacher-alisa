/**
 * Day 5 — main conflict in three stages.
 * Rewritten: more tension, shorter messages, less polished speech.
 */

export const day5_1 = {
  start: { afterDay: 'day4' },
  steps: [
    {
      type: 'if',
      check: { hasFlag: 'cameToCafe' },
      then: [
        {
          type: 'notification',
          id: 'friendMisha',
          name: 'Миша',
          textKey: 'Бро, тебя спалили) кто-то скинул в чат фотку — ты с училкой в кафе. все обсуждают 😱',
          icon: '👤'
        },
        {
          type: 'messages',
          list: [
            { sender: 'alisa', textKey: 'Слушай' },
            { sender: 'alisa', textKey: 'Тут плохо' },
            { sender: 'alisa', textKey: 'Кто-то из кафе скинул нашу фотку' },
            { sender: 'alisa', textKey: 'Дальше по знакомым' },
            { sender: 'alisa', textKey: 'Мне уже написала руководитель' },
            { sender: 'alisa', textKey: 'Спрашивает, что происходит' }
          ]
        },
        { type: 'photo', url: 'res/chat3.png', blurred: true }
      ],
      else: [
        {
          type: 'notification',
          id: 'friendMisha',
          name: 'Миша',
          textKey: 'Бро, новость дня) говорят, вы с училкой ночами переписываетесь. все обсуждают 😱',
          icon: '👤'
        },
        {
          type: 'messages',
          list: [
            { sender: 'alisa', textKey: 'Слушай' },
            { sender: 'alisa', textKey: 'Тут плохо' },
            { sender: 'alisa', textKey: 'Кто-то из класса проболтался' },
            { sender: 'alisa', textKey: 'Что мы переписываемся по вечерам' },
            { sender: 'alisa', textKey: 'Мне уже написала руководитель' },
            { sender: 'alisa', textKey: 'Спрашивает, что за «дополнительные занятия»' }
          ]
        }
      ]
    },
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'В контракте есть пункт' },
        { sender: 'alisa', textKey: 'Про отношения с действующими учениками' },
        { sender: 'alisa', textKey: 'Формально это могут посчитать нарушением' },
        { sender: 'alisa', textKey: 'Я не паникую' },
        { sender: 'alisa', textKey: 'Но мне сейчас очень неспокойно' },
        { sender: 'alisa', textKey: 'Ты как?' }
      ]
    },
    { type: 'voice', voiceId: 'day_5_1' },
    {
      type: 'choice',
      id: 'day5_1_choice',
      options: [
        { id: 's1_1', labelKey: 'Я спокоен. мы просто разговаривали' },
        { id: 's1_2', labelKey: 'Если честно, мне важно было тебя увидеть', hidden: true },
        { id: 's1_3', labelKey: 'Может, скажем, что ты просто помогала из вежливости?', hidden: true },
        { id: 's1_5', labelKey: 'Давай я сам поговорю с руководителем', hidden: true, cost: 2 }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day5_1_choice',
      branches: {
        s1_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ты прав' },
          { type: 'reaction', sender: 'alisa', textKey: 'Мы правда ничего плохого не сделали' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но объясняться всё равно придётся' },
          { type: 'reaction', sender: 'alisa', textKey: 'Держись. я разберусь' },
          { type: 'stats', changes: { success: 5, romance: 2, humor: 0 } },
          { type: 'flags', set: { allHonest: true, calmUnderPressure: true } }
        ],
        s1_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ты серьёзно сейчас это пишешь...' },
          { type: 'reaction', sender: 'alisa', textKey: 'Мне тоже было важно' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но давай сначала с этим разберёмся' },
          { type: 'reaction', sender: 'alisa', textKey: 'А потом договорим' },
          { type: 'stats', changes: { success: 0, romance: 10, humor: 0 } },
          { type: 'flags', set: { earlyVulnerability: true } }
        ],
        s1_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'То есть соврать руководителю?' },
          { type: 'reaction', sender: 'alisa', textKey: 'Так себе план' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но... ладно, если надо' },
          { type: 'reaction', sender: 'alisa', textKey: 'Просто не хочу, чтобы это стало привычкой' },
          { type: 'stats', changes: { success: -5, romance: -3, humor: 0 } },
          { type: 'flags', set: { downplayedRelationship: true } }
        ],
        s1_5: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ты правда готов это сделать?' },
          { type: 'reaction', sender: 'alisa', textKey: 'Для меня?' },
          { type: 'reaction', sender: 'alisa', textKey: 'Спасибо. Дай подумать' },
          { type: 'reaction', sender: 'alisa', textKey: 'Это очень много значит' },
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
        { sender: 'alisa', textKey: 'Вне расписания' },
        { sender: 'alisa', textKey: 'Вроде поверила' },
        { sender: 'alisa', textKey: 'Но предупредила, что будет следить' },
        { sender: 'alisa', textKey: 'Если что-то ещё всплывёт — разговор будет другой' }
      ]
    },
    {
      type: 'if',
      check: { hasFlag: 'downplayedRelationship' },
      then: [
        { type: 'message', sender: 'alisa', textKey: 'Если честно, врать было неприятно' },
        { type: 'message', sender: 'alisa', textKey: 'Давай больше так не будем' }
      ]
    },
    { type: 'message', sender: 'alisa', textKey: 'Как думаешь' },
    { type: 'message', sender: 'alisa', textKey: 'Нам вообще стоит продолжать писать так?' },
    { type: 'message', sender: 'alisa', textKey: 'Или лучше поостыть?' },
    {
      type: 'choice',
      id: 'day5_2_choice',
      options: [
        { id: 's2_1', labelKey: 'Давай просто быть осторожнее, но не пропадать' },
        { id: 's2_2', labelKey: 'А что если официально попросить перевести меня к другому?', hidden: true },
        { id: 's2_3', labelKey: 'Может, правда лучше остановиться?', hidden: true },
        { id: 's2_4', labelKey: 'Предлагаю режим «секретных агентов» 😄 Шифруемся' }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day5_2_choice',
      branches: {
        s2_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ладно. договорились' },
          { type: 'reaction', sender: 'alisa', textKey: 'Просто будь аккуратнее с уведомлениями' },
          { type: 'stats', changes: { success: 5, romance: 8, humor: 0 } }
        ],
        s2_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'О' },
          { type: 'reaction', sender: 'alisa', textKey: 'Это... на самом деле неплохая идея' },
          { type: 'reaction', sender: 'alisa', textKey: 'Тогда у нас формально не будет конфликта интересов' },
          { type: 'reaction', sender: 'alisa', textKey: 'Дай подумать' },
          { type: 'stats', changes: { success: 10, romance: 6, humor: 0 } },
          { type: 'flags', set: { requestedReassignment: true } }
        ],
        s2_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'Наверное, ты прав' },
          { type: 'reaction', sender: 'alisa', textKey: 'Так безопаснее' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но мне будет не хватать этих разговоров' },
          { type: 'reaction', sender: 'alisa', textKey: 'Если что — я всегда отвечу' },
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
        { sender: 'alisa', textKey: 'Скажи честно' },
        { sender: 'alisa', textKey: 'Чего ты на самом деле хочешь?' },
        { sender: 'alisa', textKey: 'Я не тороплю' }
      ]
    },
    { type: 'voice', voiceId: 'day_5_3' },
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
          { type: 'reaction', sender: 'alisa', textKey: 'Дружба — это тоже ценно' },
          { type: 'reaction', sender: 'alisa', textKey: 'Значит, остаёмся близкими' },
          { type: 'reaction', sender: 'alisa', textKey: 'А учёбу не забрасывай 😉' },
          { type: 'stats', changes: { success: 10, romance: 5, humor: 0 } },
          { type: 'flags', set: { allHonest: true, chosePathFriends: true } }
        ],
        s3_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'Я боюсь' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но... я тоже так думаю' },
          { type: 'reaction', sender: 'alisa', textKey: 'Работу терять не готова' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но тебя терять ещё меньше хочу' },
          { type: 'stats', changes: { success: 0, romance: 15, humor: 0 } },
          { type: 'flags', set: { chosePathRisk: true } }
        ],
        s3_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'Это самое взрослое решение' },
          { type: 'reaction', sender: 'alisa', textKey: 'Которое ты мог предложить' },
          { type: 'reaction', sender: 'alisa', textKey: 'Подам заявку завтра' },
          { type: 'reaction', sender: 'alisa', textKey: 'И тогда уже ничего официально не мешает' },
          { type: 'stats', changes: { success: 12, romance: 12, humor: 0 } },
          { type: 'flags', set: { chosePathClean: true } }
        ],
        s3_4: [
          { type: 'reaction', sender: 'alisa', textKey: 'Без объявлений — это по мне' },
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
