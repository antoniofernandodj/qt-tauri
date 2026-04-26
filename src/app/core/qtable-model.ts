export interface QModelIndex {
    row: number;
    column: number;
  }
  
  /**
   * @class QTableModel
   * @description
   * Interface abstrata que define como o QTableView interage com os dados.
   * Equivalente ao QAbstractTableModel do Qt.
   *
   * @purpose
   * Fornecer uma camada de abstração entre a visualização (TableView) e a estrutura de dados real.
   * Isso permite que você altere como os dados são armazenados sem mudar como eles são exibidos.
   */
  export abstract class QTableModel<T = any> {
  
    abstract rowCount(): number;
    abstract columnCount(): number;
  
    abstract data(row: number, column: number): unknown;
    abstract headerData(column: number): string;
  
    flags?(row: number, column: number): {
      editable?: boolean;
      selectable?: boolean;
    };
  
    setData?(row: number, column: number, value: unknown): boolean;
  }
  

  /**
   * @class SimpleTableModel
   * @description
   * Uma implementação pronta para uso do QTableModel para dados estáticos ou simples baseados em arrays de objetos.
   *
   * @usage
   * ```ts
   * const model = new SimpleTableModel(
   *   [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }],
   *   ['id', 'name']
   * );
   * ```
   */
  export class SimpleTableModel<T extends object> extends QTableModel<T> {

    selectionModel: QItemSelectionModel
    constructor(
      private rows: T[],
      private columns: (keyof T)[]
    ) {
      super();
      this.selectionModel = new QItemSelectionModel();
    }
  
    rowCount() {
      return this.rows.length;
    }
  
    columnCount() {
      return this.columns.length;
    }
  
    data(row: number, column: number) {
      const key = this.columns[column];
      return this.rows[row][key];
    }
  
    headerData(column: number) {
      return String(this.columns[column]);
    }
  
    override setData(row: number, column: number, value: unknown) {
      const key = this.columns[column];
      (this.rows[row] as any)[key] = value;
      return true;
    }
  }
  

  export class QItemSelectionModel {

    private _current?: QModelIndex;
  
    current() {
      return this._current;
    }
  
    setCurrent(index: QModelIndex) {
      this._current = index;
    }
  
    isSelected(row: number, column: number): boolean {
      return (
        this._current?.row === row &&
        this._current?.column === column
      );
    }
  }
  