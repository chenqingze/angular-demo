import {ProductClass} from '../../attributes/shared/attribute';
import {Image} from '../../../../shared/models/file';
import {Brand} from '../../brands/shared/brand';
import {Category} from '../../categories/shared/category';

export type AttributeType = string | 'SELECT' | 'TEXTAREA' | 'CHECKBOX' | 'HIDDEN'
export type AttributeDisplayMode = string | 'BLOCKS' | 'SELECT_BOX'
export type DiscountType = string | 'ABSOLUTE' | 'PERCENTAGE'


export interface Product {
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
    discountType?: DiscountType;
    discountValue?: string;
    minThreshold?: number;
    maxThreshold?: number;
    dimension?: Dimension;
    weight?: number;
    weightUnits?: string;
    images?: Image[]
    description?: string
    fullDescription?: string
    isOnline?: boolean
    activeStartAt?: any
    activeEndAt?: any
    brand?: Brand
    categories?: Category[]
    productClass?: ProductClass
    attributeValues?: AttributeValue[]
}

export interface Dimension {
    depth?: string

    width?: string

    height?: string

    dimensionalUnits?: string
}

export interface AttributeValue {
    id?: number

    product?: any

    attribute?: any
}








