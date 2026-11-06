import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  // لو عاوز تزود على الريكوست

  //اوعي تتعامل مع الريكوست بشكل دايركت هتاخد منه نسخة وتعدل فيها وتبعت النسخة اللي عدلت عليها في النكست
  if (!req.url.includes('/signup') || !req.url.includes('/signin')) {
    if (localStorage.getItem('socialToken')) {
      req = req.clone({
        setHeaders: {
          AUTHORIZATION: `Bearer ${localStorage.getItem('socialToken')} `,
        },
      });
    }
  }

  return next(req); // الريسبونس بستقبله هنا
};
