import {Product} from '../../../shared/product';
import {FormControl} from '@angular/forms';

type PriceModifierType = string | 'ABSOLUTE' | 'PERCENT';

type WeightModifierType = string | 'ABSOLUTE' | 'PERCENT';


interface ProductOption {
    id?: string;
    displayOrder: number;
    product: Product;
    attributeId: string;
    attributeOptionIds?: string [];
    priceModifierType?: PriceModifierType;
    priceAdjustment?: string;
    weightModifierType?: WeightModifierType;
    weightAdjustment?: string;
}

interface ProductOptionForm {
    id?: FormControl<undefined | string>;
    displayOrder: FormControl<number>;
    productId: FormControl<undefined | string>;
    attributeId: FormControl<undefined | string>;
    attributeOptionIds: FormControl<undefined | string[]>;
    priceModifierType?: FormControl<PriceModifierType>;
    priceAdjustment?: FormControl<string>;
    weightModifierType?: FormControl<WeightModifierType>;
    weightAdjustment?: FormControl<string>;
}

export {
    PriceModifierType,
    WeightModifierType,
    ProductOption,
    ProductOptionForm
}