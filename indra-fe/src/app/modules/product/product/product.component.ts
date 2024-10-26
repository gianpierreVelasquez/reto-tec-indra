import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '@core/models/product.interface';
import { ProductService } from '@core/services/product.service';
import { UtilsService } from '@core/services/utils.service';
import { DEFAULT_PRODUCT } from '@utils/constants';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
	public productForm: FormGroup;
	public isNewProduct = true;

	private product: IProduct | undefined;
	private _subs: Subscription[] = [];

	public validations = {
		name: [
			{ type: 'required', message: 'Name fiels is required.' },
			{ type: 'minlength', message: 'Must have at least 3 characters.' },
			{
				type: 'maxlength',
				message: 'Must contain a maximum of 50 characters.',
			},
		],
		src: [{ type: 'pattern', message: 'Must provide a valid URL.' }],
		price: [
			{ type: 'required', message: 'Price field is required.' },
			{ type: 'min', message: 'Value must be greater than 0.00' },
		],
	};

	public defaultProduct = DEFAULT_PRODUCT;

	constructor(
		private readonly formBuilder: FormBuilder,
		private readonly location: Location,
		private readonly productService: ProductService,
		private readonly route: ActivatedRoute,
		private readonly utilsService: UtilsService,
		private readonly matSnackBar: MatSnackBar
	) {
		this.productForm = this.formBuilder.group({
			name: [
				'',
				[
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(50),
				],
			],
			description: [''],
			src: [
				'',
				[
					Validators.pattern(
						'(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
					),
				],
			],
			price: [null, [Validators.required, Validators.min(0.1)]],
		});
	}

	public ngOnInit(): void {
		const productId = this.route.snapshot.paramMap.get('id') || '';

		this.isNewProduct = !productId ? true : false;

		!this.isNewProduct && this.getProductById(productId);

		this.isNewProduct && this.utilsService.setHeader('Nuevo Producto');
	}

	public onSubmit(frm: FormGroup): void {
		if (frm.invalid) {
			this.productForm.markAsTouched();
			return void 0;
		}

		this.isNewProduct
			? this.createProduct(frm.value)
			: this.updateProduct(this.product?.id as string, frm.value);
	}

	public ngOnDestroy(): void {
		this._subs.forEach(s => s.unsubscribe());
	}

	protected goBack(): void {
		this.location.back();
	}

	private getProductById(id: string): void {
		this.productService.getProductById(id).subscribe({
			next: resp => {
				if (resp.data) {
					this.product = resp.data;
					this.utilsService.setHeader(`Producto: ${resp.data.name}`);
					this.productForm.patchValue(resp.data);
				}
			},
			error: err => this.openSnackBar(err?.message),
		});
	}

	private createProduct(productObj: IProduct): void {
		this.productService.createProduct(productObj).subscribe({
			next: resp => resp.message && this.openSnackBar(resp?.message),
			error: err => this.openSnackBar(err?.message),
		});
	}

	private updateProduct(id: string, productObj: IProduct): void {
		this.productService.updateProduct(id, productObj).subscribe({
			next: resp => resp.message && this.openSnackBar(resp?.message),
			error: err => this.openSnackBar(err?.message),
		});
	}

	private openSnackBar(message: string): void {
		const snackBarRef = this.matSnackBar.open(message, 'Done', {
			horizontalPosition: 'center',
			verticalPosition: 'bottom',
			duration: 3000,
		});

		snackBarRef.afterDismissed().subscribe(() => {
			this.goBack();
		});
	}
}
