const ServicesModel = {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
}

export function serviceFetch(URL: string) {
    return new Promise((resolve, reject) => {
        fetch(URL, ServicesModel)
        .then(response => 
            response.json())
        .then(json => {
            resolve(json);
        })
        .catch(error => {
            reject(false);
        })
    })
}
