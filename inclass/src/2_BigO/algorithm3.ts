/* 
  PLEASE WRITE YOUR ANSWERS IN THE ANSWER CONSTANT
  TO CHECK IF YOUR ANSWERS ARE CORRECT RUN 
  npm run practice -- bigO

    - ALWAYS IN FORMAT O(answer)
    - TO USE THE POWER SYMBOL WRITE ^ LIKE IF YOU WANT O(2^n)
    - LOGARARITHMS WRITE WITH log LIKE O(log n) or O(log (n))
    - MULTIPLICATIONS DON'T HAVE SYMBOL SO IF YOU WANT TO EXPRESS A*B JUST WRITE O(AB) or O(A B)
*/

// ----- YOUR ANSWERS ------
// assume your answer contains A and B

export const ANSWER_C = 'O(AB)'

// ------------------------

export const printUnorderedPairs = (arrayA: number[], arrayB: number[]) => {
    arrayA.forEach((a) => {
        helper(a, arrayB)
    })
}

const helper = (a: number, arrayB: number[]) => {
    let i = 0
    while (i < arrayB.length) {
        if (a > arrayB[i]) console.log(a, arrayB[i])
        i++
    }
}