"use strict";

var facts = ["Czekolada jest skutecznym środkiem zapobiegającym ciągłemu kaszleniu. Może być nawet bardziej skuteczny niż lekarstwo na kaszel.", "Pobór energii (kalorii) powinien być zrównoważony z wydatkami energetycznymi. Aby uniknąć niezdrowego przyrostu masy ciała, łączna ilość tłuszczu nie powinna przekraczać 30% łącznej ilości przyjmowanej energii. 🍫", "Twoja skóra ciężko pracuje. Jest nie tylko największym organem w organizmie, ale także broni się przed chorobami i infekcjami, reguluje Twoją temperaturę i wspomaga produkcję witamin. 🛡️", "Białko, które znajduje się w mięsie, produktach mlecznych, fasoli i rybach, buduje mięśnie i naprawia uszkodzenia w Twoim ciele. 🍖", "Przeciętny Amerykanin spożywa ponad 3000 miligramów soli każdego dnia. Jest to o 700 mg więcej niż górna granica zalecana dla większości ludzi. 🧂", "Niskie spożycie omega-3 wiąże się z niższym IQ, depresją, różnymi zaburzeniami psychicznymi, chorobami serca i wieloma innymi poważnymi chorobami. 🤒", "Najlepsza dieta dla Ciebie jest ta, która działa dla Ciebie i możesz się jej trzymać na dłuższą metę. 📅", "Utrata wagi może przyczynić się do zmniejszenia ryzyka wystąpienia chorób przewlekłych. Jeśli dana osoba ma nadwagę lub otyłość, ma większe ryzyko rozwoju kilku schorzeń, w tym: choroby serca, cukrzycy, niektórych nowotworów. ⚖️", "Naklejki na owocach są jadalne. Chociaż logiczną rzeczą do zrobienia jest zdjąć je, są one wykonane z papieru jadalnego, a nawet klej jest spożywczy, na wszelki wypadek, gdybyś zjadł naklejkę, nie zauważając. 🍌", "Cebula jest doskonałym przeciwutleniaczem, posiadającym właściwości antyalergiczne, przeciwwirusowe i antyhistaminowe. Związki siarki zawarte w cebuli pomagają w detoksykacji organizmu i regeneracji komórek. 🧅", "Ludzie, którzy jedzą pikantne jedzenie, mają tendencję do dłuższego życia. Wynika to ze składników bioaktywnych, które pomagają utrzymać zdrowy poziom cholesterolu i trójglicerydów. 🌶️", "Ortoreksja jest zaburzeniem żywienia polegającym na selekcjonowaniu pokarmu ze względu na jego czynniki szkodliwe. Prowadzi do wypaczenia w postaci eliminowania całych grup pokarmów, np. tłuszczu, węglowodanów, każdego jedzenia, które zawiera niepożądany składnik. 😷", "Skutecznym środkiem na zapobieganie rakowi jelita grubego jest spożywanie dużych ilości błonnika. Badania dowodzą, że u osób, które już są chore spożywanie błonnika zatrzymuje rozwój guzów. 🌾", "Masło orzechowe zostało wyprodukowane pierwszy raz w XIX wieku przez lekarza i wegetarianina. Jest bardzo zdrowym tłuszczem zawierającym witaminy z grupy B, witaminę E, fosfor, miedź i żelazo. Złą wiadomością jest to, że w 100 g zawiera ok. 600 kcal. Orzeszki ziemne są też silnym alergenem. 🥜", "Czosnek jest nie tylko doskonałym środkiem na przeziębienie, ale zalecany jest także osobom z chorobami serca. Badania dowodzą, że hamuje, a nawet cofa proces zarastania naczyń. 🧄", "Niedobory witaminy A zaczynają objawiać się właśnie poprzez zaburzenia wzroku, zwłaszcza złe widzenie po zmroku. Nazywa się to „kurzą ślepotą”. 👁️", "Warto wiedzieć, że ludzki organizm potrafi wytwarzać witaminę A ze źródeł roślinnych, a mianowicie z beta-karotenu, występującego np. w marchwi i pomarańczowożółtych owocach i warzywach, a także w zielonych liściach. Nazwa „karoten” pochodzi właśnie od łacińskiej nazwy marchwi – Daucus carota. 🥕", "Nieprzypadkowo zamykamy oczy podczas kichania. W przeciwnym wypadku moglibyśmy niemal stracić oczy! Wszystko przez ogromną prędkość, z jaką wyrzucamy z siebie powietrze podczas kichania – 170 km/h. Zdecydowanie powyżej jakichkolwiek ograniczeń! 🤧", "Żadne inne zwierzę na Ziemi nie ma tak wysokiej umieralności okołoporodowej jak człowiek. 👨", "Tak jak odciski palców każdy z nas ma inny odcisk języka. Być może kiedyś będziemy go używali do identyfikacji? 😋", "W momencie narodzin człowiek posiada już wszystkie komórki mózgowe, ale jego mózg rozwija się w pełni aż przez około 20 lat. 🧠", "Serce człowieka jest tak mocne, że mogłoby wypompować krew na przynajmniej 9 metrów w górę. Mięsień sercowy jest najsilniejszym w organizmie, ponieważ musi on dostarczyć krew do każdego zakątka ciała, w tym oddalonych palców u nóg i stóp 💗"];
var links = ["info1", "info2", "info3", "info4", "info5", "info6", "info7", "info8", "info9", "info10", "info11", "info12", "info13", "info14", "info15", "info16", "info17", "info18", "info19", "info20", "info21"];
var los1 = Math.floor(Math.random() * (facts.length - 1));
var fact1 = facts[los1];
facts.splice(los1, 1);
var los2 = Math.floor(Math.random() * (facts.length - 1));
var fact2 = facts[los2];
var los3 = Math.floor(Math.random() * (links.length - 1));
var link1 = links[los3];
links.splice(los3, 1);
var los4 = Math.floor(Math.random() * (links.length - 1));
var link2 = links[los4];
document.getElementById("res1").innerHTML = fact1;
document.getElementById("res2").innerHTML = fact2;
document.getElementById("link1").innerHTML = "<img src=\"/static/img/".concat(link1, ".png\" alt=\"info1\">");
document.getElementById("link2").innerHTML = "<img src=\"/static/img/".concat(link2, ".png\" alt=\"info2\">");