import { Component, OnInit } from '@angular/core';
import { Covid } from 'src/app/models/Covid';
import { AlgorithmsIaService } from 'src/app/services/algorithms-ia.service';
import { ServiceService } from 'src/app/services/service.service';
import { TokenService } from 'src/app/services/token.service';
import { HttpHeaders } from '@angular/common/http';

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

  constructor(private rest: AlgorithmsIaService, private service: ServiceService,
    private tokenService: TokenService
  ) { }

  covid: Covid = {
    prediccion: '',
    puntaje: '',
    pacienteId: null
  };

  ngOnInit() {
  }

  capturarFile(event) {
    const captureFile = event.target.files[0];
    this.blobFile(captureFile).then((image: any) => {
      this.imagePreview = image.base;
    })
    this.files.push(captureFile);
  }

  blobFile = async ($event: any) => new Promise((resolve) => {
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
      this.rest.post(`http://34.134.178.96:5000/model/cancer`, formData)
        .subscribe(res => {
          this.loading = false;
          this.responseData = JSON.stringify(res);
          const jsonObject = JSON.parse(this.responseData);
          const label = jsonObject.predictions[0].label;
          const score = jsonObject.predictions[0].score;
          if (label === 'Cáncer') {
            this.predictions = label;
            this.score = score;
          } else {
            this.predictions = label;
            this.score = score;
          }
          this.covid.prediccion = this.predictions;
          this.covid.puntaje = this.score;
          this.covid.pacienteId = Number(sessionStorage.getItem('userId'));
          /* const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
          this.service.savedCovid(this.covid, headers).subscribe(data => { */
          this.service.savedCovid(this.covid).subscribe(data => {
            console.log("Success");
          },
            err => console.log(err)
          );
          this.files.shift();
        });
    } catch (e) {
      console.log('ERROR', e);
    }
  }

}
