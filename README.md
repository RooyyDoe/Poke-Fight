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

## inhoudsopgave

- [Het concept](#het-concept)
- [Features](#features)
  - [Must haves](#[m]-must-haves)

## Features

### **[M]** **Must haves**

deze eisen moeten in het eindresultaat terugkomen, zonder deze eisen is het product niet bruikbaar

- [] 

### **[S]** **Should haves**

deze eisen zijn zeer gewenst, maar zonder is het product wel bruikbaar

- [] 

### **[C]** **Could haves**

deze eisen zullen alleen aan bod komen als er tijd genoeg is

- [] 

## Installatie

**Clone de repository van het project**

```
git clone https://github.com/RooyyDoe/real-time-web-1920.git
```

**Navigeer naar de map**

```
cd real-time-web-1920
```

**Installeer dependencies**

```
npm install
```

**Run de server in je terminal**

```
npm run dev
```

Server runt dan op: **localhost:5000**

**Demo** kun je ook beijken op: [Poké fight](https://best-poke-fight.herokuapp.com/)

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

![data-lifecycle-diagram](https://user-images.githubusercontent.com/40355914/115213956-57cd2200-a102-11eb-9ed4-ff4e7902913e.png)

## Socket server events

<details> 
  <summary>notification</summary>
  
  Elke keer wanneer een gebruiker de kamer toetreed zal hij een welkomst bericht krijgen. Als een nieuwe gebruiker zijn `lobby` toetreed komt hier een notificatie van deze notificatie is ook zichtbaar wanneer er een gebruiker de `lobby` verlaat.

</details>

<details> 
  <summary>gym-users</summary>
  
  Met dit event wordt er een `array` doorgestuurd met hierin een lijst van gebruikers die in een bepaalde gym zijn toegetreden. deze `array` wordt uitgelezen en weergeven op het scherm van de gebruikers. De gebruikers zullen in de lobby een lijst zien met zichzelf en de tegenstander waar hij/zij tegen moet spelen.

</details>

<details> 
  <summary>return-search-results</summary>
  
  Na dat alle `API` calls zijn gedaan wordt de benodigde data naar de `client` gestuurd. In de `API` calls wordt een `object` gemaakt waar alle nodige informatie instaat over de gekozen pokemon. Door deze door te sturen naar de `client` kan alle data worden toegevoegd aan elementen in het lobby/battle scherm.

</details>

<details> 
  <summary>battle-start</summary>
  
  Wanneer beide gebruikers op de `start` knop hebben gedrukt begint de battle. De lobby layout veranderd naar de `battle room` layout en alle elementen die nodig zijn voor de battle worden ingeladen. Hiermee moet je dus denken aan de `health-bar`, `Pokemon naam`, `Pokemon image` en `battle-messages` / `attack-button`

</details>

<details> 
  <summary>health-checker</summary>
  
  Elke keer wanneer er een aanval is geweest wordt de nieuwe `health` doorgestuurd naar de client en hier geupdate. Op deze manier ziet de gebruiker precies hoeveel damage hij heeft aangericht bij zijn tegenstander.

</details>

<details> 
  <summary>turn-checker</summary>
  
  In een pokemon battle moet je natuurlijk omstebeurt kunnen aanvallen en dit event zorgt hiervoor. Hij checkt elke keer wanneer er een aanval is geweest welke speler er nu aan de beurt is. Dit doe ik door middel van een `turn_player1` boolean. Deze houd bij wanneer speler 1 aan de beurt is en op deze manier geeft die dit door aan de `client-side`

</details>

<details> 
  <summary>game-over</summary>
  
  Wanneer een van de Pokemons op 0 `health` komt te staan heeft deze speler verloren. Dit wordt in elke aanval gecheckt en wanneer de `if` statement op `true` komt te staan geeft die een `victory`/`defeat` scherm door aan de winnaar en verliezer.

</details>

<details> 
  <summary>leave-lobby</summary>
  
  Wanneer een gebruiker de applicatie verlaat wordt hij/zij uit de `user-list` verwijderd. Ook wordt de `leave message` afgevuurd waardoor de andere speler hier een notificatie over krijgen.

</details>


## Socket client listeners

<details> 
  <summary>join-lobby</summary>
  
  Als de gebruikers de benodigde gegevens hebben ingevuld op het inlog scherm en de lobby toetreden wordt de ingevulde informatie direct doorgestuurd naar de `server-side`. De gebruikers informatie wordt bijgehouden in een `user-array`. Op deze manier hou ik bij hoeveel gebruikers er aanwezig zijn en in welke `lobby` ze zitten.

</details>

<details> 
  <summary>search-results</summary>
  
  

</details>

<details> 
  <summary>join-battle</summary>

</details>

<details> 
  <summary>on-attack</summary>

</details>

## API

## Conclusie


## Sources

- [Mozilla Developer Network](https://developer.mozilla.org/en-US/) - I mostly used this site to obtain my sources

## Credits
