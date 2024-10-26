import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductLayoutComponent } from './layout/product-layout/product-layout.component';

const routes: Routes = [
	{
		path: '',
		component: ProductLayoutComponent,
		children: [
      {
        path: '',
        redirectTo: 'product',
        pathMatch: 'full'
      },
			{
				path: 'product',
				loadChildren: () =>
					import('./modules/product/product.module').then(
						module => module.ProductModule
					),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
