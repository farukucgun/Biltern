import axios from 'axios';

const _handleError = async response => {
    if (!response.ok) {
        let errorData
        try {
            errorData = await response.json()
        } catch {}
    
        console.log('errorData', errorData)
        // GENERAL ERROR
        throw new Error(errorData.message)
    }
}
  
const commonHeader = {
    'Content-Type': 'application/json',
    "Authorization": localStorage.getItem("token") || " "
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
  
  async function _put (url, data) {
    return await fetch(url, {
      method: 'PUT',
      headers: commonHeader,
      body: JSON.stringify(data)
    })
  }
  
  async function _get (url) {
    return await fetch(url, {
      headers: commonHeader
    })
  }
  
  async function _delete (url) {
    return await fetch(url, {
      method: 'DELETE',
      headers: commonHeader
    })
  }
  
  export async function postFetcher (url, data, isRaw = false) {
    const res = await _post(url, data)
    await _handleError(res)
    return isRaw ? res : res.json()
  }
  
  export async function putFetcher (url, data) {
    const res = await _put(url, data)
    await _handleError(res)
    return res.json()
  }
  
  export async function getFetcher (url, isRaw = false) {
    const res = await _get(url)
    await _handleError(res)
    return isRaw ? res : res.json()
  }
  
  export async function deleteFetcher (url, isRaw = true) {
    const res = await _delete(url)
    await _handleError(res)
    return isRaw ? res : res.json()
  }
  