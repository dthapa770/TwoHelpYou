/******************************************************************************
 * Class: CSC 0648-03 Software Engineering Fall 2021
 * Team: 1
 * Name:  Justin Lam
 *        Aviral Puri
 *        Dinesh Thapa
 *        Kurt D Resayo
 *        Wesley J Xu
 *        Chung Hei Fong
 * 
 * File: debug_printers.js
 * 
 * Description: prints out visual messages for error,
 *              success, and request.
 *****************************************************************************/


const colors=require('colors');

colors.setTheme({
    error:['black','bgRed'],
    success:['black','bgGreen'],
    request:['black','bgWhite']
})

/**
 * Printers for message typu
 */
const Printers={
    ErrorPrint:(message) =>{
        console.log(colors.error(message));
    },
    SuccessPrint:(message) =>{
        console.log(colors.success(message));
    },
    RequestPrint:(message) =>{
        console.log(colors.request(message));
    },
}
module.exports=Printers;