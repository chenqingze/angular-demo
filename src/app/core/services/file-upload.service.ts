import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GLOBAL_CONFIG} from '../global-config';
import {Observable} from 'rxjs';
import {Asset} from '../../shared/models/file';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

    constructor(private http: HttpClient) {
    }

    createFileInfoToServer(asset: Asset): Observable<void> {
        return this.http.post<void>('/assets', asset);
    }

    upload(file: File) {
        if (!file) {
            throw new Error("file can't be null or undefined!");
        }
        const formData = new FormData();
        const fileName = file.name;
        formData.append('file', file, fileName);

        // The `HttpClient.request` API produces a raw event stream
        // which includes start (sent), progress, and response events.
        return this.http.post<any>(GLOBAL_CONFIG.uploadFileUrl, formData, {observe: 'events', reportProgress: true})
    }

    // 多次请求上传多个图片，即每个请求值上传一张图片，但并行执行
    /* multipleUpload(files: FileList) {
         const requests$: Observable<HttpEvent<any>> [] = [];
         for (let i = 0; i < files.length; i++) {
             const file = files.item(i);
             file && requests$.push(this.upload(file));
         }
         return forkJoin(requests$);
     }*/

    // 如果一个请求上传所有图片，使用下面的方法
    /*multipleUpload(files: FileList) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            const file = files.item(i);
            file && formData.append('files', file, file.name)
        }
        return this.http.post<Asset>(this.API_URL, formData, {reportProgress: true, observe: 'events'});
    }*/

}
