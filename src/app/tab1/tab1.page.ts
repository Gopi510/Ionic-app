import { Component} from '@angular/core';
import { PhotoService } from '../services/photo.service';
//import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})

export class Tab1Page  {

      currentImage: any;

  constructor(public photoService: PhotoService) {  }


  ngOnInit() {
    this.photoService.loadSaved();
  }
}




