export let comments = []

export const updateComments = (newComments) => {
    comments = newComments
}

// export const comments = [
//     // модуль только на экспорт, для других модулей
//     {
//         name: 'Глеб Фокин',
//         date: '12.02.22 12:18',
//         text: 'Это будет первый комментарий на этой странице',
//         likes: 3,
//         liked: false,
//     },
//     {
//         name: 'Варвара Н.',
//         date: '13.02.22 19:22',
//         text: 'Мне нравится как оформлена эта страница! ❤',
//         likes: 75,
//         liked: true,
//     },
// ]

// const comments = [
//     //Добавьте в массив ключи, в которых будет храниться состояние лайка и их количество.
//     {
//         name: 'Глеб Фокин',
//         date: '12.02.22 12:18',
//         text: 'Это будет первый комментарий на этой странице',
//         likes: 3,
//         liked: false,
//     },
//     {
//         name: 'Варвара Н.',
//         date: '13.02.22 19:22',
//         text: 'Мне нравится как оформлена эта страница! ❤',
//         likes: 75,
//         liked: true,
//     },
// ]
