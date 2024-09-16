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

export const ANSWER_I = 'O(n^2)'

// ------------------------

export const returnDuplicate = (a: number[], b: number[]) => {
    const duplicates = []

    a.forEach((element) => {
        if (b.includes(element)) duplicates.push(element)
    })

    return duplicates
}