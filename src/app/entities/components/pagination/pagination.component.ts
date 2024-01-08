import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input()
  public current: number = 0;

  @Input()
  public total: number = 0;

  @Output()
  public goTo: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public next: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public previous: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  public nav: boolean = true;

  public pages: number[] = [];

  public ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['current'] && changes['current'].currentValue) ||
      (changes['total'] && changes['total'].currentValue)
    ) {
      this.pages = this._getPages(this.current, this.total);
    }
  }
  /**
   * Переход на нужную страницу
   * @param {number} page - выбранный номер страницы
   */
  public onGoTo(page: number): void {
    this.goTo.emit(page);
  }

  /**
   * Переход на следующую/предыдущую страницу
   * @param {boolean} isForward - вперёд/назад страницу
   */
  public changePage(isForward: boolean): void {
    isForward ? this.next.emit(this.current) : this.previous.next(this.current);
  }

  /**
   * функция для показа страниц в нужном формате
   *
   * @param {number} current - номер страницы
   * @param {number} total - количество страниц
   * @private
   */
  private _getPages(current: number, total: number): number[] {
    if (total < 8) {
      return [...Array(total).keys()].map((key: number) => ++key);
    }

    if (current > 5) {
      if (current > total - 5) {
        return [1, -1, total - 4, total - 3, total - 2, total - 1, total];
      } else {
        return [1, -1, current - 1, current, current + 1, -1, total];
      }
    }

    return [1, 2, 3, 4, 5, -1, total];
  }
}
