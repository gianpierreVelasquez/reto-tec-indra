import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '@core/models/product.interface';
import { DEFAULT_PRODUCT } from '@utils/constants';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
	@Input()
	public product?: IProduct;

	@Output()
	public onAction = new EventEmitter();

	public defaultProduct = DEFAULT_PRODUCT;

	public action(action: string): void {
		this.onAction.next({ productId: this.product?.id, action });
	}
}
