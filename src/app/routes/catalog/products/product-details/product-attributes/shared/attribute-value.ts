import {Attribute, AttributeOption} from '../../../../attributes/shared/attribute';
import {Product} from '../../../shared/product';

type PriceModifierType = string | 'ABSOLUTE' | 'PERCENT'

type WeightModifierType = string | 'ABSOLUTE' | 'PERCENT'

interface WeightModifier {
    weightModifierType?: WeightModifierType
    weightAdjustment?: string
}

interface PriceModifier {
    priceModifierType?: PriceModifierType
    priceAdjustment?: string
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
    value?: boolean
    isDefault?: boolean
    weightModifier?: WeightModifier
    priceModifier?: PriceModifier
}

interface AttributeValueText extends AttributeValue {
    editable?: boolean
}

interface AttributeValueHidden extends AttributeValue {
    attributeOption: AttributeOption;
}


export {
    PriceModifierType,
    PriceModifier,
    WeightModifierType,
    WeightModifier,
    AttributeValueSelect,
    AttributeValueCheckbox,
    AttributeValueText,
    AttributeValueHidden
}