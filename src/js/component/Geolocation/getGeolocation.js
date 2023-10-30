export async function getGeolocation(callback) {
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