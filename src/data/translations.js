export const translations = {
    ru: {
        'menu.title': '📱 Переписка',
        'menu.subtitle': 'Выбери сюжетную линию',
        'menu.story1': '👩‍🏫 Учительница английского',
        'menu.story2': '🔒 Сюжет #2 (скоро)',
        'menu.story3': '🔒 Сюжет #3 (скоро)',
        'stats.success': 'Успеваемость',
        'stats.romance': 'Романтика',
        'stats.humor': 'Юмор',
        'network.connecting': 'Подключение...',
        'typing.alisa': 'Алиса печатает',
        'settings.title': 'Настройки',
        'settings.language': 'Язык',
        'settings.theme': 'Тема',
        'settings.sound': 'Звук уведомлений',
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
    },
    en: {
        'menu.title': '📱 Chat Story',
        'menu.subtitle': 'Choose a storyline',
        'menu.story1': '👩‍🏫 English Teacher',
        'menu.story2': '🔒 Story #2 (coming soon)',
        'menu.story3': '🔒 Story #3 (coming soon)',
        'stats.success': 'Grades',
        'stats.romance': 'Romance',
        'stats.humor': 'Humor',
        'network.connecting': 'Connecting...',
        'typing.alisa': 'Alisa is typing',
        'settings.title': 'Settings',
        'settings.language': 'Language',
        'settings.theme': 'Theme',
        'settings.sound': 'Notification sound',
        'settings.reset': 'Reset progress',
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
    }
};

let currentLang = 'ru';

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

export function getCurrentLanguage() {
    return currentLang;
}

export function setLanguage(lang) {
    if (translations[lang]) currentLang = lang;
}

export function t(key) {
    return translations[currentLang]?.[key] || key;
}

export function translateStoryText(text) {
    if (currentLang !== 'en' || !text) return text;
    return storyTextMap.en[text] || text;
}