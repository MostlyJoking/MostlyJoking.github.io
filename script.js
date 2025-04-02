document.addEventListener('DOMContentLoaded', function() {
    const wordItems = document.querySelectorAll('.word-item');
    let gridItems = Array.from(document.querySelectorAll('.grid-item'));
    const solution = ['corn', 'flakes', 'please', 'and', 'thanks'];
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
                if (word === solution[index]) {
                    gridItem.style.backgroundColor = 'green';
                } else if (solution.includes(word)) {
                    gridItem.style.backgroundColor = 'yellow';
                    correctSolution = false;
                } else {
                    gridItem.style.backgroundColor = 'gray';
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

        for (let i = 0; i < 5; i++) {
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
        congratsBox.textContent = 'Congratulations! You guessed the solution correctly!';

        // Create a container for the emoji grid
        const emojiGridContainer = document.createElement('div');
        emojiGridContainer.className = 'emoji-grid-container';

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
