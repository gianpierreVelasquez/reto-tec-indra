import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IResponse } from '@core/models/response.interface';
import { IProduct } from '@core/models/product.interface';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	private base_path = 'http://localhost:3000/indra-api';

	constructor(private readonly httpClient: HttpClient) {}

	getList(): Observable<IResponse> {
		return this.httpClient.get<IResponse>(`${this.base_path}/product`);
	}

	getProductById(productId: string): Observable<IResponse> {
		return this.httpClient.get<IResponse>(`${this.base_path}/product/${productId}`);
	}

	createProduct(product: Partial<IProduct>): Observable<IResponse> {
		return this.httpClient.post<IResponse>(
			`${this.base_path}/product`,
			product
		);
	}

	updateProduct(productId: string, product: Partial<IProduct>): Observable<IResponse> {
		return this.httpClient.patch<IResponse>(
			`${this.base_path}/product/${productId}`,
			product
		);
	}

	deleteProduct(productId: string): Observable<IResponse> {
		return this.httpClient.delete<IResponse>(`${this.base_path}/product/${productId}`);
	}
}
