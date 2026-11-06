import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  // request

  let toastrService = inject(ToastrService);
  return next(req).pipe(
    catchError((err) => {
      // error logic
      toastrService.error(err.error.message, 'Error', {
        progressBar: true,
      });

      return throwError(() => err);
    }),
  ); //response
};
