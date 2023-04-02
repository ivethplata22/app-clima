const { pausa } = require('./helpers/inquirer');
const { leerInput, inquirerMenu, confirmar } = require('./helpers/inquirer');

main = async() => {
    let opt = -1;

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