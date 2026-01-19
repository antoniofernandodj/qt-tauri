import { Action } from "./action"

export class Separator extends Action {
  override type: string
  constructor(options?: Partial<Action>) {
    super(options)
    this.type = 'separator'
  }
}