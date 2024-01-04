import {Component, ElementRef, Input, OnDestroy, Optional, Self} from '@angular/core';
import {FileUploadResult, Image, UploadFile} from '../../models/file';
import {MatFormFieldControl} from '@angular/material/form-field';
import {NgOptimizedImage, NgStyle} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule} from '@angular/forms';
import {catchError, forkJoin, of, Subject, tap} from 'rxjs';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {FileUploadService} from '../../../core/services/file-upload.service';
import {BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';

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
export class ImageInputComponent implements ControlValueAccessor, MatFormFieldControl<Image [] | Image>, OnDestroy {
    static nextId = 0;
    // 图片类型
    @Input() imageType!: string;
    // 是否允许多选
    @Input() multiple: boolean = false;
    // 可上传最大文件数量
    @Input() maxCount: number = 1;
    uploadFileList: UploadFile[] = [];

    filesControl: FormControl = new FormControl<Image []>([]);

    stateChanges = new Subject<void>();
    focused = false;
    touched = false;
    controlType = 'image-input';
    id: string = `image-input-${ImageInputComponent.nextId++}`;
    onChange = (_: any) => {
    };
    onTouched = () => {
    };

    get empty() {
        return this.value!.length === 0;
    }

    get shouldLabelFloat() {
        return true;
    }

    @Input('aria-describedby') userAriaDescribedBy: string = '';

    @Input()
    get placeholder(): string {
        return this._placeholder;
    }

    set placeholder(value: string) {
        this._placeholder = value;
        this.stateChanges.next();
    }

    private _placeholder: string = '';

    @Input()
    get required(): boolean {
        return this._required;
    }

    set required(value: BooleanInput) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }

    private _required = false;

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
        this._disabled ? this.filesControl.disable() : this.filesControl.enable();
        this.stateChanges.next();
    }

    private _disabled = false;

    @Input()
    get value(): Image [] | [] {
        const {value} = this.filesControl;
        return value;
    }

    set value(images: Image [] | Image | null) {
        let imageArray: Image[] = [];
        if (images) {
            if (images instanceof Array) {
                imageArray = images;
            } else {
                imageArray = [images];
            }
        }
        this.filesControl.setValue(imageArray);
        this.stateChanges.next();
    }

    get errorState(): boolean {
        return this.filesControl.invalid && this.touched;
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
                    this.value = [...this.value, file];

                    this.onChange(this.value);

                }
                break;
            default:
                console.log(`File "${file.name}" surprising upload event: ${event.type}.`);
        }
    }

    deleteFile(index: number) {
        this.value.splice(index, 1);
    }

    constructor(private fileUploadService: FileUploadService, private _elementRef: ElementRef<HTMLElement>, @Optional() @Self() public ngControl: NgControl) {

        if (this.ngControl != null) {
            // Setting the value accessor directly (instead of using
            // the providers) to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }
    }

    setDescribedByIds(ids: string[]): void {
        const controlElement = this._elementRef.nativeElement
            .querySelector('.image-input-container')!;
        controlElement.setAttribute('aria-describedby', ids.join(' '));
    }

    onContainerClick(event: MouseEvent): void {
        // throw new Error('Method not implemented.');
    }

    writeValue(images: Image []): void {
        this.value = images;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    ngOnDestroy(): void {
        this.stateChanges.complete();
    }

}
