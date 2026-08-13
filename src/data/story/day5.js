/** Day 5 — consequences. The central choice is how the player handles real risk. */
export const day5_1 = {
  start: { afterDay: 'day4' },
  steps: [
    { type: 'if', check: { hasFlag: 'cafeMet' }, then: [
      { type: 'notification', id: 'friendMisha', name: 'Миша', textKey: 'Бро, в чат кинули фото из кофейни, это ты с преподом?', icon: '👤' },
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Слушай, у нас проблема.' },
        { sender: 'alisa', textKey: 'Кто-то выложил фото из кофейни.' },
        { sender: 'alisa', textKey: 'Руководитель уже спросила, что это было.' }
      ] },
      { type: 'photo', url: 'res/chat3.png', blurred: true }
    ], else: [
      { type: 'notification', id: 'friendMisha', name: 'Миша', textKey: 'Слышал, ты с молодой преподшей по вечерам переписываешься, это правда?', icon: '👤' },
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Мне написала руководитель.' },
        { sender: 'alisa', textKey: 'До неё дошли слухи про наши сообщения.' },
        { sender: 'alisa', textKey: 'Она спросила, почему я так часто общаюсь со студентом.' }
      ] }
    ] },
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'Дело не в возрасте.' },
      { sender: 'alisa', textKey: 'Ты всё ещё мой студент.' },
      { sender: 'alisa', textKey: 'Теперь наше общение могут обернуть против меня.' },
      { sender: 'alisa', textKey: 'Мне реально страшно.' }
    ] },
    { type: 'if', check: { hasFlag: 'openToTransfer' }, then: [
      { type: 'message', sender: 'alisa', textKey: 'Ты вчера про перевод говорил. Я не забыла.' }
    ] },
    { type: 'voice', voiceId: 'day_5_1' },
    { type: 'choice', id: 'day5_first_response', options: [
      { id: 'd5_truth', labelKey: 'd5_truth' },
      { id: 'd5_transfer', labelKey: 'd5_transfer' },
      { id: 'd5_lie', labelKey: 'd5_lie', hidden: true },
      { id: 'd5_take_over', labelKey: 'd5_take_over', hidden: true, cost: 2 }
    ] },
    { type: 'branch', onChoice: 'day5_first_response', branches: {
      d5_truth: [
        { type: 'reaction', sender: 'alisa', textKey: 'Спасибо, что не предлагаешь врать.' },
        { type: 'reaction', sender: 'alisa', textKey: 'Скажу как есть. Были занятия и ещё несколько личных разговоров.' },
        { type: 'stats', changes: { success: 2, romance: 1, humor: 0 } },
        { type: 'flags', set: { honestUnderPressure: true } }
      ],
      d5_transfer: [
        { type: 'reaction', sender: 'alisa', textKey: 'Звучит неприятно. Но, может, так будет правильнее.' },
        { type: 'reaction', sender: 'alisa', textKey: 'Я сама это подниму. Не знаю, что они решат.' },
        { type: 'stats', changes: { success: 4, romance: 2, humor: 0 } },
        { type: 'flags', set: { requestedReassignment: true, honestUnderPressure: true } }
      ],
      d5_lie: [
        { type: 'reaction', sender: 'alisa', textKey: 'То есть попросить меня соврать?' },
        { type: 'reaction', sender: 'alisa', textKey: 'Я не хочу врать из-за этого.' },
        { type: 'stats', changes: { success: -3, romance: -4, humor: 0 } },
        { type: 'flags', set: { liedToManager: true } }
      ],
      d5_take_over: [
        { type: 'reaction', sender: 'alisa', textKey: 'Нет, не пиши ей и не приходи к ней.' },
        { type: 'reaction', sender: 'alisa', textKey: 'Не надо решать это за меня. Я сама разберусь.' },
        { type: 'stats', changes: { success: -2, romance: -5, humor: 0 } },
        { type: 'flags', set: { actedWithoutConsent: true, pushedTooFast: true } }
      ]
    } },
    { type: 'achievement' },
    { type: 'goto', day: 'day5_2' }
  ]
};

export const day5_2 = {
  start: { afterDay: 'day5_1' },
  steps: [
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'Я поговорила с руководителем.' },
      { sender: 'alisa', textKey: 'Ничего не закрыли и не решили за один разговор.' },
      { sender: 'alisa', textKey: 'Она попросила дать ей время и пока держать дистанцию.' }
    ] },
    { type: 'if', check: { hasFlag: 'requestedReassignment' }, then: [
      { type: 'message', sender: 'alisa', textKey: 'Заявку на перевод приняли к рассмотрению, ответ обещали в ближайшие дни.' }
    ] },
    { type: 'if', check: { hasFlag: 'liedToManager' }, then: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Я сказала, что это были только дополнительные занятия.' },
        { sender: 'alisa', textKey: 'Мне от этого очень не по себе.' },
        { sender: 'alisa', textKey: 'Я просила тебя не втягивать меня в это.' }
      ] }
    ] },
    { type: 'if', check: { hasFlag: 'actedWithoutConsent' }, then: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Пожалуйста, не решай за меня. Так только больнее.' },
        { sender: 'alisa', textKey: 'После вчерашнего мне надо немного прийти в себя.' }
      ] }
    ] },
    { type: 'if', check: { hasFlag: 'pushedTooFast' }, then: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Давай без напора, хорошо?' },
        { sender: 'alisa', textKey: 'Сейчас мне это не поможет, а оттолкнёт.' }
      ] }
    ] },
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'И что нам теперь делать? Я сама пока не знаю.' },
      { sender: 'alisa', textKey: 'Я про сейчас.' }
    ] },
    { type: 'choice', id: 'day5_route_choice', options: [
      { id: 'd5_route_careful', labelKey: 'd5_route_careful' },
      { id: 'd5_route_clean', labelKey: 'd5_route_clean' },
      { id: 'd5_route_risk', labelKey: 'd5_route_risk', hidden: true },
      { id: 'd5_route_distance', labelKey: 'd5_route_distance' }
    ] },
    { type: 'branch', onChoice: 'day5_route_choice', branches: {
      d5_route_careful: [
        { type: 'reaction', sender: 'alisa', textKey: 'Спасибо. Давай пока без ночных переписок и секретов.' },
        { type: 'reaction', sender: 'alisa', textKey: 'Я сейчас так не могу. Давай просто немного притормозим.' },
        { type: 'stats', changes: { success: 2, romance: 1, humor: 0 } },
        { type: 'flags', set: { choseCareful: true, respectsBoundary: true } }
      ],
      d5_route_clean: [
        { type: 'reaction', sender: 'alisa', textKey: 'Да. Ждём решения по переводу и не лезем вперёд.' },
        { type: 'stats', changes: { success: 4, romance: 2, humor: 0 } },
        { type: 'flags', set: { choseClean: true, requestedReassignment: true } }
      ],
      d5_route_risk: [
        { type: 'reaction', sender: 'alisa', textKey: 'Я не хочу ни врать, ни прятаться.' },
        { type: 'reaction', sender: 'alisa', textKey: 'Но и просто взять и всё прекратить я тоже не могу.' },
        { type: 'stats', changes: { success: -2, romance: 1, humor: 0 } },
        { type: 'flags', set: { choseRisk: true } }
      ],
      d5_route_distance: [
        { type: 'reaction', sender: 'alisa', textKey: 'Наверное, сейчас так будет спокойнее.' },
        { type: 'reaction', sender: 'alisa', textKey: 'Мне неприятно это писать, но я тебя услышала.' },
        { type: 'stats', changes: { success: 0, romance: -3, humor: 0 } },
        { type: 'flags', set: { choseDistance: true } }
      ]
    } },
    { type: 'achievement' },
    { type: 'goto', day: 'day5_3' }
  ]
};

export const day5_3 = {
  start: { afterDay: 'day5_2' },
  steps: [
    { type: 'if', check: { hasFlag: 'choseDistance' }, then: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Весь вечер думаю, правильно ли мы сделали.' },
        { sender: 'alisa', textKey: 'Но держать тебя рядом только потому, что мне страшно, я тоже не хочу.' }
      ] },
      { type: 'choice', id: 'day5_distance_choice', options: [
        { id: 'd5_distance_confirm', labelKey: 'd5_distance_confirm' },
        { id: 'd5_distance_pause', labelKey: 'd5_distance_pause' },
        { id: 'd5_distance_apologize', labelKey: 'd5_distance_apologize' }
      ] },
      { type: 'branch', onChoice: 'day5_distance_choice', branches: {
        d5_distance_confirm: [
          { type: 'reaction', sender: 'alisa', textKey: 'Поняла, тогда на этом остановимся.' },
          { type: 'flags', set: { finalStopPath: true } }
        ],
        d5_distance_pause: [
          { type: 'reaction', sender: 'alisa', textKey: 'Давай правда поставим всё на паузу.' },
          { type: 'flags', set: { choseCareful: true } }
        ],
        d5_distance_apologize: [
          { type: 'reaction', sender: 'alisa', textKey: 'Спасибо, я тоже не хочу, чтобы всё закончилось обидой.' },
          { type: 'flags', set: { choseCareful: true, honestUnderPressure: true } }
        ]
      } }
    ] },
    { type: 'if', check: { not: { hasFlag: 'choseDistance' } }, then: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Лежу и весь вечер об этом думаю.' },
        { sender: 'alisa', textKey: 'И вообще не понимаю, чего хочу.' }
      ] },
      { type: 'voice', voiceId: 'day_5_3' },
      { type: 'choice', id: 'day5_commitment_choice', options: [
        { id: 'd5_commit_clean', labelKey: 'd5_commit_clean' },
        { id: 'd5_commit_wait', labelKey: 'd5_commit_wait' },
        { id: 'd5_commit_risk', labelKey: 'd5_commit_risk', hidden: true },
        { id: 'd5_commit_stop', labelKey: 'd5_commit_stop' }
      ] },
      { type: 'branch', onChoice: 'day5_commitment_choice', branches: {
        d5_commit_clean: [
          { type: 'reaction', sender: 'alisa', textKey: 'Тогда так и делаем. Сначала перевод, потом всё остальное.' },
          { type: 'stats', changes: { success: 3, romance: 2, humor: 0 } },
          { type: 'flags', set: { choseClean: true, requestedReassignment: true } }
        ],
        d5_commit_wait: [
          { type: 'reaction', sender: 'alisa', textKey: 'Спасибо. Мне легче, когда от меня сейчас не требуют ответа.' },
          { type: 'flags', set: { choseCareful: true, respectsBoundary: true } }
        ],
        d5_commit_risk: [
          { type: 'reaction', sender: 'alisa', textKey: 'Я не обещаю, что всё закончится хорошо.' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но мне тоже трудно вот так просто исчезнуть.' },
          { type: 'flags', set: { choseRisk: true } }
        ],
        d5_commit_stop: [
          { type: 'reaction', sender: 'alisa', textKey: 'Хорошо, тогда давай остановимся без обвинений.' },
          { type: 'flags', set: { finalStopPath: true } }
        ]
      } }
    ] },
    { type: 'achievement' },
    { type: 'goto', day: 'day6' }
  ]
};
