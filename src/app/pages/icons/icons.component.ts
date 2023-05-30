import { Component, OnInit } from '@angular/core';
import { Covid } from 'src/app/models/Covid';
import { AlgorithmsIaService } from 'src/app/services/algorithms-ia.service';
import { ServiceService } from 'src/app/services/service.service';

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

  constructor(private rest: AlgorithmsIaService, private service: ServiceService) { }

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
      this.rest.post(`http://172.24.251.192:5000/model/covid19/`, formData)
        .subscribe(res => {
          this.loading = false;
          this.responseData = JSON.stringify(res);
          const covPredic = this.responseData.substring(26, 34);
          const nomPredic = this.responseData.substring(26, 32);
          const covScore = this.score = this.responseData.substring(44, 62);
          const nomScore = this.score = this.responseData.substring(42, 62);
          const decCovScore = parseFloat(covScore);
          const decNomScore = parseFloat(nomScore);
          const porcCovScore = (decCovScore * 100).toFixed(2) + "%";
          const porcNomScore = (decNomScore * 100).toFixed(2) + "%";
          if (covPredic === 'Covid19+') {
            this.predictions = covPredic;
            this.score = porcCovScore;
          } else {
            this.predictions = nomPredic;
            this.score = porcNomScore;
          }
          this.covid.prediccion = this.predictions;
          this.covid.puntaje = this.score;
          this.covid.pacienteId = Number(sessionStorage.getItem('userId'));
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
