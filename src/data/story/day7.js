/**
 * Day 7 — final day.
 * Финальная версия: несколько реально разных концовок,
 * включая жёсткую (блок + ЧС).
 */

export default {
  start: { afterDay: 'day6' },
  steps: [
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'Привет' },
        { sender: 'alisa', textKey: 'Я уже в парке' },
        { sender: 'alisa', textKey: 'На скамейке у пруда' },
        { sender: 'alisa', textKey: 'Что бы ты сейчас ни сказал' },
        { sender: 'alisa', textKey: 'Я хочу, чтобы это было честно' },
        { sender: 'alisa', textKey: 'Только без красивых слов ради красивых слов' }
      ]
    },
    { type: 'voice', voiceId: 'day_7' },
    { type: 'message', sender: 'system', textKey: '— Дальше — без экрана: парк, скамейка у пруда, долгий разговор 🙂' },
    {
      type: 'choice',
      id: 'day7_choice',
      options: [
        { id: 'opt7_1', labelKey: 'Я готов рискнуть. хочу быть с тобой' },
        { id: 'opt7_2', labelKey: 'Давай подождём, пока всё уляжется' },
        { id: 'opt7_3', labelKey: 'Оставим всё как есть, без ярлыков' },
        { id: 'opt7_4', labelKey: 'У меня встречное предложение...', hidden: true },
        { id: 'opt7_5', labelKey: 'Может, нам правда лучше остановиться', hidden: true }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day7_choice',
      branches: {
        opt7_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'Я тоже готова' },
          { type: 'reaction', sender: 'alisa', textKey: 'Страшно, но готова' },
          { type: 'stats', changes: { success: 5, romance: 15, humor: 0 } },
          { type: 'flags', set: { finalCommit: true } }
        ],
        opt7_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'Это мудро' },
          { type: 'reaction', sender: 'alisa', textKey: 'Я подожду, сколько нужно' },
          { type: 'stats', changes: { success: 10, romance: 8, humor: 0 } },
          { type: 'flags', set: { finalWait: true } }
        ],
        opt7_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'Без ярлыков — это честно' },
          { type: 'reaction', sender: 'alisa', textKey: 'Мне подходит' },
          { type: 'stats', changes: { success: 5, romance: 6, humor: 4 } },
          { type: 'flags', set: { finalOpen: true } }
        ],
        opt7_4: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ну давай' },
          { type: 'reaction', sender: 'alisa', textKey: 'Удиви меня' },
          { type: 'stats', changes: { success: 3, romance: 10, humor: 10 } },
          { type: 'flags', set: { finalPlayful: true } }
        ],
        opt7_5: [
          { type: 'reaction', sender: 'alisa', textKey: '...' },
          { type: 'reaction', sender: 'alisa', textKey: 'Хорошо' },
          { type: 'reaction', sender: 'alisa', textKey: 'Тогда остановимся' },
          { type: 'stats', changes: { success: 0, romance: -8, humor: 0 } },
          { type: 'flags', set: { finalStop: true } }
        ]
      }
    },
    { type: 'flags', set: { gameEnded: true } },
    { type: 'achievement' },

    // ========== ENDING ROUTER (порядок важен) ==========

    // 1. ЖЁСТКАЯ: БЛОК + ЧС
    {
      type: 'if',
      check: {
        or: [
          { and: [{ hasFlag: 'downplayedRelationship' }, { stat: 'romance', lt: 25 }] },
          { and: [{ hasFlag: 'finalStop' }, { stat: 'romance', lt: 30 }] },
          { and: [{ hasFlag: 'pulledBack' }, { hasFlag: 'downplayedRelationship' }] }
        ]
      },
      then: [
        { type: 'reaction', sender: 'alisa', textKey: 'Знаешь' },
        { type: 'reaction', sender: 'alisa', textKey: 'Я всё это время пыталась понять' },
        { type: 'reaction', sender: 'alisa', textKey: 'Ты правда хотел чего-то настоящего' },
        { type: 'reaction', sender: 'alisa', textKey: 'Или просто интересно было' },
        { type: 'reaction', sender: 'alisa', textKey: '...' },
        { type: 'reaction', sender: 'alisa', textKey: 'Не пиши мне больше' },
        {
          type: 'endGame',
          messages: [
            { sender: 'system', textKey: '🚫 Финал: блок' },
            { sender: 'system', textKey: 'Алиса больше не отвечает. Через несколько минут ты понимаешь, что тебя заблокировали. Переписка удалена. Всё, что было — осталось только у тебя в памяти.' },
            { sender: 'system', textKey: '📊 Итог: Успеваемость {{success}}, Романтика {{romance}}, Юмор {{humor}}' }
          ]
        },
        { type: 'goto', label: 'end' }
      ]
    },

    // 2. ОСОБЕННОЕ ПРИЗНАНИЕ (earlyConfession из day6 + finalCommit)
    {
      type: 'if',
      check: { and: [{ hasFlag: 'earlyConfession' }, { hasFlag: 'finalCommit' }] },
      then: [
        { type: 'message', sender: 'system', textKey: '— Ты, как и обещал вчера, говоришь ей это вживую — просто так, без поводов.' },
        { type: 'reaction', sender: 'alisa', textKey: 'Я знала' },
        { type: 'reaction', sender: 'alisa', textKey: 'Я весь день ждала, когда ты это скажешь' },
        {
          type: 'endGame',
          messages: [
            { sender: 'system', textKey: '💝 Финал: особенное признание' },
            { sender: 'system', textKey: 'Ты подготовился, выбрал момент и сказал всё вживую — как и обещал накануне. Алиса призналась, что ждала этого весь день. Начало получилось честным и по-настоящему твоим.' },
            { sender: 'system', textKey: '📊 Итог: Успеваемость {{success}}, Романтика {{romance}}, Юмор {{humor}}' }
          ]
        },
        { type: 'goto', label: 'end' }
      ]
    },

    // 3. Честное начало
    {
      type: 'if',
      check: { and: [{ hasFlag: 'finalCommit' }, { hasFlag: 'chosePathClean' }] },
      then: [
        { type: 'reaction', sender: 'alisa', textKey: 'С понедельника у меня официально другой куратор' },
        { type: 'reaction', sender: 'alisa', textKey: 'С тобой я теперь просто... я' },
        { type: 'reaction', sender: 'alisa', textKey: 'Спасибо, что придумал это' },
        { type: 'reaction', sender: 'alisa', textKey: 'По-моему, у нас всё получится' },
        {
          type: 'endGame',
          messages: [
            { sender: 'system', textKey: '💛 Финал: честное начало' },
            { sender: 'system', textKey: 'Вы сначала разобрались со всем официально, а уже потом решили попробовать быть вместе.' },
            { sender: 'system', textKey: '📊 Итог: Успеваемость {{success}}, Романтика {{romance}}, Юмор {{humor}}' }
          ]
        },
        { type: 'goto', label: 'end' }
      ]
    },

    // 4. Рискнули
    {
      type: 'if',
      check: { and: [{ hasFlag: 'finalCommit' }, { stat: 'romance', gte: 45 }] },
      then: [
        { type: 'reaction', sender: 'alisa', textKey: 'Я не знаю, что будет с работой' },
        { type: 'reaction', sender: 'alisa', textKey: 'Но я знаю, что не хочу тебя терять' },
        { type: 'reaction', sender: 'alisa', textKey: 'Давай просто попробуем' },
        { type: 'reaction', sender: 'alisa', textKey: 'Разберёмся по ходу' },
        {
          type: 'endGame',
          messages: [
            { sender: 'system', textKey: '💖 Финал: рискнули' },
            { sender: 'system', textKey: 'Вы выбрали друг друга, даже не имея всех ответов. Впереди неловкие разговоры с начальством и, возможно, трудный выбор — но сейчас вы вместе, и это главное.' },
            { sender: 'system', textKey: '📊 Итог: Успеваемость {{success}}, Романтика {{romance}}, Юмор {{humor}}' }
          ]
        },
        { type: 'goto', label: 'end' }
      ]
    },

    // 5. Пауза с надеждой
    {
      type: 'if',
      check: { hasFlag: 'finalWait' },
      then: [
        { type: 'reaction', sender: 'alisa', textKey: 'Мне нравится, что ты не торопишь события' },
        { type: 'reaction', sender: 'alisa', textKey: 'А пока у нас есть уроки, кофе по субботам и куча времени' },
        {
          type: 'endGame',
          messages: [
            { sender: 'system', textKey: '🤝 Финал: пауза с надеждой' },
            { sender: 'system', textKey: 'Вы решили не торопиться. Ничего не разрушено, ничего пока не начато по-настоящему — но между вами осталась тёплая, честная связь, которой можно дать вырасти.' },
            { sender: 'system', textKey: '📊 Итог: Успеваемость {{success}}, Романтика {{romance}}, Юмор {{humor}}' }
          ]
        },
        { type: 'goto', label: 'end' }
      ]
    },

    // 6. Без определений
    {
      type: 'if',
      check: { hasFlag: 'finalOpen' },
      then: [
        { type: 'reaction', sender: 'alisa', textKey: 'Без ярлыков — значит без давления' },
        { type: 'reaction', sender: 'alisa', textKey: 'Мне так спокойнее' },
        { type: 'reaction', sender: 'alisa', textKey: 'А там видно будет' },
        {
          type: 'endGame',
          messages: [
            { sender: 'system', textKey: '🌤️ Финал: без определений' },
            { sender: 'system', textKey: 'Вы не назвали то, что между вами происходит, но и не отказались друг от друга. Иногда это самое честное решение — жить дальше и смотреть, куда приведёт.' },
            { sender: 'system', textKey: '📊 Итог: Успеваемость {{success}}, Романтика {{romance}}, Юмор {{humor}}' }
          ]
        },
        { type: 'goto', label: 'end' }
      ]
    },

    // 7. На своей волне
    {
      type: 'if',
      check: { and: [{ hasFlag: 'finalPlayful' }, { stat: 'humor', gte: 25 }] },
      then: [
        { type: 'reaction', sender: 'alisa', textKey: 'Ахах' },
        { type: 'reaction', sender: 'alisa', textKey: 'Ладно, ты меня удивил' },
        { type: 'reaction', sender: 'alisa', textKey: 'Согласна' },
        { type: 'reaction', sender: 'alisa', textKey: 'У нас будет самая странная история знакомства' },
        {
          type: 'endGame',
          messages: [
            { sender: 'system', textKey: '😄 Финал: на своей волне' },
            { sender: 'system', textKey: 'Серьёзные разговоры у вас почему-то всегда превращались в шутки — и, кажется, именно так вы и держались друг за друга всю неделю. Получилось легко, тепло и очень по-настоящему.' },
            { sender: 'system', textKey: '📊 Итог: Успеваемость {{success}}, Романтика {{romance}}, Юмор {{humor}}' }
          ]
        },
        { type: 'goto', label: 'end' }
      ]
    },

    // 8. Холодный разрыв
    {
      type: 'if',
      check: { hasFlag: 'finalStop' },
      then: [
        { type: 'reaction', sender: 'alisa', textKey: 'Хорошо' },
        { type: 'reaction', sender: 'alisa', textKey: 'Тогда больше не пиши' },
        { type: 'reaction', sender: 'alisa', textKey: 'Я пойму' },
        {
          type: 'endGame',
          messages: [
            { sender: 'system', textKey: '❄️ Финал: холодный разрыв' },
            { sender: 'system', textKey: 'Ты сам предложил остановиться. Алиса согласилась слишком легко. Переписка постепенно сошла на нет. Ни скандала, ни блока — просто тишина.' },
            { sender: 'system', textKey: '📊 Итог: Успеваемость {{success}}, Романтика {{romance}}, Юмор {{humor}}' }
          ]
        },
        { type: 'goto', label: 'end' }
      ]
    },

    // 9. Неопределённость (fallback)
    {
      type: 'if',
      check: { always: true },
      then: [
        { type: 'reaction', sender: 'alisa', textKey: 'Спасибо, что был честен сегодня' },
        { type: 'reaction', sender: 'alisa', textKey: 'Правда' },
        {
          type: 'endGame',
          messages: [
            { sender: 'system', textKey: '🌫️ Финал: неопределённость' },
            { sender: 'system', textKey: 'Вы не разошлись, но и не стали по-настоящему близки. Слишком много было недосказанного. Может, всё ещё наладится. А может — так и останется на паузе.' },
            { sender: 'system', textKey: '📊 Итог: Успеваемость {{success}}, Романтика {{romance}}, Юмор {{humor}}' }
          ]
        },
        { type: 'goto', label: 'end' }
      ]
    },

    { type: 'label', name: 'end' }
  ]
};
