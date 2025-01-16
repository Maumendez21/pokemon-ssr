import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  imports: [],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:true
})
export default class ContactPageComponent {

  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('About Page');
    this.meta.updateTag({
      name:'description',
      content: 'this is my Contact page'
    });
    this.meta.updateTag({
      name:'og:title',
      content: 'Contact Page'
    });
    this.meta.updateTag({
      name:'kewwords',
      content: 'Curso,SSR Angular,Prueba'
    });
  }
}
