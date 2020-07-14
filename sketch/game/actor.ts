import { SizeType } from '../enums';
import { ISpriteAnimation, IRectangle }  from '../interfaces';

export class Actor {
  
  protected currentAnimation: ISpriteAnimation;
  public location: IRectangle;
  protected sizeType: SizeType;

  constructor(
    location: IRectangle,
    sizeType: SizeType
  ) {
    this.location = location;
    this.sizeType = sizeType;
  }

  draw(animation: ISpriteAnimation) {
    if (!this.currentAnimation || !this.currentAnimation.equals(animation)) {
      this.currentAnimation = animation;
      if (this.sizeType == SizeType.dynamic) { this.updateSize(); }
    }
    this.currentAnimation.draw(this.location);
  }

  updateSize() {
    const a = this.currentAnimation;
    
    if (a.suggestedHeight && this.location.height > 0){
      this.location.posY = this.location.posY + 
          (this.location.height - a.suggestedHeight);
    }

    this.location.height = a.suggestedHeight ? 
                           a.suggestedHeight:
                           this.location.height;
                           
    this.location.width = a.suggestedWidth ? 
                          a.suggestedWidth:
                          this.location.width;
  }
}