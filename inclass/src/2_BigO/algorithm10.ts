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
//This algorithm is a very famous one.

export const ANSWER_J = 'O(n log n)'
export const EXTRA_POINT2 = 'Quicksort'

// ------------------------

export const whatIsThis = (n: number[]) => {
    magicFn(n, 0, n.length - 1)
}

const magicFn = (n: number[], min: number, max: number) => {
    if (min < max) {
        let mid = partition(n, min, max)

        magicFn(n, min, mid - 1)
        magicFn(n, mid + 1, max)
    }
}

const partition = (n: number[], min: number, max: number) => {
    let pivot = n[max]

    let index = min - 1

    for (let i = min; i < max; i++) {
        if (n[i] < pivot) {
            i++
            swap(n, index, i)
        }
    }

    swap(n, index + 1, max)
    return index + 1
}

const swap = (n: number[], i: number, j: number) => {
    let temp = n[i]
    n[i] = n[j]
    n[j] = temp
}