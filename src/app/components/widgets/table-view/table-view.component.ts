import { Component, EventEmitter, Input, Output } from "@angular/core";
import { QItemSelectionModel, QModelIndex, QTableModel } from "../../../core/qtable-model";
import { NgFor } from "@angular/common";

@Component({
  selector: 'QTableView',
  standalone: true,
  imports: [NgFor],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.css'
})
export class TableViewComponent {

  @Input({ required: true })
  model!: QTableModel;

  @Input()
  selectionModel = new QItemSelectionModel();

  @Output()
  activated = new EventEmitter<QModelIndex>();

  onCellClick(row: number, column: number) {
    this.selectionModel.setCurrent({ row, column });
    this.activated.emit({ row, column });
  }
}
