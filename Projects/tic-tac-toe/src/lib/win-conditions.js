import { createSquare } from './map';
/** Now that we have our field and our "customized slots", we can define "win conditions" pretty easily */

export class WinCondition {
    constructor(field = createSquare(3)) {
        this.field = field;
    }

    /** First, lets define the easiest ones: horizontals. We should iterate over each row and check if all of the columns
   * are occupied with the same symbol. If every column on one row is of the provided symbol, it will return true and
   * we then return the inspectingRow with all the information necessary to the HUD
   */
    horizontalLine(symbol) {
        let inspectingRow = [];
        return (
            thos.field.some(row => {
                inspectingRow = row;
                return row.every(slot => slot.occupied && slot.symbol == symbol);
            }) && inspectingRow
        );
    }

     /** The vertical ones, while a bit more tricky are easy enough as well: This is made by checking that for any given row
   * in the field it has the length of one of the columns occupied and of symbol. We achieve this by creating a temporary
   * array that aggregates every Nth column of each row and then checking if every element inside passes a condition.
   */

    verticalLine(symbol) {
        return this.field.some((row, index) => {
            let inspectingColumn = [];
            for(let x = this.field.length - 1; x > -1; x--) {
                inspectingColumn.push(this.field[x][index]);
            }
            return (
                inspectingColumn.every(
                    slot => slot.occupied && slot.symbol == symbol 
                ) && inspectingColumn
            );
        });
    }

    /** Now I guess you can imagine how we will clear the diagonals, just apply the same technique that we used on
   * verticalLines and increment index on each iteration as well and we should have it! nope :D
   *
   * This would make you check for combinations that wouldn't satisfy a "win" term as there would be groups of two and
   * groups of three slots. we are only interested in the latter. Furthermore, we need to check for diagonals that come
   * from right to left.
   *
   * So: we know a couple of things from diagonals: they can't take up more space than that that's available on a area
   * (or, the sum of two catheters equals the hypotenuse - guess those math classes were for something after all. All Hail
   * Pythagoras!)
   *
   * This is translated to: if the sum (or subtraction) of the row you are at and the length of the field is not equal to
   * the length of the field (or 0, in case of subtracting) that diagonal is not a win conditional.
   *
   * Now, we can simplify this even further because *we know* that diagonals can only become win conditions IF they are
   * from each corner (as those are the only places where a "full diagonal" condition exist) and we know that the middle
   * of the field *has* to be crossed by either line, so we can safely assume that if that slot isn't of the symbol, then
   * the symbol has no win condition on diagonals.
   *
   */

   diagonalLine(symbol) {
       const length = this.field.length - 1;
       const middle = length / 2;

       /** We first check if the middle, and one of the corners, are unoccupied if that's true then we can assume no win condition
     * is available at the time and return false */
        if (
            !this.field[middle][middle].occupied &&
            (!this.field[length][0].occupied || !this.field[0][0].occupied)
        )
        return false;

         /** we now check which column is occupied and which symbol it contains so we can traverse its diagonal
     This is a number value. */
            let column = 
            this.field[0][0].occupied && this.field[0][0].symbol === symbol
            ? 0
            : this.field[0][length].occupied &&
              this.field[0][length].symbol === symbol
              ? length
              : false;

        /** since we assigned a number to our column, is we have any other value (Not a Number) then we can assume neither
     * of the corners is occupied, returning false again for an early escape */
        if(typeof column !== "number") return false;

        /** Otherwise, lets traverse its diagonal, first checking which diagonal it is (last or fist) so we can increment or
     * decrement the for condition which is responsible to push the slots to the temporary array */
        let inspectingDiagonal = [];
        let row = 0;
        if(column === 0) {
            for(column; column <= length; column++) {
                inspectingDiagonal.push(this.field[row][column]);
                row++;
            }
        } else {
            for(column; column >= 0; column--) {
                inspectingDiagonal.push(this.field[row][column]);
                row++;
            }
        }

          /** finally, if every item inside the temporary array pass the test, we have ourselves a diagonal win :) */
        return (
            inspectingDiagonal.every(
                slot => slot.occupied && slot.symbol == symbol
            ) && inspectingDiagonal
        );
   }

         /** The only case missing is that of a tie. When does a tie exist? Whenever all slots are occupied but no winner is
   * declared. We can then assume that: if there's one that's not occupied - it's not a tie.
   * since we do not care to know which elements are occupied with what, we can flatten the field array and traverse
   * it with the `every` array statement. */
        get tieExist() {
            const flatten = arr =>
                arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
        const flattendField = flatten(this.field);
        return flattendField.every(slot => slot.occupied === true);
    }

    /** create an alias for easy usage */
    hasLine(symbol) {
        return(
            this.horizontalLine(symbol) ||
            this.verticalLine(symbol) ||
            this.diagonalLine(symbol)
        );
    }
}