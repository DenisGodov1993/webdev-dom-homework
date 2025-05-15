export function clearHTML(signs) {
    // модуль только на экспорт, для других модулей
    return signs
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&apos;')
}

// function clearHTML(signs) {
//     // заменяет в HTML небезопасные знаки на безопасные
//     return signs
//         .replaceAll('&', '&amp;')
//         .replaceAll('<', '&lt;')
//         .replaceAll('>', '&gt;')
//         .replaceAll('"', '&quot;')
//         .replaceAll("'", '&apos;')
// }
