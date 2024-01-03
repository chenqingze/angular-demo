enum AssetType {
    IMAGE = 'IMAGE',
    AUDIO = 'AUDIO',
    VIDEO = 'VIDEO',
    EMBED = 'EMBED',
    PDF = 'PDF',
    WORD = 'WORD',
    CSV = 'CSV',
    EXCEL = 'EXCEL',
    TEXT = 'TEXT',
    UNKNOWN = 'UNKNOWN'
}

enum MimeType {
    APPLICATION_JSON = 'application/json',
    APPLICATION_PDF = 'application/pdf',
    IMAGE_JPEG = 'image/jpeg',
    IMAGE_PNG = 'image/png',
    TEXT_PLAIN = 'text/plain'
}

interface Asset {
    id?: string;
    name: string;
    folderId?: string;
    mimeType?: MimeType;
    byteSize?: string;
    assetType: AssetType;
    url: string;
    embedCode?: string;
    modifiedAt?: string;
    productId?: string;
}

interface FileUploadResult {
    code: string;
    md5: string;
    path: string;
    desc: string;
    name: string;
    byteSize: string;
    mimeType: MimeType;
    assetType: AssetType;

}

interface UploadFile {
    url?: string;
    path?: string;
    name?: string;
    file: File;
    uploadStatus: {
        isSuccess: boolean;
        isError: boolean;
        errorMessage: string;
        progressCount: number;
    };
}

interface BaseFile {
    url: string;
    name: string;
    displayOrder: number;
}

interface Image extends BaseFile {
    externalId?: string;

}

export {AssetType, MimeType, Asset, UploadFile, FileUploadResult, BaseFile, Image}