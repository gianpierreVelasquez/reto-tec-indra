import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('FooterComponent', () => {
	let component: FooterComponent;
	let fixture: ComponentFixture<FooterComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [MatToolbarModule],
			declarations: [FooterComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(FooterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render footer', () => {
		const fixture = TestBed.createComponent(FooterComponent);
		fixture.detectChanges();
		const compiled = fixture.nativeElement as HTMLElement;
		const currentYear = new Date().getFullYear();

		expect(compiled.querySelector('mat-toolbar span')?.textContent).toContain(
			`© ${currentYear} Todos los derechos reservados.`
		);
	});
});
