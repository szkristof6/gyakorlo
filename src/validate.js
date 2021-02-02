const Joi = require('joi');

const InputVer = Joi.object({
  valasztottmodok: Joi.array()
    .items(Joi.string()
      .length(1)
      .required())
    .max(4),
  feladatszam: Joi.number()
    .integer()
    .greater(0)
    .positive(),
  legnagyobbszam: Joi.number()
    .integer()
    .greater(0)
    .positive(),
  legkisebbszam: Joi.number()
    .integer()
    .greater(0)
    .less(Joi.ref('legnagyobbszam'))
    .positive(),
  tagokszama: Joi.number()
    .integer()
    .greater(1)
    .max(10)
    .positive(),
});

const megoldasVer = Joi.number()
  .integer()
  .greater(0)
  .positive();

function errorHandler(type) {
  let massage;
  if (type === 'array.includesRequiredUnknowns') massage = 'Adj meg egy játékmódot!';
  if (type === 'array.max') massage = 'A jelenleg elérhető játékmódok száma 4!';
  if (type === ('string.length' || 'string.base')) massage = 'Nem megfalelő játékmód formátum!';
  if (type === 'number.base') massage = 'Nincs megadva minden *-al jelölt érték, vagy nem szám(ok)!';
  if (type === 'number.integer') massage = 'A megadott szám(ok) nem egészek!';
  if (type === 'number.max') massage = 'A megadott tagok száma túl sok!';
  if (type === ('number.greater' || 'number.negative')) massage = 'A megadott szám(ok) negatívak!';
  if (type === 'number.less') massage = 'A legkisebb számnak kissebbnek kell lennie, mint a legnagyobb szám!';

  return massage;
}

module.exports = {
  InputVer,
  megoldasVer,
  errorHandler,
};
