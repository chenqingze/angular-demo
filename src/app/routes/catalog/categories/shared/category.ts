import {Image} from '../../../../shared/models/file';
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
}


export {Category}

