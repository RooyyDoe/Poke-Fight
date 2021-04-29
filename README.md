# Poké fight

In deze applicatie kunnen pokemon-trainers het tegen elkaar opnemen en een gevecht starten in een realtime Pokemon arena.

## Het concept

In deze applicatie kunnen de gebruikers een Pokemon battle met elkaar beginnen. Wanneer een gebruiker in de lobby komt, moet er een Pokemon uitgekozen worden die aan hun zijde gaat vechten. Wanneer een pokemon aanvalt, zal de damage worden gebaseerd op de typering van de pokemons _(zie Damage-chart)_ . De pokemon battle gaat door totdat een van de pokemons niet meer kan vechten, wat zal gebeuren wanneer de `health bar` nul bereikt. Na een gevecht krijgt de winnende gebruiker een `victory` scherm en worden beide spelers terug gestuurd naar het begin scherm.

Als de gebruiker zich aanmeldt om een pokemon trainer te worden, wordt die doorverwezen naar de geselecteerde lobby. Wanneer er twee gebruikers in de lobby zijn en ze aan de voorwaardes voldoen, is het mogelijk om een battle te starten.

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
  - [Must haves](#features)
  - [Should haves](#features)
  - [Could haves](#features)
  - [Wont haves](#features)  
- [Installatie](#installatie)
- [Ultieme applicatie schetsen](#ultieme-applicatie-schetsen)
- [Data lifecycle diagram](#data-lifecycle-diagram)
- [Socket server events](#socket-server-events)
  - [On-join server events](#on-join-server-events)
  - [Lobby server events](#lobby-server-events)
  - [On-battle server events](#on-battle-server-events)   
- [Socket client listeners](#socket-client-listeners)
  - [On-join client events](#on-join-client-events)
  - [Lobby client events](#lobby-client-events)
  - [On-battle client events](#on-battle-client-events)  
- [The RESTful Pokémon API](#the-restful-pokémon-api)
- [Conclusie](#conclusie)
- [Bronnen](#bronnen)
- [Credits](#credits)

## Features

Dit zijn de verschillende features die ik wil gaan toevoegen aan mijn applicatie _(MOSCOW)_

**[M]** **Must haves**

_deze eisen moeten in het eindresultaat terugkomen, zonder deze eisen is het product niet bruikbaar_

- [x] Het kunnen starten van een Pokemon battle wanneer er twee gebruikers aanwezig zijn in een lobby.
- [x] Het kunnen uitvechten als twee pokemon trainers in een battle waar maar een iemand de winnaar kan zijn.
  - [x] Het kunnen ophalen van `health` uit de Poké API.
  - [x] Beurten systeem waar gebruikers elkaar om de beurt kunnen aanvallen en door middel van deze aanvallen gaat de Pokemon `health` naar beneden _(player one starts)_.
- [x] Victory/defeat message naar beide spelers.

---

**[S]** **Should haves**

_deze eisen zijn zeer gewenst, maar zonder is het product wel bruikbaar_

- [x] Het kunnen inloggen als Pokemon-trainer.
  - [x] _Naam_: Jouw eigen pokemon-trainer naam.
  - [x] _Gym_: Dit zijn de verschillende lobbies die toegetreden kunnen worden.
  - [x] _Gender_: De mogelijkheid om een vrouwelijke of mannelijke personage te kiezen.
- [x] Het kunnen zien van een gebruikers lijst van de huidige lobby.
- [x] Het kunnen zien van lobby notificaties.
  - [x] Gebruikers krijgen een welkomst notificatie te zien als ze de lobby toetreden
  - [x] Gebruikers krijgen een notificatie te zien wanneer er een gebruiker toetreedt of weggaat.
- [x] Het kunnen zoeken en kiezen van een Pokemon om mee te gaan strijden.
- [x] Het weergeven van een Pokemon gerelateerde huisstijl.
- [x] Het kunnen zien van `game-messages` tijdens de Pokemon battle.
- [x] Het kunnen zien van een visuele `health-bar` die gelinkt is aan de Pokemon `health`
- [x] Als een gebruiker de battle room verlaat, heeft de andere speler automatisch gewonnen.
- [x] Victory/Defeat pop-up nadat de battle over is.

**[C]** **Could haves**

---

_deze eisen zullen alleen aan bod komen als er tijd genoeg is_

- [x] Het battle Interface design laten lijken op de ouderwetse Pokemon battles.
- [x] Een limiet aan de lobbies toevoegen van twee spelers _(Disable option when full)_
- [ ] Er kunnen meerdere battles tegelijkertijd plaats vinden.
- [x] Pokemon attacks worden gebasseerd op de typering van de Pokemons.
  - [x] Super Effective _(Water > Fire)_
  - [x] Normal _(Water = Normal)_
  - [x] Not Very Effective _(Fire < Water)_
  - [x] No Effect _(Normal < Ghost)_
- [x] Tijdens een Pokemon battle kunnen gebruikers eenmaal hun eigen Pokemon `healen`.
- [x] Tooltip die de gebruiker navigeert naar de `search` functionaliteit
- [x] Error bericht wanneer gebruiker foute input geeft tijdens het zoeken van een pokemon.


**[C]** **Wont haves**

---

_deze eisen zullen alleen aan bod komen als er tijd genoeg is_

**Lobby**

- [ ]  Het kunnen bewegen van jouw gekozen personage op de `city map`.
- [ ]  Punten systeem dat wordt bijgehouden in een scoreboard systeem.
- [ ]  Winkels maken waar gebruikers hun punten kunnen spenderen. _(Heal/ATT_BOOST/DEF_BOOST items)_
- [ ]  Wanneer gebruikers tegen elkaar aanlopen of op elkaar klikken opent er een menu.
  - [ ]  Gebruikers kunnen een battle starten.
  - [ ]  Gebruikers kunnen elkaar toevoegen als vrienden _(Profile/friend system)_.
  - [ ]  Gebruikers kunnen elkaars Pokemon zien.
  - [ ]  Gebruikers kunnen in-game items met elkaar traden.
  - [ ]  Gebruikers kunnen elkaars `balance` zien.
- [ ] Mogelijkheid om tegen een `AI gym` te vechten om op deze manier `punten` te verdienen.

---

**Battle**

- [ ] De gebruiker heeft de keuze uit vier Pokemon attacks die gerelateerd zijn aan de gekozen Pokemon.
- [ ] Tijdens een Pokemon battle kan de gebruiker items gebruiken die hij/zij heeft gekocht.

---

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

**Demo** kun je ook bekijken op: [Poké fight](https://best-poke-fight.herokuapp.com/)

## Ultieme applicatie schetsen

<details>
  <summary>Poké fight lobby </summary>
  
  ![WhatsApp Image 2021-04-12 at 15 14 37](https://user-images.githubusercontent.com/40355914/114404747-489c2080-9ba6-11eb-8701-5edb869cd4c4.jpeg)
  
  - Iedere socket die de lobby joined, krijgt een persoonlijke personage die hij/zij kan voortbewegen. Dit zou gebeuren via de `pijltjes` of de `WASD` toesten.
    - Gebruikers zouden alleen kunnen lopen op gebieden waar dit mogelijk is en door tegen bepaalde elementen aan te lopen zou er een interactie ontstaan.


  - Wanneer gebruikers tegen elkaar aan lopen of op elkaar klikken komt er een selectie menu tevoorschijn. In dit menu staan verschillende interactie opties:
    - **Battle now:** Hier kunnen gebruikers elkaar uitdagen om een battle te starten
    - **Add friend:** Dit zou een systeem moeten zijn om elkaar toe te voegen in een vriendenlijst. Dit zou het dan makkelijk maken om elkaar weer uit te nodigen voor een rematch battle.
    - **Show pokemon:** Hier kan je de pokemon zien die deze gebruiker heeft gekozen.
    - **Trade now:** Een mogelijk trade systeem waar je items kan traden met elkaar voor bijvoorbeeld `in-game money`
    - **Balance: ...** Hier zie je hoeveel punten/geld de gebruiker heeft
    - **Inventory:** Deze is alleen zichtbaar wanneer je op je eigen personage klikt. Op deze manier kan je kijken wat voor items je in je inventory hebt zitten.


  - Het is mogelijk om met de punten die je verdient tijdens het vechten van battles items te kopen die je kan gebruiken tijdens een battle. Hierbij kan je denken aan een `healing potion` of een `strength boost`.

  - Om het wat makkelijker te maken voor gebruikers wil ik AI custom battles maken door middel van de interactie met de `gym` van de city. Wanneer een gebruiker naar de `gym` toeloopt kan hij/zij een battle starten en wanneer je deze wint verdien je muntjes waar je dus uiteindelijk items mee kan kopen of kan ruilen.

    Er zijn hoogst waarschijnlijk genoeg develop functionaliteiten waar ik rekening mee moet houden. Zelf heb ik zitten denken aan functionaliteiten zoals: localStorage, Iets wat een live positie kan bijhouden, Punten systeem, Interactie met elkaar, Anti cheat ( timers op AI custom battles, etc )
  
</details>

<details>
  <summary>Poké fight battle </summary>
  
  ![WhatsApp Image 2021-04-12 at 15 14 37 (1)](https://user-images.githubusercontent.com/40355914/114404741-48038a00-9ba6-11eb-9a2a-e6dde52f8b7e.jpeg)
  
  1. Wanneer de gebruiker op de `attack` button klikt veranderen de vier menu items naar vier verschillende aanvallen van jou geselecteerde pokemon. Deze aanvallen hebben een max aantal selecties, zodat je ze niet kan spammen. Elke aanval heeft zijn eigen damage en zal meer damage doen als het tegen een zwakker `type` is.
  2. Tijdens een battle kan je driemaal van items gebruik maken. Dit kan een boost voor je pokemon geven of hem/haar healen voor een bepaald percentage.
  3. Als je geen zin meer hebt in de battle kun je altijd leaven. Het geldt dan wel dat je automatisch hebt verloren en de punten dus naar de tegenstander gaan.
  4. Hier wordt er feedback gegeven aan de gebruiker door kleine pop-ups die vertellen wat er allemaal gedaan kan worden.
  5. Hier komen de feedback messages binnen die er komen tijdens een battle. Ook staat hier precies in wat er gaat gebeuren of moet gebeuren.
  6. Het algemene battle screen. Hier komen twee pokemons tegenover elkaar te staan die het tegen elkaar gaan opnemen. Vanuit je eigen view zal je altijd onder aan staan en is het rechter HP element van jou. Je zal zien wanneer er HP af gaat bij je pokemon en ook wanneer er HP afgaat bij de tegenstander.
  
</details>

## Data lifecycle diagram

![data-lifecycle-diagram-roy](https://user-images.githubusercontent.com/40355914/116460784-bcf1e780-a867-11eb-8a77-2e43fe8c07ef.png)

## Socket server events

### on-join server events
<details> 
  <summary>notification</summary>
  
  Elke keer wanneer een gebruiker de kamer toetreedt, zal hij een welkomst bericht krijgen. Als een nieuwe gebruiker zijn `lobby` toetreedt, komt hier een notificatie van. Deze notificatie is ook zichtbaar wanneer er een gebruiker de `lobby` verlaat.

</details>

<details> 
  <summary>gym-users</summary>
  
  Met dit event wordt er een `array` doorgestuurd met hierin een lijst van gebruikers die in een bepaalde gym zijn toegetreden. Deze `array` wordt uitgelezen en weergegeven op het scherm van de gebruikers. De gebruikers zullen in de lobby een lijst zien met zichzelf en de tegenstander waar hij/zij tegen moet spelen.

</details>

### lobby server events
<details> 
  <summary>return-search-results</summary>
  
  Nadat alle `API` calls zijn gedaan, wordt de benodigde data naar de `client` gestuurd. In de `API` calls wordt een `object` gemaakt waar alle nodige informatie instaat over de gekozen pokemon. Door deze door te sturen naar de `client` kan alle data worden toegevoegd aan elementen in het lobby/battle scherm.

</details>

<details> 
  <summary>battle-start</summary>
  
  Wanneer beide gebruikers op de `start` knop hebben gedrukt, begint de battle. De lobby layout verandert naar de `battle room` layout en alle elementen die nodig zijn voor de battle worden ingeladen. Hiermee moet je dus denken aan de `health-bar`, `Pokemon naam`, `Pokemon image` en `battle-messages` / `attack-button`

</details>

### on-battle server events
<details> 
  <summary>health-checker</summary>
  
  Elke keer wanneer er een aanval is geweest, wordt de nieuwe `health` doorgestuurd naar de client en hier geupdate. Op deze manier ziet de gebruiker precies hoeveel damage hij heeft aangericht bij zijn tegenstander.

</details>

<details> 
  <summary>turn-checker</summary>
  
  In een pokemon battle moet je natuurlijk om de beurt kunnen aanvallen en dit event zorgt hiervoor. Hij checkt elke keer wanneer er een aanval is geweest welke speler er nu aan de beurt is. Dit doe ik door middel van een `turn_player1` boolean. Deze houdt bij wanneer speler 1 aan de beurt is en op deze manier geeft die dit door aan de `client-side`

</details>

<details> 
  <summary>game-over</summary>
  
  Wanneer een van de Pokemons op 0 `health` komt te staan heeft deze speler verloren. Dit wordt in elke aanval gecheckt en wanneer de `if` statement op `true` komt te staan geeft die een `victory`/`defeat` scherm door aan de winnaar en verliezer.

</details>

<details> 
  <summary>leave-lobby</summary>
  
  Wanneer een gebruiker de applicatie verlaat wordt hij/zij uit de `user-list` verwijderd. Ook wordt de `leave message` afgevuurd waardoor de andere spelers hier een notificatie over krijgen.

</details>


## Socket client listeners

### on-join client events
<details> 
  <summary>join-lobby</summary>
  
  Als de gebruikers de benodigde gegevens hebben ingevuld op het inlog scherm en de lobby toetreden, wordt de ingevulde informatie direct doorgestuurd naar de `server-side`. De gebruikers informatie wordt bijgehouden in een `user-array`. Op deze manier houd ik bij hoeveel gebruikers er aanwezig zijn en in welke `lobby` ze zitten.

</details>

### lobby client events
<details> 
  <summary>search-results</summary>
  
  De gebruikers kunnen hun Pokemon uitkiezen door deze op te zoeken in de `search-bar`. Wanneer ze de Pokemon naam hebben geschreven in de `search-bar` en daarna op de knop hebben gedrukt, wordt de `input` waarde naar de `server-side` gestuurd.

</details>

<details> 
  <summary>join-battle</summary>
  
  Wanneer de gebruikers op de `start-battle` knop drukken begint de battle en verandert het `lobby` scherm naar het `battle` scherm. Alle data verkregen vanaf de `server-side` wordt in elementen geladen, zodat de gebruikers een bruikbare interface krijgen.

</details>

### on-battle client events
<details> 
  <summary>on-attack</summary>
  
  Elke keer wanneer een gebruiker op de `attack` knop drukt, wordt er een event gestuurd naar de `server-side`. Hier worden alle functionaliteiten zoals de `health-checker` en `turn-checker` afgehandeld.

</details>

## The RESTful Pokémon API

Dit is een `RESTful API` die zeer gedetailleerde objecten teruggeeft die opgebouwd zijn uit duizenden regels. De informatie uit deze API is volledig gerelateerd aan Pokémon en alles wat hierbij komt kijken. Om deze `API` te gebruiken heb je geen authenticatie nodig en alle bronnen zijn volledig open en beschikbaar.

<details> 
  <summary>Welke data kan je uit deze API verkrijgen?</summary>
  
  - Moves
  - Abilities
  - Pokémon (Including various forms)
  - Types
  - Game versions
  - Items
  - Pokédexes
  - Pokémon Evolution Chains

</details>

#### API call naar (endpoint) zonder `resource ID` of `name`

Wanneer je de `API` aanroept zonder een ID of naam mee te geven, krijg je het `object` hier beneden terug. Hier maken ze gebruik van pagination en je krijgt 20 resultaten per API aanroep. Als je het limiet van de resultaten wil vergroten, kan je een `query parameter` mee geven om op deze manier meer resultaten terug te krijgen.

```
{
  "count": 248,
  "next": "https://pokeapi.co/api/v2/ability/?limit=20&offset=20",
  "previous": null,
  "results": [
    {
      "name": "stench",
      "url": "https://pokeapi.co/api/v2/ability/1/"
    }
  ]
}

```

#### De API calls die ik nodig had

In eerste instantie heb ik de API (endpoint) nodig die één specifieke pokemon ophaalt doordat de gebruiker een search uitvoert. Als deze API call is gedaan kijk ik naar de `typering` die de pokémon heeft en doe met deze informatie nogmaals een API call om de `damage_relations` te verkrijgen uit de poké API.

```

GET https://pokeapi.co/api/v2/pokemon/{id or name}/  // For the pokemon data

GET https://pokeapi.co/api/v2/type/{id or name}/    // For the damage_relations data

```

<details>
  <summary>RAW Json Pokémon API call</summary>
  
  ```
  {
  "id": 12,
  "name": "butterfree",
  "base_experience": 178,
  "height": 11,
  "is_default": true,
  "order": 16,
  "weight": 320,
  "abilities": [
    {
      "is_hidden": true,
      "slot": 3,
      "ability": {
        "name": "tinted-lens",
        "url": "https://pokeapi.co/api/v2/ability/110/"
      }
    }
  ],
  "forms": [
    {
      "name": "butterfree",
      "url": "https://pokeapi.co/api/v2/pokemon-form/12/"
    }
  ],
  "game_indices": [
    {
      "game_index": 12,
      "version": {
        "name": "white-2",
        "url": "https://pokeapi.co/api/v2/version/22/"
      }
    }
  ],
  "held_items": [
    {
      "item": {
        "name": "silver-powder",
        "url": "https://pokeapi.co/api/v2/item/199/"
      },
      "version_details": [
        {
          "rarity": 5,
          "version": {
            "name": "y",
            "url": "https://pokeapi.co/api/v2/version/24/"
          }
        }
      ]
    }
  ],
  "location_area_encounters": "https://pokeapi.co/api/v2/pokemon/12/encounters",
  "moves": [
    {
      "move": {
        "name": "flash",
        "url": "https://pokeapi.co/api/v2/move/148/"
      },
      "version_group_details": [
        {
          "level_learned_at": 0,
          "version_group": {
            "name": "x-y",
            "url": "https://pokeapi.co/api/v2/version-group/15/"
          },
          "move_learn_method": {
            "name": "machine",
            "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
          }
        }
      ]
    }
  ],
  "species": {
    "name": "butterfree",
    "url": "https://pokeapi.co/api/v2/pokemon-species/12/"
  },
  "sprites": {
    "back_female": "http://pokeapi.co/media/sprites/pokemon/back/female/12.png",
    "back_shiny_female": "http://pokeapi.co/media/sprites/pokemon/back/shiny/female/12.png",
    "back_default": "http://pokeapi.co/media/sprites/pokemon/back/12.png",
    "front_female": "http://pokeapi.co/media/sprites/pokemon/female/12.png",
    "front_shiny_female": "http://pokeapi.co/media/sprites/pokemon/shiny/female/12.png",
    "back_shiny": "http://pokeapi.co/media/sprites/pokemon/back/shiny/12.png",
    "front_default": "http://pokeapi.co/media/sprites/pokemon/12.png",
    "front_shiny": "http://pokeapi.co/media/sprites/pokemon/shiny/12.png",
    "other": {
      "dream_world": {},
      "official-artwork": {}
    },
    "versions": {
      "generation-i": {
        "red-blue": {},
        "yellow": {}
      },
      "generation-ii": {
        "crystal": {},
        "gold": {},
        "silver": {}
      },
      "generation-iii": {
        "emerald": {},
        "firered-leafgreen": {},
        "ruby-sapphire": {}
      },
      "generation-iv": {
        "diamond-pearl": {},
        "heartgold-soulsilver": {},
        "platinum": {}
      },
      "generation-v": {
        "black-white": {}
      },
      "generation-vi": {
        "omegaruby-alphasapphire": {},
        "x-y": {}
      },
      "generation-vii": {
        "icons": {},
        "ultra-sun-ultra-moon": {}
      },
      "generation-viii": {
        "icons": {}
      }
    }
  },
  "stats": [
    {
      "base_stat": 70,
      "effort": 0,
      "stat": {
        "name": "speed",
        "url": "https://pokeapi.co/api/v2/stat/6/"
      }
    }
  ],
  "types": [
    {
      "slot": 2,
      "type": {
        "name": "flying",
        "url": "https://pokeapi.co/api/v2/type/3/"
      }
    }
  ]
}
  ```
</details>
  
  Wat ik uiteindelijk nodig had voor mijn project was niet de volledige JSON. Daarom heb ik hiervoor een apart `object` gemaakt met hierin de benodigde informatie voor mijn applicatie.
  
  <details>
    <summary>Mijn Pokémon object</summary>
  
  ```
  
  {
    name: **String**,
    sprites: {
      display: **String**,
      back: **String**,
      front: **String**,
    },
    health: **String**,
    in_health: **String**,
    type: **String**,
    weight: **String**,
  }
  
  ```
    
  </details>
  
  
  Uiteindelijk wilde ik dat de `damage_relations` ook bij dit object kwamen om op deze manier te beïnvloeden welke types er meer of minder damage deden tegen elkaar.

  
  <details>
    <summary>Mijn uiteindelijke pokémon Object</summary>
  
  ```
  
  {
    name: **String**,
    damage_relations: {
      double_damage_from: [ Array ],
      double_damage_to: [ Array ],
      half_damage_from: [ Array ],
      half_damage_to: [ Array ],
      no_damage_from: [ Array ],
      no_damage_to: [ Array ],
    }.
    sprites: {
      display: **String**,
      back: **String**,
      front: **String**,
    },
    health: **String**,
    in_health: **String**,
    type: **String**,
    weight: **String**,
  }
  
  ```
  
  </details>
  
  
  
</details>

## Conclusie

Voordat ik aan dit vak was begonnen had ik een doel voor mijzelf gesteld. Dit doel was om een zo uitgebreid mogelijke real-time applicatie te bouwen. Vorig jaar is me dit niet gelukt en ik wilde mijzelf bewijzen dit jaar. Dit is mij zeker gelukt en ben hartstikke trots op het eind resultaat wat ik heb neer gezet. In eerste instantie wilde ik gewoon een pokemon battle maken waar twee speler tegen elkaar konden gaan spelen zonder teveel moeilijke functionaliteiten. Uiteindelijk is de applicatie toch een stuk groter geworden dan ik had verwacht en kwamen hier verschillende moeilijkheden bij kijken. Het bijhouden van `player1` en `player2` en alles wat hierbij kwam kijken vond ik lastig, maar deste meer tijd ik in het project had besteedt, lukte het me steeds beter. Ook het begrijpen van de sockets ging me steeds beter af, waardoor ik nog meer functionaliteiten kon toevoegen aan de applicatie.

De manier waarop de rubric is gemaakt vond ik erg lastig. Je wordt erg open gelaten in wat je kan doen en je moet eigenlijk zelf uitzoeken hoe je een hoger cijfer haalt dan een 5.5. Ik heb er natuurlijk zoveel mogelijk uitgehaald en heb geprobeerd wel degelijk meer te doen dan de basis van de rubric, maar toch weet ik nog steeds niet precies waar ik sta. Achteraf had ik hier misschien wat meer sturing in gehad. 

al met al heb ik weer erg van dit vak genoten, ook al heb ik veel lastige momenten gehad waar ik echt niet meer wist hoe ik verder kon gaan. Door het volhouden en hulp vragen wanneer nodig heb ik het goed voor elkaar gekregen.


## Bronnen

- [Mozilla Developer Network](https://developer.mozilla.org/en-US/) - Hier haal ik de meeste Javascript kennis vandaan
- [Socket IO documentatie](https://socket.io/docs/v4) - Basis socket IO documentatie
- [API documentatie](https://pokeapi.co/docs/v2) - Alles wat ik nodig had om deze API te gebruiken

## Credits

- [Thijs Spijker](https://github.com/iSirThijs) - Heeft me geholpen met een `could have` voor het lobby limiet en meer..
- [Isabella](https://github.com/Sideraa) - Mijn Rubberduck en metale steun.
