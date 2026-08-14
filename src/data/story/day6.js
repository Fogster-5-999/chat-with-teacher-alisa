/** Day 6 — the park is an off-screen conversation, but each route arrives there differently. */
export default {
  start: { afterDay: 'day5_3' },
  steps: [
    { type: 'if', check: { hasFlag: 'finalStopPath' }, then: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Привет', time: '20:01' },
        { sender: 'alisa', textKey: 'Не буду много писать. Просто надеюсь, что у тебя всё нормально', time: '20:02' }
      ] },
      { type: 'goto', day: 'day7' }
    ] },
    { type: 'if', check: { hasFlag: 'choseClean' }, then: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Есть новости: перевод одобрили', time: '20:01' },
        { sender: 'alisa', textKey: 'С понедельника я больше не веду твою группу', time: '20:02' },
        { sender: 'alisa', textKey: 'С одной стороны, легче. С другой — вообще не по себе', time: '20:03' }
      ] }
    ] },
    { type: 'if', check: { and: [{ hasFlag: 'choseRisk' }, { not: { hasFlag: 'choseClean' } }] }, then: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Руководитель попросила меня держать дистанцию', time: '20:01' },
        { sender: 'alisa', textKey: 'Я не хочу больше врать и прятаться', time: '20:02' },
        { sender: 'alisa', textKey: 'Но и сделать вид, что ничего не было, я не могу', time: '20:03' }
      ] }
    ] },
    { type: 'if', check: { and: [{ hasFlag: 'choseCareful' }, { not: { hasFlag: 'choseClean' } }, { not: { hasFlag: 'choseRisk' } }] }, then: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Спасибо, что не давил', time: '20:01' },
        { sender: 'alisa', textKey: 'Я всё таки хочу поговорить вживую', time: '20:02' },
        { sender: 'alisa', textKey: 'Не думала, что сама это предложу', time: '20:03' }
      ] }
    ] },
    { type: 'if', check: { and: [{ or: [{ hasFlag: 'pushedTooFast' }, { hasFlag: 'actedWithoutConsent' }, { hasFlag: 'liedToManager' }] }, { not: { hasFlag: 'finalStopPath' } }] }, then: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'После последних ситуаций я пока немного на нервах', time: '20:05' },
        { sender: 'alisa', textKey: 'Но я приду. Только не торопи меня', time: '20:06' }
      ] }
    ] },
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'Завтра буду в парке у пруда', time: '20:08' },
      { sender: 'alisa', textKey: 'Никаких уроков. Только прогулка', time: '20:09' }
    ] },
    { type: 'photo', url: 'res/chat2.png', blurred: true, time: '20:10' },
    { type: 'voice', voiceId: 'day_6', time: '20:11' },
    { type: 'choice', id: 'day6_park_choice', time: '20:14', options: [
      { id: 'd6_park_come', labelKey: 'd6_park_come' },
      { id: 'd6_park_nervous', labelKey: 'd6_park_nervous' },
      { id: 'd6_park_wait', labelKey: 'd6_park_wait' },
      { id: 'd6_park_secret', labelKey: 'd6_park_secret', hidden: true, cost: 2 }
    ] },
    { type: 'branch', onChoice: 'day6_park_choice', branches: {
      d6_park_come: [
        { type: 'reaction', sender: 'alisa', textKey: 'Хорошо', time: '20:16' },
        { type: 'reaction', sender: 'alisa', textKey: 'В пять, у входа. Только не опаздывай, я и так буду нервничать', time: '20:17' },
        { type: 'stats', changes: { success: 1, romance: 1, humor: 0 } },
        { type: 'flags', set: { meetPark: true } }
      ],
      d6_park_nervous: [
        { type: 'reaction', sender: 'alisa', textKey: 'Я тоже нервничаю, это нормально', time: '20:16' },
        { type: 'reaction', sender: 'alisa', textKey: 'Просто говори, что думаешь', time: '20:17' },
        { type: 'stats', changes: { success: 0, romance: 2, humor: 0 } },
        { type: 'flags', set: { meetPark: true, honestWithAlisa: true } }
      ],
      d6_park_wait: [
        { type: 'reaction', sender: 'alisa', textKey: 'Поняла. Тогда ждать и уговаривать не буду', time: '20:16' },
        { type: 'flags', set: { skippedPark: true, choseCareful: true } }
      ],
      d6_park_secret: [
        { type: 'reaction', sender: 'alisa', textKey: 'Я не хочу тайных встреч', time: '20:16' },
        { type: 'reaction', sender: 'alisa', textKey: 'Если мы что-то скрываем — это проблема', time: '20:17' },
        { type: 'stats', changes: { success: -1, romance: -4, humor: 0 } },
        { type: 'flags', set: { skippedPark: true, choseRisk: true, pushedTooFast: true } }
      ]
    } },
    { type: 'if', check: { hasFlag: 'meetPark' }, then: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'И ещё одно', time: '20:19' },
        { sender: 'alisa', textKey: 'Без готовых ответов, ок?', time: '20:20' },
        { sender: 'alisa', textKey: 'Приходи, только если правда хочешь всё это обсудить', time: '20:21' }
      ] }
    ] },
    { type: 'achievement' },
    { type: 'goto', day: 'day7' }
  ]
};