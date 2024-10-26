import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ComponentsModule } from '@shared/components/components.module';

@NgModule({
	declarations: [],
	imports: [CommonModule, ProductRoutingModule, ComponentsModule],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductModule {}
