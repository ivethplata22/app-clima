require('dotenv').config();
const { pausa, listarLugares } = require('./helpers/inquirer');
const { leerInput, inquirerMenu, confirmar } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

main = async() => {
    let opt = -1;
    const busquedas = new Busquedas();

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 0:
                // Salir
                const ok = await confirmar('¿Estas seguro?');
                if(ok)
                    console.log('\nAdios :D'.yellow);
                else
                    opt = -1;
            break;
            case 1:
                // Buscar Ciudad
                const termino = await leerInput('Ciudad: ');
                const lugares = await busquedas.ciudad(termino);
                const id = await listarLugares(lugares);
                const lugarSel = lugares.find( l => l.id === id);
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad: ', lugarSel.name);
                console.log('Lat: ', lugarSel.lat);
                console.log('Lng: ', lugarSel.lng);
                console.log('Temperatura: ', );
                console.log('Minima: ', );
                console.log('Maxima: ', );
            break;
            case 2:
                // Historial
            break;
        }
        await pausa();
        console.clear();
    } while (opt != 0);
}

main();