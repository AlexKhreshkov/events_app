export function deleteTokenFromLocalStorage() {
    localStorage.removeItem('authToken')
}

export function trimObjectValues(obj: object) {
    for (let key in obj){
        console.log(key)
    }
}