const { leerInput } = require('./helpers/inquirer');

main = async() => {
    const texto = await leerInput('Hola: ');
    console.log(texto);
}

main();