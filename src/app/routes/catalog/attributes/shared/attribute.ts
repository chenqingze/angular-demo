import {Product} from '../../products/shared/product';

const AttributeTypes = ['LIST_OF_VALUES', 'FREE_FORM'] as const;
type AttributeType = typeof AttributeTypes[number];
const AttributeDataTypes = ['BOOLEAN', 'NUMBER', 'INTEGER', 'STRING', 'DATE'] as const;
type AttributeDataType = typeof AttributeDataTypes[number];


interface AttributeOption {
    id?: string;
    value: string;
    displayOrder: number;
    attributeId?: boolean;
}

interface Attribute {
    id?: string;
    name: string;
    displayOrder: number;
    attributeType: AttributeType;
    attributeDataType: AttributeDataType;
    attributeOptions?: AttributeOption [];
}

interface ProductAttribute {
    id?: string;
    displayOrder: number;
    product: Product;
    attribute: Attribute;
    attributeOption: AttributeOption;
}

type PriceModifierType = string | 'ABSOLUTE' | 'PERCENT';

type WeightModifierType = string | 'ABSOLUTE' | 'PERCENT';


interface ProductOption {
    id?: string;
    displayOrder: number;
    product: Product;
    attribute: Attribute;
    attributeOption: AttributeOption;
    priceModifierType?: PriceModifierType;
    priceAdjustment?: string;
    weightModifierType?: WeightModifierType;
    weightAdjustment?: string;
}

export {
    AttributeTypes,
    AttributeType,
    AttributeDataTypes,
    AttributeDataType,
    AttributeOption,
    Attribute,
    ProductAttribute,
    PriceModifierType,
    WeightModifierType,
    ProductOption
}