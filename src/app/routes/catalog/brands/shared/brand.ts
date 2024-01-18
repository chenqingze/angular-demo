import {Product} from '../../products/shared/product';
import {Image} from '../../../../shared/models/file';

export interface Brand {
    id?: string

    name: string

    logo?: Image

    displayOrder?: number

    products?: Product[]

}
