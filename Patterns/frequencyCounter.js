// Frequency Counters

/* 
This patterns uses objects or sets to
collect values/frequencies of values

This can avoid the need for nested
loops or O(N^2) operations with arrays
and strings

Example:

Write a function called same, which accepts
arrays. The funcction should return true if 
every value in the array has its corresponding 
value squared in the second array. The frequency
of the values must be the same.

same([1, 2, 3], [4, 1, 9]) // true
same([1, 2, 3], [1, 9])    // false
same([1, 2, 1], [4, 4, 1]) // false (must be the same frequency)

*/


// Naive solution (O(N^2) due to a nested loop, indexOf is a loop itself)

function same(arr1, arr2) {
    // if the arrays are not the same length, return false
    if (arr1.length !== arr2.length) { return false }
    // loop through array and check to see if index exists in other array
    for (let i = 0; i < arr1.length; i++) {
        let correctIndex = arr2.indexOf(arr1[i] ** 2) 
        // index of -1 means the value isnt in the array, thus return false
        if (correctIndex === -1) { return false }
        // remove the value from arr2 to prevent a false positive if arr1 has 2 of the same values but arr2 only has one of the values squared
        arr2.splice(correctIndex, 1)
    }
    return true
}


// This refactored solution is O(N), as there are two separate loops going on.

function same_refactored(arr1, arr2) {
        // if the arrays are not the same length, return false
        if (arr1.length !== arr2.length) { return false }

        // create seperate counter objects
        let freqCounter1 = {}
        let freqCounter2 = {}

        // useful way to be able to determine the number of occurences of a val in an array
        for (let val of arr1) {
            freqCounter1[val] = (freqCounter1[val] || 0) + 1
        }
        for (let val of arr2) {
            freqCounter2[val] = (freqCounter2[val] || 0) + 1
        }
        
        // loop through the first counter obj
        for (let key in freqCounter1) {
            // if the corresponding squared value isnt in counter 2 at all, return false
            if (!(key ** 2 in freqCounter2)) {
                return false 
            }
            // if the occurences of the corresponding squared value dont line up, return false
            if (freqCounter2[key ** 2] !== freqCounter1[key]) {
                return false
            }
        }
        return true
} 

console.log(same_refactored([1, 2, 3, 2], [9, 1, 4, 4]))


// BONUS: Anagram problem

/* 
Given two strings, write a function to determine if the 
second string is an anagram of the first. An anagram is a 
word, phrase, or name formed by rearranging the letters of 
another (ex: cinema and iceman).
*/

function validAnagram(str1, str2) {
    // words would have to have the same length to be anagrams
    if (str1.length !== str2.length) { return false }

    // lets use counters:
    let counter1 = {}
    let counter2 = {}
    for (let letter of str1) {
        counter1[letter] = (counter1[letter] || 0) + 1
    }
    for (let letter of str2) {
        counter2[letter] = (counter2[letter] || 0) + 1
    }

    // loop through a counter:
    for (let key in counter1) {
        if (!(key in counter2)) {
            return false
        }
        if (counter2[key] !== counter1[key]) {
            return false
        }
    }
    return true
}

console.log(validAnagram("anagram", "nagaram"))


/* 
BONUS:
Write a function called sameFrequency. Given two
positive integers, find out if two numbers have the same
frequency of digits. Your solution must be O(N)

ex: 
sameFrequency(182, 281) // true
sameFrequency(34, 14) // true
sameFrequency(3589578, 5879385) // true
sameFrequency(22, 222) // true
*/

function sameFrequency(num1, num2) {
    let string1 = num1.toString()
    let string2 = num2.toString()

    if (string1.length !== string2.length) {
        return false
    }

    let freqCounter1 = {}
    let freqCounter2 = {}

    for (let val of string1) {
        freqCounter1[val] = (freqCounter1[val] || 0) + 1
    }
    
    for (let val of string2) {
        freqCounter2[val] = (freqCounter2[val] || 0) + 1
    }

    for (let key in freqCounter1) {
      if (!(key in freqCounter2)) {
          return false
      }
    }
    return true
}

console.log(sameFrequency(182, 281))

/* 
BONUS:
Implement a function called, areThereDuplicates
which accepts a variable number of arguments, and checks whether
there are any duplicates among the arguments passed in. You can solve
this using the frequency counter or the multiple pointers pattern.

ex: 
areThereDuplicates(1, 2, 3) // false
areThereDuplicates(1, 2, 2) // true
*/

function areThereDuplicates(...arr) {
    let counter = {}

    for (let val of arr) {
        counter[val] = (counter[val] || 0) + 1
    }
    
    for (let val in counter) {
        if (counter[val] > 1) {
            return true
        }
    }
    return false
}