/**
 * Напишите функцию customBind(f, context),
 * входные данные - функция и контекст
 * выходные данные - функция с прибинженым контекстом
 * Примеры:
 * customBind(function() {this.a + this.b}, {a: 1, b2})() -> 3
 */

function customBind(f, context) {
    return function(...args) {
        return f.apply(context, args);
    } 
}

module.exports = customBind;
//console.log(customBind(add3, { b: 2 })(1));