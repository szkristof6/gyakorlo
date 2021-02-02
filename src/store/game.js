import { InputVer, megoldasVer, errorHandler } from '@/validate';
import { SnackbarProgrammatic as Snackbar } from 'buefy';
import db from '@/database';
import firebase from '@/firebase';

function getData(form) {
  const formData = new FormData(form);

  const modok = ['+', '-', '*', '/'];
  const valasztottmodok = [];
  modok.forEach((element) => {
    if (formData.get(element) === 'false') {
      valasztottmodok.push(element);
    }
  });

  const feladatszam = parseInt(formData.get('feladatszam'), 10);
  const legnagyobbszam = parseInt(formData.get('legnagyobbszam'), 10);
  const legkisebbszam = parseInt(formData.get('legkisebbszam'), 10) || 2;
  const tagokszama = parseInt(formData.get('tagokszama'), 10) || 2;

  return {
    valasztottmodok,
    feladatszam,
    legnagyobbszam,
    legkisebbszam,
    tagokszama,
  };
}

function ListaEllenorzes(lista, mod) {
  let value;
  if (mod === '+') {
    value = 0;
    for (let i = 0; i < lista.length; i += 1) {
      value += lista[i];
    }
  }

  if (mod === '-') {
    value = lista[0];
    for (let i = 1; i < lista.length; i += 1) {
      value -= lista[i];
    }
  }

  if (mod === '*') {
    value = 1;
    for (let i = 0; i < lista.length; i += 1) {
      value *= lista[i];
    }
  }

  if (mod === '/') {
    value = lista[0];
    for (let i = 1; i < lista.length; i += 1) {
      value /= lista[i];
    }
  }
  return value;
}

function Listamaximum(lista) {
  let max = lista[0].elteltido;
  for (let i = 0; i < lista.length; i += 1) {
    if (lista[i].elteltido > max) {
      max = lista[i].elteltido;
    }
  }
  return max;
}

function Listaminimum(lista) {
  let min = lista[0].elteltido;
  for (let i = 0; i < lista.length; i += 1) {
    if (lista[i].elteltido < min) {
      min = lista[i].elteltido;
    }
  }
  return min;
}

function Listaatlag(lista) {
  const reszlista = [];
  for (let i = 0; i < lista.length; i += 1) {
    reszlista.push(lista[i].elteltido);
  }
  return parseInt(ListaEllenorzes(reszlista, '+') / lista.length, 10);
}

function Listaösszeg(lista) {
  let r = 0;
  for (let i = 0; i < lista.length; i += 1) {
    r += lista[i].elteltido;
  }
  return r;
}

function ListaKiir(lista, mod) {
  let str = '';
  for (let i = 0; i < lista.length; i += 1) {
    str += `${lista[i]} ${mod} `;
  }
  return str.slice(0, -3);
}

function szamjegy(value) {
  const resz = `${value}`;
  if (resz.length < 2) {
    return `0${resz}`;
  }
  return resz;
}

function Idolebontas(elteltido) {
  return `${szamjegy(parseInt(elteltido / 60, 10))} : ${szamjegy(elteltido % 60)}`;
}

function RandomGen(max, min) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;
}

function szamcsinalo(max, min, darab, mod) {
  let maxgenszam;
  const lista = [];

  if (mod === '+') {
    maxgenszam = parseInt(max / darab, 10);
    for (let i = 0; i < darab; i += 1) {
      lista.push(RandomGen(maxgenszam, min));
    }
  }

  if (mod === '-') {
    const reszlista = [];
    maxgenszam = parseInt(max / darab, 10);
    for (let i = 0; i < darab; i += 1) {
      reszlista.push(RandomGen(maxgenszam, min));
    }
    lista.push(ListaEllenorzes(reszlista, '+'));
    reszlista.sort((a, b) => a - b);
    for (let i = 0; i < reszlista.length - 1; i += 1) {
      lista.push(reszlista[i]);
    }
  }

  if (mod === '*') {
    maxgenszam = parseInt(max ** (1 / darab), 10);
    for (let i = 0; i < darab; i += 1) {
      lista.push(RandomGen(maxgenszam, min));
    }
  }

  if (mod === '/') {
    const reszlista = [];
    maxgenszam = parseInt(max ** (1 / darab), 10);
    for (let i = 0; i < darab; i += 1) {
      reszlista.push(RandomGen(maxgenszam, min));
    }
    lista.push(ListaEllenorzes(reszlista, '*'));
    for (let i = 0; i < reszlista.length - 1; i += 1) {
      lista.push(reszlista[i]);
    }
  }
  return lista;
}

function Mod(modok) {
  return modok[Math.floor(Math.random() * modok.length)];
}

function Pontok(szamok, mod) {
  let adhatopont = 0;
  if (mod === '+' || mod === '-') {
    adhatopont = 15;
    for (let i = 0; i < szamok.length; i += 1) {
      if (Math.ceil(Math.log10(szamok[i] + 1)) === 1) {
        adhatopont -= 3;
      }
      if (szamok[i] % 10 === 0) {
        adhatopont -= 5;
      }
    }
  }
  if (mod === '*' || mod === '/') {
    adhatopont = 35;
    for (let i = 0; i < szamok.length; i += 1) {
      if (Math.ceil(Math.log10(szamok[i] + 1)) === 1) {
        adhatopont -= 9;
      }
      if (szamok[i] % 10 === 0) {
        adhatopont -= 10;
      }
    }
  }

  adhatopont = parseInt(adhatopont * (szamok.length * 0.5), 10);
  if (adhatopont <= 0) {
    return 0;
  }
  return adhatopont;
}

async function Game(object) {
  const { data } = object;
  const { jelzok } = object;

  const mod = Mod(data.valasztottmodok);
  let szamok = szamcsinalo(data.legnagyobbszam, data.legkisebbszam, data.tagokszama, mod);

  jelzok.feladat.innerHTML = ListaKiir(szamok, mod);
  jelzok.pont.innerHTML = data.pontszam;
  jelzok.maradek.innerHTML = data.feladatszam;

  let elteltido = 0;
  let pontlevonas = 0;
  const timer = setInterval(() => {
    elteltido += 1;
    jelzok.ido.innerHTML = Idolebontas(elteltido);
    if (Number.isInteger(elteltido / 5) && object.levon) {
      data.pontszam -= 1;
      pontlevonas += 1;
      jelzok.pont.innerHTML = data.pontszam;
    }
  }, 1000);

  console.log(szamok, mod, data.lista, data.pontszam, ListaEllenorzes(szamok, mod));
  object.gomb.onclick = async (event) => {
    event.preventDefault();
    try {
      const megoldas = await megoldasVer.validateAsync(object.megoldas.value);

      if (megoldas !== ListaEllenorzes(szamok, mod)) {
        data.pontszam -= 5;
        object.pont.innerHTML = data.pontszam;
        Snackbar.open('Nem jó megoldás!');
      } else {
        const kapottpont = (Pontok(szamok, mod) - pontlevonas);
        data.pontszam += kapottpont;

        object.megoldas.value = '';
        clearInterval(timer);

        data.lista.push({
          szamok,
          mod,
          elteltido,
          kapottpont,
        });
        data.feladatszam -= 1;
        object.levon = true;

        if (data.feladatszam > 0) {
          szamok = [];
          Game(object);
        } else {
          const gamesdb = db.collection('games');
          const result = gamesdb.doc();
          const user = firebase.auth().currentUser;

          const json = {
            id: result.id,
            user_id: user.uid,
            lista: data.lista,
            pont: data.pontszam,
            osszes_ido: Idolebontas(Listaösszeg(data.lista)),
            atlag_ido: Idolebontas(Listaatlag(data.lista)),
            gyors_ido: Idolebontas(Listaminimum(data.lista)),
            lassu_ido: Idolebontas(Listamaximum(data.lista)),
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
          };

          await gamesdb.doc(result.id).set(json);
          await db.collection('users').doc(user.uid).update({
            pont: firebase.firestore.FieldValue.increment(data.pontszam),
          });

          const { document } = object;
          document.querySelector('#elertpont').innerHTML = data.pontszam;
          document.querySelector('#osszesido').innerHTML = Idolebontas(Listaösszeg(data.lista));
          document.querySelector('#atlag').innerHTML = Idolebontas(Listaatlag(data.lista));
          document.querySelector('#gyors').innerHTML = Idolebontas(Listaminimum(data.lista));
          document.querySelector('#lassu').innerHTML = Idolebontas(Listamaximum(data.lista));

          const tbody = document.querySelector('tbody');
          for (let i = 0; i < data.lista.length; i += 1) {
            const tr = document.createElement('tr');

            const th = document.createElement('th');
            th.appendChild(document.createTextNode(i + 1));
            th.setAttribute('scope', 'row');
            tr.appendChild(th);

            const tdszamok = document.createElement('td');
            tdszamok.appendChild(document.createTextNode(
              ListaKiir(data.lista[i].szamok, data.lista[i].mod),
            ));
            tr.appendChild(tdszamok);

            const tdido = document.createElement('td');
            tdido.appendChild(document.createTextNode(Idolebontas(data.lista[i].elteltido)));
            tr.appendChild(tdido);

            const tdpont = document.createElement('td');
            tdpont.appendChild(document.createTextNode(data.lista[i].kapottpont));
            tr.appendChild(tdpont);

            tbody.appendChild(tr);
          }

          object.context.commit('gameend');
          object.next.action();
        }
      }
    } catch (error) {
      if (error.isJoi === true) {
        const { type } = error.details[0];
        Snackbar.open(errorHandler(type));
      } else {
        console.log(error);
        // Snackbar.open(error);
      }
    }
  };
}

const actions = {
  async initGame(context, form) {
    if (!context.state.isOn) {
      try {
        const predata = getData(form);
        const validateddata = await InputVer.validateAsync(predata);
        const pontszam = 0;
        const lista = [];
        /* eslint-disable */
        return ({
          ...validateddata,
          pontszam,
          lista,
        });
      } catch (error) {
        if (error.isJoi === true) {
          const { type } = error.details[0];
          return ({
            error: errorHandler(type),
          });
        }
        return ({
          error,
        });
      }
    }
    return false;
  },

  startGame(context, object) {
    context.commit('gamestart');
    // object.next.action();
    const json = {
      ...object,
      context,
    };
    Game(json);
  },
};

const mutations = {
  gamestart(state) {
    state.isOn = true;
  },
  gameend(state) {
    state.isOn = false;
  },
};

const state = {
  isOn: false,
};

export default {
  namespaced: true,
  mutations,
  state,
  actions,
};
