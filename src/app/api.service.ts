import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { APOD } from './apod/apod.interface';
import { roverImg } from './mars-rover/rover-img.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiKey = environment.nasaAPIKey;
  private apodURL = `https://api.nasa.gov/planetary/apod?api_key=${this.apiKey}`;
  private marsRoverURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/`

  // API Data
  private apodData: APOD[] = [];
  private roverData: roverImg[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  getApodData(startDate: string, endDate: string): Observable<APOD[]> {
    return this.http
      .get<any>(`${this.apodURL}&start_date=${startDate}&end_date=${endDate}`)
      // Transforming fetched data
      .pipe(
        map(apods => {
          let id = 0;
          return apods.map((apod: {}) => {
            id += 1;
            return {...apod, id: id}
          });
        }),
        tap(apods => {
          this.apodData = apods;
        })
      );
  }

  getRoverData(captureDate: string, rover: string) {
    return this.http
      .get<any>(`${this.marsRoverURL}${rover}/photos?api_key=${this.apiKey}&earth_date=${captureDate}&page=1`)
      .pipe(
        tap(roverData => {
          this.roverData = roverData.photos;
        })
      );
  }

  getApod(index: number) {
    return this.apodData.slice()[index - 1];
  }

  getDetailedImage(id: number, viewMode: string): string {
    if (viewMode === 'apod-img') {
      let targetData = this.apodData.filter((apod: APOD) => apod.id === id);
      return (targetData[0])['hdurl'];
    } else if (viewMode === 'rover-img') {
      let targetData = this.roverData.filter((rover: roverImg) => rover.id === id);
      return (targetData[0])['img_src'];
    }
    return '';
  }
}