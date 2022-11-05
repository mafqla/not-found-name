import type { CircleOptions, Shape } from '.'
import {
  distance,
  isInRectArea,
  moveVector,
  RectBounding,
  V2D,
  Vector2D
} from '../utils/vector'

/**
 * 圆形
 */
export class Circle implements Shape, CircleOptions {
  constructor(options?: CircleOptions) {
    Object.assign(this, options)
  }

  radius: number = 0
  pos: Vector2D = V2D()
  get center() {
    return this.pos
  }

  selected?: boolean = false
  toggleSelect() {
    this.selected = !this.selected
  }
  setSelect(): void {
    this.selected = true
  }
  unSelect(): void {
    this.selected = false
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save()
    if (this.selected) {
      ctx.strokeStyle = 'blue'
    }
    const circle = new Path2D()
    circle.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI)
    ctx.stroke(circle)
    ctx.restore()

    // 画圆心
    const center = new Path2D()
    center.arc(this.pos.x, this.pos.y, 1, 0, 2 * Math.PI)
    ctx.fill(center)
  }

  isInnerPos(pos: Vector2D): boolean {
    return distance(pos, this.pos) < this.radius
  }

  isInArea(area: RectBounding): boolean {
    return isInRectArea(this.pos, area)
  }

  move(x: number, y: number): void {
    moveVector(this.pos, x, y)
  }
}
