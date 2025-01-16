import { isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:true
})
export default class PricingPageComponent {

  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    // console.log(isPlatformServer(this.platform));

    // if (!isPlatformServer(this.platform)) {
    //   document.title = 'Pricing Page';
    // }


    this.title.setTitle('Pricing Page');
    // this.meta.updateTag({
    //   name:'description',
    //   content: 'this is my Pricing page'
    // });
    // this.meta.updateTag({
    //   name:'og:title',
    //   content: 'Pricing Page'
    // });
    // this.meta.updateTag({
    //   name:'kewwords',
    //   content: 'Curso,SSR Angular,Prueba'
    // });
  }
}
