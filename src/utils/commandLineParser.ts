const isApplicationRunsWithParameter = (parameter: string): boolean => {
    let isRuns = false;

    process.argv.forEach((argName) => {
        if (argName === parameter) {
            isRuns = true;
        }
    });

    return isRuns;
};

export { isApplicationRunsWithParameter };
