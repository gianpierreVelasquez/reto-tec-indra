import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductLayoutComponent } from './layout/product-layout/product-layout.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { ComponentsModule } from '@shared/components/components.module';
import { LoaderInterceptor } from '@core/interceptors/loader.interceptor';

@NgModule({
	declarations: [
		AppComponent,
		ProductLayoutComponent,
		HeaderComponent,
		FooterComponent,

	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AppRoutingModule,
		ComponentsModule,
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
