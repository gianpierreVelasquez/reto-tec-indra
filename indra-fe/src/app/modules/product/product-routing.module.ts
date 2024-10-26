import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'list',
				loadChildren: () =>
					import('./list/list.module').then(m => m.ListModule),
			},
      {
				path: 'new',
				loadChildren: () =>
					import('./product/product.module').then(m => m.ProductModule),
			},
			{
				path: ':id/detail',
				loadChildren: () =>
					import('./product/product.module').then(m => m.ProductModule),
			},
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProductRoutingModule {}
