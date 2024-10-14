import { refreshAccessURL } from "../URL/URL";

export default async function makeRequest(url, method, body){

}

export async function requestGET(url) {
    let request = await fetch(url, {
        credentials: 'include',
        method: 'GET',
    });
    return request
}

export async function requestPOST(url, body) {
    let request = await fetch(url, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    });
    return request
}

export async function requestRefreshAccess() {
    let refreshToken = localStorage.getItem('refresh_token')
    let body = {
        'refresh_token': refreshToken
    }
    await requestPOST(refreshAccessURL, body)
}