// ─────────────────────────────────────────────────────────────
//  MoJo-dle Puzzle Bank
//  Each puzzle:
//    solution  – ordered syllables/words that form the warmup
//    words     – rows of clickable tiles (solution words + distractors)
//    audio     – optional mp3 filename in ./Audio/
//    hint      – short description shown above the word bank
// ─────────────────────────────────────────────────────────────
const puzzles = [
    // ── Week 1 ──────────────────────────────────────────────
    {
        hint: 'A 5-syllable rehearsal opener',
        solution: ['corn', 'flakes', 'please', 'and', 'thanks'],
        words: [
            ['cow',    'I',      'am',    'hear'],
            ['thanks', 'moo',    'corn',  'bread'],
            ['flakes', 'will',   'and',   'me'],
            ['please', 'zach',   'sing',  'good']
        ]
    },
    // ── Week 2 ──────────────────────────────────────────────
    {
        hint: 'A 7-syllable warmup about fame',
        solution: ['world', 'ren', 'owned', 'har', 'mo', 'ny', 'guys'],
        audio: 'world-renowned-harmony-guys.mp3',
        words: [
            ['I',     'world', 'fun',   'at',    'ny'],
            ['owned', 'sun',   'child', 'wide',  'ren'],
            ['ment',  'and',   'e',     'mo',    'bar'],
            ['har',   'day',   'guys',  'is',    'tion'],
            ['vest',  'these', 'me',    'laugh', 'to']
        ]
    },
    // ── Week 3 ──────────────────────────────────────────────
    {
        hint: 'A 5-syllable warmup about lovable marine mammals',
        solution: ['sea', 'li', 'ons', 'love', 'you'],
        audio: 'sea-lions-love-you.mp3',
        words: [
            ['sea',   'charm', 'run',   'li'],
            ['butt',  'you',   'ons',   'rise'],
            ['truth', 'ly',    'love',  'emote'],
            ['e',     'our',   'fear',  'hope']
        ]
    },
    // ── Week 4 ──────────────────────────────────────────────
    {
        hint: 'A 5-note classic vocal exercise (vowel travel)',
        solution: ['mah', 'may', 'mee', 'moh', 'moo'],
        words: [
            ['mah', 'bah', 'la',  'dee'],
            ['moh', 'may', 'nee', 'dah'],
            ['mee', 'wah', 'coo', 'moo'],
            ['loo', 'boo', 'doo', 'fee']
        ]
    },
    // ── Week 5 ──────────────────────────────────────────────
    {
        hint: 'A 5-syllable mindful singing reminder',
        solution: ['close', 'your', 'eyes', 'and', 'sing'],
        words: [
            ['open',   'close', 'eyes',  'shut'],
            ['your',   'their', 'and',   'our'],
            ['ears',   'sing',  'hum',   'ring'],
            ['breathe','now',   'loud',  'here']
        ]
    },
    // ── Week 6 ──────────────────────────────────────────────
    {
        hint: 'A 6-syllable genre shout-out',
        solution: ['bar', 'ber', 'shop', 'har', 'mo', 'ny'],
        words: [
            ['bar',   'quar', 'ber',  'shop'],
            ['tet',   'har',  'ny',   'sing'],
            ['mo',    'four', 'good', 'men'],
            ['doo',   'chord','ring', 'wah']
        ]
    },
    // ── Week 7 ──────────────────────────────────────────────
    {
        hint: 'A 5-syllable declaration of passion',
        solution: ['how', 'I', 'love', 'to', 'sing'],
        words: [
            ['how',   'why',  'I',    'we'],
            ['love',  'hate', 'sing', 'ring'],
            ['to',    'and',  'the',  'for'],
            ['hum',   'play', 'dance','sway']
        ]
    },
    // ── Week 8 ──────────────────────────────────────────────
    {
        hint: 'A 5-note solfège-adjacent vocal ladder',
        solution: ['lah', 'lay', 'lee', 'loh', 'loo'],
        words: [
            ['lah', 'dah',  'bah',  'nah'],
            ['lay', 'dee',  'loh',  'bay'],
            ['lee', 'loo',  'fee',  'wee'],
            ['say', 'play', 'pray', 'stay']
        ]
    },
    // ── Week 9 ──────────────────────────────────────────────
    {
        hint: 'A 7-syllable morning motivation',
        solution: ['rise', 'and', 'shine', 'it\'s', 'time', 'to', 'sing'],
        words: [
            ['rise',  'fall',  'and',   'but'],
            ['shine', 'rain',  'it\'s', 'gloom'],
            ['time',  'sing',  'hum',   'good'],
            ['to',    'now',   'for',   'fun'],
            ['ring',  'bright','today', 'loud']
        ]
    },
    // ── Week 10 ─────────────────────────────────────────────
    {
        hint: 'A 5-syllable quartet identity statement',
        solution: ['we', 'love', 'har', 'mo', 'ny'],
        words: [
            ['we',    'they', 'I',    'you'],
            ['love',  'need', 'har',  'hate'],
            ['mo',    'sing', 'ny',   'ring'],
            ['chord', 'four', 'tune', 'voice']
        ]
    },
    // ── Week 11 ─────────────────────────────────────────────
    {
        hint: 'A 7-syllable warmup about a famous quartet',
        solution: ['mos', 'tly', 'jo', 'king', 'is', 'the', 'best'],
        words: [
            ['mos',   'most',  'tly',  'the'],
            ['jo',    'king',  'is',   'are'],
            ['best',  'worst', 'fun',  'ly'],
            ['great', 'four',  'cool', 'good'],
            ['sing',  'joke',  'rock', 'ring']
        ]
    },
    // ── Week 12 ─────────────────────────────────────────────
    {
        hint: 'A 5-syllable classic scat phrase',
        solution: ['doo', 'bee', 'doo', 'wah', 'doo'],
        words: [
            ['doo',  'boo',  'goo',  'foo'],
            ['bee',  'see',  'fee',  'wah'],
            ['sha',  'la',   'ba',   'na'],
            ['ring', 'sing', 'zing', 'wing']
        ]
    },
];


document.addEventListener('DOMContentLoaded', function() {
    // ── Dynamically build puzzle buttons ─────────────────────
    const puzzleList = document.querySelector('.puzzle-list');
    puzzleList.innerHTML = '';
    puzzles.forEach((_, index) => {
        const btn = document.createElement('button');
        btn.className = 'puzzle-button';
        btn.textContent = 'Week ' + (index + 1);
        puzzleList.appendChild(btn);
    });

    document.querySelectorAll('.puzzle-button').forEach((button, index) => {
        button.addEventListener('click', () => {
            // Mark active button
            document.querySelectorAll('.puzzle-button').forEach(b => b.classList.remove('active'));
            button.classList.add('active');

            const main = document.querySelector('main');
            main.innerHTML = '';

            const puzzle = puzzles[index];

            // ── Hint ──────────────────────────────────────────
            if (puzzle.hint) {
                const hintEl = document.createElement('p');
                hintEl.className = 'puzzle-hint';
                hintEl.textContent = '💡 ' + puzzle.hint;
                main.appendChild(hintEl);
            }

            // ── Guess rows container ──────────────────────────
            const guessContainer = document.createElement('div');
            guessContainer.className = 'guess-container';

            const solutionContainer = document.createElement('div');
            solutionContainer.className = 'solution-container';

            puzzle.solution.forEach(() => {
                const gridItem = document.createElement('div');
                gridItem.className = 'grid-item';
                solutionContainer.appendChild(gridItem);
            });

            guessContainer.appendChild(solutionContainer);
            main.appendChild(guessContainer);

            // ── Word bank ─────────────────────────────────────
            const wordGrid = document.createElement('div');
            wordGrid.className = 'word-grid';

            puzzle.words.forEach(wordRow => {
                const wordRowDiv = document.createElement('div');
                wordRowDiv.className = 'word-row';

                wordRow.forEach(word => {
                    const wordItem = document.createElement('div');
                    wordItem.className = 'word-item';
                    wordItem.textContent = word;
                    wordRowDiv.appendChild(wordItem);
                });

                wordGrid.appendChild(wordRowDiv);
            });

            main.appendChild(wordGrid);

            // ── State ─────────────────────────────────────────
            // gridItems: current active row's slot elements
            // placedSources: parallel array – which wordItem was clicked for each slot
            let gridItems = Array.from(solutionContainer.querySelectorAll('.grid-item'));
            let placedSources = [];   // wordItem elements, parallel to gridItems slots filled
            const solution = puzzle.solution;
            let guessHistory = [];
            let gameOver = false;

            // ── Controls ──────────────────────────────────────
            const controlsContainer = document.createElement('div');
            controlsContainer.className = 'controls-container';

            const backspaceButton = document.createElement('button');
            backspaceButton.textContent = '⌫ Backspace';
            backspaceButton.className = 'control-button';
            controlsContainer.appendChild(backspaceButton);

            const submitButton = document.createElement('button');
            submitButton.textContent = 'Submit ✓';
            submitButton.className = 'control-button submit-button';
            controlsContainer.appendChild(submitButton);

            main.appendChild(controlsContainer);

            // ── Word click handler ────────────────────────────
            const allWordItems = Array.from(wordGrid.querySelectorAll('.word-item'));

            allWordItems.forEach(function(wordItem) {
                wordItem.addEventListener('click', function() {
                    if (gameOver) return;
                    if (wordItem.classList.contains('used')) return;

                    // Find next empty slot in current row
                    const emptySlot = gridItems.find(gi => gi.textContent === '');
                    if (!emptySlot) return;

                    emptySlot.textContent = wordItem.textContent;
                    wordItem.classList.add('used');
                    placedSources.push(wordItem);
                });
            });

            // ── Backspace ─────────────────────────────────────
            backspaceButton.addEventListener('click', function() {
                if (gameOver) return;
                if (placedSources.length === 0) return;

                // Find the last filled slot in the current row
                let lastFilledIndex = -1;
                for (let i = gridItems.length - 1; i >= 0; i--) {
                    if (gridItems[i].textContent !== '') {
                        lastFilledIndex = i;
                        break;
                    }
                }
                if (lastFilledIndex === -1) return;

                gridItems[lastFilledIndex].textContent = '';
                gridItems[lastFilledIndex].style.backgroundColor = '';

                const source = placedSources.pop();
                if (source) {
                    source.classList.remove('used');
                    source.style.backgroundColor = '';
                }
            });

            // ── Submit ────────────────────────────────────────
            submitButton.addEventListener('click', function() {
                if (gameOver) return;
                const filled = gridItems.filter(gi => gi.textContent !== '');
                if (filled.length !== gridItems.length) {
                    alert('Please fill all ' + gridItems.length + ' slots before submitting!');
                    return;
                }
                checkSolution();
            });

            // ── Check solution ────────────────────────────────
            function checkSolution() {
                let allCorrect = true;
                let solutionCopy = solution.slice();
                let postProcess = [];

                gridItems.forEach(function(gridItem, i) {
                    const word = gridItem.textContent;
                    const src = placedSources[i];
                    if (word === solution[i]) {
                        gridItem.style.backgroundColor = '#4caf50';
                        if (src) src.style.backgroundColor = '#4caf50';
                        solutionCopy[i] = null;
                    } else if (solution.includes(word)) {
                        postProcess.push({ gridItem, src, i });
                        allCorrect = false;
                    } else {
                        gridItem.style.backgroundColor = '#9e9e9e';
                        if (src) src.style.backgroundColor = '#9e9e9e';
                        allCorrect = false;
                    }
                });

                postProcess.forEach(function({ gridItem, src }) {
                    const word = gridItem.textContent;
                    const idx = solutionCopy.indexOf(word);
                    if (idx !== -1) {
                        solutionCopy[idx] = null;
                        gridItem.style.backgroundColor = '#fdd835';
                        if (src) src.style.backgroundColor = '#fdd835';
                    } else {
                        gridItem.style.backgroundColor = '#9e9e9e';
                        if (src) src.style.backgroundColor = '#9e9e9e';
                    }
                });

                guessHistory.push(gridItems.map(gi => gi.style.backgroundColor));

                if (allCorrect) {
                    gameOver = true;
                    showCongratulationsBox();
                } else {
                    addNewSolutionContainer();
                }
            }

            // ── Add a new guess row ───────────────────────────
            function addNewSolutionContainer() {
                const newRow = document.createElement('div');
                newRow.className = 'solution-container';

                for (let i = 0; i < solution.length; i++) {
                    const gi = document.createElement('div');
                    gi.className = 'grid-item';
                    newRow.appendChild(gi);
                }
                guessContainer.appendChild(newRow);

                gridItems = Array.from(newRow.querySelectorAll('.grid-item'));
                placedSources = [];

                // Re-enable any word items that aren't permanently colored
                allWordItems.forEach(wi => {
                    const bg = wi.style.backgroundColor;
                    if (bg !== '#4caf50' && bg !== '#9e9e9e') {
                        wi.classList.remove('used');
                        wi.style.backgroundColor = '';
                    }
                });
            }

            // ── Congratulations box ───────────────────────────
            function showCongratulationsBox() {
                const box = document.createElement('div');
                box.className = 'congrats-box';

                const closeBtn = document.createElement('div');
                closeBtn.className = 'close-button';
                closeBtn.textContent = '✕';
                closeBtn.addEventListener('click', () => box.style.display = 'none');
                box.appendChild(closeBtn);

                const msg = document.createElement('div');
                msg.className = 'congrats-message';
                const numGuesses = guessHistory.length;
                msg.innerHTML = '🎉 You got it in <strong>' + numGuesses + '</strong> guess' + (numGuesses === 1 ? '' : 'es') + '!';
                box.appendChild(msg);

                const warmupText = document.createElement('div');
                warmupText.style.cssText = 'font-size:18px;margin:10px 0;color:#333;';
                warmupText.textContent = '"' + solution.join(' ') + '"';
                box.appendChild(warmupText);

                // Emoji result grid
                const emojiContainer = document.createElement('div');
                emojiContainer.className = 'emoji-grid-container';
                emojiContainer.innerHTML = '<strong>MoJo-dle Week ' + (index + 1) + '</strong><br/>';
                guessHistory.forEach(function(guess) {
                    guess.forEach(function(color) {
                        const sq = document.createElement('span');
                        sq.className = 'emoji-square';
                        if (color === '#4caf50') sq.textContent = '🟩';
                        else if (color === '#fdd835') sq.textContent = '🟨';
                        else sq.textContent = '⬜';
                        emojiContainer.appendChild(sq);
                    });
                    emojiContainer.appendChild(document.createElement('br'));
                });
                box.appendChild(emojiContainer);

                if (puzzle.audio) {
                    const audio = document.createElement('audio');
                    audio.src = 'Audio/' + puzzle.audio;
                    audio.controls = true;
                    audio.autoplay = true;
                    audio.style.cssText = 'display:block;margin:12px auto;';
                    box.appendChild(audio);
                }

                document.body.appendChild(box);
            }
        });
    });
});

    
