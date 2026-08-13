/** Day 6 — the park is an off-screen conversation, but each route arrives there differently. */
export default {
  start: { afterDay: 'day5_3' },
  steps: [
    { type: 'if', check: { hasFlag: 'finalStopPath' }, then: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Привет.' },
        { sender: 'alisa', textKey: 'Не буду много писать. Просто надеюсь, что у тебя всё будет нормально.' }
      ] },
      { type: 'goto', day: 'day7' }
    ] },
    { type: 'if', check: { hasFlag: 'choseClean' }, then: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Есть новости: перевод одобрили.' },
        { sender: 'alisa', textKey: 'С понедельника я больше не веду твою группу.' },
        { sender: 'alisa', textKey: 'С одной стороны, легче. С другой — вообще не по себе.' }
      ] }
    ] },
    { type: 'if', check: { and: [{ hasFlag: 'choseRisk' }, { not: { hasFlag: 'choseClean' } }] }, then: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Руководитель попросила меня держать дистанцию.' },
        { sender: 'alisa', textKey: 'Я не хочу больше врать и прятаться.' },
        { sender: 'alisa', textKey: 'Но и сделать вид, что ничего не было, я не могу.' }
      ] }
    ] },
    { type: 'if', check: { and: [{ hasFlag: 'choseCareful' }, { not: { hasFlag: 'choseClean' } }, { not: { hasFlag: 'choseRisk' } }] }, then: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Спасибо, что не давил.' },
        { sender: 'alisa', textKey: 'Я всё-таки хочу поговорить не в чате.' },
        { sender: 'alisa', textKey: 'Не думала, что сама это предложу.' }
      ] }
    ] },
    { type: 'if', check: { and: [{ or: [{ hasFlag: 'pushedTooFast' }, { hasFlag: 'actedWithoutConsent' }, { hasFlag: 'liedToManager' }] }, { not: { hasFlag: 'finalStopPath' } }] }, then: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'После последних разговоров я пока немного на нервах.' },
        { sender: 'alisa', textKey: 'Я приду, когда сама буду готова.' }
      ] }
    ] },
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'Завтра буду в парке у пруда.' },
      { sender: 'alisa', textKey: 'Без уроков. Просто поговорим.' },
      { sender: 'alisa', textKey: 'Если хочешь, просто поговорим.' }
    ] },
    { type: 'photo', url: 'res/chat2.png', blurred: true },
    { type: 'voice', voiceId: 'day_6' },
    { type: 'choice', id: 'day6_park_choice', options: [
      { id: 'd6_park_come', labelKey: 'd6_park_come' },
      { id: 'd6_park_nervous', labelKey: 'd6_park_nervous' },
      { id: 'd6_park_wait', labelKey: 'd6_park_wait' },
      { id: 'd6_park_secret', labelKey: 'd6_park_secret', hidden: true, cost: 2 }
    ] },
    { type: 'branch', onChoice: 'day6_park_choice', branches: {
      d6_park_come: [
        { type: 'reaction', sender: 'alisa', textKey: 'Хорошо. В пять, у входа. Только не опаздывай, я и так буду нервничать.' },
        { type: 'stats', changes: { success: 1, romance: 1, humor: 0 } },
        { type: 'flags', set: { meetPark: true } }
      ],
      d6_park_nervous: [
        { type: 'reaction', sender: 'alisa', textKey: 'Я тоже нервничаю, это нормально.' },
        { type: 'reaction', sender: 'alisa', textKey: 'Только не приходи с заготовленной речью.' },
        { type: 'stats', changes: { success: 0, romance: 2, humor: 0 } },
        { type: 'flags', set: { meetPark: true, honestWithAlisa: true } }
      ],
      d6_park_wait: [
        { type: 'reaction', sender: 'alisa', textKey: 'Поняла. Тогда ждать и уговаривать не буду.' },
        { type: 'flags', set: { skippedPark: true, choseCareful: true } }
      ],
      d6_park_secret: [
        { type: 'reaction', sender: 'alisa', textKey: 'Нет, я не хочу превращать встречу в спецоперацию.' },
        { type: 'reaction', sender: 'alisa', textKey: 'Если нам приходится всё скрывать, это уже нехороший знак.' },
        { type: 'stats', changes: { success: -1, romance: -4, humor: 0 } },
        { type: 'flags', set: { skippedPark: true, choseRisk: true, pushedTooFast: true } }
      ]
    } },
    { type: 'if', check: { hasFlag: 'meetPark' }, then: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'И ещё одно.' },
        { sender: 'alisa', textKey: 'Только не приходи с готовым финалом в голове.' },
        { sender: 'alisa', textKey: 'Приходи, только если правда хочешь всё это обсудить.' }
      ] }
    ] },
    { type: 'achievement' },
    { type: 'goto', day: 'day7' }
  ]
};
