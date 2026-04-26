import { Component, EventEmitter, Input, Output } from "@angular/core";
import { QItemSelectionModel, QModelIndex, QTableModel } from "../../../core/qtable-model";
import { NgFor } from "@angular/common";

/**
 * @component QTableView
 * @description
 * Um widget que exibe dados de um modelo em uma grade tabular.
 * Equivalente ao QTableView do Qt.
 *
 * @purpose
 * Visualizar e manipular grandes conjuntos de dados estruturados de forma eficiente.
 *
 * @solves
 * - **Desacoplamento de Dados**: Resolve o problema de misturar lógica de visualização com os dados brutos, delegando ao `QTableModel`.
 * - **Gerenciamento de Seleção**: Centraliza a lógica de "qual célula está ativa" no `QItemSelectionModel`.
 * - **Navegação em Grade**: Fornece uma interface de cabeçalho e linhas que é o padrão da indústria para aplicações desktop.
 *
 * @usage
 * ```html
 * <QTableView [model]="myTableModel"></QTableView>
 * ```
 *
 * @prop {QTableModel} model - O modelo de dados que fornece os conteúdos das células e cabeçalhos.
 */
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
