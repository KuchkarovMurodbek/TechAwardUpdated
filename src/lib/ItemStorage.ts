export const setItem = (key: 'access_token', data: string) => {
    try {
        localStorage.setItem(key, data)
    } catch (error) {
        console.log(error)
    }
}

export const getItem = (key: 'access_token') => {
    try {
       return localStorage.getItem(key) 
    } catch (error) {
        console.log(error)
    }
}

export const removeItem = (key: 'access_token') => {
    try {
        localStorage.removeItem(key)
    } catch (error) {
        console.log(error)
    }
}