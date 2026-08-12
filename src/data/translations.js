/**
 * ⚠️ ЛОКАЛИЗАЦИЯ: РАБОТАЕМ ТОЛЬКО С РУССКИМ (RU).
 * EN-слой ЗАМОРОЖЕН и закомментирован ниже (объект en в `translations`
 * и весь блок `storyTextMap.en`).
 *
 * ПРАВИЛА ДЛЯ СЛЕДУЮЩЕГО ИИ, ДОБАВЛЯЮЩЕГО ТЕКСТ:
 * 1. Текст реплик/опций пишется ТОЛЬКО по-русски прямо в src/data/story/day*.js
 *    (поля textKey / labelKey / label / intro / text). Никаких EN-строк там.
 * 2. Если добавляешь новый ВЫБОР в day*.js:
 *    - id опций должны быть уникальны в рамках дня;
 *    - добавь RU-подпись этого id в `optionLabels` ниже — иначе в пузыре игрока
 *      вместо текста покажется голый id (например «ev_1»);
 *    - в EN-переводе этот id НЕ нужен (см. п.4).
 * 3. В `translations.en` и `storyTextMap.en` НИЧЕГО не добавлять — слой выключен.
 * 4. Чтобы однажды вернуть EN: раскомментируй оба блока ниже (сними открывающий
 *    и закрывающий символы блочного комментария) и переведи новые строки
 *    в storyTextMap.en.
 */
export const translations = {
    ru: {
        'menu.title': '📱 Переписка',
        'menu.subtitle': 'Выбери сюжетную линию',
        'menu.story1': '👩‍🏫 Учительница английского',
        'menu.story2': '� Сюжет #2',
        'menu.story3': '🔒 Сюжет #3 (скоро)',
        'stats.success': 'Успеваемость',
        'stats.romance': 'Романтика',
        'stats.humor': 'Юмор',
        'network.connecting': 'Подключение...',
        'typing.alisa': 'Алиса печатает',
        'settings.title': 'Настройки',
        'settings.language': 'Язык',
        'settings.theme': 'Тема',
        'settings.theme_dark': 'Тёмная',
        'settings.theme_light': 'Светлая',
        'settings.sound': 'Звук уведомлений',
        'settings.sound_on': 'Вкл',
        'settings.sound_off': 'Выкл',
        'settings.reset': 'Сбросить прогресс',
        'settings.reset_confirm': 'Сбросить весь прогресс и вернуться к первому дню?',
        'profile.title': 'Профиль',
        'profile.name': 'Алиса Сергеевна',
        'profile.status': 'была сегодня',
        'profile.job': 'Учитель английского языкаа',
        'profile.job_sub': 'место работы',
        'profile.bio': 'Люблю свою работу и учеников. Всегда готова помочь, но строго спрашиваю за домашку 😉',
        'profile.bio_sub': 'о себе',
        'profile.username': 'имя пользователя',
        'ad.loading': 'Показываем рекламу...',
        'game.restart': '🔄 Пройти заново',
        'game.ended': '🎮 Игра завершена. Спасибо за прохождение!',
        'minitest.take': 'Пройти тест',
        'minitest.decline': 'Отказаться',
        'minitest.skip': 'Пропустить (посмотреть рекламу)',
        'achievement.title': '🏆 Достижение',
        'menu.achievements': 'Достижения',
        'menu.settings': 'Настройки',
        'menu.hero_title': 'ЧАТ\nС УЧИТЕЛЬНИЦЕЙ',
        'menu.hero_subtitle': 'Алисой',
        'menu.story1_title': 'Алиса ❤️',
        'menu.story1_status': 'Учитель английского языка',
        'menu.story1_btn': 'Начать переписку',
        'menu.story1_unread': '💬 2 новых сообщения',
        'achievements.title': 'Достижения',
        'achievements.unlocked': 'Открыто',
        'achievements.locked': 'Скрыто',        'story_title_2': 'Сюжет #2',        'story_title_3': 'Сюжет #3',        'story_soon': 'Скоро появится',        'badge_soon': 'Скоро',
        'day.new': 'День',
        'photo.unlock': 'Открыть за рекламу',
        'notif.alisa': 'Алиса',
        'photo.error': '📷 Фото не добавлено (',
        'voice.label': 'Голосовое сообщение',
        'voice.unlock': 'Открыть за рекламу'
    },
    // ⚠️ EN-локализация ЗАМОРОЖЕНА — работает только RU. См. заголовок файла.
    /* en: {
        'menu.title': '📱 Chat Story',
        'menu.subtitle': 'Choose a storyline',
        'menu.story1': '👩‍🏫 English Teacher',
        'menu.story2': '� Story #2',
        'menu.story3': '🔒 Story #3 (coming soon)',
        'stats.success': 'Grades',
        'stats.romance': 'Romance',
        'stats.humor': 'Humor',
        'network.connecting': 'Connecting...',
        'typing.alisa': 'Alisa is typing',
        'settings.title': 'Settings',
        'settings.language': 'Language',
        'settings.theme': 'Theme',
        'settings.theme_dark': 'Dark',
        'settings.theme_light': 'Light',
        'settings.sound': 'Notification Sound',
        'settings.sound_on': 'On',
        'settings.sound_off': 'Off',
        'settings.reset': 'Reset Progress',
        'settings.reset_confirm': 'Reset all progress and return to the first day?',
        'profile.title': 'Profile',
        'profile.name': 'Alisa Sergeyevna',
        'profile.status': 'was online today',
        'profile.job': 'English teacher',
        'profile.job_sub': 'workplace',
        'profile.bio': 'I love my job and my students. Always ready to help, but strict about homework 😉',
        'profile.bio_sub': 'about me',
        'profile.username': 'username',
        'ad.loading': 'Showing ad...',
        'game.restart': '🔄 Play again',
        'game.ended': '🎮 Game finished. Thank you for playing!',
        'minitest.take': 'Take the test',
        'minitest.decline': 'Decline',
        'minitest.skip': 'Skip (watch ad)',
        'achievement.title': '🏆 Achievement',
        'menu.achievements': 'Achievements',
        'menu.settings': 'Settings',
        'menu.hero_title': 'CHAT\nWITH TEACHER',
        'menu.hero_subtitle': 'Alisa',
        'menu.story1_title': 'Alisa ❤️',
        'menu.story1_status': 'English teacher',
        'menu.story1_btn': 'Start Chat',
        'menu.story1_unread': '💬 2 new messages',
        'photo.hint_locked': '👆 Tap the photo to unlock (ad required)',
        'photo.hint_unlocked': '👆 Tap the photo to view closer',
        'photo.error': '📷 Photo not added (',
        'photo.unlock': 'Unlock with an ad',
        'voice.label': 'Voice message',
        'voice.unlock': 'Unlock with an ad',
        'day.new': 'Day',
        'friend.prefix': 'Friend (',
        'notif.alisa': 'Alisa',
        'achievements.title': 'Achievements',
        'achievements.unlocked': 'Unlocked',
        'achievements.locked': 'Hidden',        'story_title_2': 'Story #2',        'story_title_3': 'Story #3',        'story_soon': 'Coming soon',        'badge_soon': 'Soon'
    } */
};

let currentLang = 'ru';


const optionLabels = {    'opt1_1': 'Простите, реально закрутился. можно пересдать?',    'opt1_2': 'Если честно, просто забыл всё на свете) объясните ещё раз?',    'opt1_3': 'Да, был косяк. Признаю, расслабился. Больше так не буду.',    'opt1_4': 'Честно, мне стыдно, что подвёл вас. Хочу исправиться',    'opt1b_1': 'Давай как тебе удобно',    'opt1b_2': 'А сейчас можешь? хочу побыстрее закрыть вопрос',    'opt1b_3': 'Распишу время сам в приложении, не парьтесь',    'opt1b_4': 'А можно по видео? Хочу не только голос слышать',    'opt2_1': 'Клёвое фото, вы тут совсем другая',    'opt2_2': 'С такой улыбкой хочется учиться чаще 😏',    'opt2_3': 'А где строгий училочий взгляд? удивлён',    'opt2c_1': 'Может, зайду поздороваться в субботу?',    'opt2c_2': 'Лучше домашку доделаю, чем гулять',    'opt2c_3': 'Кофейня с вайфаем? тогда точно приду',    'opt2f_1': 'Я тоже думал о тебе, чего уж скрывать',    'opt2f_2': 'Думал, я один такой странный, что запал на препода',    'opt2f_3': 'Фото класс. но у меня встречный вопрос',    'opt2f_c1': 'Почти приглашение я тоже почти приму',    'opt2f_c2': 'Не хочу давить, давай пока просто переписка',    'opt2f_c3': 'Записываю в календарь. с пометкой "важно"',    'opt2s_1': 'Давай! объясни мне Present Perfect, я реально хочу понять',    'opt2s_2': 'Спасибо, что не бросаешь меня. боюсь не осилить',    'opt2s_3': 'А есть шпаргалка? серьёзно, без шуток',    'opt2s_c1': 'Звучит продуктивно, давай попробуем',    'opt2s_c2': 'Мне дома спокойнее, но спасибо',    'opt2s_c3': 'А кофе за счёт школы? шучу, приду',    'opt2_4': 'Почему-то хочется пересматривать это фото',    'opt2c_4': 'Только предупредите, чтобы я не застал вас за работой',    'opt2f_4': 'Я тоже ловлю себя на улыбке в ответ',    'opt2f_c4': 'Может, пришлёшь музыку, что слушаешь в кофейне?',    'opt2s_4': 'Расскажи, как ты сама учила английский',    'opt2s_c4': 'С тобой даже домашка интереснее',    'opt3_1': 'А ты правда сейчас в той кофейне на Ленина?',    'opt3_2': 'Дома сижу, лень. но соскучился по разговору',    'opt3_3': 'Слушай, сегодня с домашкой приключилась целая история. Хочешь расскажу?',    'opt3b_1': 'Давай сразу к делу, я собран',    'opt3b_2': 'Выдохнем. расскажи, как у тебя дела',    'opt3b_3': 'А можно просто помолчать немного?',    'opt4_1': 'Мне тоже было легко. спасибо за это',    'opt4_2': 'Я весь день думал про наш разговор, если честно',    'opt4_3': 'Наверное, потому что я обаятельный. шучу',    'opt4b_1': 'Не извиняйся, мне интересно тебя слушать',    'opt4b_2': 'Я тебя понимаю, у меня похожая история',    'opt4b_3': 'Зато у тебя есть я - твой лучший ученик 😄',    's1_1': 'Я спокоен. мы просто разговаривали, ничего плохого',    's1_2': 'Если честно, мне важно было тебя увидеть',    's1_3': 'Может, скажем, что ты просто помогала мне из вежливости?',    's1_5': 'Давай я сам поговорю с руководителем',    's2_1': 'Давай просто быть осторожнее, но не пропадать',    's2_2': 'А что если официально попросить перевести меня к другому преподавателю?',    's2_3': 'Может, правда лучше остановиться, чтобы не рисковать?',    's2_4': 'Предлагаю режим «секретных агентов» 😄 Шифруемся',    's3_1': 'Ты мне дорога, но давай будем просто друзьями',    's3_2': 'Мне важна ты, а не эта работа. рискнём?',    's3_3': 'Давай ты официально сменишь мне преподавателя',    's3_4': 'Без объявлений, но и прятаться не будем',    'opt6_1': 'Приду. давай просто поговорим',    'opt6_2': 'Честно? немного нервничаю. но приду',    'opt6_3': 'Скамейка у пруда - звучит как начало книги',    'opt6_4': 'Мне нужно сказать тебе кое-что важное...',    'opt6b_1': 'Может, и не надо ничего с этим делать',    'opt6b_2': 'Я рад, что ты меня впустила. Серьёзно',    'opt6b_3': 'Звучит как диагноз 😄 Но ладно, буду принимать тебя такой',    'opt7_1': 'Я готов рискнуть. хочу быть с тобой',    'opt7_2': 'Давай подождём, пока всё уляжется',    'opt7_3': 'Оставим всё как есть, без ярлыков',    'opt7_4': 'У меня встречное предложение...',
    'opt3_4': 'Тогда приеду. хочу увидеть тебя не только в чате',
    'opt3b_4': 'Мне с тобой как-то спокойно. непривычно, но приятно',
    'opt4_4': 'Я тоже всё это время думал про тебя. всё, сказал',
    'opt4b_4': 'Если решишь уйти с работы - я рядом. и это не про учёбу',
    'ev_1': 'Мне тоже было приятно. до завтра)',
    'ev_2': 'Пойду заниматься. с понедельника зубрю)',
    'ev_3': 'До понедельника. не скучай 😄',
};

const storyTextMap = {
    en: {}
};

// ⚠️ EN-слой ЗАМОРОЖЕН: весь блок ниже закомментирован. РАБОТАЕМ ТОЛЬКО С RU.
// Не добавляй записи в storyTextMap.en — они не попадут в игру.
// Для возврата EN: раскомментируй блок ниже (сними /* и */) и переведи новые строки.
/*
// Story text (messages, reactions, choices, endings) — Day 1-7
storyTextMap.en['Привет) не спишь?'] = 'Hey) you up?';
storyTextMap.en['Я тут открыла твой тест...'] = 'Just opened your test...';
storyTextMap.en['Результат так себе, если мягко'] = 'To put it kindly, the result is meh';
storyTextMap.en['И домашка пустая. что случилось?'] = 'And your homework is empty. what happened?';
storyTextMap.en['Ладно, бывает, не начало конца света'] = 'Ok, it happens, not the end of the world';
storyTextMap.en['Скину тебе правило и пример, сделаешь 5 предложений'] = 'I\'ll send you the rule and an example, write 5 sentences';
storyTextMap.en['Успеешь к завтрашнему вечеру?'] = 'Can you manage by tomorrow evening?';
storyTextMap.en['То есть память как решето, но обаяние работает без сбоев?'] = 'So your memory\'s a sieve, but your charm never fails?';
storyTextMap.en['Ладно, объясню ещё раз.'] = 'Fine, I\'ll explain again.';
storyTextMap.en['Но это последний бесплатный повтор 😏'] = 'But that\'s the last free replay 😏';
storyTextMap.en['Ну хоть честно сказал. Но таблицу прогресса это всё равно не исправит.'] = 'At least you were honest. But it still won\'t fix your progress sheet.';
storyTextMap.en['Ладно, прощаю. Задание завтра жду.'] = 'Fine, forgiven. I expect the assignment tomorrow.';
storyTextMap.en['Кстати, у меня завтра днём есть окно, можем созвониться'] = 'By the way, I\'ve got a free slot tomorrow afternoon, we could call';
storyTextMap.en['Или как тебе удобнее?'] = 'Or whatever works better for you?';
storyTextMap.en['Приятно слышать.'] = 'Nice to hear.';
storyTextMap.en['Обычно все тянут расписание до последнего'] = 'Usually everyone drags scheduling out to the last minute';
storyTextMap.en['Ого, шустрый)'] = 'Whoa, eager)';
storyTextMap.en['Не сейчас, у меня, между прочим, тоже есть жизнь после работы'] = 'Not right now, I actually have a life after work too, you know';
storyTextMap.en['Но мне нравится напор, ладно'] = 'But I like the initiative, fine';
storyTextMap.en['О, самостоятельный.'] = 'Oh, independent.';
storyTextMap.en['Уважаю таких'] = 'I respect that';
storyTextMap.en['Ладно, я спать. длинный был день'] = 'Alright, I\'m off to sleep. long day';
storyTextMap.en['Кстати... у нас в школе не особо приветствуют, когда препод с учеником слишком сближается)'] = 'By the way... the school isn\'t exactly thrilled when a tutor gets too close to a student)';
storyTextMap.en['Но это я так, к слову 👀'] = 'Just saying 👀';
storyTextMap.en['Это, кстати, лучший ответ за сегодня'] = 'That, by the way, is the best answer I\'ve got today';
storyTextMap.en['Пришлю задание вечером. Жду результат'] = 'I\'ll send the assignment tonight. Expect results';
storyTextMap.en['По видео? Ну смотри... я не против'] = 'Video? Well... I don\'t mind';
storyTextMap.en['Только не вздумай смотреть на меня вместо урока'] = 'Just don\'t stare at me instead of the lesson';
storyTextMap.en['Честно, мне стыдно, что подвёл вас. Хочу исправиться'] = 'Honestly, I\'m ashamed I let you down. I want to make it right';
storyTextMap.en['А можно по видео? Хочу не только голос слышать'] = 'Could we do video? I don\'t want to just hear your voice';
storyTextMap.en['Привет) тест так и висит несданным'] = 'Hey) that test is still sitting there, ungraded';
storyTextMap.en['Ты как, живой вообще?'] = 'How are you, still alive?';
storyTextMap.en['Кстати, жду, когда ты опять начнёшь всех поторапливать 😄'] = 'By the way, waiting for you to start rushing everyone again 😄';
storyTextMap.en['Кстати, спасибо, что вчера не наседал со временем. редкость'] = 'By the way, thanks for not pushing about the time yesterday. rare quality';
storyTextMap.en['Кстати, обновляла сегодня фото в профиле на сайте школы'] = 'By the way, I updated my profile photo on the school website today';
storyTextMap.en['Глянь, не путай меня с грозной училкой из твоих кошмаров 😄'] = 'Take a look, don\'t mix me up with the scary teacher from your nightmares 😄';
storyTextMap.en['Спасибо) обычно говорят, что я слишком серьёзная на фотках'] = 'Thanks) people usually say I look too serious in photos';
storyTextMap.en['Ладно, за комплимент прощаю тебе вчерашнюю домашку. на сегодня'] = 'Fine, for that compliment I\'ll forgive yesterday\'s homework. just for today';
storyTextMap.en['Осторожно, а то решу, что тебе правда нужны мои уроки 😏'] = 'Careful, or I\'ll think you actually need my lessons 😏';
storyTextMap.en['Но если честно - приятно. правда'] = 'But honestly - that\'s nice. really';
storyTextMap.en['Строгий взгляд включаю только для должников. пока ты не в их числе'] = 'I only bring out the stern look for the ones behind on homework. you\'re not there yet';
storyTextMap.en['Кстати, я в субботу обычно сижу в кофейне на Ленина, разбираю свои дела'] = 'By the way, on saturdays I\'m usually at the cafe on Lenina, sorting out my own stuff';
storyTextMap.en['Если что, знаешь, где меня искать 🙂'] = 'Just so you know where to find me 🙂';
storyTextMap.en['Заходи, если реально хочешь. я там обычно с ноутом и книгой'] = 'Come by if you really want to. I\'m usually there with my laptop and a book';
storyTextMap.en['Дисциплина, уважаю. хотя было бы неплохо тебя увидеть не только в чате'] = 'Discipline, I respect it. though it\'d be nice to see you outside of chat too';
storyTextMap.en['Вайфай там так себе, если честно. но кофе хороший, приходи'] = 'The wifi there is mediocre, honestly. but the coffee\'s good, come by';
storyTextMap.en['Ладно, до связи. и не проболтайся никому, что я вообще пишу ученикам вечерами 😅'] = 'Alright, talk soon. and don\'t tell anyone I even text students in the evenings 😅';
storyTextMap.en['Привет) ты сегодня прямо не даёшь мне покоя, ловлю себя на улыбке в телефон'] = 'Hey) you\'re really not giving me any peace today, I keep catching myself smiling at my phone';
storyTextMap.en['План урока я сегодня откладываю. у меня есть час, погнали просто поболтаем?'] = 'Shelving the lesson plan today. I\'ve got an hour, wanna just talk?';
storyTextMap.en['Вот, кстати, я сегодня в своём естественном виде, а не в режиме "препод"'] = 'Here, by the way, this is me off-duty, not in "tutor" mode';
storyTextMap.en['Вот это поворот) я тоже устала от formalities. давай просто на "ты" и без фамилий'] = 'Well, that\'s a turn) I\'m tired of formalities too. let\'s just keep it casual, no titles';
storyTextMap.en['Ты первый, кто говорит это прямо. мне нравится'] = 'You\'re the first one to just say it outright. I like that';
storyTextMap.en['Валяй, спрашивай. в разумных пределах 😄'] = 'Go ahead, ask. within reason 😄';
storyTextMap.en['Если честно, в субботу я обычно свободна. сижу в кофейне на Ленина'] = 'Honestly, I\'m usually free on saturdays. I sit at the cafe on Lenina';
storyTextMap.en['Это не приглашение) ну... почти не приглашение'] = 'That\'s not an invitation) well... almost not an invitation';
storyTextMap.en['Договорились. только не превращай это в допрос про мою личную жизнь, ладно?'] = 'Deal. just don\'t turn it into an interrogation about my personal life, ok?';
storyTextMap.en['Ценю, что не торопишь. это, кстати, редкое качество'] = 'I appreciate that you\'re not rushing me. that\'s a rare quality, by the way';
storyTextMap.en['Ахах, "важно" - это сильно. ладно, интригуй дальше'] = 'Haha, "important" is a strong word. fine, keep me intrigued';
storyTextMap.en['Ладно, мне пора. и... давай это между нами, хорошо? у меня на работе на такое смотрят косо'] = 'Alright, I have to go. and... let\'s keep this between us, ok? at work people don\'t look kindly on this kind of thing';
storyTextMap.en['Привет) рада, что ты серьёзно настроен'] = 'Hey) glad you\'re taking this seriously';
storyTextMap.en['У меня есть окно прямо сейчас, разберём тему?'] = 'I\'ve got a free slot right now, want to go over the topic?';
storyTextMap.en['Вот, кстати, фото для профиля на сайте школы, если интересно, как я выгляжу не только в чате'] = 'Here, by the way, my profile photo for the school website, in case you\'re curious how I look outside of chat';
storyTextMap.en['Отлично. Present Perfect - действие в прошлом, но результат важен сейчас'] = 'Great. Present Perfect is an action in the past, but the result matters now';
storyTextMap.en['Пример: I have seen this film. видел и помню. понятно?'] = 'Example: I have seen this film. I saw it and I remember it. clear?';
storyTextMap.en['Не бойся. получится, если стараться. я рядом'] = 'Don\'t be scared. you\'ll manage if you try. I\'m right here';
storyTextMap.en['Шпаргалка? да ладно тебе, давай реально разберёмся, а не спрячем проблему'] = 'A cheat sheet? come on, let\'s actually work through it instead of hiding the problem';
storyTextMap.en['Кстати, по субботам я обычно занимаюсь своими текстами в кофейне на Ленина'] = 'By the way, on saturdays I usually work on my own writing at the cafe on Lenina';
storyTextMap.en['Если захочешь позаниматься там вместо дома - место свободно'] = 'If you\'d rather study there instead of at home - there\'s room';
storyTextMap.en['Супер. только учти, я там реально работаю, а не просто сижу'] = 'Great. just so you know, I actually work there, I\'m not just sitting around';
storyTextMap.en['Без проблем, у всех свой ритм. пришлю задание вечером'] = 'No problem, everyone has their own rhythm. I\'ll send the assignment tonight';
storyTextMap.en['Ахах, за счёт школы только тесты. кофе - за твой 😄'] = 'Haha, the school only covers tests. coffee\'s on you 😄';
storyTextMap.en['Ладно, до завтра. и это... не рассказывай никому, что я зову учеников в свою кофейню 😅'] = 'Alright, until tomorrow. and don\'t tell anyone I invite students to my cafe 😅';
// Day 2 — split parts (short messages)
storyTextMap.en['Спасибо)'] = 'Thanks)';
storyTextMap.en['Обычно говорят, что я слишком серьёзная на фотках'] = 'People usually say I look too serious in photos';
storyTextMap.en['Ладно, за комплимент прощаю тебе вчерашнюю домашку.'] = 'Fine, for that compliment I\'ll forgive yesterday\'s homework.';
storyTextMap.en['На сегодня'] = 'Just for today';
storyTextMap.en['Но если честно - приятно.'] = 'But honestly - that\'s nice.';
storyTextMap.en['Правда'] = 'Really';
storyTextMap.en['Строгий взгляд включаю только для должников.'] = 'I only bring out the stern look for the ones behind on homework.';
storyTextMap.en['Пока ты не в их числе'] = 'You\'re not in that group yet';
storyTextMap.en['Ладно, до связи.'] = 'Alright, talk soon.';
storyTextMap.en['И не проболтайся никому, что я вообще пишу ученикам вечерами 😅'] = 'And don\'t tell anyone I even text students in the evenings 😅';
storyTextMap.en['Привет) ты сегодня прямо не даёшь мне покоя'] = 'Hey) you\'re really not giving me any peace today';
storyTextMap.en['Ловлю себя на улыбке в телефон'] = 'I keep catching myself smiling at my phone';
storyTextMap.en['План урока я сегодня откладываю.'] = 'I\'m shelving the lesson plan today.';
storyTextMap.en['У меня есть час, погнали просто поболтаем?'] = 'I\'ve got an hour, wanna just talk?';
storyTextMap.en['Вот это поворот)'] = 'Well, that\'s a turn)';
storyTextMap.en['Я тоже устала от формальностей'] = 'I\'m tired of formalities too';
storyTextMap.en['Давай просто на "ты" и без фамилий'] = 'Let\'s just keep it casual, no titles';
storyTextMap.en['Ты первый, кто говорит это прямо.'] = 'You\'re the first one to just say it outright.';
storyTextMap.en['Мне нравится'] = 'I like that';
storyTextMap.en['Валяй, спрашивай.'] = 'Go ahead, ask.';
storyTextMap.en['В разумных пределах 😄'] = 'Within reason 😄';
storyTextMap.en['Если честно, в субботу я обычно свободна.'] = 'Honestly, I\'m usually free on saturdays.';
storyTextMap.en['Сижу в кофейне на Ленина'] = 'I sit at the cafe on Lenina';
storyTextMap.en['Договорились.'] = 'Deal.';
storyTextMap.en['Только не превращай это в допрос про мою личную жизнь, ладно?'] = 'Just don\'t turn it into an interrogation about my personal life, ok?';
storyTextMap.en['Ценю, что не торопишь.'] = 'I appreciate that you\'re not rushing me.';
storyTextMap.en['Это, кстати, редкое качество'] = 'That\'s a rare quality, by the way';
storyTextMap.en['Ахах, "важно" - это сильно.'] = 'Haha, "important" is a strong word.';
storyTextMap.en['Теперь обязана узнать, что такого «важно» 😄'] = 'Now I\'m duty-bound to find out what\'s so "important" 😄';
storyTextMap.en['Ладно, мне пора.'] = 'Alright, I have to go.';
storyTextMap.en['И... давай это между нами, хорошо?'] = 'And... let\'s keep this between us, ok?';
storyTextMap.en['У меня на работе на такое смотрят косо'] = 'At work people don\'t look kindly on this kind of thing';
storyTextMap.en['Отлично.'] = 'Great.';
storyTextMap.en['Present Perfect - действие в прошлом, но результат важен сейчас'] = 'Present Perfect is an action in the past, but the result matters now';
storyTextMap.en['Пример: I have seen this film.'] = 'Example: I have seen this film.';
storyTextMap.en['Видел и помню.'] = 'I saw it and I remember it.';
storyTextMap.en['Понятно?'] = 'Clear?';
storyTextMap.en['Не бойся.'] = 'Don\'t be scared.';
storyTextMap.en['Получится, если стараться.'] = 'You\'ll manage if you try.';
storyTextMap.en['Я рядом'] = 'I\'m right here';
storyTextMap.en['Шпаргалка?'] = 'A cheat sheet?';
storyTextMap.en['Да ладно тебе, давай реально разберёмся, а не спрячем проблему'] = 'Come on, let\'s actually work through it instead of hiding the problem';
storyTextMap.en['Супер.'] = 'Great.';
storyTextMap.en['Только учти, я там реально работаю, а не просто сижу'] = 'Just so you know, I actually work there, I\'m not just sitting around';
storyTextMap.en['Без проблем, у всех свой ритм.'] = 'No problem, everyone has their own rhythm.';
storyTextMap.en['Пришлю задание вечером'] = 'I\'ll send the assignment tonight';
storyTextMap.en['Ладно, до завтра.'] = 'Alright, until tomorrow.';
storyTextMap.en['И это... не рассказывай никому, что я зову учеников в свою кофейню 😅'] = 'And don\'t tell anyone I invite students to my cafe 😅';
// Day 2 — hidden options
storyTextMap.en['Почему-то хочется пересматривать это фото'] = 'For some reason I keep wanting to look at this photo';
storyTextMap.en['Пересматривать? Я польщена'] = 'Keep looking at it? I\'m flattered';
storyTextMap.en['Только без отрыва от урока, ладно?'] = 'Just don\'t do it during the lesson, ok?';
storyTextMap.en['Только предупредите, чтобы я не застал вас за работой'] = 'Just warn me so I don\'t catch you working';
storyTextMap.en['Хорошо, предупрежу. Без заставаний'] = 'Alright, I\'ll warn you. No catching me';
storyTextMap.en['Если что, у меня там всегда найдётся место'] = 'If anything, there\'s always room for you there';
storyTextMap.en['Я тоже ловлю себя на улыбке в ответ'] = 'I keep catching myself smiling back too';
storyTextMap.en['Ого. Теперь я точно не усну'] = 'Wow. Now I definitely won\'t sleep';
storyTextMap.en['Договорились улыбаться друг другу по телефону'] = 'Deal - we smile at each other through our phones';
storyTextMap.en['Может, пришлёшь музыку, что слушаешь в кофейне?'] = 'Maybe send me the music you listen to at the cafe?';
storyTextMap.en['Музыку? Интересный запрос'] = 'Music? Interesting request';
storyTextMap.en['Скину плейлист, если пообещаешь не смеяться'] = 'I\'ll send the playlist if you promise not to laugh';
storyTextMap.en['Расскажи, как ты сама учила английский'] = 'Tell me how you learned English yourself';
storyTextMap.en['О, интересный вопрос'] = 'Oh, interesting question';
storyTextMap.en['Учила через сериалы и упрямство, если честно'] = 'I learned through TV shows and stubbornness, honestly';
storyTextMap.en['С тобой даже домашка интереснее'] = 'Even homework is more interesting with you';
storyTextMap.en['Ого, комплимент'] = 'Wow, a compliment';
storyTextMap.en['Придётся стараться, чтобы не разочаровать'] = 'Now I\'ll have to work hard not to disappoint';
// Day 2 — extra split parts (round 2)
storyTextMap.en['Всех поторапливать 😄'] = 'Rushing everyone again 😄';
storyTextMap.en['Кстати, жду, когда ты опять начнёшь'] = 'By the way, I\'m waiting for you to start again';
storyTextMap.en['Кстати, спасибо, что вчера не наседал'] = 'By the way, thanks for not pushing yesterday';
storyTextMap.en['Со временем. редкость'] = 'About the time. rare quality';
storyTextMap.en['Кстати, обновляла сегодня фото в профиле'] = 'By the way, I updated my profile photo today';
storyTextMap.en['На сайте школы'] = 'On the school website';
storyTextMap.en['Глянь, не путай меня с грозной училкой'] = 'Look, don\'t confuse me with the strict teacher';
storyTextMap.en['Из твоих кошмаров 😄'] = 'From your nightmares 😄';
storyTextMap.en['Осторожно, а то решу'] = 'Careful, or I\'ll decide';
storyTextMap.en['Что тебе правда нужны мои уроки 😏'] = 'That you really need my lessons 😏';
storyTextMap.en['Кстати, я в субботу обычно сижу в кофейне на Ленина'] = 'By the way, on saturdays I usually sit at the cafe on Lenina';
storyTextMap.en['Разбираю свои дела'] = 'Sorting out my own stuff';
storyTextMap.en['Заходи, если реально хочешь.'] = 'Come by if you really want to.';
storyTextMap.en['Я там обычно с ноутом и книгой'] = 'I\'m usually there with my laptop and a book';
storyTextMap.en['Дисциплина, уважаю.'] = 'Discipline, I respect it.';
storyTextMap.en['Хотя было бы неплохо тебя увидеть'] = 'Though it\'d be nice to see you';
storyTextMap.en['Не только в чате'] = 'Outside of chat too';
storyTextMap.en['Вайфай там так себе, если честно.'] = 'The wifi there is mediocre, honestly.';
storyTextMap.en['Но кофе хороший, приходи'] = 'But the coffee\'s good, come by';
storyTextMap.en['И не проболтайся никому'] = 'And don\'t tell anyone';
storyTextMap.en['Что я вообще пишу ученикам'] = 'That I even text students';
storyTextMap.en['По вечерам 😅'] = 'In the evenings 😅';
storyTextMap.en['Ладно, за комплимент прощаю тебе'] = 'Fine, for that compliment I forgive you';
storyTextMap.en['Вчерашнюю домашку.'] = 'Yesterday\'s homework.';
storyTextMap.en['Кстати, я в субботу обычно сижу'] = 'By the way, on saturdays I usually sit';
storyTextMap.en['В кофейне на Ленина'] = 'At the cafe on Lenina';
storyTextMap.en['Вот, кстати, я сегодня в своём естественном виде'] = 'By the way, this is me in my natural state today';
storyTextMap.en['А не в режиме "препод"'] = 'Not in "tutor" mode';
storyTextMap.en['Вот, кстати, фото для профиля на сайте школы'] = 'Here, by the way, my profile photo for the school website';
storyTextMap.en['Если интересно, как я выгляжу не только в чате'] = 'In case you\'re curious how I look outside of chat';
storyTextMap.en['Present Perfect - действие в прошлом'] = 'Present Perfect is an action in the past';
storyTextMap.en['Но результат важен сейчас'] = 'But the result matters now';
storyTextMap.en['Да ладно тебе, давай реально разберёмся'] = 'Come on, let\'s actually work it out';
storyTextMap.en['А не спрячем проблему'] = 'Instead of hiding the problem';
storyTextMap.en['Кстати, по субботам я обычно в кофейне на Ленина'] = 'By the way, on saturdays I\'m usually at the cafe on Lenina';
storyTextMap.en['Занимаюсь своими текстами'] = 'Working on my own writing';
storyTextMap.en['Если захочешь позаниматься там вместо дома'] = 'If you\'d rather study there instead of at home';
storyTextMap.en['Место свободно'] = 'There\'s room';
storyTextMap.en['Только учти, я там реально работаю'] = 'Just so you know, I actually work there';
storyTextMap.en['А не просто сижу'] = 'I\'m not just sitting around';
storyTextMap.en['Ахах, за счёт школы только тесты.'] = 'Haha, the school only covers tests.';
storyTextMap.en['Кофе - за твой 😄'] = 'Coffee\'s on you 😄';
storyTextMap.en['Только не превращай это в допрос'] = 'Just don\'t turn it into an interrogation';
storyTextMap.en['Про мою личную жизнь, ладно?'] = 'About my personal life, ok?';
storyTextMap.en['И это... не рассказывай никому'] = 'And... don\'t tell anyone';
storyTextMap.en['Что я зову учеников в свою кофейню 😅'] = 'That I invite students to my cafe 😅';
// Day 1 — split parts
storyTextMap.en['Скину тебе правило и пример'] = 'I\'ll send you the rule and an example';
storyTextMap.en['Сделаешь 5 предложений'] = 'Make 5 sentences';
storyTextMap.en['То есть память как решето'] = 'So your memory\'s a sieve';
storyTextMap.en['Но обаяние работает без сбоев?'] = 'But your charm never fails?';
storyTextMap.en['Ну хоть честно сказал.'] = 'At least you were honest.';
storyTextMap.en['Но таблицу прогресса это всё равно не исправит.'] = 'But it still won\'t fix your progress sheet.';
storyTextMap.en['Кстати, у меня завтра днём есть окно'] = 'By the way, I\'ve got a free slot tomorrow afternoon';
storyTextMap.en['Можем созвониться'] = 'We could call';
storyTextMap.en['Не сейчас, у меня, между прочим, тоже есть жизнь'] = 'Not now, I\'ve got a life too, you know';
storyTextMap.en['После работы'] = 'After work';
storyTextMap.en['Кстати... у нас в школе не особо приветствуют'] = 'By the way... the school isn\'t exactly thrilled';
storyTextMap.en['Когда препод с учеником слишком сближается)'] = 'When a tutor gets too close to a student)';
// Day 3 — split parts
storyTextMap.en['Ага, у окна, с ноутом.'] = 'Yep, by the window, with my laptop.';
storyTextMap.en['Если хочешь - подходи, заодно разберём тему'] = 'Come by if you want, we can go over the topic too';
storyTextMap.en['Тогда приеду. хочу увидеть тебя не только в чате'] = 'Then I\'ll come. I want to see you beyond just chat';
storyTextMap.en['Приедешь? правда?'] = 'You\'ll come? really?';
storyTextMap.en['Я уж думала, ты только в чате храбрый 🙂'] = 'I thought you were only brave in chat 🙂';
storyTextMap.en['Тогда жду. столик у окна, без формальностей'] = 'Then I\'ll be waiting. table by the window, no formalities';
storyTextMap.en['Мне с тобой как-то спокойно. непривычно, но приятно'] = 'I feel calm with you somehow. unusual, but nice';
storyTextMap.en['Спокойно... даже не думала, что кто-то так скажет'] = 'Calm... I never thought anyone would say that';
storyTextMap.en['Я обычно на работе выключаю эмоции.'] = 'I usually switch off my emotions at work.';
storyTextMap.en['С тобой не получается'] = 'With you it doesn\'t work';
storyTextMap.en['Я тоже всё это время думал про тебя. всё, сказал'] = 'I\'ve been thinking about you this whole time too. there, I said it';
storyTextMap.en['Ого. вот это признание с утра'] = 'Whoa. quite the confession this morning';
storyTextMap.en['Я, если честно, тоже.'] = 'Honestly, me too.';
storyTextMap.en['Только боялась сказать первой'] = 'I was just scared to say it first';
storyTextMap.en['Если решишь уйти с работы - я рядом. и это не про учёбу'] = 'If you decide to quit your job - I\'ll be here. and this isn\'t about studying';
storyTextMap.en['Ты серьёзно?'] = 'Are you serious?';
storyTextMap.en['Мы ведь даже не до конца знаем друг друга'] = 'We don\'t even fully know each other yet';
storyTextMap.en['Но почему-то я тебе верю. глупо, да?'] = 'But somehow I believe you. silly, right?';
storyTextMap.en['Только без формальностей сегодня.'] = 'No formalities today though.';
storyTextMap.en['Я не "препод", а просто Алиса'] = 'I\'m not a "tutor," just Alisa';
storyTextMap.en['Разговора - это про меня спросить?'] = 'A proper talk - meaning you ask about me?';
storyTextMap.en['Или про свои дела рассказать?'] = 'Or you tell me about your stuff?';
storyTextMap.en['О, ты реально пришёл.'] = 'Oh, you actually came.';
storyTextMap.en['Садись, взяла тебе кофе на всякий случай'] = 'Sit down, I got you a coffee just in case';
storyTextMap.en['С чего начнём?'] = 'Where do we start?';
storyTextMap.en['Сразу к делу, или сначала выдохнем?'] = 'Straight to business, or do we breathe first?';
storyTextMap.en['Дела... нормально, если честно.'] = 'Things... are fine, honestly.';
storyTextMap.en['Работы много, но не жалуюсь'] = 'A lot of work, but I\'m not complaining';
storyTextMap.en['Ладно, мне пора домой.'] = 'Alright, I need to head home.';
storyTextMap.en['Но сегодня было... неожиданно хорошо'] = 'But today was... unexpectedly good';
// Day 4 — split parts
storyTextMap.en['Если честно, не была уверена'] = 'Honestly, I wasn\'t sure';
storyTextMap.en['Что ты правда придёшь'] = 'You\'d actually show up';
storyTextMap.en['У меня редко получается вот так просто'] = 'I rarely manage this easily';
storyTextMap.en['Общаться с учениками'] = 'Talking with students';
storyTextMap.en['Обычно это только уроки и дедлайны.'] = 'Usually it\'s just lessons and deadlines.';
storyTextMap.en['С тобой почему-то иначе'] = 'With you it\'s somehow different';
storyTextMap.en['Я тоже иногда устаю быть "училкой".'] = 'I get tired of being the "tutor" sometimes too.';
storyTextMap.en['С тобой могу быть просто собой'] = 'With you I can just be myself';
storyTextMap.en['Ого. я тоже, если честно.'] = 'Wow. me too, honestly.';
storyTextMap.en['Весь вечер вчера в голове прокручивала'] = 'I kept replaying it in my head all evening';
storyTextMap.en['Если честно, я подумываю сменить работу'] = 'Honestly, I\'ve been thinking about changing jobs';
storyTextMap.en['В последнее время'] = 'Lately';
storyTextMap.en['Устала немного.'] = 'I\'m a bit tired.';
storyTextMap.en['Не от учеников, а от всей этой... системы'] = 'Not of the students, but of the whole... system';
storyTextMap.en['Правда? расскажешь как-нибудь.'] = 'Really? tell me sometime.';
storyTextMap.en['Приятно, что не только я тут раскрываюсь'] = 'It\'s nice that I\'m not the only one opening up here';
storyTextMap.en['Ладно, спать пора. завтра понедельник'] = 'Alright, time to sleep. tomorrow\'s monday';
storyTextMap.en['У меня с утра проверка от начальства'] = 'I\'ve got a review from management in the morning';
// Day 5 — split parts
storyTextMap.en['Кто-то из кафе скинул нашу фотку знакомым'] = 'Someone from the cafe sent our photo to people they know';
storyTextMap.en['А те - дальше'] = 'And it spread from there';
storyTextMap.en['Мне уже написала руководитель школы'] = 'My manager at the school already messaged me';
storyTextMap.en['Спрашивает, что происходит'] = 'Asking what\'s going on';
storyTextMap.en['У нас в контракте пункт про личные отношения'] = 'There\'s a clause in my contract about personal relationships';
storyTextMap.en['С действующими учениками'] = 'With current students';
storyTextMap.en['Формально это могут посчитать нарушением.'] = 'Technically it could count as a violation.';
storyTextMap.en['Я не паникую, но... это серьёзно'] = 'I\'m not panicking, but... it\'s serious';
storyTextMap.en['Но объясняться всё равно придётся.'] = 'But I\'ll still have to explain myself.';
storyTextMap.en['Держись, я разберусь'] = 'Hang in there, I\'ll sort it out';
storyTextMap.en['Мне тоже было важно.'] = 'It mattered to me too.';
storyTextMap.en['Но давай сначала разберёмся с этим'] = 'But let\'s sort this out first';
storyTextMap.en['А потом договорим'] = 'And talk after';
storyTextMap.en['То есть соврать руководителю?'] = 'So, lie to the manager?';
storyTextMap.en['Так себе план, но... ладно, если надо'] = 'That\'s a shaky plan, but... fine, if we have to';
storyTextMap.en['Просто не хочу'] = 'I just don\'t want';
storyTextMap.en['Чтобы это стало привычкой между нами'] = 'This to become a habit between us';
storyTextMap.en['Спасибо. дай подумать, как лучше.'] = 'Thank you. let me think about the best way.';
storyTextMap.en['Но это очень много значит'] = 'But it means a lot';
storyTextMap.en['Сказала, что это было дополнительное занятие'] = 'I said it was an extra lesson';
storyTextMap.en['Вне расписания. вроде поверила'] = 'Outside the schedule. seems she believed it';
storyTextMap.en['Но предупредила, что будет следить.'] = 'But she warned she\'d be watching.';
storyTextMap.en['Если что-то ещё всплывёт - разговор будет другой'] = 'If anything else comes up - the talk will be different';
storyTextMap.en['Если честно, врать было неприятно.'] = 'Honestly, lying felt bad.';
storyTextMap.en['Давай больше так не будем'] = 'Let\'s not do that anymore';
storyTextMap.en['Как думаешь, нам вообще стоит продолжать'] = 'Do you think we should even keep going';
storyTextMap.en['Переписываться так, как сейчас?'] = 'Texting like we do now?';
storyTextMap.en['Или лучше поостыть?'] = 'Or better to cool off?';
storyTextMap.en['Ладно, договорились.'] = 'Fine, deal.';
storyTextMap.en['Просто будь аккуратнее с уведомлениями на людях'] = 'Just be more careful with notifications in public';
storyTextMap.en['Тогда формально у нас вообще не будет'] = 'Then technically we won\'t have';
storyTextMap.en['Конфликта интересов. дай подумать'] = 'A conflict of interest. let me think';
storyTextMap.en['Но мне будет не хватать этих разговоров.'] = 'But I\'ll miss these talks.';
storyTextMap.en['Если что - я всегда отвечу'] = 'If anything - I\'ll always answer';
storyTextMap.en['Шифруемся, ха.'] = 'Going undercover, ha.';
storyTextMap.en['Ладно, давай хотя бы без явных смайликов на людях'] = 'Fine, let\'s at least avoid obvious emojis in public';
storyTextMap.en['Кстати, по поводу перевода'] = 'By the way, about the reassignment';
storyTextMap.en['Руководитель не против'] = 'The manager doesn\'t mind';
storyTextMap.en['Если ты правда захочешь'] = 'If you really want to';
storyTextMap.en['У меня сейчас есть немного времени'] = 'I\'ve got a bit of time right now';
storyTextMap.en['И я всё думаю о нас'] = 'And I keep thinking about us';
storyTextMap.en['Какие бы слухи ни ходили'] = 'Whatever rumors are going around';
storyTextMap.en['Я рада, что мы встретились в субботу'] = 'I\'m glad we met on saturday';
storyTextMap.en['Скажи честно - чего ты на самом деле хочешь?'] = 'Tell me honestly - what do you actually want?';
storyTextMap.en['Я не тороплю'] = 'I\'m not rushing you';
storyTextMap.en['Значит, остаёмся близкими людьми.'] = 'So we stay close people.';
storyTextMap.en['А учёбу не забрасывай, ладно? 😉'] = 'And don\'t drop your studies, ok? 😉';
storyTextMap.en['Работу я не готова терять.'] = 'I\'m not ready to lose my job.';
storyTextMap.en['Но тебя терять ещё меньше хочу'] = 'But I want to lose you even less';
storyTextMap.en['Это самое взрослое решение'] = 'That\'s the most grown-up decision';
storyTextMap.en['Которое ты мог предложить'] = 'You could have made';
storyTextMap.en['Подам заявку завтра же.'] = 'I\'ll file the request tomorrow.';
storyTextMap.en['И тогда уже ничего официально нам не мешает'] = 'And then nothing official stands in our way';
storyTextMap.en['Без объявлений - это по мне.'] = 'No labels - that\'s my style.';
storyTextMap.en['Посмотрим, куда это приведёт'] = 'Let\'s see where it leads';
// Day 6 — split parts
storyTextMap.en['Привет. я весь день сегодня улыбаюсь без причины.'] = 'Hey. I\'ve been smiling all day for no reason.';
storyTextMap.en['Это ты виноват'] = 'You\'re to blame';
storyTextMap.en['Привет! заявку на перевод я подала, кстати.'] = 'Hi! by the way, I filed the reassignment request.';
storyTextMap.en['Чувствую себя свободнее'] = 'I feel freer';
storyTextMap.en['Привет) как настоящий друг'] = 'Hey) as a true friend';
storyTextMap.en['Я весь день о тебе думала.'] = 'I thought about you all day.';
storyTextMap.en['Это нормально?'] = 'Is that normal?';
storyTextMap.en['Привет. знаю, мы решили быть осторожнее.'] = 'Hey. I know we decided to be more careful.';
storyTextMap.en['Но я не выдержала и написала'] = 'But I couldn\'t hold back and wrote';
storyTextMap.en['Может, встретимся завтра?'] = 'Maybe we meet tomorrow?';
storyTextMap.en['Не в кафе, а просто в парке, погуляем'] = 'Not at a cafe, just in the park, take a walk';
storyTextMap.en['Хочу поговорить с тобой без телефонов'] = 'I want to talk to you without phones';
storyTextMap.en['Без людей и всей этой суеты'] = 'Without people and all this fuss';
storyTextMap.en['Я обычно сижу на скамейке у пруда'] = 'I usually sit on the bench by the pond';
storyTextMap.en['Пишу что-то своё. приходи, если хочешь'] = 'Writing my own stuff. come if you want';
storyTextMap.en['Я тоже нервничаю, если честно.'] = 'I\'m nervous too, honestly.';
storyTextMap.en['Но иногда стоит рискнуть'] = 'But sometimes it\'s worth the risk';
storyTextMap.en['Если что, я весь этот год работаю над тем'] = 'You know, I\'ve spent this whole year working on';
storyTextMap.en['Чтобы никого не подпускать слишком близко'] = 'Not letting anyone get too close';
storyTextMap.en['А с тобой это как-то само получилось.'] = 'But with you it just happened somehow.';
storyTextMap.en['Не знаю, что с этим делать'] = 'I don\'t know what to do about it';
storyTextMap.en['Спасибо. знаешь, я редко это говорю'] = 'Thank you. you know, I rarely say this';
storyTextMap.en['Но - мне с тобой спокойно'] = 'But - I feel at peace with you';
// Day 7 — split parts
storyTextMap.en['Что бы ты сейчас ни сказал'] = 'Whatever you say now';
storyTextMap.en['Я хочу, чтобы это было честно.'] = 'I want it to be honest.';
storyTextMap.en['Без красивых слов ради красивых слов'] = 'Without pretty words for pretty words\' sake';
storyTextMap.en['Знаешь, я весь вечер пытаюсь понять'] = 'You know, I\'ve been trying to understand all evening';
storyTextMap.en['Что мы вообще друг для друга'] = 'What we even are to each other';
storyTextMap.en['Наверное, нам обоим нужно время.'] = 'Maybe we both need time.';
storyTextMap.en['Просто время, без обещаний'] = 'Just time, without promises';
storyTextMap.en['С понедельника у меня официально другой куратор'] = 'From monday I officially have a different group manager';
storyTextMap.en['Групп. с тобой я теперь просто... я'] = 'Groups. with you I\'m now just... me';
storyTextMap.en['Спасибо, что придумал это тогда.'] = 'Thanks for coming up with that back then.';
storyTextMap.en['По-моему, у нас всё получится'] = 'I think we\'ll make it work';
storyTextMap.en['Я не знаю, что будет с работой.'] = 'I don\'t know what\'ll happen with my job.';
storyTextMap.en['Но я знаю, что не хочу тебя терять'] = 'But I know I don\'t want to lose you';
storyTextMap.en['Мне нравится, что ты не торопишь события.'] = 'I like that you\'re not rushing things.';
storyTextMap.en['Это редкость'] = 'That\'s rare';
storyTextMap.en['А пока - у нас есть уроки'] = 'For now - we have lessons';
storyTextMap.en['Кофе по субботам и очень много времени'] = 'Coffee on saturdays and plenty of time';
storyTextMap.en['Без ярлыков - значит без давления.'] = 'No labels - means no pressure.';
storyTextMap.en['Мне так спокойнее'] = 'I feel calmer this way';
storyTextMap.en['У нас будет самая странная история знакомства'] = 'We\'ll have the strangest meeting story';
storyTextMap.en['Из всех, что я знаю'] = 'Of all the ones I know';
storyTextMap.en['Раз домашки всё равно нет, го блиц-тест прямо тут? 3 вопроса'] = 'Since there\'s no homework anyway, how about a quick quiz right here? 3 questions';
storyTextMap.en['База на месте, уже неплохо. +3'] = 'The basics are there, not bad. +3';
storyTextMap.en['Ну такое... но ладно, едем дальше'] = 'Eh, could be better... but ok, moving on';
storyTextMap.en['Привет! суббота, сижу в кофейне, никакой школы'] = 'Hi! it\'s saturday, I\'m at the cafe, no school today';
storyTextMap.en['Жизнь налаживается. ты как, чем занят?'] = 'Life is good. how about you, what are you up to?';
storyTextMap.en['Кстати, я всё ждала, придёшь ты или нет 🙂'] = 'By the way, I kept wondering if you\'d show up or not 🙂';
storyTextMap.en['Если что, у меня тут и задание для тебя готово'] = 'Just so you know, I\'ve got your assignment ready here too';
storyTextMap.en['Ага, у окна, с ноутом. если хочешь - подходи, заодно разберём тему'] = 'Yep, by the window, with my laptop. come by if you want, we can go over the topic too';
storyTextMap.en['Только без формальностей сегодня. я не "препод", а просто Алиса'] = 'No formalities today though. I\'m not a "tutor," just Alisa';
storyTextMap.en['Разговора - это про меня спросить, или про свои дела рассказать?'] = 'A proper talk - meaning you ask about me, or you tell me about your stuff?';
storyTextMap.en['Ладно, давай тут, в переписке. тоже неплохо'] = 'Fine, let\'s do it here, over text. that works too';
storyTextMap.en['Давай. Надеюсь, будет смешно.'] = 'Go on. Hopefully it\'s funny.';
storyTextMap.en['Но после истории домашку всё равно жду. Ок?'] = 'But after the story, I still expect the homework. Ok?';
storyTextMap.en['О, ты реально пришёл. садись, взяла тебе кофе на всякий случай'] = 'Oh, you actually came. sit down, I got you a coffee just in case';
storyTextMap.en['С чего начнём - сразу к делу, или сначала выдохнем?'] = 'Where do we start - straight to business, or do we breathe first?';
storyTextMap.en['Уважаю деловой подход. ладно, начинаем'] = 'I respect the businesslike approach. alright, let\'s begin';
storyTextMap.en['Дела... нормально, если честно. работы много, но не жалуюсь'] = 'Things... are fine, honestly. a lot of work, but I\'m not complaining';
storyTextMap.en['Странно, что тебе правда интересно. приятно'] = 'It\'s odd that you\'re actually interested. it\'s nice';
storyTextMap.en['Можно. иногда это лучше любых разговоров'] = 'Sure. sometimes that\'s better than any conversation';
storyTextMap.en['Ладно, мне пора домой. но сегодня было... неожиданно хорошо'] = 'Alright, I need to head home. but today was... unexpectedly good';
storyTextMap.en['Привет. ты вчера нормально добрался?'] = 'Hey. did you get home ok yesterday?';
storyTextMap.en['Если честно, не была уверена, что ты правда придёшь'] = 'Honestly, I wasn\'t sure you\'d actually show up';
storyTextMap.en['Привет) я всё ещё думаю про наш вчерашний разговор'] = 'Hey) I\'m still thinking about our conversation yesterday';
storyTextMap.en['У меня редко получается вот так просто общаться с учениками'] = 'It\'s rare for me to just talk this easily with a student';
storyTextMap.en['Обычно это только уроки и дедлайны. с тобой почему-то иначе'] = 'Usually it\'s just lessons and deadlines. with you it\'s somehow different';
storyTextMap.en['Прям тепло стало. спасибо'] = 'That actually warmed me up. thank you';
storyTextMap.en['Я тоже иногда устаю быть "училкой". с тобой могу быть просто собой'] = 'I get tired of being the "tutor" sometimes too. with you I can just be myself';
storyTextMap.en['Ого. я тоже, если честно. весь вечер вчера в голове прокручивала'] = 'Wow. me too, honestly. I kept replaying it in my head all evening';
storyTextMap.en['Обаятельный - это громко сказано. но забавный - да'] = 'Charming is a strong word. but funny - yes';
storyTextMap.en['Если честно, я подумываю сменить работу в последнее время'] = 'Honestly, I\'ve been thinking about changing jobs lately';
storyTextMap.en['Устала немного. не от учеников, а от всей этой... системы'] = 'I\'m a bit tired. not of the students, but of the whole... system';
storyTextMap.en['Извини, не хотела грузить тебя этим'] = 'Sorry, I didn\'t mean to dump that on you';
storyTextMap.en['Спасибо, что не свёл всё к шутке. серьёзно'] = 'Thanks for not turning that into a joke. seriously';
storyTextMap.en['Правда? расскажешь как-нибудь. приятно, что не только я тут раскрываюсь'] = 'Really? tell me sometime. it\'s nice that I\'m not the only one opening up here';
storyTextMap.en['Ахах, ну хоть кто-то ценит мои старания'] = 'Haha, well, at least someone appreciates my effort';
storyTextMap.en['Ладно, спать пора. завтра понедельник, у меня с утра проверка от начальства'] = 'Alright, time for bed. tomorrow\'s monday, I\'ve got a review from management in the morning';
storyTextMap.en['Бро, тебя спалили) кто-то скинул в чат фотку - ты с училкой англ в кафе сидел. все обсуждают 😱'] = 'Bro, you got caught) someone posted a photo in the group chat - you sitting with your english tutor at a cafe. everyone\'s talking about it 😱';
storyTextMap.en['Слушай, тут ситуация'] = 'Listen, there\'s a situation';
storyTextMap.en['Кто-то из кафе скинул нашу фотку знакомым, а те - дальше'] = 'Someone from the cafe sent our photo to people they know, and it spread from there';
storyTextMap.en['Мне уже написала руководитель школы, спрашивает, что происходит'] = 'My manager at the school already messaged me, asking what\'s going on';
storyTextMap.en['У нас в контракте пункт про личные отношения с действующими учениками'] = 'There\'s a clause in my contract about personal relationships with current students';
storyTextMap.en['Формально это могут посчитать нарушением. я не паникую, но... это серьёзно'] = 'Technically it could count as a violation. I\'m not panicking, but... it\'s serious';
storyTextMap.en['Ты как вообще? нормально?'] = 'How are you holding up? you ok?';
storyTextMap.en['Ты прав. мы правда ничего плохого не сделали'] = 'You\'re right. we really didn\'t do anything wrong';
storyTextMap.en['Но объясняться всё равно придётся. держись, я разберусь'] = 'But I\'ll still have to explain myself. hang in there, I\'ll sort it out';
storyTextMap.en['Ты серьёзно сейчас это написал...'] = 'Did you seriously just write that...';
storyTextMap.en['Мне тоже было важно. но давай сначала разберёмся с этим, а потом договорим'] = 'It mattered to me too. but let\'s deal with this first, and finish talking later';
storyTextMap.en['То есть соврать руководителю? так себе план, но... ладно, если надо'] = 'So, lie to my manager? not a great plan, but... fine, if it\'s needed';
storyTextMap.en['Просто не хочу, чтобы это стало привычкой между нами'] = 'I just don\'t want that to become a habit between us';
storyTextMap.en['Смешно, конечно, но мне сейчас не до шуток, если честно'] = 'Funny, sure, but I\'m honestly not in the mood for jokes right now';
storyTextMap.en['Хотя... ладно, было забавно. держись версии "разбирали тему"'] = 'Though... ok, that was funny. stick to the "we were going over a topic" story';
storyTextMap.en['Ты... правда готов это сделать? для меня?'] = 'You... would really do that? for me?';
storyTextMap.en['Спасибо. дай подумать, как лучше. но это очень много значит'] = 'Thank you. let me think about the best way. but that means a lot';
storyTextMap.en['Я поговорила с руководителем'] = 'I talked to my manager';
storyTextMap.en['Сказала, что это было дополнительное занятие вне расписания. вроде поверила'] = 'I said it was an extra lesson outside the schedule. she seemed to believe it';
storyTextMap.en['Но предупредила, что будет следить. если что-то ещё всплывёт - разговор будет другой'] = 'But she warned she\'ll be keeping an eye on things. if anything else comes up, it\'ll be a different conversation';
storyTextMap.en['Если честно, врать было неприятно. давай больше так не будем'] = 'Honestly, lying felt awful. let\'s not do that again';
storyTextMap.en['Как думаешь, нам вообще стоит продолжать переписываться так, как сейчас? или лучше поостыть?'] = 'Do you think we should even keep texting like this? or is it better to cool off?';
storyTextMap.en['Ладно, договорились. просто будь аккуратнее с уведомлениями на людях'] = 'Alright, deal. just be careful with notifications when people are around';
storyTextMap.en['О. это... на самом деле неплохая идея'] = 'Oh. that\'s... actually not a bad idea';
storyTextMap.en['Тогда формально у нас вообще не будет конфликта интересов. дай подумать'] = 'Then formally there\'d be no conflict of interest at all. let me think about it';
storyTextMap.en['Наверное, ты прав. так безопаснее для нас обоих'] = 'You\'re probably right. it\'s safer for both of us this way';
storyTextMap.en['Но мне будет не хватать этих разговоров. если что - я всегда отвечу'] = 'But I\'ll miss these conversations. if you ever change your mind - I\'ll always answer';
storyTextMap.en['Шифруемся, ха. ладно, давай хотя бы без явных смайликов на людях'] = 'Going undercover, ha. fine, at least no obvious emojis when people can see';
storyTextMap.en['Кстати, по поводу перевода - руководитель не против, если ты правда захочешь'] = 'By the way, about the reassignment - my manager\'s fine with it, if you really want to';
storyTextMap.en['У меня сейчас есть немного времени, и я всё думаю о нас'] = 'I\'ve got a bit of free time right now, and I keep thinking about us';
storyTextMap.en['Какие бы слухи ни ходили - я рада, что мы встретились в субботу'] = 'Whatever the rumors, I\'m glad we met up on saturday';
storyTextMap.en['Скажи честно - чего ты на самом деле хочешь? я не тороплю'] = 'Tell me honestly - what do you actually want? I\'m not rushing you';
storyTextMap.en['Дружба - это тоже ценно. правда'] = 'Friendship matters too. really';
storyTextMap.en['Значит, остаёмся близкими людьми. а учёбу не забрасывай, ладно? 😉'] = 'So, we stay close. and don\'t slack off on your studies, ok? 😉';
storyTextMap.en['Я боюсь. но... я тоже так думаю'] = 'I\'m scared. but... I feel the same way';
storyTextMap.en['Работу я не готова терять. но тебя терять ещё меньше хочу'] = 'I\'m not ready to lose my job. but I want to lose you even less';
storyTextMap.en['Это самое взрослое решение, которое ты мог предложить'] = 'That\'s the most mature solution you could\'ve suggested';
storyTextMap.en['Подам заявку завтра же. и тогда уже ничего официально нам не мешает'] = 'I\'ll file the request tomorrow. and then officially nothing stands in our way';
storyTextMap.en['Без объявлений - это по мне. посмотрим, куда это приведёт'] = 'No announcements - that suits me. let\'s see where it goes';
storyTextMap.en['Привет. я весь день сегодня улыбаюсь без причины. это ты виноват'] = 'Hey. I\'ve been smiling for no reason all day. that\'s your fault';
storyTextMap.en['Привет! заявку на перевод я подала, кстати. чувствую себя свободнее'] = 'Hi! I filed the reassignment request, by the way. feels like a weight off';
storyTextMap.en['Привет) как настоящий друг, я весь день о тебе думала. это нормально?'] = 'Hey) as a proper friend, I thought about you all day. is that normal?';
storyTextMap.en['Привет. знаю, мы решили быть осторожнее, но я не выдержала и написала'] = 'Hey. I know we agreed to be careful, but I couldn\'t help texting you';
storyTextMap.en['Может, встретимся завтра? не в кафе, а просто в парке, погуляем'] = 'Maybe we could meet tomorrow? not at a cafe, just a walk in the park';
storyTextMap.en['Хочу поговорить с тобой без телефонов, людей и этой всей суеты'] = 'I want to talk to you without phones, people, or any of the noise';
storyTextMap.en['Я обычно сижу на скамейке у пруда, пишу что-то своё. приходи, если хочешь'] = 'I usually sit on the bench by the pond, writing something of my own. come by, if you want';
storyTextMap.en['Отлично. завтра в 17:00, у входа в парк'] = 'Great. tomorrow at 5pm, by the park entrance';
storyTextMap.en['Я тоже нервничаю, если честно. но иногда стоит рискнуть'] = 'I\'m nervous too, honestly. but sometimes it\'s worth the risk';
storyTextMap.en['Завтра в 17:00. буду ждать'] = 'Tomorrow at 5pm. I\'ll be waiting';
storyTextMap.en['Ахах, я похожа на героиню книги? спасибо, наверное'] = 'Haha, I sound like a novel\'s heroine? thanks, I guess';
storyTextMap.en['Жду завтра в 17:00'] = 'See you tomorrow at 5pm';
storyTextMap.en['Кое-что важное? теперь я весь вечер буду гадать'] = 'Something important? now I\'ll be guessing all evening';
storyTextMap.en['Скажешь завтра лично. в 17:00, я на месте'] = 'You\'ll tell me in person tomorrow. 5pm, I\'ll be there';
storyTextMap.en['Если что, я весь этот год работаю над тем, чтобы никого не подпускать слишком близко'] = 'Just so you know, I\'ve spent this whole year working on not letting anyone get too close';
storyTextMap.en['А с тобой это как-то само получилось. не знаю, что с этим делать'] = 'And with you it just happened somehow. I don\'t know what to do about it';
storyTextMap.en['Может, и правда. посмотрим, что будет завтра'] = 'Maybe you\'re right. let\'s see what tomorrow brings';
storyTextMap.en['Спасибо. знаешь, я редко это говорю, но - мне с тобой спокойно'] = 'Thank you. you know, I rarely say this, but - I feel at ease with you';
storyTextMap.en['Диагноз "влюбилась в своего ученика". ужасно, знаю'] = 'Diagnosis: "fell for my own student." awful, I know';
storyTextMap.en['Ты дал понять, что готовишь важный разговор. Открыт особый путь к финалу.'] = 'You hinted at something important ahead. A special path to the ending has opened.';
storyTextMap.en['Привет. я уже в парке, на скамейке у пруда'] = 'Hey. I\'m already at the park, on the bench by the pond';
storyTextMap.en['Что бы ты сейчас ни сказал - я хочу, чтобы это было честно. без красивых слов ради красивых слов'] = 'Whatever you say now - I just want it to be honest. no pretty words for the sake of pretty words';
storyTextMap.en['Я тоже готова. страшно, но готова'] = 'I\'m ready too. scared, but ready';
storyTextMap.en['Это мудро. я подожду, сколько нужно'] = 'That\'s wise. I\'ll wait as long as it takes';
storyTextMap.en['Без ярлыков - это честно. мне подходит'] = 'No labels - that\'s honest. works for me';
storyTextMap.en['Ну давай, удиви меня'] = 'Alright, go on, surprise me';
storyTextMap.en['Знаешь, я весь вечер пытаюсь понять, что мы вообще друг для друга'] = 'You know, I\'ve spent all evening trying to figure out what we even are to each other';
storyTextMap.en['Наверное, нам обоим нужно время. просто время, без обещаний'] = 'I guess we both just need time. just time, no promises';
storyTextMap.en['🌫️ Финал: неопределённость'] = '🌫️ Ending: Uncertainty';
storyTextMap.en['Вы не разошлись, но и не стали по-настоящему близки — слишком много было недосказанного по пути. Может, всё ещё наладится, а может, так и останется на паузе.'] = 'You didn\'t part ways, but you never became truly close either — too much went unsaid along the way. It might still work out, or it might just stay on pause.';
storyTextMap.en['📊 Итог: Успеваемость {{success}}, Романтика {{romance}}, Юмор {{humor}}'] = '📊 Final stats: Grades {{success}}, Romance {{romance}}, Humor {{humor}}';
storyTextMap.en['С понедельника у меня официально другой куратор групп. с тобой я теперь просто... я'] = 'As of monday I\'m officially off your case load. with you now I\'m just... me';
storyTextMap.en['Спасибо, что придумал это тогда. по-моему, у нас всё получится'] = 'Thanks for thinking of that. I think we\'re going to be fine';
storyTextMap.en['💛 Финал: честное начало'] = '💛 Ending: An Honest Start';
storyTextMap.en['Вы всё сделали правильно — сначала разобрались с формальностями, и только потом позволили себе быть вместе. Ни тайн, ни компромиссов с совестью. Начало получилось спокойным и настоящим.'] = 'You did it the right way — sorted out the formalities first, and only then let yourselves be together. No secrets, no compromises with your conscience. It\'s a calm, honest start.';
storyTextMap.en['Я не знаю, что будет с работой. но я знаю, что не хочу тебя терять'] = 'I don\'t know what\'ll happen with my job. but I know I don\'t want to lose you';
storyTextMap.en['Давай просто попробуем. разберёмся по ходу'] = 'Let\'s just try. we\'ll figure it out as we go';
storyTextMap.en['💖 Финал: рискнули'] = '💖 Ending: We Took the Risk';
storyTextMap.en['Вы выбрали друг друга, даже не имея всех ответов. Впереди неловкие разговоры с начальством и, возможно, трудный выбор — но сейчас вы вместе, и это главное.'] = 'You chose each other without having all the answers. There are awkward conversations with management ahead, maybe a hard choice too — but right now you\'re together, and that\'s what matters.';
storyTextMap.en['Мне нравится, что ты не торопишь события. это редкость'] = 'I like that you\'re not rushing things. that\'s rare';
storyTextMap.en['А пока - у нас есть уроки, кофе по субботам и очень много времени'] = 'For now - we have lessons, saturday coffee, and plenty of time';
storyTextMap.en['🤝 Финал: пауза с надеждой'] = '🤝 Ending: A Hopeful Pause';
storyTextMap.en['Вы решили не торопиться. Ничего не разрушено, ничего пока не начато по-настоящему — но между вами осталась тёплая, честная связь, которой можно дать вырасти.'] = 'You decided not to rush. Nothing is broken, nothing has really begun yet — but there\'s a warm, honest connection between you that\'s allowed to grow.';
storyTextMap.en['Без ярлыков - значит без давления. мне так спокойнее'] = 'No labels means no pressure. it\'s easier for me this way';
storyTextMap.en['А там видно будет, во что это вырастет'] = 'We\'ll see what it grows into';
storyTextMap.en['🌤️ Финал: без определений'] = '🌤️ Ending: Undefined';
storyTextMap.en['Вы не назвали то, что между вами происходит, но и не отказались друг от друга. Иногда это и есть самое честное решение — жить дальше и смотреть, куда приведёт.'] = 'You never put a name on what\'s between you, but you never gave each other up either. Sometimes that\'s the most honest choice - keep going and see where it leads.';
storyTextMap.en['Ахах, ладно, ты меня удивил. согласна'] = 'Haha, alright, you actually surprised me. I\'m in';
storyTextMap.en['У нас будет самая странная история знакомства из всех, что я знаю'] = 'We\'re going to have the weirdest how-we-met story I know';
storyTextMap.en['😄 Финал: на своей волне'] = '😄 Ending: On Their Own Wavelength';
storyTextMap.en['Серьёзные разговоры у вас почему-то всегда превращались в шутки — и, кажется, именно так вы и держались друг за друга всю неделю. Получилось легко, тепло и очень по-настоящему.'] = 'Somehow every serious conversation between you turned into a joke — and it seems that\'s exactly how you held onto each other all week. It turned out light, warm, and very real.';
storyTextMap.en['Спасибо, что был честен со мной сегодня. правда'] = 'Thank you for being honest with me today. really';
storyTextMap.en['🎬 Игра завершена. Спасибо за прохождение!'] = '🎬 The game is complete. Thanks for playing!';
storyTextMap.en['Ты прошёл все 7 дней. Каким будет твой финал - зависит только от тебя.'] = 'You made it through all 7 days. What your ending looks like is entirely up to you.';
storyTextMap.en['Простите, реально закрутился. можно пересдать?'] = 'Sorry, I really got swamped. can I retake it?';
storyTextMap.en['Если честно, просто забыл всё на свете) объясните ещё раз?'] = 'Honestly, I just forgot everything) explain it again?';
storyTextMap.en['Да, был косяк. Признаю, расслабился. Больше так не буду.'] = 'Yeah, that was on me. I admit, I slacked off. It won\'t happen again.';
storyTextMap.en['Давай как тебе удобно'] = 'Whatever works for you';
storyTextMap.en['А сейчас можешь? хочу побыстрее закрыть вопрос'] = 'Can you now? want to get it over with';
storyTextMap.en['Распишу время сам в приложении, не парьтесь'] = 'I\'ll schedule it myself in the app, don\'t worry';
storyTextMap.en['Клёвое фото, вы тут совсем другая'] = 'Cool photo, you look nothing like a teacher there';
storyTextMap.en['С такой улыбкой хочется учиться чаще 😏'] = 'With a smile like that I\'d study more often 😏';
storyTextMap.en['А где строгий училочий взгляд? удивлён'] = 'Where\'s the strict teacher stare? I\'m surprised';
storyTextMap.en['Может, зайду поздороваться в субботу?'] = 'Maybe I\'ll stop by and say hi on saturday?';
storyTextMap.en['Лучше домашку доделаю, чем гулять'] = 'I\'d rather finish my homework than hang out';
storyTextMap.en['Кофейня с вайфаем? тогда точно приду'] = 'A cafe with wifi? then I\'m definitely coming';
storyTextMap.en['Я тоже думал о тебе, чего уж скрывать'] = 'I was thinking about you too, no point hiding it';
storyTextMap.en['Думал, я один такой странный, что запал на препода'] = 'Thought I was the only weird one crushing on a tutor';
storyTextMap.en['Фото класс. но у меня встречный вопрос'] = 'Great photo. but I\'ve got a question for you';
storyTextMap.en['Почти приглашение я тоже почти приму'] = 'An almost-invitation deserves an almost-yes';
storyTextMap.en['Не хочу давить, давай пока просто переписка'] = 'Don\'t want to push it, let\'s just keep texting for now';
storyTextMap.en['Записываю в календарь. с пометкой "важно"'] = 'Putting it in my calendar, marked "important"';
storyTextMap.en['Давай! объясни мне Present Perfect, я реально хочу понять'] = 'Let\'s go! explain Present Perfect, I really want to get it';
storyTextMap.en['Спасибо, что не бросаешь меня. боюсь не осилить'] = 'Thanks for not giving up on me. scared I won\'t manage';
storyTextMap.en['А есть шпаргалка? серьёзно, без шуток'] = 'Is there a cheat sheet? seriously, no jokes';
storyTextMap.en['Звучит продуктивно, давай попробуем'] = 'Sounds productive, let\'s try it';
storyTextMap.en['Мне дома спокойнее, но спасибо'] = 'I focus better at home, but thanks';
storyTextMap.en['А кофе за счёт школы? шучу, приду'] = 'Is the coffee on the school? kidding, I\'ll come';
storyTextMap.en['А ты правда сейчас в той кофейне на Ленина?'] = 'Are you really at that cafe on Lenina right now?';
storyTextMap.en['Дома сижу, лень. но соскучился по разговору'] = 'Home, being lazy. but I missed talking to you';
storyTextMap.en['Слушай, сегодня с домашкой приключилась целая история. Хочешь расскажу?'] = 'Listen, something happened with my homework today. Wanna hear?';
storyTextMap.en['Давай сразу к делу, я собран'] = 'Let\'s get straight to it, I\'m focused';
storyTextMap.en['Выдохнем. расскажи, как у тебя дела'] = 'Let\'s breathe first. tell me how you\'re doing';
storyTextMap.en['А можно просто помолчать немного?'] = 'Can we just sit quietly for a bit?';
storyTextMap.en['Мне тоже было легко. спасибо за это'] = 'It was easy for me too. thank you for that';
storyTextMap.en['Я весь день думал про наш разговор, если честно'] = 'Honestly, I thought about our talk all day';
storyTextMap.en['Наверное, потому что я обаятельный. шучу'] = 'Probably because I\'m charming. kidding';
storyTextMap.en['Не извиняйся, мне интересно тебя слушать'] = 'Don\'t apologize, I like listening to you';
storyTextMap.en['Я тебя понимаю, у меня похожая история'] = 'I get it, I\'ve got a similar story';
storyTextMap.en['Зато у тебя есть я - твой лучший ученик 😄'] = 'Well, you\'ve got me - your best student 😄';
storyTextMap.en['Я спокоен. мы просто разговаривали, ничего плохого'] = 'I\'m calm. we were just talking, nothing wrong with that';
storyTextMap.en['Если честно, мне важно было тебя увидеть'] = 'Honestly, it mattered to me to see you';
storyTextMap.en['Может, скажем, что ты просто помогала мне из вежливости?'] = 'Maybe we say you were just helping me out of kindness?';
storyTextMap.en['Давай я сам поговорю с руководителем'] = 'Let me talk to your manager myself';
storyTextMap.en['Давай я сам поговорю с руководителем'] = 'Let me talk to your manager myself';
storyTextMap.en['Давай просто быть осторожнее, но не пропадать'] = 'Let\'s just be more careful, but not disappear';
storyTextMap.en['А что если официально попросить перевести меня к другому преподавателю?'] = 'What if I officially requested a different tutor?';
storyTextMap.en['Может, правда лучше остановиться, чтобы не рисковать?'] = 'Maybe it really is better to stop, to be safe?';
storyTextMap.en['Предлагаю режим "секретных агентов". шифруемся'] = 'I propose "secret agent" mode. we go undercover';
storyTextMap.en['Ты мне дорога, но давай будем просто друзьями'] = 'You mean a lot to me, but let\'s just be friends';
storyTextMap.en['Мне важна ты, а не эта работа. рискнём?'] = 'You matter more to me than this job. shall we risk it?';
storyTextMap.en['Давай ты официально сменишь мне преподавателя'] = 'Let\'s have you officially reassign my tutor';
storyTextMap.en['Без объявлений, но и прятаться не будем'] = 'No labels, but no hiding either';
storyTextMap.en['Приду. давай просто поговорим'] = 'I\'ll come. let\'s just talk';
storyTextMap.en['Честно? немного нервничаю. но приду'] = 'Honestly? a little nervous. but I\'ll come';
storyTextMap.en['Скамейка у пруда - звучит как начало книги'] = 'A bench by the pond - sounds like the start of a novel';
storyTextMap.en['Мне нужно сказать тебе кое-что важное...'] = 'I need to tell you something important...';
storyTextMap.en['Может, и не надо ничего с этим делать'] = 'Maybe we don\'t need to do anything about it';
storyTextMap.en['Я рад, что ты впустила меня. серьёзно'] = 'I\'m glad you let me in. seriously';
storyTextMap.en['Звучит как диагноз. но я приму тебя такой 😄'] = 'Sounds like a diagnosis. I\'ll take you anyway 😄';
storyTextMap.en['Я готов рискнуть. хочу быть с тобой'] = 'I\'m ready to risk it. I want to be with you';
storyTextMap.en['Давай подождём, пока всё уляжется'] = 'Let\'s wait until things settle down';
storyTextMap.en['Оставим всё как есть, без ярлыков'] = 'Let\'s leave things as they are, no labels';
storyTextMap.en['У меня встречное предложение...'] = 'I\'ve got a counter-proposal...';

// Day 3 evening recap, Day 2 fix, Day 5 alt-scandal, Day 7 off-screen cuts
storyTextMap.en['— Дальше — без экрана. Кофе, разговор, тишина 🙂'] = '— Off-screen from here. Coffee, talk, silence 🙂';
storyTextMap.en['Я дома)'] = 'I\'m home)';
storyTextMap.en['Сегодня было... неожиданно хорошо'] = 'Today was... unexpectedly good';
storyTextMap.en['Спасибо за компанию'] = 'Thanks for the company';
storyTextMap.en['Редко выходит поговорить просто так'] = 'It\'s rare I get to just talk that easily';
storyTextMap.en['С тобой как-то легко'] = 'It\'s somehow easy with you';
storyTextMap.en['Мне тоже было хорошо. до завтра)'] = 'It was good for me too. see you tomorrow)';
storyTextMap.en['Спокойной ночи. с понедельника зубрю)'] = 'Good night. from monday I\'m back to cramming)';
storyTextMap.en['До понедельника. не скучай 😄'] = 'See you on monday. don\'t miss me 😄';
storyTextMap.en['Приятно слышать)'] = 'Nice to hear)';
storyTextMap.en['Вот и отлично'] = 'Perfect then';
storyTextMap.en['Ахах, не обещаю)'] = 'Haha, no promises)';
storyTextMap.en['Весь вечер прокручивала наш разговор'] = 'Kept replaying our conversation all evening';
storyTextMap.en['Бро, новость дня) говорят, вы с училкой ночами переписываетесь. все обсуждают 😱'] = 'Bro, news of the day) they say you and the teacher text each other at night. everyone\'s talking 😱';
storyTextMap.en['Кто-то из класса проболтался'] = 'Someone from class blabbed';
storyTextMap.en['Что мы переписываемся по вечерам'] = 'That we text each other in the evenings';
storyTextMap.en['Спрашивает, что за «дополнительные занятия»'] = 'Asking what these "extra lessons" are';
storyTextMap.en['— Дальше — без экрана: парк, скамейка у пруда, долгий разговор 🙂'] = '— Off-screen from here: the park, the bench by the pond, a long talk 🙂';
storyTextMap.en['— Ты, как и обещал вчера, говоришь ей это вживую — просто так, без поводов.'] = '— As you promised yesterday, you tell her it in person — just like that, for no reason.';

// Day 2 mini-test questions
storyTextMap.en['Вставь правильное слово: ___ I a student? (Am / Is / Are)'] = 'Fill in the correct word: ___ I a student? (Am / Is / Are)';
storyTextMap.en['Вставь правильное слово: She ___ at home. (Am / Is / Are)'] = 'Fill in the correct word: She ___ at home. (Am / Is / Are)';
storyTextMap.en['Вставь правильное слово: They ___ going to school. (Am / Is / Are)'] = 'Fill in the correct word: They ___ going to school. (Am / Is / Are)';
*/

export function getCurrentLanguage() {
    return currentLang;
}

export function setLanguage(lang) {
    if (translations[lang]) currentLang = lang;
}

export function t(key) {
    if (translations[currentLang]?.[key]) return translations[currentLang][key];
    if (currentLang === 'en') {
        if (storyTextMap.en[key]) return storyTextMap.en[key];
        const ruText = optionLabels[key];
        if (ruText && storyTextMap.en[ruText]) return storyTextMap.en[ruText];
    }
    if (currentLang === 'ru' && optionLabels[key]) return optionLabels[key];
    return key;
}

export function translateStoryText(text) {
    return t(text);
}