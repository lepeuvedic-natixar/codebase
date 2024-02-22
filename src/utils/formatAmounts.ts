const amountFormatter = (amount: number): string => {
    const formattedAmount = (amount >= 1000 ? ((amount / 1000).toFixed(1) + "k") : amount.toString())
    return formattedAmount
}

export const formatAmount = amountFormatter