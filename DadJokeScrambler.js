/*
 * QuoteGame: Class that gets a quote from "https://icanhazdadjoke.com" and 
 *              scrambles it, then sets the scrambled quote on the page
 */

class QuoteGame {
    //holds scramble object
    objScrambler = null;
    //scrambled quote string
    strScrambledQuote = "";
    //array of the scrambled quote, as user replaces character, this holds the new array
    arrUserQuote = [];
    //array of the unscrambled original quote
    arrUnscrambledQuote = [];

    //gets the quote from third party API: https://icanhazdadjoke.com
    async getQuote() {
        const response = await fetch("https://icanhazdadjoke.com", {
            headers: {
                accept: "application/json",
            },
        });
        const json = await response.json();
        const joke = json.joke;

        
        //creates a new instance of a scrambler object, passing in the joke
        this.objScrambler = new Scrambler(joke);
        console.log(this.objScrambler.quote);

        //retrieves the unscrambled quote from the scrambler object in an array
        this.arrUnscrambledQuote = this.objScrambler.quote.split('');

        //here we'll track what the user puts in as replacements
        this.strScrambledQuote = new String(this.objScrambler.quoteScrambled);
        //user's quote
        this.arrUserQuote = this.objScrambler.quoteScrambled.split('');

        //add Fields to the page, showing scrambled quote and add event listeners
        addFields(this.strScrambledQuote);
        //add event listener for key press
        const charsEl = document.getElementById('chars');
        charsEl.addEventListener('keydown', this.addChar);
        //add event listener for check answer button
        const checkEl = document.getElementById('answer');
        checkEl.addEventListener('click', this.checkAnswer);
        
    }
    //called on keydown, adds the character pressed to the user array
    addChar = (e) => {
        let pressedId = "";
        let pressedIndex = 0;
        //if they pressed an alphabetic letter, we get the box index that they pressed and the key
        if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122)) {
            //we know which box and index in the array from the id ie: "member-0" would mean they pressed the first box
            pressedId = e.target.id;
            //retrieve box index from the id
            pressedIndex = pressedId.substring(pressedId.indexOf('-') + 1, pressedIndex.length);
            //e.target.value = e.target.value.toUpperCase();

            //call function to replace all the other instances for that given scrambled character match
            this.replaceAllChars(pressedIndex, e.key);
        }


    }
    //this function replaces all other matches for the scrambled key match
    //and updates the user's array indicating their quote in progress
    replaceAllChars = (clickIndex, keyEntered) => {
        let startIndex = 0;
        let keyUpper = keyEntered.toString().toUpperCase();
        //get the scrambled char they are replacing
        let keyScrambled = this.strScrambledQuote[clickIndex];
        

        //now find the first instance of the key in the scrambled quote (there will be at least one)
        let replacementIndex = this.strScrambledQuote.indexOf(keyScrambled, startIndex);
        
        //set the pressed key in the user array
        this.arrUserQuote[clickIndex] = keyUpper;

        //now find any other possible replacements and add their value to the input boxes
        while (replacementIndex !== -1) {
            let replacementEl = document.getElementById('member-' + replacementIndex);
  
            //add key to input box
            replacementEl.value = keyUpper;
            
            //set the user's array matching index to the new key pressed
            this.arrUserQuote[replacementIndex] = keyUpper;

            //find the next one
            replacementIndex = this.strScrambledQuote.indexOf(keyScrambled, replacementIndex + 1);
        }
     }
    //check the answer to see if it's correct and store result
    checkAnswer = (e) => {
        const resultsEl = document.getElementById('results');
        const msgCongrats = "CONGRATS!!  YOU DID IT!!"
        const msgTryAgain = "Not a Match - try again!"
        let boolMatch = false;

        //check to see whether the unscrambled qutoe and the user's quote match
        if (this.arrUnscrambledQuote.toString() == this.arrUserQuote.toString()) {    
            resultsEl.innerText = msgCongrats;
            boolMatch = true;
        } else {
            resultsEl.innerText = msgTryAgain;
        }
        //then calculate their score
        this.calculateScore(boolMatch);
    }
    //this is used to keep track of the user's score
    calculateScore(gameOutcome) {
        //using localStorage to keep track of user's score - retrieve if it exists
        let score = localStorage.getItem('scrambleScore');
        //grab score element
        let scoreEl = document.getElementById('score');
        //set the score
        if (score == null) {
            score = 0;
        }
        if (gameOutcome) {
            score++;
        }
        //add score to local storage
        localStorage.setItem('scrambleScore', score);
        //indicate how many wins they have
        scoreEl.innerText = `Scrambler Wins: ${score}`;
    }
     

}


function addFields(textForField) {
    // Generate a dynamic number of inputs
    
    let inputNumber = textForField.length;
    let arrScrambled = textForField.split('');

    // Get the element where the inputs will be added to
    let container = document.getElementById("chars");

    
    for (i = 0; i < inputNumber; i++) {
        // Append a node with "member-x" - x being the index of the quote

        // Create an <input> element, set its type and name attributes
        //dynamically add all new input boxes
        let input = document.createElement("input");
        let divEl = document.createElement("div");
        input.type = "text";
        input.id = "member-" + i;
        input.maxLength = 1;
        divEl.appendChild(input);

        //this div will hold each scrambled letter
        let innerDiv = document.createElement("div");
        innerDiv.id = "jumble-" + i;
        innerDiv.className = "paircontainer";
        innerDiv.innerHTML = arrScrambled[i];
        //add the elements
        divEl.appendChild(innerDiv);
        container.appendChild(divEl);

    }

}

let quoteG = null;

//function called when the "Play game" button is pressed
function playGame() {
  
    
    const divEl = document.getElementById('chars');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.lastChild);
    }
    //clear out any previous results
    const messageEl = document.getElementById('results');
    messageEl.innerText = "";

    //start game
    quoteG = new QuoteGame();
    quoteG.getQuote();
}

//event listener for when clicked - then plays game
const playEl = document.getElementById('play');
playEl.addEventListener('click', () => {location.reload(); playGame();});

playGame();






 
