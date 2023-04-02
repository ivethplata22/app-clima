const axios = require('axios');

class Busquedas {
    historial = [];

    constructor() {
        // TODO: Leer db si existe
    }

    get paramsMapbox() {
        return {
            'access_token': 'pk.eyJ1IjoiaXZldGhwbCIsImEiOiJjbGZ6MHphcXIwcGQ0M3VwYXljd3lza2luIn0.F5kUR8QSXiSQoBtLZqBXzw',
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