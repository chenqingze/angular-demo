type MapCartesian<T extends any[][]> = {
    [P in keyof T]: T[P] extends Array<infer U> ? U : never
}

type NestTree<T extends any[]> = {
    [P in keyof T]: T[P] extends infer U ? U : never;
};

export interface SelectOption {
    value: string;
    label: string;
}

export class Utils {

    /**
     * flat list to nest tree .
     *
     * @param list
     * @param itemIdKey
     * @param parentIdKey
     * @param childrenKey
     */
    static listToNestTree = <T extends any[]>([...list]: T, itemIdKey: string, parentIdKey: string, childrenKey: string): NestTree<T> => {
        // Making an ID-to-Array Position Map
        const idMapping = list.reduce((idMap, node, index) => {
            idMap[node[itemIdKey]] = index;
            return idMap;
        }, Object.create({}));

        let root = [] as NestTree<T>;

        list.forEach((node) => {
            const parentId = node[parentIdKey]
            // console.log(parentId)
            // Handle the root element
            if (parentId == null) {
                root.push(node);
                return;
            }

            // Use our mapping to locate the parent element in our data array
            const parentNode = list[idMapping[parentId]];

            // Add our current node to its parent's `children` array
            parentNode[childrenKey] = [...parentNode[childrenKey] || [], node]
            // console.log({...parentNode})
        });

        // console.log(root)
        return root;
    }


    /**
     * 笛卡尔积计算.
     * @param arr
     */
    static cartesian = <T extends any[][]>(...arr: T): MapCartesian<T>[] =>
        arr.reduce(
            (a, b) => a.flatMap(x => b.map(y => [...x, y])),
            [[]]
        ) as MapCartesian<T>[];


    /**
     * 获取枚举的key
     * @param obj
     * @param value
     */
    static getKey = (obj: any, value: any) => {
        const keyIndex = Object.values(obj).indexOf(value)
        return Object.keys(obj)[keyIndex]
    }

    /**
     * 获取枚举的value
     * @param obj
     * @param key
     */
    static getValue = (obj: any, key: any) => {
        const valueIndex = Object.keys(obj).indexOf(key)
        return Object.values(obj)[valueIndex]
    }

    static mapEnumToSelectOptions = (enumObject: any): SelectOption[] => {
        return Object.keys(enumObject)
            .filter(key => isNaN(Number(key)))
            .map(key => ({value: enumObject[key], label: key}));
    }
}




