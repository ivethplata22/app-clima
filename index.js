const { pausa } = require('./helpers/inquirer');
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
                const lugar = await leerInput('Ciudad: ');
                await busquedas.ciudad(lugar);
                // Seleccionar el lugar
                // Datos del clima
                // Mostrar resultados
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad: ', );
                console.log('Lat: ', );
                console.log('Lng: ', );
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