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

export const ANSWER_F = 'O(n)'

// ------------------------

export const allFib = (n: number) => {
    const memo = {}
    for (let i = 0; i < n; i++) {
        fibWithMemo(i, memo)
    }
}

const fibWithMemo = (n: number, memo: Record<number, number>) => {
    if (n <= 0) return 0
    else if (n == 1) return 1
    else if (memo[n] === undefined)
        memo[n] = fibWithMemo(n - 1, memo) + fibWithMemo(n - 2, memo)

    return memo[n]
}