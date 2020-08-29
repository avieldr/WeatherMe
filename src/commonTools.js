export const cels2Fahr = (valueInCelsius) => {
    const fahr = (valueInCelsius * 9 / 5) + 32
    return Math.round(fahr * 10) / 10
}

export const fahr2Celc = (valueInFahrenheit) => {
    const celc = (valueInFahrenheit - 32) * 5 / 9
    return Math.round(celc * 10) / 10
}