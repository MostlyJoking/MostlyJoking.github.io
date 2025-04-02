const puzzles = [
    {
        "solution": ['corn', 'flakes', 'please', 'and', 'thanks'],
        "words": [
            ['cow', 'I', 'am', 'hear'],
            ['thanks', 'moo', 'corn', 'bread'],
            ['flakes', 'will', 'and', 'me'],
            ['please', 'zach', 'sing', 'good']
        ]
    },
    {
        "solution": ['world', 'ren', 'owned', 'har', 'mo', 'ny', 'guys'],
        "words": [
            ["I", "world", "fun", "at", "ny"],
            ["owned", "sun", "child", "wide", "ren"],
            ["ment", "and", "e", "mo", "bar"],
            ["har", "day", "guys", "is", "tion"],
            ["vest", "these", "me", "laugh", "to"]
        ]        
    },
];

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.puzzle-button').forEach((button, index) => {
        button.addEventListener('click', () => {
            const main = document.querySelector('main');
            main.innerHTML = ''; // Clear existing content
    
            const puzzle = puzzles[index];
    
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

            const wordItems = document.querySelectorAll('.word-item');
            let gridItems = Array.from(document.querySelectorAll('.grid-item'));
            const solution = puzzles[index].solution;
            let guessHistory = [];

            wordItems.forEach(function(wordItem) {
                wordItem.addEventListener('click', function() {
                    const word = wordItem.textContent;
                    const emptyGridItem = gridItems.find(function(gridItem) {
                        return gridItem.textContent === '';
                    });
                    if (emptyGridItem) {
                        emptyGridItem.textContent = word;
                        checkSolution();
                    }
                });
            });

            function checkSolution() {
                const filledGridItems = gridItems.filter(function(gridItem) {
                    return gridItem.textContent !== '';
                });
                if (filledGridItems.length === gridItems.length) {
                    let correctSolution = true;
                    filledGridItems.forEach(function(gridItem, index) {
                        const word = gridItem.textContent;
                        const wordItem = Array.from(wordItems).find(function(item) {
                            return item.textContent === word;
                        });
                        if (word === solution[index]) {
                            gridItem.style.backgroundColor = 'green';
                            wordItem.style.backgroundColor = 'green';
                        } else if (solution.includes(word)) {
                            gridItem.style.backgroundColor = 'yellow';
                            wordItem.style.backgroundColor = 'yellow';
                            correctSolution = false;
                        } else {
                            gridItem.style.backgroundColor = 'gray';
                            wordItem.style.backgroundColor = 'gray';
                            correctSolution = false;
                        }
                    });
                    guessHistory.push(filledGridItems.map(function(gridItem) {
                        return gridItem.style.backgroundColor;
                    }));
                    if (!correctSolution) {
                        addNewSolutionContainer();
                    } else {
                        // Remove click event listeners from word items to prevent further guesses
                        wordItems.forEach(function(wordItem) {
                            wordItem.removeEventListener('click', function() {});
                        });
                        showCongratulationsBox();
                    }
                }
            }

            function addNewSolutionContainer() {
                const mainElement = document.querySelector('.guess-container');
                const newSolutionContainer = document.createElement('div');
                newSolutionContainer.className = 'solution-container';

                for (let i = 0; i < solution.length; i++) {
                    const newGridItem = document.createElement('div');
                    newGridItem.className = 'grid-item';
                    newSolutionContainer.appendChild(newGridItem);
                }

                mainElement.appendChild(newSolutionContainer);

                // Update gridItems to include only the new ones
                gridItems = Array.from(newSolutionContainer.querySelectorAll('.grid-item'));
            }

            function showCongratulationsBox() {
                const congratsBox = document.createElement('div');
                congratsBox.className = 'congrats-box';

                // Add the close button to the congratulations box
                const closeButton = document.createElement('div');
                closeButton.className = 'close-button';
                closeButton.textContent = 'x';
                closeButton.addEventListener('click', function() {
                    congratsBox.style.display = 'none';
                });
                congratsBox.appendChild(closeButton);

                const congratsMessage = document.createElement('div');
                congratsMessage.className = 'congrats-message';
                congratsMessage.innerHTML = 'Congratulations!<br/>You guessed the solution correctly!';
                congratsBox.appendChild(congratsMessage);

                // Create a container for the emoji grid
                const emojiGridContainer = document.createElement('div');
                emojiGridContainer.className = 'emoji-grid-container';
                emojiGridContainer.innerHTML = 'MoJo-dle Week ' + (index + 1) + ':<br/>';

                // Add colored square emojis representing the guesses
                guessHistory.forEach(function(guess) {
                    guess.forEach(function(color) {
                        const emojiSquare = document.createElement('span');
                        emojiSquare.className = 'emoji-square';
                        if (color === 'green') {
                            emojiSquare.textContent = '🟩';
                        } else if (color === 'yellow') {
                            emojiSquare.textContent = '🟨';
                        } else {
                            emojiSquare.textContent = '⬜';
                        }
                        emojiGridContainer.appendChild(emojiSquare);
                    });
                    emojiGridContainer.appendChild(document.createElement('br'));
                });

                congratsBox.appendChild(emojiGridContainer);

                document.body.appendChild(congratsBox);
            }
        });
    });
});
