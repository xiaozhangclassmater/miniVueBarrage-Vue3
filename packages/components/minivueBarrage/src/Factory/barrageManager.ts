import { BarrageItem } from '../types'
export interface BarrageManagerTypes {
  barrages: BarrageItem[],
  play: () => void
  createBarrage:() => void
  close:() => void
  refresh:() => void
  _init:() => void
}
class BarrageManager {
  private barrages:BarrageItem[] = []
  constructor(barrages?: BarrageItem[]){
    this.barrages = barrages || []
  }
  set(values: BarrageItem[]) {
    this.barrages = values
  }
  get() {
    return this.barrages
  }
  size () {
    return this.barrages.length || 0
  }

}

export default BarrageManager
