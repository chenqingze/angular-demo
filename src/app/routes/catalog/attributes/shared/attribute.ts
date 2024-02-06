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
    productClassId?: string
    attributes?: Attribute [];
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
    productClassId?: string;
    productId?: string;
    attributeOptions?: AttributeOption [];
}

type PriceModifierType = string | 'ABSOLUTE' | 'PERCENT';

type WeightModifierType = string | 'ABSOLUTE' | 'PERCENT';

interface WeightModifier {
    weightModifierType?: WeightModifierType;
    weightAdjustment?: string;
}

interface PriceModifier {
    priceModifierType?: PriceModifierType;
    priceAdjustment?: string;
}

interface AttributeValue {
    id?: string;
    attribute: Attribute;
    product?: Product;
}

interface AttributeValueSelect extends AttributeValue {
    displayOrder: number;
    attributeOption: AttributeOption;
    isDefault?: boolean;
    weightModifier?: WeightModifier;
    priceModifier?: PriceModifier;
}

interface AttributeValueCheckbox extends AttributeValue {
    value?: boolean;
    isDefault?: boolean;
    weightModifier?: WeightModifier;
    priceModifier?: PriceModifier;
}

interface AttributeValueText extends AttributeValue {
    editable?: boolean;
}

interface AttributeValueHidden extends AttributeValue {
    attributeOption: AttributeOption;
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
    ProductClass,
    Attribute,
    PriceModifierType,
    PriceModifier,
    WeightModifierType,
    WeightModifier,
    AttributeValueSelect,
    AttributeValueCheckbox,
    AttributeValueText,
    AttributeValueHidden
}