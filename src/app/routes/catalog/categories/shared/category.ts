import {Image} from '../../../../shared/models/file';

interface Category {
    id?: string;
    name: string;
    enabled: boolean;
    icon?: Image;
    description?: string;
    displayOrder: number;
    subcategoryCount?: number;
    parentId?: string;
}


export {Category}

