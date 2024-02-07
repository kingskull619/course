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

export const ANSWER_B = 'O(2n)'

// ------------------------

export function foo(array: number[]) {
    let product = 1

    const sum = array.reduce((n, curr) => {
        return n + curr
    }, 0)

    for (let num of array) {
        product *= num
    }

    return [sum, product]
}