const usdFormat = { 
    style: 'currency', 
    currency: 'USD',
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2
};

export const formatAtlas = num => !num
    ? '0' 
    : Number(num).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

export const formatUSDC = num => !num
    ? '0'
    // : new Intl.NumberFormat('en-US', usdFormat).format(Number(num));
    : Number(num).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });