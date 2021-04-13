# Poké fight

In deze applicatie kunnen pokemon-trainers het tegen elkaar opnemen en een gevechten starten in een realtime Pokemon arena.

## Het concept

In deze applicatie kunnen de gebruikers een Pokemon battle met elkaar beginnen. Wanneer een gebruiker in de lobby komt moet er een Pokemon uitgekozen worden die aan hun zijde gaat vechten. Wanneer een pokemon aanvalt zal de damage worden gebaseerd op de typering van de pokemons _(zie Damage-chart)_ . De pokemon battle gaat door totdat een van de pokemons niet meer kan vechten, wat zal gebeuren wanneer de `health bar` nul bereikt. Na een gevecht krijgt de winnende gebruiker een `victory` scherm en worden beide spelers terug gestuurd naar het begin scherm.

Als de gebruiker zich aanmeldt om een pokemon trainer te worden, word die doorverwezen naar de geselecteerde lobby. Wanneer er twee gebruikers in de lobby zijn en ze aan de voorwaardes voldoen is het mogelijk om een battle te starten.

<details>
  <summary>Damage-chart</summary>
  
  Hierbij ga ik voornamelijk gebruik maken van de eerste drie in deze lijst. 
  
  - **2** super-effective	Super Effective
  - **1** normal-damage	Normal
  - **0.5** not-very-effective	Not Very Effective
  - **0** _no-effect	No Effect_
  
  ![Pokemon-Lets-Go-Type-Chart](https://user-images.githubusercontent.com/40355914/114159726-5fccdb00-9926-11eb-9617-ad45ef56bdfa.jpeg)


</details>

<img width="1552" alt="Schermafbeelding 2021-04-09 om 11 03 58" src="https://user-images.githubusercontent.com/40355914/114157065-863d4700-9923-11eb-9c94-cd02f79d2fbe.png">

- [application concept](#application-concept)

## Features

- [] 

## Install

**Clone the repository of the project**

```
git clone https://github.com/RooyyDoe/real-time-web-1920.git
```

**Navigate to the map**

```
cd real-time-web-1920
```

**Install dependencies**

```
npm install
```

**Run server in terminal**

```
npm run dev
```

Server running on **localhost:5000**

**Demo** also will be running live at [Still Loading]()

## Ultieme applicatie schetsen

<details>
  <summary>Poké fight lobby </summary>
  
  ![WhatsApp Image 2021-04-12 at 15 14 37](https://user-images.githubusercontent.com/40355914/114404747-489c2080-9ba6-11eb-8701-5edb869cd4c4.jpeg)
  
  - Iedere socket die de lobby joined krijgt een persoonlijke personage die hij/zij kan voortbewegen. Dit zou gebeuren via de `pijltjes` of de `WASD` toesten.
    - Gebruikers zouden alleen kunnen lopen op gebieden waar dit mogelijk is en door tegen bepaalde elementen aan te lopen zou er een interactie ontstaan.


  - Wanneer gebruikers tegen elkaar aan lopen of op elkaar klikken komt er een selectie menu tevoorschijn. In dit menu staan verschillende interactie opties:
    - **Battle now:** Hier kunnen gebruikers elkaar uitdagen om een battle te starten
    - **Add friend:** Dit zou een systeem moeten zijn om elkaar toe te voegen in een vriendenlijst. Dit zou het dan makkelijk maken om elkaar weer uit te nodigen voor een rematch battle.
    - **Show pokemon:** Hier kan je de pokemon zien die deze gebruiker heeft gekozen.
    - **Trade now:** Een mogelijk trade systeem waar je items kan traden met elkaar voor bijvoorbeeld `in-game money`
    - **Balance: ...** Hier zie je hoeveel punten/geld de gebruiker heeft
    - **Inventory:** Deze is alleen zichtbaar wanneer je op je eigen personage klikt. Op deze manier kan je kijken wat voor items je in je inventory hebt zitten.


  - Het is mogelijk om met de punten die je verdient tijdens het vechten van battles items te kopen die je kan gebruiken tijdens een battle. Hierbij kan je denken aan een `healing potion` of en `strength boost`.

  - Om het wat makkelijker te maken voor gebruikers wil ik AI custom battles maken door middel van de interactie met de `gym` van de city. Wanneer een gebruiker naar de `gym` toeloopt kan hij/zij een battle starten en wanneer je deze wint verdien je muntjes waar je dus uiteindelijk items mee kan kopen of kan ruilen.

    Er zijn hoogst waarschijnlijk genoeg develop functionaliteiten waar ik rekening mee moet houden. Zelf heb ik zitten denken aan functionaliteiten zoals: localStorage, Iets wat een live positie kan bijhouden, Punten systeem, Interactie met elkaar, Anti cheat ( timers op AI custom battles, etc )
  
</details>

<details>
  <summary>Poké fight battle </summary>
  
  ![WhatsApp Image 2021-04-12 at 15 14 37 (1)](https://user-images.githubusercontent.com/40355914/114404741-48038a00-9ba6-11eb-9a2a-e6dde52f8b7e.jpeg)
  
  1. Wanneer de gebruiker op de `attack` button klikt veranderen de vier menu items naar vier verschillende aanvallen van jou geselecteerde pokemon. Deze aanvallen hebben een max aantal selecties, zodat je ze niet kan spammen. Elke aanval heeft zijn eigen damage en zal meer damage doen als het tegen een zwakker `type` is.
  2. Tijdens een battle kan je van drie maal van items gebruik maken. Dit kan een boost voor je pokemon geven of hem/haar healen voor een bepaald percentage.
  3. Als je geen zin meer hebt in de battle kun je altijd leaven. Het geld dan wel dat je automatisch hebt verloren en de punten dus naar de tegenstander gaan.
  4. Hier wordt er feedback gegeven aan de gebruiker door kleine pop-ups die vertellen wat er allemaal gedaan kan worden.
  5. Hier komen de feedback messages binnen die er komen tijdens een battle. Ook staat hier precies in wat er gaat gebeuren of moet gebeuren.
  6. Het algemene battle screen. hier komen twee pokemons tegenover elkaar te staan die het tegen elkaar gaan opnemen. Vanuit je eigen view zal je altijd onder aan staan en is het rechter HP element van jou. Je zal zien wanneer er HP af gaat bij je pokemon en ook wanneer er HP afgaat bij de tegenstander.
  
</details>

## Data life cycle

![data-life-cycle-diagram-real-time-web](https://user-images.githubusercontent.com/40355914/114565200-566aa800-9c71-11eb-8704-5edd6ce8bfc7.png)

## Socket server events

## Socket client listeners

## API

## Conclusie


## Sources

- [Mozilla Developer Network](https://developer.mozilla.org/en-US/) - I mostly used this site to obtain my sources

## Credits
