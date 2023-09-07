import { readFileSync, writeFileSync } from 'fs';

/*
* Mathes example
* 1 25/07 Place with anything on it 11,98
* 1 - ignored
* 25/07 - date
* Place with anything on it - place
* 11,98 - value
*/
const regex =
  /^(?:\d{0,2} )?(?<date>\d{2}\/\d{2}) (?<place>[^\d-]+)(?<value>.*)/gm;

const file = await readFileSync('fatura.txt', 'utf8');

const matches = file.toString().matchAll(regex);

const entries = [];
for (const match of matches) {
  const value = match.groups.value.match(/([\d\.,-]+)$/)[0];
  const place = match.groups.place + match.groups.value.replace(value, '');
  entries.push([match.groups.date.trim(), place.trim(), `"${value.replace('.', '')}"`]);
}

// group by place
entries.sort((a, b) => a[1].localeCompare(b[1]));

let csv = 'Data,Local,Valor\n';
csv += entries.map((entry) => entry.join(',')).join('\n');
writeFileSync('fatura.csv', csv);