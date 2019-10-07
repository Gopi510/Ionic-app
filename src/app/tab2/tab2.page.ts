import { Component,OnInit} from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})

export class Tab2Page implements OnInit{

recording: boolean = false;
filePath: string;
fileName: string;
audio: MediaObject;
audioList: any[] = [];

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private media: Media,
    private file: File,
    public platform: Platform) {}

    getAudioList() {
      if(localStorage.getItem("audiolist")) {
        this.audioList = JSON.parse(localStorage.getItem("audiolist"));
        console.log(this.audioList);
      }
    }

    ionViewWillEnter() {
      this.getAudioList();
    }

    startRecord() {
      if (this.platform.is('ios')) {

        this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.m4a';
        this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
        this.audio = this.media.create(this.filePath);
      }
       else if (this.platform.is('android')) {

        this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
        this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
        this.audio = this.media.create(this.filePath);
      }
      else
      {

        this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
        this.filePath = this.file.dataDirectory.replace(/file:\/\//g, '') + this.fileName;
        this.audio = this.media.create(this.filePath);
      
      }
      this.audio.startRecord();
      this.recording = true;
    }
   
    stopRecord() {
      this.audio.stopRecord();
      let data = { filename: this.fileName };
      this.audioList.push(data);
      localStorage.setItem("audiolist", JSON.stringify(this.audioList));
      this.recording = false;
      this.getAudioList();
    }

    playAudio(file,idx) {
      if (this.platform.is('ios')) {
        this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
        this.audio = this.media.create(this.filePath);
      }
       else if (this.platform.is('android')) {
        this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
        this.audio = this.media.create(this.filePath);
      }
      else
      {
        this.filePath = this.file.dataDirectory.replace(/file:\/\//g, '') + file;
        this.audio = this.media.create(this.filePath);
      }
      this.audio.play();
      this.audio.setVolume(0.8);
    }
   

   deleteAudio(file,idx) {

      this.audioList.splice(idx,1);
      localStorage.setItem("audiolist", JSON.stringify(this.audioList));
      this.getAudioList();

      //this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
       //this.media.removeFile(this.filePath);
        //file.removeFile(this.filePath);
        //file.release();
    }


    async renameAudio(currFilename, idx) {
    console.log("string json: ",JSON.stringify(this.audioList));
    let newFileNm = ""
   
    console.log("in rename currFilename: ",currFilename);
   
    console.log("ind: ",idx);

    const alert = await this.alertCtrl.create({
      subHeader: 'Rename',
      message: 'Enter New File name',
      inputs: [
        {
          name: 'newFileName',
          placeholder: 'New File name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Rename',
          handler: (data) => {
          newFileNm = data.newFileName;
          newFileNm = newFileNm + ".3gp";
         
           
          let newdata = {filename: newFileNm };
          this.audioList.splice(idx, 1, newdata);
          localStorage.setItem("audiolist", JSON.stringify(this.audioList));
         
          this.getAudioList();

          this.file.moveFile(this.file.externalDataDirectory, currFilename, this.file.externalDataDirectory, newFileNm);
          this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + newFileNm;
         


          }
        }
      ]
    });
    await alert.present();


  }


    ngOnInit() {

    if(localStorage.getItem("audiolist")) {
        this.audioList = JSON.parse(localStorage.getItem("audiolist"));
        console.log(this.audioList);
      }
    
  }
}

