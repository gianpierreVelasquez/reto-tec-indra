import { TestBed } from '@angular/core/testing';
import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { IProduct } from '@core/models/product.interface';
import { IResponse } from '@core/models/response.interface';

describe('ProductService', () => {
	let productService: ProductService;
	let httpTestingController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [ProductService],
		});

		productService = TestBed.inject(ProductService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpTestingController.verify();
	});

	it('Product Service should be created', () => {
		expect(productService).toBeTruthy();
	});

	it('Should return list of products', () => {
		const mockProducts: IProduct[] = [
			{
				id: 'f811f670-a813-4adc-ab25-b97abff64c00',
				name: 'Gaseosa',
				description: 'Gaseosa Pepsi 550 ml.',
				price: 2.5,
				src: '',
				createdAt: '2024-10-26T07:42:24.950Z',
			},
			{
				id: '0ebf2b2d-d53d-4680-bbab-b86008f3906d',
				name: 'Pan Integral',
				description: 'Pan Integral Bimbo 900 gr.',
				price: 7.5,
				src: '',
				createdAt: '2024-10-26T07:42:24.950Z',
			},
		];

		productService.getList().subscribe(products => {
      if (products.data) {
        expect(products.data.length).toBe(2);
        expect(products.data).toEqual(mockProducts);
      }
		});

		const req = httpTestingController.expectOne(
			'http://localhost:3000/indra-api/product'
		);
		expect(req.request.method).toBe('GET');
		req.flush(mockProducts);
	});

	it('Should return product by id', () => {
    const productId = 'f811f670-a813-4adc-ab25-b97abff64c00';
		const mockResponse: IResponse = {
      code: 200,
      data: {
        id: productId,
        name: 'Gaseosa',
        description: 'Gaseosa Pepsi 550 ml.',
        price: 2.5,
        src: '',
        createdAt: '2024-10-26T07:42:24.950Z',
      }
		};

		productService.getProductById(productId).subscribe(resp => {
			expect(resp.code).toEqual(200);
      expect(resp.data).toEqual(mockResponse.data);
		});

		const req = httpTestingController.expectOne(`http://localhost:3000/indra-api/product/${productId}`);
		expect(req.request.method).toBe('GET');
		req.flush(mockResponse);
	});

  it('Should return status 404 when product not found by id', () => {
    const productId = 'f811f670-a813-4adc-ab25-b97abff64c00';
		const mockResponse: IResponse = {
      code: 404,
      message: 'Product not found',
		};

		productService.getProductById(productId).subscribe(resp => {
			expect(resp.code).toEqual(404);
      expect(resp.message).toEqual(mockResponse.message);
		});

		const req = httpTestingController.expectOne(`http://localhost:3000/indra-api/product/${productId}`);
		expect(req.request.method).toBe('GET');
		req.flush(mockResponse);
	});

  it('Should create a product', () => {
    const mockResponse: IResponse = {
      code: 201,
      message: 'Product registered successfully',
		};

		const newProduct: Partial<IProduct> = {
      name: 'Gaseosa',
      description: 'Gaseosa Pepsi 550 ml.',
      price: 2.5,
      src: '',
      createdAt: '2024-10-26T07:42:24.950Z',
    };

		productService.createProduct(newProduct).subscribe(resp => {
			expect(resp.code).toEqual(201);
      expect(resp.message).toEqual(mockResponse.message);
		});

		const req = httpTestingController.expectOne('http://localhost:3000/indra-api/product');
		expect(req.request.method).toBe('POST');
		req.flush(mockResponse);
	});

  it('Should update a product', () => {
    const productId = 'f811f670-a813-4adc-ab25-b97abff64c00';

    const mockResponse: IResponse = {
      code: 200,
      message: 'Product updated successfully',
		};

		const product: Partial<IProduct> = {
      name: 'Galleta',
      description: 'Galleta Vainilla 50 gr.',
      price: 1.5,
      src: '',
    };

		productService.updateProduct(productId, product).subscribe(resp => {
			expect(resp.code).toEqual(200);
      expect(resp.message).toEqual(mockResponse.message);
		});

		const req = httpTestingController.expectOne(`http://localhost:3000/indra-api/product/${productId}`);
		expect(req.request.method).toBe('PATCH');
		req.flush(mockResponse);
	});

  it('Should delete a product', () => {
    const productId = 'f811f670-a813-4adc-ab25-b97abff64c00';

    const mockResponse: IResponse = {
      code: 200,
      message: 'Product successfully deleted',
		};

    productService.deleteProduct(productId).subscribe(resp => {
      expect(resp.code).toBe(200);
      expect(resp.message).toEqual(mockResponse.message);
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/indra-api/product/${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });
});
