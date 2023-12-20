import { TagsResponse } from '../interfaces/tags-response.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TagsService {
  constructor(private http: HttpClient) {}

  getTags(): Observable<TagsResponse> {
    return this.http.get<TagsResponse>(`${environment.apiBaseUrl}/tags`);
  }
}
