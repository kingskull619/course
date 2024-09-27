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

export const ANSWER_H = 'O(log n)'

// ------------------------

export const square = (n: number) => {
    return findSquare(n, 1, n)
}

const findSquare = (n: number, min: number, max: number) => {
    if (max < min) return -1

    const guess = Math.floor((min + max) / 2)

    if (guess * guess === n) return guess
    else if (guess * guess < n) return findSquare(n, guess + 1, max)
    else return findSquare(n, min, guess - 1)
}