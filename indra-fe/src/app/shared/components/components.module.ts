import { NgModule } from '@angular/core';
// Angular Mat
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

// Custom Components
import { CommonModule } from '@angular/common';

// Pipes
import { SanitizeImageUrlPipe } from '@shared/pipes/sanitize-image-url.pipe';

@NgModule({
	exports: [
		MatButtonModule,
		MatCardModule,
		MatFormFieldModule,
		MatGridListModule,
		MatIconModule,
		MatInputModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatToolbarModule,
    SanitizeImageUrlPipe
	],
	imports: [
		CommonModule,
		MatButtonModule,
		MatCardModule,
		MatFormFieldModule,
		MatGridListModule,
		MatIconModule,
		MatInputModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatToolbarModule,
	],
	declarations: [SanitizeImageUrlPipe],
})
export class ComponentsModule {}
