import {FormControl} from '@angular/forms';
import {Image} from '../../../../shared/models/file';

interface Category {
    id?: string;
    name: string;
    isVisible: boolean;
    icon: Image;
    description?: string;
    displayOrder?: number;
    subcategoryCount: number;
    parentId: string | null;
}

interface CategoryNestNode extends Category {
    children?: CategoryNestNode[];
}

interface CategoryFlatNode extends Category {
    level: number;
    expandable: boolean;
}


interface CategoryForm {
    id?: FormControl<string>;
    name: FormControl<string>;
    description: FormControl<string>;
    parentId: FormControl<string>;
    displayOrder: FormControl<number>;
    assetId: FormControl<string | undefined>;
}

export {Category, CategoryNestNode, CategoryFlatNode, CategoryForm}

