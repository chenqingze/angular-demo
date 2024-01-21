import {Image} from '../../../../shared/models/file';
import {ProductClass} from '../../attributes/shared/attribute';
import {Product} from '../../products/shared/product';

interface Category {
    id?: string;
    name: string
    enabled?: boolean
    icon?: Image
    /** 富文本 */
    description?: string
    displayOrder?: number
    parentId?: string
    path?: string
    depth?: number
    products?: Product[]
    productClasses?: ProductClass[]
}


export {Category}

