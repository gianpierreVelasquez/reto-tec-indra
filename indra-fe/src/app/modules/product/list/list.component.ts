import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { IProduct } from '@core/models/product.interface';
import { ProductService } from '@core/services/product.service';
import { UtilsService } from '@core/services/utils.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PRODUCT_PATH } from '@utils/routes-path';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
	public cols = 0;
	private productsSubject = new BehaviorSubject<IProduct[]>([]);
	public products$: Observable<IProduct[]> =
		this.productsSubject.asObservable();

	public products: IProduct[] = [];
	public paginatedProducts: IProduct[] = [];
	public pageSizeOptions = [5, 10, 25, 100];
	public pageSize = 10;
	public pageIndex = 0;

	private _subs: Subscription[] = [];

	constructor(
		private readonly breakpointObserver: BreakpointObserver,
		private readonly productService: ProductService,
		private readonly router: Router,
		private readonly utilsService: UtilsService
	) {}

	public ngOnInit(): void {
		this.initialConfig();
		this.getProductList();
	}

	public ngOnDestroy(): void {
		this._subs.forEach(s => s.unsubscribe());
	}

	public trackByProductId(_index: number, product: IProduct): string {
		return product.id;
	}

	public onPageChange(event: any): void {
		this.pageSize = event.size;
		this.pageIndex = event.index;
		this.setPaginatedProducts();
	}

	protected initialConfig(): void {
		this.utilsService.setHeader('Lista de Productos');

		this.breakpointObserver
			.observe([
				Breakpoints.XSmall,
				Breakpoints.Small,
				Breakpoints.Medium,
				Breakpoints.Large,
			])
			.subscribe(result => {
				switch (true) {
					case result.breakpoints[Breakpoints.XSmall]:
						return (this.cols = 1);
					case result.breakpoints[Breakpoints.Small]:
						return (this.cols = 3);
					case result.breakpoints[Breakpoints.Medium]:
						return (this.cols = 4);
					case result.breakpoints[Breakpoints.Large]:
						return (this.cols = 5);
					case result.breakpoints[Breakpoints.XLarge]:
						return (this.cols = 5);
					default:
						return (this.cols = 4);
				}
			});
	}

	protected navigateToCreate(): void {
		this.router.navigate([PRODUCT_PATH.new]);
	}

	protected onAction(event: any): void {
		const route = PRODUCT_PATH.detail.replace('{productId}', event.productId);
		event['action'] === 'detail'
			? this.router.navigate([route])
			: this.deleteProduct(event.productId);
	}

	private getProductList(): void {
		this._subs.push(
			this.productService.getList().subscribe({
				next: resp => {
					if (resp.data) {
						this.products = resp.data || [];
						this.setPaginatedProducts();
					}
				},
				error: err => console.error(err),
			})
		);
	}

	private deleteProduct(productId: string): void {
		this._subs.push(
			this.productService.deleteProduct(productId).subscribe({
				next: () => this.getProductList(),
				error: err => console.error(err),
			})
		);
	}

	private setPaginatedProducts(): void {
		const startIndex = this.pageIndex * this.pageSize;
		const endIndex = startIndex + this.pageSize;
		this.paginatedProducts = this.products.slice(startIndex, endIndex);
	}
}
