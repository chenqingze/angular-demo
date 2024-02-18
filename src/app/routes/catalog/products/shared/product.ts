import {
    AttributeValueCheckbox,
    AttributeValueHidden,
    AttributeValueSelect,
    AttributeValueText,
} from '../../attributes/shared/attribute';
import {Image} from '../../../../shared/models/file';
import {Brand} from '../../brands/shared/brand';

interface Dimension {
    depth?: string

    width?: string

    height?: string

    dimensionalUnits?: string
}

interface Product {
    id?: string;
    externalId?: string;
    name: string;
    sku?: string
    gtin?: string;
    /** Manufacturer part number (MPN) or model number */
    model?: string;
    manufacturer?: string;
    marketPrice?: string;
    price?: string;
    costPrice?: string;
    enabled?: boolean;
    // isOnSale?: boolean
    discountValue?: string;
    minThreshold?: number;
    maxThreshold?: number;
    dimension?: Dimension;
    weight?: number;
    weightUnits?: string;
    images?: Image[];
    description?: string;
    fullDescription?: string;
    isOnline?: boolean;
    activeStartAt?: any;
    activeEndAt?: any;
    brand?: Brand;
    categoryIds?: string [];
    attributeValueSelects?: AttributeValueSelect[];
    attributeValueCheckboxes?: AttributeValueCheckbox[];
    attributeValueTexts?: AttributeValueText[];
    attributeValueHiddens?: AttributeValueHidden[];
}

export {
    Dimension,
    Product
};











