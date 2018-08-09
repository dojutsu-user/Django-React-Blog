export const updateObject = (oldState, updateProperties) => {
    return {
        ...oldState,
        ...updateProperties
    };
};
