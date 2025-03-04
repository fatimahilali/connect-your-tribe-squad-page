# Squad page

Ontwerp en maak met een team een website met NodeJS en JSON.

De instructie vind je in: [INSTRUCTIONS](https://github.com/fdnd-task/connect-your-tribe-squad-page/blob/main/docs/INSTRUCTIONS.md)

## Inhoudsopgave Squad page

  *[Beschrijving](#beschrijving)
  *[Kenmerken](#kenmerken)
  *[Installatie](#installatie)
  *[Gebruik](#gebruik)
  *[Bronnen](#bronnen)
  *[Licentie](#licentie)

## Beschrijving

Mijn project is een website voor Squad 1G. Bovenaan de pagina staat een grote neon-header met de naam van de squad. Dit effect is gemaakt met CSS-animaties voor een coole uitstraling.

Daaronder zie je de studenten van Squad 1G, met hun profielfoto’s. Deze worden automatisch opgehaald via een API. Als een foto niet beschikbaar is, wordt er een standaardafbeelding getoond.

De website is zo gemaakt dat hij toegankelijk is voor iedereen, ook voor mensen met een visuele beperking. Daarom is er een verborgen titel voor screenreaders.

link :
https://connect-your-tribe-squad-page-so6s.onrender.com/

image :
<img src="./public/assets/web.png" alt="website" style="width: 450px; height: auto;">

## Kengit addmerken

HTML Structuur
Semantische structuur met <header>, <section>, <article>.
Dynamische rendering met Liquid Templates ({% for person in persons %}) om studentengegevens automatisch op te halen.
Neon-header (<span class="text">) met CSS-animaties voor Squad 1G.
Responsieve grid-layout voor de studentenlijst met flexibele kolommen.

CSS (Mobile-first met uitbreidingen voor desktop)
Neon- en glow-effecten met keyframes-animaties en text-shadow.
Hover- en blur-effecten voor een interactieve look.
Responsieve grid-layout (grid-template-columns) voor de studentensectie.
Verborgen toegankelijkheidselementen met .visually-hidden voor screenreaders.

## Installatie

-De repository forken en de URL kopiëren.
-De repository klonen via de terminal: git clone: gekopieerde-URL
-De projectmap openen in VS Code via de terminal:cd repository-map
-Alle benodigde pakketten installeren met: npm install
-npm start:
-Bij een succesvolle start verschijnt het bericht:Application started on localhost:8000

## Gebruik

## Bronnen

The Liquid Template Language
stackoverflow.com
keyframes van een project

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
