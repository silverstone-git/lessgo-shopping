

export function mysqlToJsDateUtc(passedDate: number) {

    const d = new Date();
    // since js gives -330 offset for, say, +5:30, minus minus becomes plus
    const utcMillis = passedDate - d.getTimezoneOffset()*60*1000;

    return utcMillis;

}

export function mysqlToJsDateStringToString(passedDate: string) {
    const d = new Date(passedDate);
    const utc = mysqlToJsDateUtc(d.valueOf());
    const d1 = new Date(utc);
    return d1.toLocaleString();
}