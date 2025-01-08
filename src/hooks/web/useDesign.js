

export const useDesign = () => {
    const scssVariables = {
        namespace: 'ep',
        elNamespace: 'ep'
    }

    /**
     * @param scope 类名
     * @returns String 返回空间名-类名
     */
    const getPrefixCls = (scope) => {
        return `${scssVariables.namespace}-${scope}`
    }

    return {
        variables: scssVariables,
        getPrefixCls
    }
}
