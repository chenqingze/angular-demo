import {Product} from '../../products/shared/product';

const AttributeTypes = ['SELECT', 'CHECKBOX', 'TEXT', 'HIDDEN'] as const
type AttributeType = typeof AttributeTypes[number];
const AttributeDisplayModes = ['BLOCKS', 'SELECT_BOX'] as const;
type AttributeDisplayMode = typeof AttributeDisplayModes[number];
const AddToNewTypes = ['YES', 'NO', 'YES_NO'] as const;
type AddToNewType = typeof AddToNewTypes[number];

interface AttributeGroup {
    id?: string;
    name: string;
    displayOrder: number;
    categoryId?: string
    attributes?: Attribute [];
}

interface AttributeOption {
    id?: string;
    name: string;
    displayOrder: number;
    addToNew: boolean;
}

interface Attribute {
    id?: string;
    name: string;
    displayOrder: number;
    attributeType: AttributeType;
    attributeDisplayMode?: AttributeDisplayMode;
    // addToNew?: AddToNewType;
    attributeGroupId?: string;
    categoryId?: string;
    productId?: string;
    attributeOptions?: AttributeOption [];
}

type PriceModifierType = string | 'ABSOLUTE' | 'PERCENT';

type WeightModifierType = string | 'ABSOLUTE' | 'PERCENT';

interface AttributeValue {
    id?: string;
    attribute: Attribute;
    product?: Product;
}

interface AttributeValueHidden extends AttributeValue {
    attributeOption: AttributeOption;
}

interface AttributeValueText extends AttributeValue {
    value: string;
    editable: boolean;
}

interface AttributeMultiValue extends AttributeValue {
    isDefault: boolean;
    priceModifierType?: PriceModifierType;
    priceAdjustment?: string;
    weightModifierType?: WeightModifierType;
    weightAdjustment?: string;
}

interface AttributeValueSelect extends AttributeMultiValue {
    displayOrder: number;
    attributeOption: AttributeOption;
}

interface AttributeValueCheckbox extends AttributeMultiValue {
    value: boolean;
}

export {
    AttributeTypes,
    AttributeType,
    AttributeDisplayModes,
    AttributeDisplayMode,
    AddToNewTypes,
    AddToNewType,
    AttributeGroup,
    AttributeOption,
    Attribute,
    PriceModifierType,
    WeightModifierType,
    AttributeValue,
    AttributeValueHidden,
    AttributeValueText,
    AttributeMultiValue,
    AttributeValueSelect,
    AttributeValueCheckbox
}