export const required = (value) => (value && (!isObjectEmpty(value) || typeof value === 'number' || value.length) ? true : 'Поле обязательное для заполнения')




function isObjectEmpty(object) {
    let isEmpty = true
    for (const keys in object) {
        if(keys === undefined)
            isEmpty = false
        break // exiting since we found that the object is not empty
    }

    return isEmpty
}