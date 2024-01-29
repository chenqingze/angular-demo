const AttributeTypes = ['SELECT', 'TEXTAREA', 'CHECKBOX', 'HIDDEN'] as const
type AttributeType = typeof AttributeTypes[number];
const AttributeDisplayModes = ['BLOCKS', 'SELECT_BOX'] as const;
type AttributeDisplayMode = typeof AttributeDisplayModes[number];

interface AttributeGroup {
    id?: string;
    name: string;
    displayOrder: number;
    productClassId?: string
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
    attributeOptions?: AttributeOption [];
}


export {
    AttributeTypes,
    AttributeType,
    AttributeDisplayModes,
    AttributeDisplayMode,
    AttributeGroup,
    AttributeOption,
    ProductClass,
    Attribute
}