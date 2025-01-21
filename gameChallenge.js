/* Juego de gladiadores:
existen tres tipos de Luchador, los soldados, los asesinos y los magos.
Los guerreros, fuertes ataques con mucha vida, daño intermedio y poca stamina.
Los asesinos!, ágiles Luchador con poca vida gran daño y mucha stamina.
Los sabios magos, de poca vida, gran daño y gran mana.
Y los curanderos, de poca vida, poco daño y poca mana.

Los guerreros aplican un bonus de defensa a sus cualidades de vida.
Los asesinos aplican veneno en sus ataques !! potenciando su daño.
Los magos pueden hacer daño, con sus grandes bolas de fuego !! y pueden
curarse pero en poca medida.
Los curanderos pueden curar en grandes proporciones pero tienen muy poco
daño.

Estos guerreros utilizan stamina y mana para realizar sus ataques según el
tipo de luchador que sean, sin recursos NO hay ataques !!
A cada ataque se le descontará la defensa del que lo recibe y eso influirá
sus puntos de vida.

Deben realizar un simulador de peleas ! donde tendrán listas de personajes,
cada uno de un tipo y cualidades diferentes, y de manera random estos
atacaran o utilizaran habilidades para decidir un ganador !! */

class Luchador {
  constructor(nombre, vida, ataque) {
    this.nombre = nombre;
    this.vida = vida;
    this.ataque = ataque;
  }
  getNombre() {
    return this.nombre;
  }
  setNombre(nombre) {
    this.nombre = nombre;
  }
  getVida() {
    return this.vida;
  }
  setVida(vidaRestante) {
    this.vida = vidaRestante <= 0 ? 0 : vidaRestante;
    if (!this.vida) {
      console.log(`${this.getNombre()} ha muerto!`);
    }
  }
  getAtaque() {
    return this.ataque;
  }
  setAtaque(ataque) {
    this.ataque = ataque;
  }

  atacar(luchadorVictima) {
    const vidaRestante = luchadorVictima.getVida() - this.getAtaque();
    luchadorVictima.setVida(vidaRestante);
  }
  // Otra forma meAtaca (opc meDefiendo)
  // meAtaca(luchadorAtacante) {
  //   super.setVida(super.getVida() - luchadorAtacante.getAtaque());
  // }
}

class LuchadorConStamina extends Luchador {
  constructor(nombre, vida, ataque, stamina) {
    super(nombre, vida, ataque);
    this.stamina = stamina;
  }
  getStamina() {
    return this.stamina;
  }
  setStamina(stamina) {
    this.stamina = stamina <= 0 ? 0 : stamina;
    if (!this.stamina) {
      console.log(`${this.getNombre()} se quedo sin stamina!`);
    }
  }
  atacar(luchadorVictima) {
    const staminaRestante = this.getStamina() - super.getAtaque();
    const vidaRestante = luchadorVictima.getVida() - super.getAtaque();
    //calculando cuanto le queda de stamina para realizar el ataque
    if (staminaRestante >= 0) {
      luchadorVictima.setVida(vidaRestante);
      this.setStamina(staminaRestante);
    }
    //console.log(`${this.nombre} se quedo sin stamina!`);
  }
}
class Guerrero extends LuchadorConStamina {
  constructor(nombre, vida, ataque, stamina, defensa) {
    super(nombre, vida, ataque, stamina); // Llama al constructor de Luchador
    //super: Permite inicializar las propiedades heredadas de la clase base (Luchador).
    this.defensa = defensa;
  }
  getDefenda() {
    return this.defensa;
  }
  setDefensa(defensa) {
    this.defensa = defensa;
  }
  //redefiniendo Vida + defensa
  getVida() {
    //check atacar de luchador
    return super.getVida + this.defensa;
  }
}
class Asesino extends LuchadorConStamina {
  constructor(nombre, vida, ataque, stamina, veneno) {
    super(nombre, vida, ataque, stamina);
    this.veneno = veneno;
  }
  //redefiniendo Ataque + daño veneno
  getAtaque() {
    return super.getAtaque + this.veneno;
  }
}

class LuchadorConMana extends Luchador {
  constructor(nombre, vida, ataque, mana) {
    super(nombre, vida, ataque);
    this.mana = mana;
  }
  getMana() {
    return this.mana;
  }
  setMana(mana) {
    this.mana = mana <= 0 ? 0 : mana;
    if (!this.mana) {
      console.log(`${this.getNombre()} se quedo sin mana!`);
    }
  }
  curar(extra) {
    super.setVida(super.getVida() + extra);
  }
  atacar(luchadorVictima) {
    const manaRestante = this.getMana() - super.getAtaque();
    //console.log("negativos");
    const vidaRestante = luchadorVictima.getVida() - super.getAtaque();
    //calculando cuanto le queda de mana para realizar el ataque
    if (manaRestante >= 0) {
      luchadorVictima.setVida(vidaRestante);
      this.setMana(manaRestante);
    }
    //console.log(`${this.nombre} se quedo sin mana!`);
  }
}
class Mago extends LuchadorConMana {
  constructor(nombre, vida, ataque, mana, bolaDeFuego) {
    super(nombre, vida, ataque, mana);
    this.bolaDeFuego = bolaDeFuego;
  }
  getAtaque() {
    return super.getAtaque + this.bolaDeFuego;
  }
}
class Curandero extends LuchadorConMana {
  constructor(nombre, vida, ataque, mana) {
    super(nombre, vida, ataque, mana);
  }
  curar(extra) {
    super.curar(extra * 2);
  }
}

//comprobando...
const mago = new Mago("Mago", 200, 600, 1000, 200);
const asesino = new Asesino("Asesino", 200, 600, 1000, 200);

const luchadores = [mago, asesino];
const [luchador1, luchador2] = luchadores;

const demo = `${luchador1.getNombre()} ataca primero`;
console.log(demo);
luchador1.atacar(luchador2);
const final = `${luchador2.getNombre()} queda con ${luchador2.getVida()} de vida`;
console.log(final);
