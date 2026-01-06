export function LocaleNumber(n: number) {
    const formatter = new Intl.NumberFormat(["en"], {});
    return formatter.format(n)
}