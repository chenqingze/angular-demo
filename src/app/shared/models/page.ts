export interface Page<T> {
    content: T[];
    number: number;
    numberOfElements: number;
    size: number;
    totalPages: number;
    totalElements: number;
    last: boolean;
    empty: boolean;
    first: boolean;
}
