describe('Test Scambler Object: 1', () => {

    describe('Test Scramble Quote', () => {

        it('Should Return False Outcome', () => {
            let testResult = true;
            let testQuote = "A double double test quote. Test quote again.".toUpperCase();
            const testScrambler = new Scrambler(testQuote);
            if (testScrambler.quoteScrambled !== testQuote) {
                testResult = false;
            }
            expect(testResult).toBe(false);

        })

    })
})

describe('Test Scambler Object: 2', () => {

    describe('Test Original Quote', () => {

        it('Should Return True Outcome', () => {
            let testResult = false;
            let testQuote = "A double double test quote. Test quote again.".toUpperCase();
            let testScrambler = new Scrambler(testQuote);
            if (testScrambler.quote.toString() === testQuote.toString()) {
                testResult = true;
               
            }
            expect(testResult).toBe(true);

        })

    })
})
