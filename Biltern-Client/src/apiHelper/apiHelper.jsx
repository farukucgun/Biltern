import axios from 'axios';

const _handleError = async (res) => {
    if (res.status !== 200) {
        throw new Error("Something went wrong")
    }
}
  
const commonHeader = {
    "Content-Type": "application/json",
    "Authorization": localStorage.getItem("token") || " "
}
  
const _get = async (url, responseType) => {
    return await axios.get(url, {
        headers: commonHeader,
        responseType
    })
}

const _post = async (url, data) => {
    return await axios.post(url,
        {body: JSON.stringify(data)},
        {headers: commonHeader}
    )
}

const _put = async (url, data) => {
    return await axios.put(url,
        {body: JSON.stringify(data)},
        {headers: commonHeader}
    )
}

const _delete = async (url) => {
    return await axios.delete(url, {
        headers: commonHeader
    })
}

const getFetcher = async (url, responseType="json", isRaw=true) => {
    const res = await _get(url, responseType)
    await _handleError(res)
    return isRaw ? res : res.json();
}

const postFetcher = async (url, data, isRaw=true) => {
    const res = await _post(url, data)
    await _handleError(res)
    return isRaw ? res : res.json()
}

const putFetcher = async (url, data) => {
    const res = await _put(url, data)
    await _handleError(res)
    return res.json()
}

const deleteFetcher = async (url, isRaw=true) => {
    const res = await _delete(url)
    await _handleError(res)
    return isRaw ? res : res.json()
}

export { getFetcher, postFetcher, putFetcher, deleteFetcher }
  