/** Day 7 — final outcome depends on the route and accumulated conduct, not one button. */
export default {
  start: { afterDay: 'day6' },
  steps: [
    { type: 'if', check: { hasFlag: 'finalStopPath' }, then: [
      { type: 'endGame', messages: [
        { sender: 'system', textKey: '❄️ Финал: тихий разрыв' },
        { sender: 'system', textKey: 'Вы остановились до того, как попытались сделать друг другу больнее. Не самый счастливый конец, но честный.' },
        { sender: 'system', textKey: '📊 Итог: Успеваемость {{success}}, Романтика {{romance}}, Юмор {{humor}}' }
      ] },
      { type: 'goto', label: 'end' }
    ] },
    { type: 'if', check: { hasFlag: 'skippedPark' }, then: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Я поняла, что ты не придёшь' },
        { sender: 'alisa', textKey: 'Спасибо, что хотя бы не заставил меня ждать дольше' }
      ] },
      { type: 'endGame', messages: [
        { sender: 'system', textKey: '🌫️ Финал: недосказанность' },
        { sender: 'system', textKey: 'Разговор так и не состоялся. Потом вы просто перестали писать друг другу.' },
        { sender: 'system', textKey: '📊 Итог: Успеваемость {{success}}, Романтика {{romance}}, Юмор {{humor}}' }
      ] },
      { type: 'goto', label: 'end' }
    ] },
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'Привет, я уже у пруда' },
      { sender: 'alisa', textKey: 'Немного холодно' },
      { sender: 'alisa', textKey: 'И я вообще не знаю, чем всё закончится' }
    ] },
    { type: 'voice', voiceId: 'day_7' },
    { type: 'message', sender: 'system', textKey: '— Дальше — встреча в парке и разговор без телефонов.' },
    { type: 'choice', id: 'day7_final_choice', options: [
      { id: 'd7_commit', labelKey: 'd7_commit' },
      { id: 'd7_wait', labelKey: 'd7_wait' },
      { id: 'd7_open', labelKey: 'd7_open' },
      { id: 'd7_stop', labelKey: 'd7_stop' }
    ] },
    { type: 'branch', onChoice: 'day7_final_choice', branches: {
      d7_commit: [
        { type: 'reaction', sender: 'alisa', textKey: 'Я услышала' },
        { type: 'flags', set: { finalCommit: true } }
      ],
      d7_wait: [
        { type: 'reaction', sender: 'alisa', textKey: 'Мне тоже так спокойнее' },
        { type: 'flags', set: { finalWait: true } }
      ],
      d7_open: [
        { type: 'reaction', sender: 'alisa', textKey: 'Давай без громких слов. Просто честно' },
        { type: 'flags', set: { finalOpen: true } }
      ],
      d7_stop: [
        { type: 'reaction', sender: 'alisa', textKey: 'Хорошо. Мне больно, но я понимаю' },
        { type: 'flags', set: { finalStop: true } }
      ]
    } },
    { type: 'flags', set: { gameEnded: true } },
    { type: 'achievement' },

    { type: 'if', check: { hasFlag: 'finalStop' }, then: [
      { type: 'endGame', messages: [
        { sender: 'system', textKey: '❄️ Финал: отпустили' },
        { sender: 'system', textKey: 'Вы поговорили честно и решили не продолжать. Никто никого не блокировал — просто дальше вам не по пути.' },
        { sender: 'system', textKey: '📊 Итог: Успеваемость {{success}}, Романтика {{romance}}, Юмор {{humor}}' }
      ] },
      { type: 'goto', label: 'end' }
    ] },
    { type: 'if', check: { and: [{ hasFlag: 'finalCommit' }, { hasFlag: 'choseClean' }, { hasFlag: 'requestedReassignment' }] }, then: [
      { type: 'endGame', messages: [
        { sender: 'system', textKey: '💛 Финал: честное начало' },
        { sender: 'system', textKey: 'Сначала вы убрали проблему с учёбой. Только потом решили попробовать.' },
        { sender: 'system', textKey: '📊 Итог: Успеваемость {{success}}, Романтика {{romance}}, Юмор {{humor}}' }
      ] },
      { type: 'goto', label: 'end' }
    ] },
    { type: 'if', check: { and: [{ hasFlag: 'finalCommit' }, { hasFlag: 'choseRisk' }, { hasFlag: 'honestUnderPressure' }, { not: { hasFlag: 'actedWithoutConsent' } }, { not: { hasFlag: 'liedToManager' } }] }, then: [
      { type: 'endGame', messages: [
        { sender: 'system', textKey: '⚠️ Финал: риск с последствиями' },
        { sender: 'system', textKey: 'От чувств вы не спрятались. Но проблему это не решило. Впереди разговоры с руководством и шанс потерять больше, чем хотелось. Вы оба это понимаете.' },
        { sender: 'system', textKey: '📊 Итог: Успеваемость {{success}}, Романтика {{romance}}, Юмор {{humor}}' }
      ] },
      { type: 'goto', label: 'end' }
    ] },
    { type: 'if', check: { and: [{ hasFlag: 'finalCommit' }, { or: [{ hasFlag: 'pushedTooFast' }, { hasFlag: 'actedWithoutConsent' }, { hasFlag: 'liedToManager' }] }] }, then: [
      { type: 'endGame', messages: [
        { sender: 'system', textKey: '🧊 Финал: граница' },
        { sender: 'system', textKey: 'Алиса не приняла признание как способ отменить прежние поступки. Она попросила остановиться: одного признания оказалось мало.' },
        { sender: 'system', textKey: '📊 Итог: Успеваемость {{success}}, Романтика {{romance}}, Юмор {{humor}}' }
      ] },
      { type: 'goto', label: 'end' }
    ] },
    { type: 'if', check: { or: [{ hasFlag: 'finalWait' }, { hasFlag: 'choseCareful' }] }, then: [
      { type: 'endGame', messages: [
        { sender: 'system', textKey: '🤝 Финал: пауза с доверием' },
        { sender: 'system', textKey: 'Вы не стали торопиться. Пока просто остались рядом.' },
        { sender: 'system', textKey: '📊 Итог: Успеваемость {{success}}, Романтика {{romance}}, Юмор {{humor}}' }
      ] },
      { type: 'goto', label: 'end' }
    ] },
    { type: 'if', check: { and: [{ hasFlag: 'finalOpen' }, { hasFlag: 'trustBuilt' }, { hasFlag: 'honestWithAlisa' }, { not: { hasFlag: 'pushedTooFast' } }] }, then: [
      { type: 'endGame', messages: [
        { sender: 'system', textKey: '🌤️ Финал: без громких слов' },
        { sender: 'system', textKey: 'Вы так и не назвали всё своими словами. Но договорились не давить друг на друга. Пока этого достаточно.' },
        { sender: 'system', textKey: '📊 Итог: Успеваемость {{success}}, Романтика {{romance}}, Юмор {{humor}}' }
      ] },
      { type: 'goto', label: 'end' }
    ] },
    { type: 'if', check: { always: true }, then: [
      { type: 'endGame', messages: [
        { sender: 'system', textKey: '🌫️ Финал: честная неопределённость' },
        { sender: 'system', textKey: 'Разговор состоялся, но готового ответа не дал. Вы разошлись с пониманием, что одной симпатии оказалось мало.' },
        { sender: 'system', textKey: '📊 Итог: Успеваемость {{success}}, Романтика {{romance}}, Юмор {{humor}}' }
      ] },
      { type: 'goto', label: 'end' }
    ] },
    { type: 'label', name: 'end' }
  ]
};
