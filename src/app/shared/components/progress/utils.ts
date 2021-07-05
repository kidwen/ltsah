import { ProgressColorGradient, ProgressGradientProgress } from './typings';

function stripPercentToNumber(percent: string): number {
    return +percent.replace('%', '');
}

export const sortGradient: (gradients: ProgressGradientProgress) => Array<{ key: number; value: string }> = (gradients: ProgressGradientProgress) => {
    const tempArr: Array<{ key: number; value: string }> = [];

    Object.keys(gradients).forEach(key => {
        const value: string = gradients[key];
        const formatKey: number = stripPercentToNumber(key);
        if (!isNaN(formatKey)) {
            tempArr.push({
                key: formatKey,
                value,
            });
        }
    });

    return tempArr;
};

export const handleCircleGradient: (strokeColor: ProgressGradientProgress) => Array<{ offset: string; color: string }>
    = (strokeColor: ProgressGradientProgress) => sortGradient(strokeColor).map(({ key, value }) => ({ offset: `${key}%`, color: value }));

export const handleLinearGradient: (strokeColor: ProgressColorGradient) => string = (strokeColor: ProgressColorGradient) => {
    const { from = '#1890ff', to = '#1890ff', direction = 'to right', ...rest } = strokeColor;
    if (Object.keys(rest).length !== 0) {
        const sortedGradients: string = sortGradient(rest as ProgressGradientProgress)
            .map(({ key, value }) => `${value} ${key}%`)
            .join(', ');
        return `linear-gradient(${direction}, ${sortedGradients})`;
    }
    return `linear-gradient(${direction}, ${from}, ${to})`;
};
