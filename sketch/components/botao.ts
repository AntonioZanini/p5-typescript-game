export class Botao {
  private visible: boolean;
  private botao: p5.Element;
  constructor(private texto: string, 
              private posX: number, 
              private posY: number, 
              private classe: string, 
              private centralizacao: string) {
    this.visible = false;
  }

  load(funcao: () => void) {
    this.botao = createButton(this.texto);
    this.botao.mousePressed(funcao);
    this.botao.addClass(this.classe);
    this.visible = true;
  }
  
  draw() {
    this.botao.position(this.posX, this.posY);
    if (this.visible == true && this.centralizacao) {
      this.botao.center(this.centralizacao);
    }
  }

  close() {
    this.visible = false;
    this.botao.remove();
  }

}