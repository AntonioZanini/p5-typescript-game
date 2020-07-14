export class Barra {
  constructor(
    private imagem: p5.Image,
    private valorMaximo: number,
    private corPrincipal: string,
    private corSecundaria: string,
    private posX: number,
    private posY: number,
    private largura: number,
    private altura: number) {
  }

  draw(valor: number) {
    const ajuste = this.altura * 0.2;
    fill(this.corSecundaria);
    rect(this.posX, this.posY, this.largura, this.altura, 30);
    let largura = this.largura * (valor / this.valorMaximo);
    fill(this.corPrincipal);
    rect(this.posX, this.posY, largura, this.altura, 30);
    fill(color(0, 0, 0));
    image(this.imagem, this.posX - ajuste, this.posY - ajuste, this.altura + ajuste, this.altura + ajuste);
  }
}