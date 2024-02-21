import {Image} from '../../../../shared/models/file';
import {Brand} from '../../brands/shared/brand';
import {FormControl} from '@angular/forms';
import {PriceModifierType, WeightModifierType} from '../../attributes/shared/attribute';

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
}

interface ProductOptionForm {
    id?: FormControl<undefined | string>;
    displayOrder: FormControl<number>;
    productId: FormControl<undefined | string>;
    attributeId: FormControl<undefined | string>;
    attributeOption: FormControl<undefined | string>;
    priceModifierType?: FormControl<PriceModifierType>;
    priceAdjustment?: FormControl<string>;
    weightModifierType?: FormControl<WeightModifierType>;
    weightAdjustment?: FormControl<string>;
}

export {
    Dimension,
    Product,
    ProductOptionForm
};











