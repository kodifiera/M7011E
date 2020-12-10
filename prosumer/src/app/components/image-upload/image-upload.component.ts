import { Component, OnInit } from '@angular/core';
import { ImageService } from './../../services/image.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  selectedFile: any;

  constructor(private imageService: ImageService) { }
  
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.imageService.upload(this.selectedFile.file).subscribe(
        (res)=> {
          this.onSuccess();
        },
        (err) => {
          this.onError();
        })
    })
    reader.readAsDataURL(file);
  }

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  ngOnInit(): void {
  }

}
class ImageSnippet {
  constructor(public src: string, public file: File) {}
  pending: boolean = false;
  status: string = "";
}