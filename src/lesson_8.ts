// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).

export function sum(...nums: Array<number>): number {
  console.log(arguments)
  console.log(nums)
  const finalNumber = nums.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  )
  //...здесь пишем код.
  // В return стоит "заглушка", чтоб typescript не ругался
  return finalNumber
}

//console.log(sum(1,2,3,))

// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export function getTriangleType(a: number, b: number, c: number): string {
  if (a > 0 && b > 0 && c > 0) {
    if (a + c <= b || a + b <= c || c + b <= a) {
      return '00';
    } else if (a === b && b === c) {
      return '10';
    } else if (a === b || b === c || a === c) {
      return '01';
    } else {
      return '11';
    }
  }
  return '00';
}

// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number {
  let str = String(number).split('').map(m => Number(m))
  let finalNum = str.reduce(
    (acc, cur) => acc + cur, 0)
  return finalNum
}


// 4. Функция isEvenIndexSumGreater принимает  параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
  // let res = 0;
  // for (let i = 0; i < arr.length; i++) {
  //   if(i%2 ===0) {
  //     res += arr[i]
  //   } else {
  //     res -= arr[i]
  //   }
  // }
  // return res >0

  let arrDDD = [...arr]//Нечтные
  let arrOdd = [...arr]//ЧЕТНЫЕ
  let newODD = []
  let newDDD = []
  for (let i = 0; i < arrOdd.length; i++) {
    if (i % 2 === 0) {
      newODD.push(arrOdd[i])
    }
  }
  for (let i = 0; i < arrDDD.length; i++) {
    if (i % 2 !== 0) {
      newDDD.push(arrDDD[i])
    }
  }
  let finalNumODD = newODD.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  )
  let finalNumDDD = newDDD.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  )
  return finalNumODD > finalNumDDD
}

// 5. Функция getSquarePositiveIntegers принимает параметром массив чисел и возвращает новый массив. 
// Новый массив состоит из квадратов целых положительных чисел, котрые являются элементами исходгого массива.
// Исходный массив не мутирует.

export function getSquarePositiveIntegers(array: Array<number>): Array<number> {
  return array
    .filter(number => Number.isInteger(number) && number > 0)
    .map(number => number ** 2);
}

// 6. Функция принимает параметром целое не отрицательное число N и возвращает сумму всех чисел от 0 до N включительно
// Попробуйте реализовать функцию без использования перебирающих методов.
//
// console.log(getSquarePositiveIntegers([4, 5.6, -9.8, 3.14, 10, 6, 8.34, -2]))

export function sumFirstNumbers(N: number): number {
  let arr = []
  for (let i = 0; i <= N; i++) {
    arr.push(i)
  }
  let finalNum = arr.reduce((acc, cur) => acc + cur, 0)

  // return (1 + N) /2  * N
  return finalNum
}

// ...и "лапку" вверх!!!!


// Д.З.:
// 7. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено


export function getBanknoteList(amountOfMoney: number): Array<number> {
  let i = []
  const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1]

  for (let j = 0; j < banknotes.length; j++) {
    while (amountOfMoney >= banknotes[j]) {
      amountOfMoney -= banknotes[j]
       i.push(banknotes[j])
    }
  }
  return i
}

console.log(getBanknoteList(4005))