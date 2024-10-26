import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';

@NgModule({
	declarations: [ProductComponent],
	imports: [
		CommonModule,
		ProductRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		ComponentsModule,
	],
})
export class ProductModule {}
