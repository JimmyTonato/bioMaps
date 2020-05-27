import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class YoutubeApiService {
  constructor(private httpClient: HttpClient) {}
  youtube(latitude, longitude) {
    let url =
      "http://localhost:5000/mapMedia/runYoutubeApi/apiRun?latitude=" +
      latitude +
      "&longitude=" +
      longitude+"&date1=20200101&date2=20200501&limit=10";
      //longitude+"&date1=20200101&date2=20200501&limit=5";
    return this.httpClient.get(url);
  }

  // http://localhost:5000/mapMedia/runYoutubeApi/dataBBDD?country=Germany&date1=20200101&date2=20200501&limit=5
  // youtube_get_data() {
  //   let url = "http://localhost:5000/mapMedia/runYoutubeApi/dataBBDD";
  //   return this.httpClient.get(url);
  // }

}
