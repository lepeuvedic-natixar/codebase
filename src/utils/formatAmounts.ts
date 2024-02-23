const emptyDecimal = ".0";

const amountFormatter = (amount: number): string => {
    const addK = amount >= 1000
    let formattedAmount = (addK ? (amount / 1000) : amount).toFixed(1)
    if (formattedAmount.endsWith(emptyDecimal)) {
        const index = formattedAmount.lastIndexOf(emptyDecimal);
        formattedAmount = formattedAmount.slice(0, index);
    }
    if (addK) formattedAmount += "k"
    return formattedAmount
}

export const formatAmount = amountFormatter