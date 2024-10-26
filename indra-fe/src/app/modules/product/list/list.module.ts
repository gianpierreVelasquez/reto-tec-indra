import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { ComponentsModule } from '@shared/components/components.module';
import { ProductComponent } from '@shared/components/product/product.component';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';

@NgModule({
	declarations: [ListComponent, ProductComponent, PaginatorComponent],
	imports: [CommonModule, ListRoutingModule, ComponentsModule],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListModule {}
