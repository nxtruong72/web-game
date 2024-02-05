import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from '../app/app.routes';
import { tap } from 'rxjs';
import { authInterceptor } from '../shared/until.helper';
let todos: Array<any> = [];
export function initializeApplication(http: HttpClient) {
  return () =>
    http.get('https://jsonplaceholder.typicode.com/todos/').pipe(
      tap((data: any) => {
        console.log(data);
        todos = data;
      }),
    );
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(), // for animation as material
    provideHttpClient(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApplication,
      multi: true,
      deps: [HttpClient],
    },
    {
      provide: 'TODO',
      useFactory: () => {
        return todos;
      },
    },
  ],
};
