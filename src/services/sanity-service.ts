
import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { WINDOW } from '@ng-web-apis/common'
import sanityClient, { ClientConfig, SanityClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { map, Observable } from 'rxjs'
import { environment} from "../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class SanityService {
  private readonly client: SanityClient
  private imageUrlBuilder: ImageUrlBuilder
  private clientConfig: ClientConfig = {
    projectId: environment.sanity.projectId,
    dataset: environment.sanity.dataset,
    apiVersion: this.getApiVersion(),
    useCdn: false,
  }

  constructor(
    private http: HttpClient,
    @Inject(WINDOW) private wnd: Window,
  ) {
    this.client = this.createClient()
    this.imageUrlBuilder = imageUrlBuilder(this.client)
  }

  getImageUrlBuilder(source: SanityImageSource): ImageUrlBuilder {
    return this.imageUrlBuilder.image(source)
  }

  fetch<T>(query: string): Observable<T> {
    const url = `${this.generateSanityUrl()}${encodeURIComponent(query)}`
    return this.http.get(url).pipe(map((response: any) => response.result as T))
  }

  private createClient(): SanityClient {
    return sanityClient(this.clientConfig)
  }

  private generateSanityUrl(): string {
      const config = {
        projectId: environment.sanity.projectId,
        dataset: environment.sanity.dataset,
        apiVersion: this.getApiVersion()
      };

      let baseUrl = `${window.location.origin}/api/`;
      if (window.location.href.startsWith(environment.web.url) || window.location.href.startsWith('http://localhost:4200')) {
        baseUrl = `https://${environment.sanity.projectId}.api.sanity.io/`;
      }
      return `${baseUrl}${config.apiVersion}/data/query/${config.dataset}?query=`;
    }


  private getApiVersion(): string {
    return `v${new Date().toISOString().split('T')[0]}`
  }
}
