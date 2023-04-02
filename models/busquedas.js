const axios = require('axios');

class Busquedas {
    historial = [];

    constructor() {
        // TODO: Leer db si existe
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        };
    }

    async ciudad(lugar='') {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });
            const resp = await instance.get();
            console.log(resp.data);

            // TODO: Retornar los lugares que coincidan con lugar
            return [];
        } catch (error) {
            return [];
        }
    }
}

module.exports = Busquedas;