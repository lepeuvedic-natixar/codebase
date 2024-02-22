const amountFormatter = (amount: number): string => {
    return amount >= 1000 ? ((amount / 1000).toFixed(1) + "k") : amount.toFixed(1)
}

export const formatAmount = amountFormatter