//the Scrambler object is used to scramble a quote
//it only scrambles alphabetic letters
class Scrambler {
    quote = "";

    upperAlphabet = "";
    scrambledAlphabet = "";
    quoteScrambled = "";

    constructor(unscrambledQuote) {
        //set the quote to the passed in unscrambled quote
        this.quote = unscrambledQuote.toUpperCase();
        //everything is uppercase here, this is an array of alphabetic letters in order
        this.upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        //here we scramble the above alphabetic letters
        this.scrambledAlphabet = this.constructor.scramble(this.upperAlphabet);
        //results of the scrambled quote
        this.quoteScrambled = this.constructor.scrambleQuote(this.upperAlphabet, this.scrambledAlphabet, this.quote);
    }
    //this function randomly chooses a letter in the alphabet and swaps it with the letter as it consecutively moves through all letters 
    static scramble(word) {
        let strarray = word.split('');
        let i, j, k
        for (i = 0; i < strarray.length; i++) {
            j = Math.floor(Math.random() * i)
            k = strarray[i]
            strarray[i] = strarray[j]
            strarray[j] = k
        }
        word = strarray.join('');
        return word;
    };
    //using the output of the scambled alphabet, we go through the quote and replace all letters with the scrambled ones
    static scrambleQuote(upperAlph, scrambledAlph, quoteUnscrambled) {

        let scrambledQuote = "";

       
        for (let i = 0; i < quoteUnscrambled.length; i++) {
        //get the index from the alphabet of the letter of the unscrambled quote  
           
            let alphaIndex = upperAlph.indexOf(quoteUnscrambled[i]);
            
        //if it's not found it's not alphanumeric, just set it to what it is
        if (alphaIndex == -1) {

            scrambledQuote += quoteUnscrambled[i];
            
        } else {
            //otherwise, swap out the scrambled letter
            scrambledQuote += scrambledAlph[alphaIndex];
                        
        }

    }
    return scrambledQuote;
}
}
