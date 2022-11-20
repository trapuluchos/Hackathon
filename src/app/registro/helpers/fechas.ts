export const calcularEdad = ( fechaNacimiento: string ): number => {

    const fechaActual: Date = new Date();
    
    const anioActual: number = fechaActual.getFullYear();
    const mesActual: number = fechaActual.getMonth();
    const diaActual: number = fechaActual.getDate();
    
    const anioNacimiento: number = parseInt( String( fechaNacimiento.substring( 0, 4 ) ) );
    const mesNacimiento: number = parseInt( String( fechaNacimiento.substring( 5, 7 ) ) );
    const diaNacimiento: number = parseInt( String( fechaNacimiento.substring( 8, 10 ) ) );

    let edad: number = anioActual - anioNacimiento;

    if ( mesActual < mesNacimiento ) {
        edad--;
    } else if ( mesActual === mesNacimiento ) {
        if ( diaActual < diaNacimiento ) {
            edad--;
        }
    }

    return edad;

}