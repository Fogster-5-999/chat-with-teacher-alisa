/** Day 5 — consequences. The central choice is how the player handles real risk. */
export const day5_1 = {
  start: { afterDay: 'day4' },
  steps: [
    { type: 'if', check: { hasFlag: 'cafeMet' }, then: [
      { type: 'notification', id: 'friendMisha', name: 'Миша', textKey: 'ЧЕЕЛ, в чат кинули фото из кофейни, это ты с преподом?', icon: '👤' },
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Слушай, у нас проблема', time: '20:16' },
        { sender: 'alisa', textKey: 'Кто-то выложил фото из кофейни', time: '20:17' }
      ] },
      { type: 'photo', url: 'res/chat3.png', blurred: true, time: '20:19' }
    ], else: [
      { type: 'notification', id: 'friendMisha', name: 'Миша', textKey: 'Слышал, ты с молодой преподшей по вечерам переписываешься, это правда?', icon: '👤' },
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Мне написала руководитель', time: '20:16' },
        { sender: 'alisa', textKey: 'До неё дошли слухи про наши сообщения', time: '20:17' },
        { sender: 'alisa', textKey: 'Она спросила, почему я так часто общаюсь со студентом', time: '20:18' }
      ] }
    ] },
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'Дело не в возрасте', time: '20:21' },
      { sender: 'alisa', textKey: 'Ты всё ещё мой студент', time: '20:22' },
      { sender: 'alisa', textKey: 'Теперь наше общение могут обернуть против меня', time: '20:23' },
      { sender: 'alisa', textKey: 'Мне реально страшно', time: '20:24' }
    ] },
    { type: 'if', check: { hasFlag: 'openToTransfer' }, then: [
      { type: 'message', sender: 'alisa', textKey: 'Ты вчера про перевод говорил. Я не забыла', time: '20:26' }
    ] },
    { type: 'voice', voiceId: 'day_5_1', time: '20:28' },
    { type: 'choice', id: 'day5_first_response', time: '20:31', options: [
      { id: 'd5_reassure', labelKey: 'd5_reassure' },
      { id: 'd5_truth', labelKey: 'd5_truth' },
      { id: 'd5_transfer', labelKey: 'd5_transfer' },
      { id: 'd5_lie', labelKey: 'd5_lie', hidden: true },
      { id: 'd5_take_over', labelKey: 'd5_take_over', hidden: true, cost: 2 }
    ] },
    { type: 'branch', onChoice: 'day5_first_response', branches: {
      d5_reassure: [
        { type: 'reaction', sender: 'alisa', textKey: 'Спасибо… правда. Это помогает', time: '20:33' },
        { type: 'stats', changes: { success: 0, romance: 2, humor: 0 } },
        { type: 'flags', set: { reassuredHer: true } }
      ],
      d5_truth: [
        { type: 'reaction', sender: 'alisa', textKey: 'Спасибо, что не предлагаешь врать', time: '20:33' },
        { type: 'reaction', sender: 'alisa', textKey: 'Скажу как есть. Были занятия и ещё несколько личных разговоров', time: '20:34' },
        { type: 'stats', changes: { success: 2, romance: 1, humor: 0 } },
        { type: 'flags', set: { honestUnderPressure: true } }
      ],
      d5_transfer: [
        { type: 'reaction', sender: 'alisa', textKey: 'Звучит неприятно. Но, может, так будет правильнее', time: '20:33' },
        { type: 'reaction', sender: 'alisa', textKey: 'Я сама это подниму. Не знаю, что они решат', time: '20:34' },
        { type: 'stats', changes: { success: 4, romance: 2, humor: 0 } },
        { type: 'flags', set: { requestedReassignment: true, honestUnderPressure: true } }
      ],
      d5_lie: [
        { type: 'reaction', sender: 'alisa', textKey: 'То есть попросить меня соврать?', time: '20:33' },
        { type: 'reaction', sender: 'alisa', textKey: 'Я не хочу врать из-за этого', time: '20:34' },
        { type: 'stats', changes: { success: -3, romance: -4, humor: 0 } },
        { type: 'flags', set: { liedToManager: true } }
      ],
      d5_take_over: [
        { type: 'reaction', sender: 'alisa', textKey: 'Нет!', time: '20:33' },
        { type: 'reaction', sender: 'alisa', textKey: 'Не смей ей писать или говорить что-то', time: '20:34' },
        { type: 'reaction', sender: 'alisa', textKey: 'Я сама решу что с этим делать.', time: '20:35' },
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
      { sender: 'alisa', textKey: 'Я поговорила с руководителем', time: '20:01' },
      { sender: 'alisa', textKey: 'Ничего не закрыли и не решили за один разговор', time: '20:02' },
      { sender: 'alisa', textKey: 'Но пока надо держать дистанцию', time: '20:03' }
    ] },
    { type: 'if', check: { hasFlag: 'requestedReassignment' }, then: [
      { type: 'message', sender: 'alisa', textKey: 'Заявку на перевод приняли к рассмотрению, ответ обещали в ближайшие дни', time: '20:05' }
    ] },
    { type: 'if', check: { hasFlag: 'liedToManager' }, then: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Я сказала, что это были только дополнительные занятия', time: '20:07' },
        { sender: 'alisa', textKey: 'Мне от этого очень не по себе', time: '20:08' },
        { sender: 'alisa', textKey: 'Я просила тебя не втягивать меня в это', time: '20:09' }
      ] }
    ] },
    { type: 'if', check: { hasFlag: 'actedWithoutConsent' }, then: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Пожалуйста, не решай за меня. Так только больнее', time: '20:11' },
        { sender: 'alisa', textKey: 'После вчерашнего мне надо немного прийти в себя', time: '20:12' }
      ] }
    ] },
    { type: 'if', check: { hasFlag: 'pushedTooFast' }, then: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Давай без такого напора', time: '20:14' },
        { sender: 'alisa', textKey: 'Хорошо?', time: '20:15' },
        { sender: 'alisa', textKey: 'Сейчас мне это не поможет, а только мешает.', time: '20:16' }
      ] }
    ] },
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'И что нам теперь делать? Я сама пока не знаю', time: '20:19' },
      { sender: 'alisa', textKey: 'Я про сейчас', time: '20:20' }
    ] },
    { type: 'choice', id: 'day5_route_choice', time: '20:23', options: [
      { id: 'd5_route_careful', labelKey: 'd5_route_careful' },
      { id: 'd5_route_clean', labelKey: 'd5_route_clean' },
      { id: 'd5_route_risk', labelKey: 'd5_route_risk', hidden: true },
      { id: 'd5_route_distance', labelKey: 'd5_route_distance' }
    ] },
    { type: 'branch', onChoice: 'day5_route_choice', branches: {
      d5_route_careful: [
        { type: 'reaction', sender: 'alisa', textKey: 'Спасибо. Давай пока без ночных переписок и секретов', time: '20:25' },
        { type: 'reaction', sender: 'alisa', textKey: 'Я сейчас так не могу. Давай просто немного притормозим', time: '20:26' },
        { type: 'stats', changes: { success: 2, romance: 1, humor: 0 } },
        { type: 'flags', set: { choseCareful: true, respectsBoundary: true } }
      ],
      d5_route_clean: [
        { type: 'reaction', sender: 'alisa', textKey: 'Да. Ждём решения по переводу и не лезем вперёд', time: '20:25' },
        { type: 'stats', changes: { success: 4, romance: 2, humor: 0 } },
        { type: 'flags', set: { choseClean: true, requestedReassignment: true } }
      ],
      d5_route_risk: [
        { type: 'reaction', sender: 'alisa', textKey: 'Я не хочу ни врать, ни прятаться', time: '20:25' },
        { type: 'reaction', sender: 'alisa', textKey: 'Но и просто взять и всё прекратить я тоже не могу', time: '20:26' },
        { type: 'stats', changes: { success: -2, romance: 1, humor: 0 } },
        { type: 'flags', set: { choseRisk: true } }
      ],
      d5_route_distance: [
        { type: 'reaction', sender: 'alisa', textKey: 'Наверное, сейчас так будет спокойнее', time: '20:25' },
        { type: 'reaction', sender: 'alisa', textKey: 'Мне неприятно это писать, но я тебя услышала', time: '20:26' },
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
        { sender: 'alisa', textKey: 'Весь вечер думаю, правильно ли мы сделали', time: '21:31' },
        { sender: 'alisa', textKey: 'Но держать тебя рядом только потому, что мне страшно, я тоже не хочу', time: '21:32' }
      ] },
      { type: 'choice', id: 'day5_distance_choice', time: '21:35', options: [
        { id: 'd5_distance_confirm', labelKey: 'd5_distance_confirm' },
        { id: 'd5_distance_pause', labelKey: 'd5_distance_pause' },
        { id: 'd5_distance_apologize', labelKey: 'd5_distance_apologize' }
      ] },
      { type: 'branch', onChoice: 'day5_distance_choice', branches: {
        d5_distance_confirm: [
          { type: 'reaction', sender: 'alisa', textKey: 'Поняла, тогда на этом остановимся', time: '21:37' },
          { type: 'flags', set: { finalStopPath: true } }
        ],
        d5_distance_pause: [
          { type: 'reaction', sender: 'alisa', textKey: 'Давай правда поставим всё на паузу', time: '21:37' },
          { type: 'flags', set: { choseCareful: true } }
        ],
        d5_distance_apologize: [
          { type: 'reaction', sender: 'alisa', textKey: 'Спасибо, я тоже не хочу, чтобы всё закончилось обидой', time: '21:37' },
          { type: 'flags', set: { choseCareful: true, honestUnderPressure: true } }
        ]
      } }
    ] },
    { type: 'if', check: { not: { hasFlag: 'choseDistance' } }, then: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Слушай…', time: '21:31' },
        { sender: 'alisa', textKey: 'Не буду писать много. Просто скажу.', time: '21:32' }
      ] },
      { type: 'voice', voiceId: 'day_5_3', time: '21:34' },
      { type: 'choice', id: 'day5_commitment_choice', time: '21:37', options: [
        { id: 'd5_commit_clean', labelKey: 'd5_commit_clean' },
        { id: 'd5_commit_wait', labelKey: 'd5_commit_wait' },
        { id: 'd5_commit_risk', labelKey: 'd5_commit_risk', hidden: true },
        { id: 'd5_commit_stop', labelKey: 'd5_commit_stop' }
      ] },
      { type: 'branch', onChoice: 'day5_commitment_choice', branches: {
        d5_commit_clean: [
          { type: 'reaction', sender: 'alisa', textKey: 'Тогда так и делаем. Сначала перевод, потом всё остальное', time: '21:39' },
          { type: 'stats', changes: { success: 3, romance: 2, humor: 0 } },
          { type: 'flags', set: { choseClean: true, requestedReassignment: true } }
        ],
        d5_commit_wait: [
          { type: 'reaction', sender: 'alisa', textKey: 'Спасибо. Мне легче, когда от меня сейчас не требуют ответа', time: '21:39' },
          { type: 'flags', set: { choseCareful: true, respectsBoundary: true } }
        ],
        d5_commit_risk: [
          { type: 'reaction', sender: 'alisa', textKey: 'Я не обещаю, что всё закончится хорошо', time: '21:39' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но мне тоже трудно вот так просто исчезнуть', time: '21:40' },
          { type: 'flags', set: { choseRisk: true } }
        ],
        d5_commit_stop: [
          { type: 'reaction', sender: 'alisa', textKey: 'Хорошо, тогда давай остановимся без обвинений', time: '21:39' },
          { type: 'flags', set: { finalStopPath: true } }
        ]
      } }
    ] },
    { type: 'achievement' },
    { type: 'goto', day: 'day6' }
  ]
};
