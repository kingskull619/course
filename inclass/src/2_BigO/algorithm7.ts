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

export const ANSWER_G = 'O(log n)'

// ------------------------

export const powersOf2 = (n: number) => {
    if (n < 1) {
        return 0
    } else if (n === 1) {
        return 1
    }

    const prev = powersOf2(n / 2)
    const curr = prev * 2
    return curr
}