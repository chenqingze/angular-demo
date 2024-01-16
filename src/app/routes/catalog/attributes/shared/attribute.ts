enum AttributeType {
    SELECT,
    TEXTAREA,
    BOOLEAN,
    HIDDEN
}

enum AttributeDisplayMode {
    BLOCKS,
    SELECT_BOX
}

interface AttributeGroup {
    id?: string;
    name: string;
    displayOrder: number;
    productClass?: ProductClass
    attributes?: Attribute[]
}

interface ProductClass {
    id?: string;
    name: string;
    displayOrder: number;
}

interface AttributeOption {
    id?: string;
    name: string;
    displayOrder: number;
}


interface Attribute {
    id?: string;
    name: string;
    displayOrder: number;
    attributeType: AttributeType;
    attributeDisplayMode?: AttributeDisplayMode;
    isVisible?: boolean;
    attributeGroupId?: string;
    productClassId?: string;
    productId?: string;
    attributeOptions: AttributeOption [];
}


export {
    AttributeType,
    AttributeDisplayMode,
    AttributeGroup,
    AttributeOption,
    ProductClass,
    Attribute
}