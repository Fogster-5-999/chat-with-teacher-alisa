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
        'profile.job': 'Учитель английского языка',
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
        'achievements.locked': 'Скрыто',
        'story_title_2': 'Сюжет #2',
        'story_title_3': 'Сюжет #3',
        'story_soon': 'Скоро появится',
        'badge_soon': 'Скоро',
        'day.new': 'День'
    },
    en: {
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
        'menu.hero_subtitle': 'Alice',
        'menu.story1_title': 'Alice ❤️',
        'menu.story1_status': 'English Teacher',
        'menu.story1_btn': 'Start Chat',
        'menu.story1_unread': '💬 2 new messages',
        'photo.hint_locked': '👆 Tap the photo to unlock (ad required)',
        'photo.hint_unlocked': '👆 Tap the photo to view closer',
        'photo.error': '📷 Photo not added (',
        'day.new': 'Day',
        'friend.prefix': 'Friend (',
        'notif.alisa': 'Alisa',
        'achievements.title': 'Achievements',
        'achievements.unlocked': 'Unlocked',
        'achievements.locked': 'Hidden',
        'story_title_2': 'Story #2',
        'story_title_3': 'Story #3',
        'story_soon': 'Coming soon',
        'badge_soon': 'Soon'
    }
};

let currentLang = 'ru';

const optionLabels = {
    'opt1_1': 'простите, реально не понял тему( можно пересдать? объясните, я всё сделаю',
    'opt1_2': 'ой, вы меня проверяете? приятно, что думаете обо мне вечером) объясните лично? 😏',
    'opt1_3': 'сорян, выпал - интернет лагал, забыл. могу сделать сейчас, или мем в качестве извинений?',
    'opt2_1': 'ух ты, вы тут совсем не как училка. классное фото, честно.',
    'opt2_2': 'ого, а вы так улыбаетесь? теперь хочется на урок прийти пораньше 😏',
    'opt2_3': 'погодите, это вы? а где взгляд убийцы и указка? краш - 100% 😂',
    'opt2f_1': 'я тоже думал о тебе) давай просто поговорим, без этой всей школьной тягомотины',
    'opt2f_2': 'ты серьёзно? я думал, я один такой странный, что запал на училку',
    'opt2f_3': 'фото? конечно, давай! но я без рекламы, у меня нет денег 😂',
    'opt2f_4': 'посмотрю фото без размытия',
    'opt2s_1': 'давай, я готов учиться! объясни мне Present Perfect, я реально хочу понять',
    'opt2s_2': 'спасибо, что не бросаешь. я боюсь, что не сдам экзамены',
    'opt2s_3': 'а можно мне скинуть шпаргалку? ну, я серьёзно, без шуток 😅',
    'opt2s_4': 'хочу посмотреть фото без размытия',
    'opt3_1': 'привет! извините, забыл - вчера была тренировка. сейчас всё сделаю. а вы в каком кафе?',
    'opt3_2': 'вы в субботу отдыхаете без меня? может, я тоже приду, посижу рядом)',
    'opt3_3': 'у меня мем, где собака делает уроки за хозяина. скиньте фото кафе, если красиво',
    'opt3_extra_flirt': 'я хочу пригласить тебя на свидание, но боюсь...',
    'opt4_1': 'привет! добрался норм. спасибо, что помогла - было реально интересно, ты классно объясняешь',
    'opt4_2': 'привет! всю дорогу думал о нашем разговоре. ты классно объясняешь) повторим в субботу?',
    'opt4_3': 'живой, добрался) спасибо за латте, чувствую себя интеллигентом. в субботу опять заруба?',
    's1_1': 'слушай, я не парюсь. мы просто сидели в кафе, я учил английский. ну и что?',
    's1_2': 'если честно, мне плевать, кто что скажет. я пришёл, потому что хотел увидеть тебя',
    's1_3': 'блин, реально? катастрофа. может, скажем, что ты просто помогала мне из жалости?',
    's1_4': 'ха, теперь я звезда школы! скажем, что ты сидела грустная, я подошёл спросить про уроки',
    's1_5': 'я хочу замять эту историю окончательно и пообещать больше так не рисковать',
    's2_1': 'давай просто не писать при всех? реже видеться, но связь не терять',
    's2_2': 'а что если не прятаться? скажем, что я хожу к тебе на факультатив',
    's2_3': 'может, правда лучше остановиться? общаемся только на уроках, так безопаснее',
    's2_4': 'мы как в сериале - нас хотят разлучить. скажем, что ты мой тайный наставник, ха-ха',
    's3_1': 'ты мне очень дорога, но не как учительница. давай будем просто друзьями - настоящими',
    's3_2': 'я хочу быть с тобой. мне плевать на возраст. никому не расскажем',
    's3_3': 'через полгода я выпускаюсь, и мы будем свободны. пока просто подождём?',
    's3_4': 'давай без риска, но продолжим видеться. пусть это будет наша маленькая тайна',
    'opt6_1': 'привет) я тоже думал о тебе. давай встретимся, просто поговорим. во сколько?',
    'opt6_2': 'честно? немного боюсь. но приду, если ты хочешь',
    'opt6_3': 'парк, скамейка, книга - прям сцена из фильма) приду, конечно',
    'opt6_4': 'я хочу сказать тебе что-то важное, но мне нужно набраться смелости...',
    'opt7_1': 'я пришёл. давай просто будем вместе. мне плевать на слухи',
    'opt7_2': 'ты для меня больше, чем учительница. может, подождём до выпуска?',
    'opt7_3': 'давай общаться, как сейчас, но без давления. это моё решение',
    'opt7_4': 'принёс тебе мем с котиком) а если серьёзно - я выбираю тебя'
};

const storyTextMap = {
    en: {
        'привет) не спишь?': 'hey! are you awake?',
        'я тут смотрю в журнал и ахриневаю... тест по временам ты просто слил, дз пустое. есть что сказать?': 'I’m looking at the gradebook and I’m shocked... you completely failed the tense test, and your homework is empty. do you have anything to say?',
        'или мне просто пару поставить и не париться? =(' : 'or should I just give you a passing grade and move on? =(',
        'простите, реально не понял тему( можно пересдать? объясните, я всё сделаю': 'sorry, I really didn’t understand the topic. can I retake it? explain it to me and I’ll do everything.',
        'ой, вы меня проверяете? приятно, что думаете обо мне вечером) объясните лично? 😏': 'oh, are you checking on me? it’s nice that you’re thinking about me this evening. explain it to me personally? 😏',
        'сорян, выпал - интернет лагал, забыл. могу сделать сейчас, или мем в качестве извинений?': 'sorry, I got disconnected — the internet lagged and I forgot. can I do it now, or should I send a meme as an apology?',
        'ого, слышать такое от тебя - праздник. ладно, скину тебе таблицу с правилом, сделай 5 предложений с примерами. если завтра к вечеру пришлёшь - спишем. договорились?': 'wow, hearing that from you is a holiday. okay, I’ll send you a rule sheet. write 5 sentences with examples; if you bring it by tomorrow evening, we’ll call it even. deal?',
        'ой ты смелый) ладно, завтра подойди на перемене, разберём тему. но только потому, что я переживаю за твой аттестат, а не потому что я «красивая» (хотя спс, приятно)': 'you’re brave. okay, come by during break tomorrow and we’ll go over it. only because I care about your diploma, not because I’m “pretty” (though thanks, that’s nice).',
        'я ничо не поняла из «лагал» и «выпал», но мемы люблю. давай так: ты делаешь задание на листочке завтра утром, а я посмотрю на кота. если кот смешной - поставлю 3, если нет - 2. идёт?': 'I didn’t understand any of “lagged” and “disconnected,” but I do love memes. let’s do this: you do the assignment on paper tomorrow morning, and I’ll look at the cat. if the cat is funny, I’ll give you a 3; if not, a 2. deal?',
        'привет) ну чё, совесть проснулась? я вчера ждала твои предложения, но так и не дождалась 😅': 'hi! so, did your conscience wake up? I was waiting for your sentences yesterday, but I never got them 😅',
        'ладно, не буду пилить, у меня сегодня настроение норм. кстати, меня сегодня фоткали для стенда «учитель года». получилось так себе, но скину тебе, поржать': 'alright, I won’t nag you. I’m in a good mood today. by the way, they took photos of me today for the “Teacher of the Year” board. they turned out mediocre, but I’ll send them to you so you can laugh.',
        'качество ужасное, если хочешь разглядеть - нажми на фото, там реклама секундная, зато потом видно всё': 'the quality is awful. if you want to see it better, tap the photo — there’s a short ad, but then you can see everything.',
        'ух ты, вы тут совсем не как училка. классное фото, честно.': 'wow, you don’t look like a teacher at all. that’s a great photo, honestly.',
        'ого, а вы так улыбаетесь? теперь хочется на урок прийти пораньше 😏': 'wow, you smile like that? now I want to come to class earlier 😏',
        'погодите, это вы? а где взгляд убийцы и указка? краш - 100% 😂': 'wait, is that you? where’s the killer stare and the pointer? total crash 😂',
        'спасибо) правда приятно. обычно ученики говорят, что я слишком серьёзная. а тут даже про свитер заметил. ладно, за такую похвалу я готова забыть, что ты мне ничего не скинул. но в следующий раз - задание обязательно, договорились?': 'thanks! that’s really nice. usually students say I’m too serious. and here you even noticed my sweater. alright, for such praise I’m willing to forget that you didn’t send me anything. but next time, the assignment is mandatory. deal?',
        'осторожнее, а то я подумаю, что тебе действительно нужны мои уроки) (через минуту) но если серьёзно - приятно. приходи завтра после шестого, я как раз буду проверять тетради, помогу с темой. только без этих своих «😏», ладно?': 'be careful, or I’ll think you really need my lessons. (a minute later) but seriously, that’s nice. come by tomorrow after six — I’ll be checking notebooks and can help with the topic. just no more of those “😏” faces, okay?',
        'боже, «краш»… я бы сказала «кринж», но у меня нет сил спорить. зато ты рассмешил. так и быть, если пришлёшь мне это задание до завтра - я даже не буду проверять ошибки, просто поставлю 4. договорились? а пока иди, не смущай меня своими мемами.': 'oh my God, “crash”... I’d say “cringe,” but I don’t have the energy to argue. still, you made me laugh. fine, if you send me that assignment by tomorrow, I won’t even check the mistakes — I’ll just give you a 4. deal? and for now, go away and stop embarrassing me with your memes.',
        'привет! суббота, а я всё равно думаю про своих учеников. ты, кстати, так и не скинул мне те 5 предложений. я уже почти перестала ждать, но решила написать - вдруг у тебя совесть проснулась?': 'hi! it’s Saturday and I’m still thinking about my students. by the way, you still haven’t sent those 5 sentences. I almost stopped waiting, but I decided to write anyway — maybe your conscience woke up?',
        'но если честно, я сегодня выключила режим «учитель». сижу в кафе, пью латте, читаю книгу. жизнь прекрасна. ты как? чем занимаешься? или опять зависаешь в телефоне?': 'but honestly, I turned off my “teacher” mode today. I’m sitting in a cafe, drinking latte, reading a book. life is great. how are you? what are you doing? or are you wasting time on your phone again?',
        'вы в субботу отдыхаете без меня? может, я тоже приду, посижу рядом)': 'you’re relaxing on Saturday without me? maybe I’ll come too and sit nearby)',
        'у меня мем, где собака делает уроки за хозяина. скиньте фото кафе, если красиво': 'I have a meme where a dog does its owner’s homework. send me a photo of the cafe if it’s pretty',
        'о, ты реально готов прийти? ну, я в «Кофе и Книги» на Ленина. сижу у окна, читаю что-то грустное. если хочешь, подходи - помогу тебе с темой заодно. только без формальностей, я сегодня не «Сергеевна», а просто Алиса. жду, если решишься.': 'oh, you’re actually willing to come? well, I’m at “Coffee and Books” on Lenina. I’m sitting by the window, reading something sad. if you want, come by — I’ll help you with the topic too. no formalities today, I’m not “Sergeevna” — just Alisa. I’ll be waiting if you decide to come.',
        'смелый. я, конечно, учительница, но в субботу могу позволить себе посидеть с учеником в кафе. только предупреждаю: если ты будешь пялиться в телефон, а не слушать мои объяснения, я поставлю тебе 2 и уйду. ладно, шучу. приходи, если хочешь. я как раз взяла две кружки, потому что думала, что будет скучно одной.': 'bold. I’m a teacher, of course, but on Saturday I can allow myself to sit with a student in a cafe. just a warning: if you keep staring at your phone instead of listening to my explanations, I’ll give you a 2 and leave. okay, I’m joking. come if you want. I actually brought two mugs because I thought it would be lonely alone.',
        'ха-ха, собака с уроками - сильный аргумент. но у меня нет фото кафе, потому что я сижу и пью, а не снимаю для сторис. но если тебе так интересно, приходи и посмотри сам. только без мемов на этот раз, договорились? и кстати, если ты реально придёшь, я дам тебе шпаргалку, которую никому не даю. но это секрет.': 'haha, a dog doing homework is a strong argument. but I don’t have a photo of the cafe because I’m sitting and drinking rather than filming stories. but if you’re that interested, come and see for yourself. no memes this time, deal? and by the way, if you actually come, I’ll give you a cheat sheet that I don’t give to anyone else. but it’s a secret.',
        'привет. ты как добрался?': 'hi. how did you get here?',
        'спасибо, что пришёл сегодня. честно говоря, я думала, ты просто пошутишь и не появишься. а ты реально пришёл, да ещё и тетрадку с собой принёс. удивил.': 'thanks for coming today. honestly, I thought you were joking and wouldn’t show up. but you actually came, and even brought your notebook. I’m impressed.',
        'и знаешь… я правда не ожидала, что ты будешь так внимательно слушать. даже не пришлось повышать голос. мне понравилось. если честно, я уже не хочу быть твоей училкой в эти выходные. давай просто… поболтаем? что у тебя там в жизни вообще происходит, кроме мемов и прогулов?': 'and you know... I really didn’t expect you to listen so carefully. I didn’t even have to raise my voice. I liked it. honestly, I don’t want to be your teacher this weekend. let’s just... talk? what’s going on in your life besides memes and skipping class?',
        'привет! добрался норм. спасибо, что помогла - было реально интересно, ты классно объясняешь': 'hi! I got here fine. thanks for helping — it was really interesting, you explain really well',
        'привет! всю дорогу думал о нашем разговоре. ты классно объясняешь) повторим в субботу?': 'hi! I thought about our conversation all the way here. you explain really well. shall we do it again on Saturday?',
        'живой, добрался) спасибо за латте, чувствую себя интеллигентом. в субботу опять заруба?': 'I’m alive and arrived) thanks for the latte, I feel like an intellectual. another hangout on Saturday?',
        'прям так тепло стало. спасибо. знаешь, я ведь тоже иногда устаю быть «Сергеевной». а с тобой было легко. давай договоримся: по субботам - без формальностей. я Алиса, ты - не двоечник, а просто классный парень. идёт? а по учёбе - я верю, что ты сможешь, если захочешь. я рядом, если что.': 'it got so warm. thank you. you know, I sometimes get tired of being “Sergeevna” too. it was easy with you. let’s make a deal: Saturdays — no formalities. I’m Alisa, and you’re not a bad student, just a great guy. okay? and as for school — I believe you can do it if you want. I’m here if you need me.',
        'ого, ты прямо ухаживаешь за учительницей? ай-яй-яй. но… я не против, если честно. только без этих «джентльмен» - звучит слишком пафосно. просто приходи, я буду рада. и да, если ты запомнил Present Perfect - это уже победа. а если ещё и чай оплатишь - я вообще буду считать тебя лучшим учеником года.': 'wow, are you flirting with the teacher? tsk-tsk. but… I’m not against it, honestly. just no “gentleman” stuff — that sounds too pompous. just come by, I’d be happy. and if you remembered Present Perfect, that’s already a win. and if you also pay for tea, I’ll consider you the best student of the year.',
        'ой, я сейчас упаду от твоих мемов. ты думаешь, я не знаю, что такое «заруба»? я тоже молодая, между прочим. ладно, уговорил. в следующую субботу - новая тема. но предупреждаю: я буду проверять, выучил ли ты то, что мы сегодня разобрали. если всё правильно - я угощаю тебя вторым латте. а если нет… ты угощаешь меня пирожным. идёт?': 'oh, I’m going to collapse from your memes. do you think I don’t know what “hangout” means? I’m young too, you know. fine, you convinced me. next Saturday — a new topic. but I’m warning you: I’ll check whether you learned what we covered today. if everything’s right, I’ll treat you to a second latte; if not... you’ll buy me pastry. deal?'
    }
};

// Дополнительные переводы для мини‑теста Day2
storyTextMap.en['раз уж ты не сделал домашку, ответь на 3 вопроса прямо здесь'] = 'Since you didn\'t do your homework, answer 3 questions right here.';
storyTextMap.en['раз уж ты не сделал домашку, давай прямо сейчас проверим твой английский в чате. ответь на 3 вопроса и я сразу пойму, насколько ты готов'] = "since you didn't do your homework, let's check your english right here in chat. answer 3 questions and I'll immediately see how ready you are";
storyTextMap.en['Вставь правильное слово: ___ I a student? (Am / Is / Are)'] = 'Fill in the correct word: ___ I a student? (Am / Is / Are)';
storyTextMap.en['Вставь правильное слово: She ___ at home. (Am / Is / Are)'] = 'Fill in the correct word: She ___ at home. (Am / Is / Are)';
storyTextMap.en['Вставь правильное слово: They ___ going to school. (Am / Is / Are)'] = 'Fill in the correct word: They ___ going to school. (Am / Is / Are)';
storyTextMap.en['Отлично! За 3 правильных ответа — уникальное достижение и +3 к Успеваемости.'] = 'Great! For 3 correct answers — a unique achievement and +3 to Grades.';
storyTextMap.en['Хмм… есть ошибки. Алиса расстроилась, но сюжет продолжается.'] = 'Hmm... there were mistakes. Alisa is sad, but the story continues.';

storyTextMap.en["привет) я так и не дождалась сданного теста, а домашка у тебя всё ещё пустая. ну и как, у тебя вообще есть что сказать?"] = "hey) I never got that test from you, and your homework is still empty. so, do you have anything to say for yourself?";
storyTextMap.en["кстати, ты вчера так мило написал, я думала об этом весь день 😊"] = "by the way, what you wrote yesterday was really sweet, I thought about it all day 😊";
storyTextMap.en["интересно, почему ты такой серьёзный?"] = "I wonder why you're so serious?";
storyTextMap.en["привет) ты всё ещё думаешь обо мне? я заметила 😏"] = "hey) still thinking about me? I noticed 😏";
storyTextMap.en["ладно, давай без этих школьных формальностей. у меня сегодня есть пара часов, можем просто поболтать. ты как?"] = "ok, let's drop the school formalities. I've got a couple of free hours today, we could just talk. how are you?";
storyTextMap.en["кстати, меня сегодня фоткали для стенда «учитель года». если хочешь, скину фото, но оно размытое — придётся посмотреть рекламу, чтобы разглядеть 😅"] = "by the way, they photographed me today for the \"teacher of the year\" board. if you want, I'll send the photo, but it's blurry — you'll have to watch an ad to see it clearly 😅";
storyTextMap.en["я тоже думал о тебе) давай просто поговорим, без этой всей школьной тягомотины"] = "I was thinking about you too) let's just talk, skip all the school stuff";
storyTextMap.en["ты серьёзно? я думал, я один такой странный, что запал на училку"] = "seriously? I thought I was the only weird one who fell for a teacher";
storyTextMap.en["фото? конечно, давай! но я без рекламы, у меня нет денег 😂"] = "photo? sure, let's go! but no ads, I'm broke 😂";
storyTextMap.en["посмотрю фото без размытия"] = "let me see the photo without the blur";
storyTextMap.en["вот это поворот) я тоже устала от «Сергеевны». давай просто Алиса."] = "what a turn) I'm tired of \"Sergeevna\" too. just call me Alice.";
storyTextMap.en["хаха, ты первый ученик, который так прямо говорит. мне это нравится 😊"] = "haha, you're the first student who says it so directly. I like that 😊";
storyTextMap.en["ахах, бедный студент) ладно, я скину тебе фото, но смотреть будешь через рекламу — это единственный способ разблокировать чёткость"] = "ha-ha, poor student) fine, I'll send you the photo, but you'll watch it through an ad — that's the only way to unlock the clear version";
storyTextMap.en["ну ты и хитрец) но раз ты готов смотреть рекламу, лови фото без размытия. надеюсь, я не разочарую 😉"] = "you sly one) but since you're willing to watch the ad, here's the photo without the blur. hope I don't disappoint 😉";
storyTextMap.en["✅ Фото разблокировано! +5 к Романтике"] = "✅ Photo unlocked! +5 Romance";
storyTextMap.en["привет) я рада, что ты серьёзно настроен. давай прямо сейчас разберём тему, пока у меня есть окно."] = "hey) I'm glad you're serious about this. let's go over the topic right now while I have a free period.";
storyTextMap.en["кстати, меня сегодня фоткали для стенда «учитель года». если хочешь — скину, но оно размытое. не парься, если не хочешь смотреть."] = "by the way, they photographed me today for the \"teacher of the year\" board. if you want, I'll send it, but it's blurry. no worries if you'd rather not look.";
storyTextMap.en["давай, я готов учиться! объясни мне Present Perfect, я реально хочу понять"] = "let's go, I'm ready to study! explain Present Perfect to me, I really want to get it";
storyTextMap.en["спасибо, что не бросаешь. я боюсь, что не сдам экзамены"] = "thanks for not giving up on me. I'm scared I won't pass my exams";
storyTextMap.en["а можно мне скинуть шпаргалку? ну, я серьёзно, без шуток 😅"] = "can you just send me a cheat sheet? seriously, no jokes 😅";
storyTextMap.en["хочу посмотреть фото без размытия"] = "I want to see the photo without the blur";
storyTextMap.en["отлично! тогда слушай: Present Perfect — это действие, которое произошло в прошлом, но результат важен сейчас."] = "great! ok, listen: Present Perfect is an action that happened in the past, but its result matters now.";
storyTextMap.en["пример: I have seen this film. Я видел этот фильм (и помню его). запомнил?"] = "example: I have seen this film. I saw this movie (and I remember it). got it?";
storyTextMap.en["не бойся, я помогу. у тебя всё получится, если будешь стараться. а я буду рядом."] = "don't be scared, I'll help. you'll manage if you try. and I'll be right here.";
storyTextMap.en["шпаргалка? я тебя умоляю) давай лучше разберёмся, а то ты потом ничего не вспомнишь на экзамене"] = "a cheat sheet? please) let's actually go over it, or you won't remember a thing on the exam";
storyTextMap.en["о, ты хочешь увидеть меня крупным планом? ну смотри, если готов к рекламе 😊"] = "oh, you want a close-up of me? go ahead, if you're ready for the ad 😊";
storyTextMap.en["✅ Фото разблокировано! +3 к Успеваемости"] = "✅ Photo unlocked! +3 Grades";
storyTextMap.en["привет! извините, забыл - вчера была тренировка. сейчас всё сделаю. а вы в каком кафе?"] = "hey! sorry, I forgot - had practice yesterday. I'll do it right now. which cafe are you at?";
storyTextMap.en["я хочу пригласить тебя на свидание, но боюсь..."] = "I want to ask you out, but I'm scared...";
storyTextMap.en["вау... ты серьёзно? я... я даже не знаю, что сказать. давай встретимся и поговорим? я не против 😳"] = "wow... are you serious? I... I don't even know what to say. let's meet up and talk? I'm not against it 😳";
storyTextMap.en["💖 Ты решился! +5 к Романтике и открыта новая ветка."] = "💖 You went for it! +5 Romance, and a new path has opened up.";
storyTextMap.en["ты правда помог своему другу, это очень по-человечески. я это ценю."] = "you really helped your friend, that's very decent of you. I appreciate that.";
storyTextMap.en["сегодня ты звучишь слишком резко, не хотелось бы, чтобы это стало привычкой."] = "you sound too harsh today, I wouldn't want that to become a habit.";
storyTextMap.en["мне нравится, что ты не притворяешься. с тобой честно и спокойно."] = "I like that you don't pretend. it's honest and easy with you.";
storyTextMap.en["ты всё ещё так тепло смотришь на меня, словно не хочешь отпускать этот разговор."] = "you still look at me so warmly, like you don't want this conversation to end.";
storyTextMap.en["братан, ты чё? тут все говорят, что ты с нашей англичанкой в кафе зажигал? тебя видели! она чё, тебя подтягивает? или у вас там любовь? 😱"] = "bro, what's going on? everyone's saying you were hanging out with our english teacher at a cafe? you got spotted! is she tutoring you or something? or is there some kind of love thing going on? 😱";
storyTextMap.en["привет. ты уже в школе? я только что зашла в учительскую, а там… такое. кто-то из твоих одноклассников видел нас в субботу и сфоткал, как мы сидим за одним столиком. сейчас это уже в общем чате класса (мне одноклассница скинула скрин). я не знаю, что делать. если это дойдёт до завуча - мне будет не поздоровится. и тебе тоже. давай не паниковать, но нужно что-то решать. ты как?"] = "hey. are you at school yet? i just walked into the teachers' lounge and... something's going on. one of your classmates saw us on saturday and took a photo of us sitting at the same table. it's already in the class group chat (a colleague sent me a screenshot). i don't know what to do. if this reaches the vice principal, i'll be in trouble. and so will you. let's not panic, but we need to figure something out. how are you holding up?";
storyTextMap.en["слушай, я не парюсь. мы просто сидели в кафе, я учил английский. ну и что?"] = "listen, I'm not stressing. we were just sitting at a cafe, I was studying english. so what?";
storyTextMap.en["если честно, мне плевать, кто что скажет. я пришёл, потому что хотел увидеть тебя"] = "honestly, I don't care what anyone says. I came because I wanted to see you";
storyTextMap.en["блин, реально? катастрофа. может, скажем, что ты просто помогала мне из жалости?"] = "damn, seriously? this is a disaster. maybe we say you were just helping me out of pity?";
storyTextMap.en["ха, теперь я звезда школы! скажем, что ты сидела грустная, я подошёл спросить про уроки"] = "ha, guess I'm the school celebrity now! let's say you looked sad, I just came over to ask about homework";
storyTextMap.en["я хочу замять эту историю окончательно и пообещать больше так не рисковать"] = "I want to put this whole thing to rest for good and promise not to take risks like that again";
storyTextMap.en["ты прав. я тоже так думаю. мы ничего плохого не сделали. но учителя - они другие, у них своя логика. хорошо, если спросят - я скажу, что это был дополнительный урок. а ты держись."] = "you're right. I think so too. we didn't do anything wrong. but teachers - they're different, they have their own logic. ok, if they ask, I'll say it was an extra lesson. hang in there.";
storyTextMap.en["ты серьёзно? я… я даже не знаю, что сказать. мне тоже это было важно. но сейчас не время для признаний, у нас могут быть проблемы. давай сначала переживём этот день, а потом поговорим. договорились?"] = "are you serious? I... I don't even know what to say. it mattered to me too. but now's not the time for confessions, we could be in real trouble. let's get through today first, then talk. deal?";
storyTextMap.en["не паникуй! я уже придумала: мы скажем, что я тебя вызвала из-за долгов, просто место было не в школе, а в кафе. это не запрещено. главное - не рассказывай никому про наши личные разговоры. держись спокойно."] = "don't panic! I already figured it out: we'll say I called you in because of missing grades, it just wasn't at school but at a cafe. that's not against the rules. main thing - don't tell anyone about our personal conversations. stay calm.";
storyTextMap.en["ох, ты и шутник… мне бы твою уверенность. ладно, пусть думают, что хотят. но если кто-то из учителей спросит, давай придерживаться версии про дополнительные занятия. а то твои «крутая училка» меня только подставят."] = "oh, you're such a joker... I wish I had your confidence. fine, let them think what they want. but if any teacher asks, let's stick to the \"extra lessons\" story. your \"cool teacher\" jokes are only gonna get me in trouble.";
storyTextMap.en["я сделаю это для тебя. но в следующий раз — без таких рисков, договорились? ты мне дорог."] = "I'll do this for you. but next time - no risks like that, deal? you matter to me.";
storyTextMap.en["✅ Скандал замят! +3 к Успеваемости, +2 к Романтике."] = "✅ Scandal smoothed over! +3 Grades, +2 Romance.";
storyTextMap.en["я только что говорила с завучем. она слышала слухи. спросила, не нарушаю ли я этику. я сказала, что ты приходил пересдать долг. она вроде поверила, но сказала, что следит за этим. как думаешь, мы можем продолжать общаться? или нам лучше прекратить переписку, чтобы не рисковать?"] = "I just talked to the vice principal. she'd heard the rumors. asked if I was crossing any lines. I said you came in to retake a missed assignment. she seemed to believe it, but said she's keeping an eye on things. what do you think, can we keep talking? or should we stop texting to be safe?";
storyTextMap.en["давай просто не писать при всех? реже видеться, но связь не терять"] = "let's just not text in front of others? see each other less, but not lose touch";
storyTextMap.en["а что если не прятаться? скажем, что я хожу к тебе на факультатив"] = "what if we stop hiding? we say I'm coming to your after-school elective";
storyTextMap.en["может, правда лучше остановиться? общаемся только на уроках, так безопаснее"] = "maybe it really is better to stop? we only talk in class, it's safer that way";
storyTextMap.en["мы как в сериале - нас хотят разлучить. скажем, что ты мой тайный наставник, ха-ха"] = "we're like a tv show - everyone's trying to keep us apart. let's say you're my secret mentor, ha-ha";
storyTextMap.en["тайная переписка? звучит как в романе. но я не умею врать… ладно, попробуем. только будь осторожен: не оставляй телефон на столе и не ставь уведомления на громкий. договорились?"] = "secret texting? sounds like a novel. but I'm no good at lying... ok, let's try it. just be careful: don't leave your phone on the desk and turn off loud notifications. deal?";
storyTextMap.en["ты смелый. мне это нравится. официальный факультатив - это идея. я даже могу попросить завуча разрешить мне вести доп. занятия по четвергам. тогда у нас будет законный повод видеться. а там посмотрим…"] = "you're bold. I like that. an official elective is actually a good idea. I could even ask the vice principal to let me run extra classes on thursdays. then we'd have a legitimate reason to see each other. we'll see how it goes...";
storyTextMap.en["ты прав. так будет правильнее. но знаешь… мне будет не хватать наших вечерних разговоров. если передумаешь - напиши. я всегда отвечу."] = "you're right. that's the right call. but you know... I'll miss our evening talks. if you change your mind, text me. I'll always answer.";
storyTextMap.en["шантаж? ха-ха, а ты умеешь придумывать. но давай без криминала. я предлагаю компромисс: мы общаемся, но только по делу - про учёбу. а если и про жизнь - то в очень зашифрованном виде. идёт?"] = "blackmail? ha-ha, you're quite the storyteller. but let's keep it legal. I propose a compromise: we talk, but strictly business - about schoolwork. and if it's about life, only in heavily coded terms. deal?";
storyTextMap.en["у меня сейчас окно, я сижу в кабинете и думаю о нас. я поняла, что какие бы слухи ни ходили, я рада, что мы встретились в субботу. ты изменил моё представление о школьниках. давай решим окончательно: останемся просто учительницей и учеником - или попробуем быть чем-то большим, но очень осторожно? я не тороплю, просто хочу знать, что у тебя в голове."] = "I've got a free period right now, sitting in my classroom thinking about us. I've realized that whatever the rumors, I'm glad we met on saturday. you changed how I see students. let's decide once and for all: do we stay just teacher and student - or try to be something more, very carefully? I'm not rushing you, I just want to know what's on your mind.";
storyTextMap.en["ты мне очень дорога, но не как учительница. давай будем просто друзьями - настоящими"] = "you mean a lot to me, but not as a teacher. let's just be friends - real ones";
storyTextMap.en["я хочу быть с тобой. мне плевать на возраст. никому не расскажем"] = "I want to be with you. I don't care about the age thing. we won't tell anyone";
storyTextMap.en["через полгода я выпускаюсь, и мы будем свободны. пока просто подождём?"] = "in six months I graduate, and we'll be free. let's just wait until then?";
storyTextMap.en["давай без риска, но продолжим видеться. пусть это будет наша маленькая тайна"] = "let's not risk it, but keep seeing each other. let it be our little secret";
storyTextMap.en["дружба - это тоже ценно. я согласна. значит, мы остаёмся хорошими приятелями, которые всегда могут поддержать друг друга. только учёбу не забрасывай, ладно? иначе я буду звонить тебе не как подруга, а как училка 😉"] = "friendship matters too. I agree. so we stay good friends who can always support each other. just don't slack off on schoolwork, ok? otherwise I'll be calling you not as a friend, but as your teacher 😉";
storyTextMap.en["я боюсь, но я согласна. у нас есть полгода до твоего выпускного. мы будем встречаться тайно, никто не узнает. но если нас поймают - я уволюсь. ты готов к такому риску? я готова. просто хочу, чтобы ты знал: ты мне очень дорог."] = "I'm scared, but I agree. we have six months until your graduation. we'll meet in secret, no one will know. but if we get caught, I'll lose my job. are you ready for that risk? I am. I just want you to know: you mean a lot to me.";
storyTextMap.en["это самое зрелое решение, которое ты мог принять. я подожду. полгода пролетят быстро. а пока мы будем общаться как друзья, я помогу тебе с подготовкой к экзаменам. и когда ты получишь аттестат, мы встретимся уже как равные."] = "that's the most mature decision you could've made. I'll wait. six months will fly by. meanwhile we'll stay friends, I'll help you prep for exams. and once you get your diploma, we'll meet again as equals.";
storyTextMap.en["пятёрка? о, ты умеешь торговаться. ладно, если сдашь все тесты без ошибок, я подумаю. но тайна у нас будет - это обязательно. а мемы я буду показывать своим учителям, чтобы они не задавали лишних вопросов. идёт?"] = "an A? oh, you know how to negotiate. fine, if you ace every test with no mistakes, I'll consider it. but this stays secret, no question. and I'll show my coworkers your memes so they stop asking questions. deal?";
storyTextMap.en["привет. я долго думала о нашем разговоре... знаешь, мне кажется, мы оба чего-то боимся. но я хочу, чтобы ты знал: ты для меня больше, чем просто ученик."] = "hey. I've thought a lot about our conversation... you know, I think we're both scared of something. but I want you to know: you're more to me than just a student.";
storyTextMap.en["может, встретимся завтра после школы? не в кафе, а просто погуляем в парке. там никого из наших не будет. я бы хотела поговорить с тобой без оглядки на всех."] = "maybe we could meet after school tomorrow? not at a cafe, just a walk in the park. no one from school will be there. I'd like to talk to you without worrying about everyone watching.";
storyTextMap.en["я сейчас сижу в парке, на той самой скамейке. приходи завтра в это же время, если хочешь."] = "I'm sitting in the park right now, on that same bench. come by tomorrow at the same time, if you want.";
storyTextMap.en["привет) я тоже думал о тебе. давай встретимся, просто поговорим. во сколько?"] = "hey) I was thinking about you too. let's meet up, just talk. what time?";
storyTextMap.en["честно? немного боюсь. но приду, если ты хочешь"] = "honestly? a little scared. but I'll come, if you want me to";
storyTextMap.en["парк, скамейка, книга - прям сцена из фильма) приду, конечно"] = "park, bench, book - straight out of a movie) of course I'll come";
storyTextMap.en["я хочу сказать тебе что-то важное, но мне нужно набраться смелости..."] = "I want to tell you something important, but I need to work up the courage...";
storyTextMap.en["отлично. завтра в 17:00, у входа в парк. я буду ждать. и спасибо, что согласился. это для меня много значит."] = "great. tomorrow at 5pm, by the park entrance. I'll be waiting. and thanks for agreeing. it means a lot to me.";
storyTextMap.en["я тоже боюсь. но иногда стоит рискнуть, правда? завтра в 17:00. я буду в парке, у скамейки с книгой. ты не пожалеешь, обещаю."] = "I'm scared too. but sometimes it's worth the risk, right? tomorrow at 5pm. I'll be in the park, by the bench with the book. you won't regret it, I promise.";
storyTextMap.en["ахах, нет, проверять не буду. но если захочешь - могу устроить тебе мини-экзамен прямо на скамейке) шучу. жду завтра в 17:00. приходи, будет интересно."] = "ha-ha, no, I won't quiz you. but if you want, I could give you a mini-exam right there on the bench) kidding. see you tomorrow at 5pm. come by, it'll be interesting.";
storyTextMap.en["я... я тоже чувствую что-то к тебе. это странно, но я не могу это отрицать. давай попробуем?"] = "I... I feel something for you too. it's strange, but I can't deny it. want to try?";
storyTextMap.en["❤️ Признание принято! +10 к Романтике. Ты открыл особую концовку."] = "❤️ Confession accepted! +10 Romance. You've unlocked a special ending.";
storyTextMap.en["привет. я уже в парке. сижу на той же скамейке. ты идёшь?"] = "hey. I'm already at the park. sitting on the same bench. are you coming?";
storyTextMap.en["я хочу, чтобы мы приняли решение вместе. что бы ты ни выбрал - я буду рядом. просто знай это."] = "I want us to make this decision together. whatever you choose - I'll be there. just know that.";
storyTextMap.en["я пришёл. давай просто будем вместе. мне плевать на слухи"] = "I'm here. let's just be together. I don't care about the rumors";
storyTextMap.en["ты для меня больше, чем учительница. может, подождём до выпуска?"] = "you're more to me than a teacher. maybe we wait until graduation?";
storyTextMap.en["давай общаться, как сейчас, но без давления. это моё решение"] = "let's keep things as they are, but with no pressure. that's my decision";
storyTextMap.en["принёс тебе мем с котиком) а если серьёзно - я выбираю тебя"] = "brought you a cat meme) but seriously - I choose you";
storyTextMap.en["я тоже. мы справимся, я верю. спасибо, что пришёл."] = "me too. we'll figure it out, I believe that. thanks for coming.";
storyTextMap.en["💖 Ты выбрал романтику. Вы решаете быть вместе, несмотря ни на что. Впереди много трудностей, но вы готовы."] = "💖 You chose romance. You decide to be together, no matter what. There's a lot of difficulty ahead, but you're ready.";
storyTextMap.en["это мудрое решение. я подожду. а пока мы будем лучшими друзьями и я помогу тебе с учёбой. договорились?"] = "that's a wise decision. I'll wait. meanwhile we'll be best friends and I'll help you with school. deal?";
storyTextMap.en["🤝 Ты выбрал дружбу с перспективой. Вы решаете подождать до выпуска, но сохраняете тёплые отношения."] = "🤝 You chose friendship with a future. You decide to wait until graduation, but keep things warm between you.";
storyTextMap.en["это то, что я хотела услышать. никакого давления, просто общение. я согласна."] = "that's exactly what I wanted to hear. no pressure, just talking. I'm on board.";
storyTextMap.en["🤝 Ты выбрал дружбу без обязательств. Вы остаётесь близкими людьми, но без романтического статуса."] = "🤝 You chose friendship with no strings attached. You stay close, but without a romantic label.";
storyTextMap.en["ахах, какой кот? показывай! но серьёзно... я тоже выбираю тебя. всегда."] = "ha-ha, what cat? show me! but seriously... I choose you too. always.";
storyTextMap.en["💖 Ты выбрал романтику через юмор. Вы решили быть вместе, и даже мемы теперь будут вашим тайным языком."] = "💖 You chose romance through humor. You decide to be together, and even memes are now your secret language.";
storyTextMap.en["🎬 Игра завершена. Спасибо за прохождение!"] = "🎬 The game is complete. Thanks for playing!";
storyTextMap.en["📊 Итоговые шкалы: Успеваемость: {{success}}, Романтика: {{romance}}, Юмор: {{humor}}"] = "📊 Final stats: Grades: {{success}}, Romance: {{romance}}, Humor: {{humor}}";
storyTextMap.en["Ты прошёл все 7 дней. Каким будет твой финал - зависит только от тебя."] = "You made it through all 7 days. What your ending looks like is entirely up to you.";

storyTextMap.en['Алиса стоит у окна в классе, лёгкая улыбка, распущенные волосы, бежевый свитер, закатный свет, выглядит очень тепло и по-человечески.'] = 'Alice standing by the classroom window, a light smile, hair down, beige sweater, sunset light, looking very warm and human.';
storyTextMap.en['Алиса стоит у доски, в руках указка, строгий, но добрый взгляд, тёмная одежда, школа, естественное освещение.'] = 'Alice standing by the blackboard, holding a pointer, a stern but kind look, dark clothes, school, natural lighting.';
storyTextMap.en['Фото сделано с телефона, в парке. Осенние листья, скамейка, на ней лежит раскрытая книга. На заднем плане видна девушка в бежевом пальто, она смотрит вдаль. Свет мягкий, закатный. Настроение уютное и немного меланхоличное.'] = 'Photo taken on a phone, in a park. Autumn leaves, a bench with an open book lying on it. In the background, a girl in a beige coat looking off into the distance. Soft, sunset light. A cozy, slightly melancholic mood.';

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