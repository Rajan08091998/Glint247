
export  const getUser = async (username)=>{
    return JSON.parse(localStorage.getItem(username))
}

export const setUser = async(username, data)=>{
    localStorage.setItem(username,JSON.stringify(data))
}