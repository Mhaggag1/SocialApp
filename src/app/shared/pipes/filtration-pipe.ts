import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtration',
  standalone: true, // لو الـ Pipe بتاعتك Standalone
})
export class FiltrationPipe implements PipeTransform {
  transform(arr: any[], searchTerm: string): any[] {
    // 1. لو الـ Array نفسها مش موجودة، رجع Array فاضية فوراً
    if (!arr || !Array.isArray(arr)) {
      return [];
    }

    // 2. لو مفيش بحث مكتوب، رجع الـ Array زي ما هي
    if (!searchTerm) {
      return arr;
    }

    // 3. الفلترة مع التأكد من وجود الـ item والـ user والـ name عشان متضربش إيرور
    const term = searchTerm.toLowerCase();
    return arr.filter((item) => {
      const name = (item?.user?.name ?? item?.name ?? '').toLowerCase();
      const username = (item?.user?.username ?? item?.username ?? '').toLowerCase();
      const body = (item?.body ?? '').toLowerCase();

      return name.includes(term) || username.includes(term) || body.includes(term);
    });
  }
}
