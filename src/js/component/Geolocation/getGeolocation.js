export async function getGeolocation(callback) {
    // получение координат
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const {latitude, longitude} = position.coords
                callback(`[${latitude}, ${longitude}]`)
            },
            err => callback(null)
        )
    } else return null
}