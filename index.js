import { readFileSync, writeFileSync } from 'fs';

const regex =
  /^(?:\d{0,2} )?(?<date>\d{2}\/\d{2}) (?<place>[^\d-]+)(?<value>.*)/gm;

const file = await readFileSync('fatura.txt', 'utf8');

const matches = file.toString().matchAll(regex);

let csv = 'Data,Local,Valor\n';
for (const match of matches) {
  const value = match.groups.value.match(/([\d\.,-]+)$/)[0];
  const place = match.groups.place + match.groups.value.replace(value, '');
  csv += `${match.groups.date.trim()},${place.trim()},"${value.replace('.', '').replace(',', '.')}"\n`;
}

writeFileSync('fatura.csv', csv);