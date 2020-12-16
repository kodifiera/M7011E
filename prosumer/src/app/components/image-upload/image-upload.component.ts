import { Component, OnInit } from '@angular/core';
import { ImageService } from './../../services/image.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  selectedFile: any;
  imageToShow: any;
  isImageLoading: any;


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
    this.selectedFile.exists = true;
    this.getImageFromService();
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'error';
    this.selectedFile.src = '';
  }

  ngOnInit(): void {
    this.getImageFromService()
  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }
 getImageFromService() {
  this.isImageLoading = true;
  this.imageService.getImage().subscribe(data => {
    this.createImageFromBlob(data);
    this.isImageLoading = false;
  }, error => {
    this.isImageLoading = false;
    if(error.status===500){
      console.log("nja");
    }
  });
}
}
class ImageSnippet {
  constructor(public src: string, public file: File) {}
  pending: boolean = false;
  status: string = '';
}