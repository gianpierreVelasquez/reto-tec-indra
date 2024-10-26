import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
	selector: 'app-paginator',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
	@Input() public items: any[] = [];
	@Input() public pageSize = 0;

	@Output() public onPageChangeEmitter = new EventEmitter();

  protected pageSizeOptions = [5, 10, 20, 50];

	public onPageChange(event: PageEvent): void {
		this.pageSize = event.pageSize;
		const pageIndex = event.pageIndex;
		this.onPageChangeEmitter.next({ size: this.pageSize, index: pageIndex });
	}
}
