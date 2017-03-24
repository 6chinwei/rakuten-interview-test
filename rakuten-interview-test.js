/**
Q1 Write a function that takes a string as input and returns the string reversed. 
   Please implement reverse function or method by yourself .
   Example: Given s = "hello", return "olleh"
**/

function reverse(input) {
    return input.split('').reverse().join('');
}

// TEST
console.log('Q1');
console.log('reverse(\'hello\');', reverse('hello')); // olleh

/**
Q2. Given a positive integer num, write a function which returns True if num is a perfect square else False. 
    Note: Do not use any built-in library function such as sqrt. 
    Example 1: 
        Input: 16 
        Returns: True
**/

function isPerfectSquare(num) {
    // Check all i^2 if i^2 === num, for i < num/2

    var result = false, i = 1;

    do {
        if( i * i > num) {
            break;
        }
        else if( i * i === num) {
            result = true;
            break;
        }
        i++;
    } while (i <= num/2);  // n + n < n^2 (for n > 2)

    return result;
}

console.log('Q2');
console.log('isPerfectSquare(1);', isPerfectSquare(1)); // true
console.log('isPerfectSquare(16);', isPerfectSquare(16)); // true
console.log('isPerfectSquare(14);', isPerfectSquare(14)); // false

/**
Q3. Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary). 
    You may assume that the intervals were initially sorted according to their start times. 
    Example 1: 
        Given intervals [1,3],[6,9], insert and merge [2,5] in as [1,5],[6,9]. 
    Example 2: 
        Given [1,2],[3,5],[6,7],[8,10],[12,16], insert and merge [4,9] in as [1,2],[3,10],[12,16]. 
        This is because the new interval [4,9] overlaps with [3,5],[6,7],[8,10].
**/

// givenInterval: must be an Array of an Array, e.g. [[1,3][6,9]].
// newInterval: must be an Array, e.g. [2,5].
function insertInterval(givenInterval, newInterval) {
    // allIntervals = givenInterval + newInterval and sort() by starting number
    var allIntervals = givenInterval.slice();
    allIntervals.push(newInterval);
    allIntervals.sort(function(a, b) {
        if(a[0] > b[0]) { return 1;}
        else if(a[0] < b[0]) { return -1;}
        else { return 0;}
    });

    var result = [];
    for(var i=0; i<allIntervals.length;i++) {
        // If the current interval overlaps to the next one, merge current one to the next one.
        if(i < allIntervals.length - 1 && allIntervals[i][1] > allIntervals[i+1][0]) {
            allIntervals[i+1][0] = Math.min(allIntervals[i][0], allIntervals[i+1][0]);
            allIntervals[i+1][1] = Math.max(allIntervals[i][1], allIntervals[i+1][1]);
        } else {
            // Store the interval that dose not overlap to the next
            result.push(allIntervals[i]);
        }
    }

    return result;
}

console.log('Q3');
console.log('insertInterval( [[1,3],[6,9]] , [2,5] )', insertInterval( [[1,3],[6,9]] , [2,5] )); // [[1,5],[6,9]]
console.log('insertInterval( [[1,3],[6,9]] , [4,5] )', insertInterval( [[1,3],[6,9]] , [4,5] )); // [[1,3],[4,5],[6,9]]
console.log('insertInterval( [[1,2],[3,5],[6,7],[8,10],[12,16]] , [4,9] )', insertInterval( [[1,2],[3,5],[6,7],[8,10],[12,16]] , [4,9] )); // [[1,2],[3,10],[12,16]]

// Note. Detail steps for EX 3
// 1. Concat
// [1,2],[3,5],[6,7],[8,10],[12,16],[4,9] 
// 2. Sort
// [1,2],[3,5],[4,9],[6,7],[8,10],[12,16]
// 3. Loop and merge
// [1,2],[3,5],[3,9],[6,7],[8,10],[12,16]
// [1,2],[3,5],[3,9],[3,9],[8,10],[12,16]
// [1,2],[3,5],[3,9],[3,9],[3,10],[12,16]  
// 4. Only 3 intervals are pushed into results
// [1,2],[3,10],[12,16]  


/**
Q4. Given a 2D board and a word, find if the word exists in the grid. 
For example, 
Given board = 
[ 
  ['A','B','C','E'], 
  ['S','F','C','S'], 
  ['A','D','E','E'] 
] 
word = 'ABCCED', -> returns true, 
word = 'SEE', -> returns true, 
word = 'ABCB', -> returns false.
**/

var board = [ 
      ['A','B','C','E'], 
      ['S','F','C','S'], 
      ['A','D','E','E'] 
    ];

function isWordExisting(word) {
    var result = false;

    for(var i = 0; i < board.length; i++) {
        for(var j = 0; j < board[i].length; j++) {
            // Check the first character
            if(board[i][j] === word[0]) {
                // Mark this character as the path
                markPath(i, j);
                // Call the recursive function to find the all characters in the word
                if(findNext(i, j, 0, word)) {
                    // Set result to true if the function find all characters
                    result = true;
                } else {
                    // Reset the board and then continue the next loop
                    resetBoard();
                }
            }
        }    
    }

    return result;

    // A recursive function
    function findNext(i, j, step, word) {
        // Return true for the final character
        if(step === word.length - 1) {
            return true;
        }

        // Down
        if(i < board.length - 1 && board[i+1][j] === word[step+1]) {
            markPath(i+1, j);
            return findNext(i+1, j, step+1, word);
        }
        // Up
        if(i > 0 && board[i-1][j] === word[step+1]) {
            markPath(i-1, j);
            return findNext(i-1, j, step+1, word);
        }
        // Right
        if(j < board[i].length - 1 && board[i][j+1] === word[step+1]) {
            markPath(i, j+1);
            return findNext(i, j+1, step+1, word);
        }
        // Left
        if(j > 0 && board[i][j-1] === word[step+1]) {
            markPath(i, j-1);
            return findNext(i, j-1, step+1, word);
        }

        return false;
    }

    // Change the character to lower case as the path
    function markPath(i, j) {
        board[i][j] = board[i][j].toLowerCase();
    }

    // Reset all characters to upper case
    function resetBoard() {
        for(var i = 0; i < board.length; i++) {
            for(var j = 0; j < board[i].length; j++) {
                board[i][j] = board[i][j].toUpperCase();
            }    
        }
    }
}

// TEST
console.log('Q4');
console.log('isWordExisting(\'ABCCED\')', isWordExisting('ABCCED')); // true
console.log('isWordExisting(\'SEE\')', isWordExisting('SEE')); // true
console.log('isWordExisting(\'ABCB\')', isWordExisting('ABCB')); // false
// Additional:
console.log('Q4 extra');
console.log('isWordExisting(\'CESC\')', isWordExisting('CESC')); // true
console.log('isWordExisting(\'CESCC\')', isWordExisting('CESCC')); // false

/**
Q5. Calculate the sum of two integers a and b, but you are not allowed to use the operator + and -. 
Example:
Given a = 1 and b = 2, return 3.
**/

function add(num1, num2) {
    var s1, s2;
    
    s1 = parseNumberToStringWithPN(num1);
    s2 = parseNumberToStringWithPN(num2);

    // Change number to the string whose length is same as the value. 'p' means positive and 'n' means negative.
    // EX. 2 => pp
    // EX. -4 => nnnn
    function parseNumberToStringWithPN(num) {
        if(num >= 0) {
            return 'p'.repeat(num);
        } else {
            return 'n'.repeat(num*-1);
        }
    }

    // If one number is positive and another is negative, using substr() to both strings until anyone's length to be 0
    if((num1 < 0 || num2 < 0) && !(num1 < 0 && num2 < 0)) {
        do {
            s1 = s1.substr(1);
            s2 = s2.substr(1);
        } while(s1.length > 0 && s2.length > 0);
    }
    
    // Use concat() for adding two variables
    var result = s1.concat(s2);
    
    if(result.indexOf('n') > -1) { 
        // Negative result
        return result.length * -1;
    } else { 
        // Positive result
        return result.length;
    }
}

// TESTS
console.log('Q5');
console.log('add(1,2)', add(1,2)); // 3
console.log('add(1,-2)', add(1,-2)); // -1
