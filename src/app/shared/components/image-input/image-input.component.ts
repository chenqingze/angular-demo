import {Component, Input, OnDestroy, Optional, Self} from '@angular/core';
import {FileUploadResult, Image, UploadFile} from '../../models/file';
import {MatFormFieldControl} from '@angular/material/form-field';
import {NgOptimizedImage, NgStyle} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule} from '@angular/forms';
import {catchError, forkJoin, of, Subject, tap} from 'rxjs';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {FileUploadService} from '../../../core/services/file-upload.service';

@Component({
    selector: 'image-input',
    standalone: true,
    imports: [
        NgStyle,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        NgOptimizedImage
    ],
    templateUrl: './image-input.component.html',
    styleUrl: './image-input.component.scss',
    providers: [
        {provide: MatFormFieldControl, useExisting: ImageInputComponent},
    ],
})
export class ImageInputComponent implements ControlValueAccessor, MatFormFieldControl<Image []>, OnDestroy {
    static nextId = 0;
    @Input() fileType!: string;
    @Input() multiple: boolean = false;
    // 可上传最大文件数量
    @Input() maxFileCount: number = 1;
    uploadFileList: UploadFile[] = [];

    @Input()
    set value(images: Image [] | null) {
        this.filesControl.setValue(images || []);
        this.stateChanges.next();
    }

    get value(): Image [] {
        if (this.filesControl.valid) {
            return this.filesControl.getRawValue() || [];
        }
        return [];
    }

    filesControl: FormControl = new FormControl<Image []>([]);

    id: string = `image-input-${ImageInputComponent.nextId++}`;
    @Input() placeholder: string = '';
    @Input() required: boolean = false;
    @Input('aria-describedby') userAriaDescribedBy: string = '';
    @Input() shouldLabelFloat: boolean = true;

    stateChanges = new Subject<void>();
    disabled: boolean = false;
    focused: boolean = false;
    controlType = 'file-input';

    get empty() {
        return this.value.length === 0;
    }

    get errorState(): boolean {
        return this.filesControl.invalid;
    }

    onFileSelected(event: Event) {
        const fileInputEl = event.target as HTMLInputElement;
        const fileList = fileInputEl.files;
        if (!fileList) {
            return;
        }
        forkJoin(this.buildUploadFileListAndRequestsChain(fileList)).subscribe((response: any) => {
            response.forEach((item: { isError: any; index: number; error: { statusText: string; }; }) => {
                if (item.isError) {
                    this.uploadFileList[item.index].uploadStatus.isError = true;
                    this.uploadFileList[item.index].uploadStatus.errorMessage = item.error.statusText;
                }
            });
        })
    }

    private buildUploadFileListAndRequestsChain(fileList: FileList) {
        return Array.from(fileList).map((file, index) => {
            const newFile: UploadFile = {
                file: file,
                uploadStatus: {
                    isSuccess: false,
                    isError: false,
                    errorMessage: '',
                    progressCount: 0,
                },
            };
            this.uploadFileList.push(newFile);
            return this.fileUploadService.upload(file).pipe(
                tap((event) => {
                    this.uploadEventHandle(index, file, event);
                }),
                catchError((error) => {
                    return of({isError: true, index, error});
                })
            );
        });
    }

    private uploadEventHandle(uploadFileListIndex: number, file: File, event: HttpEvent<any>) {
        switch (event.type) {
            case HttpEventType.Sent:
                console.log(`Uploading file "${file.name}" of size ${file.size}.`);
                break;
            case HttpEventType.UploadProgress:
                // Compute and show the % done:
                const percentDone = event.total ? Math.round(100 * event.loaded / event.total) : 0;
                this.uploadFileList[uploadFileListIndex].uploadStatus.progressCount = percentDone;
                console.log(`File "${file.name}" is ${percentDone}% uploaded.`);
                break;
            case HttpEventType.Response:
                console.log(`File "${file.name}" was completely uploaded!`);

                if (event.status === 200) {
                    const result: FileUploadResult = event.body;
                    // (optional) post file information to application server
                    /*const asset = {
                        name: result?.name,
                        mimeType: result?.mimeType,
                        byteSize: result?.byteSize,
                        assetType: result?.assetType,
                        url: result?.path
                    } as Asset;
                    this.fileUploadService.createFileInfoToServer(asset).subscribe();*/
                    const file: Image = {
                        name: result.name,
                        url: result.path,
                        displayOrder: uploadFileListIndex,
                    };
                    this.filesControl.value.push(file)
                }
                break;
            default:
                // console.log(`File "${file.name}" surprising upload event: ${event.type}.`);
                console.log(`File surprising upload event: ${event.type}.`);
        }
    }

    deleteFile(index: number) {
        console.log('======index=====', index)
        this.filesControl.getRawValue().splice(index, 1);
        console.log('=======getRawValue======', [...this.filesControl.getRawValue()]);
        console.log('=====value=======', [...this.value]);
    }

    constructor(private fileUploadService: FileUploadService, @Optional() @Self() public ngControl: NgControl) {
        if (this.ngControl != null) {
            // Setting the value accessor directly (instead of using
            // the providers) to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }
    }

    setDescribedByIds(ids: string[]): void {
        // throw new Error('Method not implemented.');
    }

    onContainerClick(event: MouseEvent): void {
        // throw new Error('Method not implemented.');
    }

    writeValue(obj: any): void {
        // throw new Error('Method not implemented.');
    }

    registerOnChange(fn: any): void {
        // throw new Error('Method not implemented.');
    }

    registerOnTouched(fn: any): void {
        // throw new Error('Method not implemented.');
    }

    setDisabledState?(isDisabled: boolean): void {
        // throw new Error('Method not implemented.');
    }

    ngOnDestroy(): void {
        this.stateChanges.complete();
    }

}
