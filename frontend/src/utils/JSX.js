export const mkClassName = (...cnms) => cnms.filter(x => x).reduce((x, acc) => `${x} ${acc}`, "")
