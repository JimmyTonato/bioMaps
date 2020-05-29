import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: "app-video",
  templateUrl: "./video.component.html",
  styleUrls: ["./video.component.scss"],
})

export class VideoComponent implements OnInit {
  controllerSrc: SafeResourceUrl;
  constructor(public sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<VideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    let url="https://www.youtube.com/embed/"+this.data.VideoId;
    this.controllerSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
