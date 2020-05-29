import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class YoutubeApiService {

  constructor(private httpClient: HttpClient) {}

  youtube(
    latitude,
    longitude,
    date_start,
    date_end,
    limit,
    oneSearch,
    twoSearch,
    MAX_videos_search,
    CategoryID,
    key_API
  ) {
    let url =
      "http://localhost:5000/mapMedia/runYoutubeApi/apiRun" +
      "?latitude=" +
      latitude +
      "&longitude=" +
      longitude +
      "&date1=" +
      date_start +
      "&date2=" +
      date_end +
      "&limit=" +
      limit +
      "&firstSearch=" +
      oneSearch +
      "&secondSearch=" +
      twoSearch +
      "&maxVideosSearch=" +
      MAX_videos_search +
      "&categoryID=" +
      CategoryID +
      "&key=" +
      key_API;

    return this.httpClient.get(url);
  }


}
