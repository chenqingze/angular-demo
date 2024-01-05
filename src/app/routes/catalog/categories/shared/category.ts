import {Image} from '../../../../shared/models/file';

interface Category {
    id: string | null;
    name: string;
    enabled: boolean;
    icon: Image | null;
    description: string | null;
    displayOrder?: number;
    subcategoryCount?: number;
    parentId: string | null;
}


export {Category}

