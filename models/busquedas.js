const fs = require('fs');
const axios = require('axios');

class Busquedas {
    historial = [];
    infoPath = './info/data.json';

    constructor() {
        this.leerInfo();
    }

    get historialCapitalizado() {
        let historialCap = [...this.historial];
        historialCap.forEach((element, index, arrayH) => {
            arrayH[index] = element.split(" ").map(function(word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }).join(" ");
        });
        return historialCap;
    }

    get paramsMapbox() {
        return {
            access_token: process.env.MAPBOX_KEY,
            limit: 5,
            language: 'es'
        };
    }

    get paramsOpenWheather() {
        return {
            appid: process.env.OPENWEATHER,
            lang: 'es',
            units: 'metric'
        }
    }

    async ciudad(lugar='') {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });
            const resp = await instance.get();
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                name: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));
        } catch (error) {
            return [];
        }
    }

    async climaLugar(lat, lon) {
        try {
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: {...this.paramsOpenWheather, lat, lon}
            });
            const resp = await instance.get();
            const { weather, main } = resp.data;
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp,
            };
        } catch (error) {
            return null;
        }
    }

    agregarHistorial(lugar='') {
        if(this.historial.includes(lugar.toLocaleLowerCase()))
            return;

        this.historial = this.historial.splice(0,5);        
        this.historial.unshift(lugar.toLocaleLowerCase());
        this.guardarInfo();
    }

    guardarInfo() {
        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.infoPath, JSON.stringify(payload));
    }

    leerInfo() {
        if(!fs.existsSync(this.infoPath))
            return null;
        
        let info = JSON.parse(fs.readFileSync(this.infoPath, { encoding: 'utf-8' }));
        this.historial = info.historial;
    }
}

module.exports = Busquedas;