import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlgorithmsIaService } from 'src/app/services/algorithms-ia.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  imagePreview: any;
  files: any = [];
  loading: boolean;
  responseData: any;
  predictions: any;
  score: any;

  constructor(private sanitizer: DomSanitizer, private rest: AlgorithmsIaService) { }

  ngOnInit() {
  }

  capturarFile(event) {
    const captureFile = event.target.files[0];
    this.blobFile(captureFile).then((image: any) => {
      this.imagePreview = image.base;
      console.log(image);
    })
    this.files.push(captureFile);
  }

  blobFile = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          blob: $event,
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          blob: $event,
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })

  sendFile(): any {
    try {
      const formData = new FormData();
      this.files.forEach((item) => {
        formData.append('file', item)
      });
      this.loading = true;
      this.rest.post(`http://192.168.1.2:5000/model/covid19/`, formData)
        .subscribe(res => {
          this.loading = false;
          this.responseData = JSON.stringify(res);
          this.predictions  = this.responseData.substring(25, 35);
          this.score  = this.responseData.substring(43, 62);
          this.files.shift();
        });
    } catch (e) {
      console.log('ERROR', e);
    }
  }

}
