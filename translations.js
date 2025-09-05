// Minimal i18n utility and dictionaries
;(function(){
    const STORAGE_KEY = 'mathWhizLang';

    const dictionaries = {
        en: {
            app_title: 'Math Whiz!',
            setup_subtitle: "Let's get ready to practice!",
            your_name: 'Your Name:',
            name_placeholder: 'Super Coder',
            choose_challenge: 'Choose your challenge:',
            addition: 'Addition (+)',
            subtraction: 'Subtraction (-)',
            multiplication: 'Multiplication (×)',
            division: 'Division (÷)',
            highest_number: 'Highest number to use:',
            time_seconds: 'Time (in seconds):',
            start_game: 'Start Game!',
            settings_language: 'Language:',

            // game.html
            player: 'Player:',
            high_score: 'High Score:',
            score: 'Score:',
            time_left: 'Time Left:',
            seconds_suffix: 's',
            type_answer: 'Type the answer and press Enter',
            times_up: "Time's Up!",
            well_done_name: 'Well done, {name}!',
            your_final_score_is: 'Your final score is:',
            new_high_score: '🎉 New High Score! 🎉',
            try_same_settings: 'Retry',
            change_settings: 'Back'
        },
        nl: {
            app_title: 'Rekenkampioen!',
            setup_subtitle: 'Klaar om te oefenen?',
            your_name: 'Jouw naam:',
            name_placeholder: 'Super Programmeur',
            choose_challenge: 'Kies je uitdaging:',
            addition: 'Optellen (+)',
            subtraction: 'Aftrekken (-)',
            multiplication: 'Vermenigvuldigen (×)',
            division: 'Delen (÷)',
            highest_number: 'Hoogste getal:',
            time_seconds: 'Tijd (in seconden):',
            start_game: 'Start het spel!',
            settings_language: 'Taal:',

            player: 'Speler:',
            high_score: 'Hoogste score:',
            score: 'Score:',
            time_left: 'Resterende tijd:',
            seconds_suffix: 's',
            type_answer: 'Typ het antwoord en druk op Enter',
            times_up: 'Tijd is om!',
            well_done_name: 'Goed gedaan, {name}!',
            your_final_score_is: 'Je eindscore is:',
            new_high_score: '🎉 Nieuw record! 🎉',
            try_same_settings: 'Nog eens!',
            change_settings: 'Terug'
        },
        fr: {
            app_title: 'As du Calcul !',
            setup_subtitle: "Préparons-nous à pratiquer !",
            your_name: 'Ton nom :',
            name_placeholder: 'Super Codeur',
            choose_challenge: 'Choisis ton défi :',
            addition: 'Addition (+)',
            subtraction: 'Soustraction (-)',
            multiplication: 'Multiplication (×)',
            division: 'Division (÷)',
            highest_number: 'Nombre maximal :',
            time_seconds: 'Temps (en secondes) :',
            start_game: 'Commencer !',
            settings_language: 'Langue :',

            player: 'Joueur :',
            high_score: 'Meilleur score :',
            score: 'Score :',
            time_left: 'Temps restant :',
            seconds_suffix: 's',
            type_answer: "Tape la réponse et appuie sur Entrée",
            times_up: 'Temps écoulé !',
            well_done_name: 'Bravo, {name} !',
            your_final_score_is: 'Ton score final est :',
            new_high_score: '🎉 Nouveau record ! 🎉',
            try_same_settings: 'Une fois de plus!',
            change_settings: 'Modifier les réglages'
        }
    };

    function detectBrowserLang() {
        const navLangs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || navigator.userLanguage || 'en']).map(l => (l || '').toLowerCase());
        for (const l of navLangs) {
            const code = l.split('-')[0];
            if (dictionaries[code]) return code;
        }
        return 'en';
    }

    function getSavedLang() {
        try { return localStorage.getItem(STORAGE_KEY) || null; } catch (_) { return null; }
    }

    function saveLang(lang) {
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
    }

    function getCurrentLang() {
        return getSavedLang() || detectBrowserLang() || 'en';
    }

    function t(key, vars) {
        const lang = getCurrentLang();
        const dict = dictionaries[lang] || dictionaries.en;
        let str = dict[key] || dictionaries.en[key] || key;
        if (vars && typeof str === 'string') {
            Object.keys(vars).forEach(k => {
                str = str.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]);
            });
        }
        return str;
    }

    function applyTranslations(root=document) {
        const nodes = root.querySelectorAll('[data-i18n]');
        nodes.forEach(node => {
            const key = node.getAttribute('data-i18n');
            const attr = node.getAttribute('data-i18n-attr');
            const placeholder = node.getAttribute('data-i18n-placeholder');
            if (attr) {
                node.setAttribute(attr, t(key));
            } else if (placeholder === 'true') {
                node.setAttribute('placeholder', t(key));
            } else {
                node.textContent = t(key);
            }
        });

        // For select options with data-i18n-option
        const optionNodes = root.querySelectorAll('option[data-i18n]');
        optionNodes.forEach(opt => {
            const key = opt.getAttribute('data-i18n');
            opt.textContent = t(key);
        });
    }

    window.I18N = {
        t,
        applyTranslations,
        getCurrentLang,
        setLang(lang){
            if (!dictionaries[lang]) lang = 'en';
            saveLang(lang);
            applyTranslations(document);
        },
        dictionaries
    };
})();


