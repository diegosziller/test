import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SortByDirective } from './sort/sort-by.directive';
import { SortDirective } from './sort/sort.directive';


@NgModule({
  imports: [NgbModule],
  declarations: [
    SortByDirective,
    SortDirective,
  ],
  exports: [
    SortByDirective,
    SortDirective,
  ],
})
export class SharedModule {}
