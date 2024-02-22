
const cartes = document.querySelectorAll(".carte");  // 1A 
let carteRetournee = false;                          // 1B
let premiereCarte, secondeCarte;                     // 1C
let verouillage = false;                             // 1D
let cartesVisibles = [];                             // 1E
let veutRejouer;                                     // 1F
cartes.forEach((carte) => {                          // 1G
    carte.addEventListener("click", retourneCarte);
});

// ----------------- Retourner la carte ----------------------


function retourneCarte() {                          // 2A 

    if (verouillage) return;                        // 2B
    if (this === premiereCarte) return;             // 2C
    this.childNodes[1].classList.toggle("active");  // 2D           
    if (!carteRetournee) {                          // 2E
        carteRetournee = true;
        premiereCarte = this;
        return;
    }

    carteRetournee = false;                         // 2F
    secondeCarte = this;

    correspondance();                               // 2G
    recommencerJeu();                               // 2H
}



// ------------------ Vérifie la correspondance entre deux cartes -----------------------



function correspondance() {                                          // 3A

    if (                                                             // 3B
        premiereCarte.getAttribute("data-attr") ===
        secondeCarte.getAttribute("data-attr")
    ) {
        premiereCarte.removeEventListener("click", retourneCarte);   // 3C   
        secondeCarte.removeEventListener("click", retourneCarte);

        cartesVisibles.push(premiereCarte, secondeCarte);            // 3D

    } else {                                                         // 3E
        verouillage = true;                                          // 3F
        setTimeout(() => {                                           // 3G
            premiereCarte.childNodes[1].classList.remove("active");
            secondeCarte.childNodes[1].classList.remove("active");

            verouillage = false;                                     // 3H
        }, 1500);
    }
}

// ----------------------------- Aléatoire -------------------------------------


function aleatoire() {                                           // 4A
    cartes.forEach((carte) => {                                  // 4B
        let positionAlea = Math.floor(Math.random() * 12);       // 4C
        carte.style.order = positionAlea;                        // 4D
    });
}
aleatoire();                                                     // 4E


// ----------------------------- Victoire -----------------------


function recommencerJeu() {                                              // 5A
    if (cartesVisibles.length === 6) {                                  // 5B
        setTimeout(() => {                                               // 5C
            veutRejouer = confirm(                                       // 5D
                " Félicitations ! Vous voulez refaire une partie ? "
            );

            if (veutRejouer) {                                           // 5E
                location.reload();
            } else {
                return;
            }

        }, 800);                                                         // 5F
    }
}


/*
// ----------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------   COMMENTAIRES   -------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------


 


1A = Cette ligne sélectionne tous les éléments HTML avec la classe .carte et les stocke dans la constante cartes. Cela crée une NodeList (qui est similaire à un tableau) de tous les éléments de carte dans le document, permettant de manipuler ou d'accéder à ces cartes plus tard dans le script..

1B = Déclare une variable carteRetournee et l'initialise à false. Cette variable sert à suivre l'état de la carte en jeu : si une carte a été retournée et est en attente d'une correspondance.

1C = Déclare deux variables premiereCarte et secondeCarte sans les initialiser. Ces variables seront utilisées pour stocker les références aux deux cartes que l'utilisateur retourne pour vérifier s'ils forment une paire.

1D = Déclare une variable verouillage et l'initialise à false. Cette variable est utilisée pour verrouiller le plateau de jeu temporairement, empêchant l'utilisateur de retourner plus de deux cartes à la fois, notamment lors de l'attente de la disparition des cartes non correspondantes.

1E = Déclare une variable cartesVisibles et l'initialise comme un tableau vide. Ce tableau est destiné à stocker les cartes qui ont été correctement associées et doivent rester visibles.

1F = Déclare une variable veutRejouer sans initialisation. Cette variable sera utilisée plus tard pour stocker la décision de l'utilisateur concernant le fait de rejouer ou non après avoir terminé une partie.

1G = Cette boucle forEach parcourt chaque élément dans cartes et ajoute un écouteur d'événements click à chacun. Lorsqu'une carte est cliquée, la fonction retourneCarte est appelée. Cela permet à l'utilisateur d'interagir avec chaque carte en cliquant dessus pour les retourner et tenter de trouver des paires correspondantes.

2A =  Cette ligne déclare une fonction nommée retourneCarte. Cette fonction est appelée chaque fois qu'un utilisateur clique sur une carte dans le jeu.

2B = Cette ligne vérifie si la variable verouillage est true. Si c'est le cas, la fonction s'arrête immédiatement (return;). Cette logique empêche l'utilisateur de retourner d'autres cartes pendant que deux cartes non correspondantes sont encore visibles et en attente d'être cachées à nouveau.

2C = Empêche le joueur de cliquer deux fois sur la même carte à la suite

2D = Ici, this fait référence à l'élément HTML de la carte sur lequel l'utilisateur a cliqué. childNodes[1] sélectionne le premier élément enfant de type élément (en ignorant les noeuds de type texte qui peuvent être considérés comme des espaces ou des retours à la ligne dans le HTML). classList.toggle("active") ajoute ou supprime la classe CSS active, ce qui déclenche l'effet de retournement de la carte.        

2E = Cette section gère le cas où aucune carte n'a encore été retournée. Si carteRetournee est false, cela signifie que l'utilisateur vient de retourner la première carte. La fonction marque carteRetournee comme true et stocke la carte cliquée dans premiereCarte, puis sort de la fonction avec return; pour attendre le clic sur une seconde carte.

2F = Si le programme arrive à ces lignes, cela signifie que l'utilisateur a déjà retourné une première carte, et il retourne maintenant une seconde. carteRetournee est réinitialisé à false pour permettre de vérifier une nouvelle paire lors du prochain clic. secondeCarte est définie comme la carte actuellement cliquée.

2G = Appelle la fonction correspondance qui vérifie si les deux cartes retournées (premiereCarte et secondeCarte) correspondent (ont le même data-attr).

2H = Appelle la fonction recommencerJeu qui vérifie si toutes les cartes ont été correctement associées et propose à l'utilisateur de rejouer en rechargeant la page ou en effectuant une autre action en cas de victoire.

3A = Cette ligne déclare la fonction correspondance, qui est appelée après qu'un joueur retourne deux cartes pour vérifier si elles forment une paire correspondante.

3B = Cette condition vérifie si les deux cartes retournées (premiereCarte et secondeCarte) ont le même attribut data-attr. Cela signifie que la fonction compare les valeurs de data-attr pour voir si les cartes sont identiques (par exemple, deux images de pommes).

3C = Si les cartes correspondent, ces lignes retirent l'écouteur d'événements click de ces deux cartes en utilisant removeEventListener. Cela empêche ces cartes d'être retournées à nouveau, car elles doivent rester visibles et hors du jeu.  

3D = Ajoute les deux cartes correspondantes à un tableau cartesVisibles. Ce tableau peut être utilisé pour suivre les paires de cartes qui ont été correctement identifiées et restent visibles.

3E = Cette partie du code s'exécute si les deux cartes retournées ne correspondent pas.

3F = Active un verrou (verouillage) qui empêche l'utilisateur de retourner d'autres cartes. Cela permet d'éviter que l'utilisateur ne retourne plus de deux cartes à la fois, créant de la confusion dans le jeu.

3G = Utilise setTimeout pour créer un délai avant de retourner les cartes face cachée à nouveau. Cela donne à l'utilisateur le temps de voir les cartes qui ont été retournées et de mémoriser leur position. La classe active est retirée, ce qui retourne les cartes à leur état initial.

3H = Réinitialise le verrou (verouillage) à false après un délai de 1500 millisecondes (1,5 seconde), permettant à l'utilisateur de tenter de retourner de nouvelles cartes. Le délai assure que les cartes ne soient pas retournées instantanément, donnant à l'utilisateur le temps de voir les cartes qui ne correspondent pas.

4A : Cette ligne déclare la fonction aleatoire. L'objectif de cette fonction est de mélanger les cartes sur le plateau de jeu en leur attribuant des positions aléatoires. Cela assure que chaque partie est unique, augmentant ainsi le défi et l'intérêt du jeu.


4B = Cette ligne commence une boucle forEach sur l'ensemble des éléments cartes, qui est probablement une collection de tous les éléments HTML représentant les cartes du jeu. Pour chaque carte dans la collection, la fonction effectue les actions définies dans le bloc de code suivant.

4C = Ici, positionAlea est déclarée comme une variable locale à chaque itération de la boucle. Math.random() génère un nombre aléatoire entre 0 (inclus) et 1 (exclus). Ce nombre est ensuite multiplié par 12, puis Math.floor() est utilisé pour arrondir le résultat à l'entier le plus proche vers le bas. Cela donne un nombre entier aléatoire dans la plage de 0 à 11, qui est utilisé comme nouvelle position (ordre) pour chaque carte.

4D = Cette ligne affecte la valeur de positionAlea à la propriété CSS order de l'élément carte actuel. Dans un conteneur avec un affichage de type flex ou grid, la propriété order détermine l'ordre dans lequel les éléments apparaissent. En assignant des valeurs order aléatoires aux cartes, cette ligne les réarrange visuellement sur le plateau de jeu.

4E = Après la déclaration de la fonction, cette ligne appelle immédiatement la fonction aleatoire. Cela signifie que dès que le script est chargé et exécuté, les cartes sont mélangées, garantissant que l'état initial du jeu est différent à chaque nouvelle partie.

5A = Cette ligne déclare la fonction recommencerJeu. Cette fonction est probablement appelée après chaque tentative de correspondance pour vérifier si le jeu est terminé.

5B = Cette condition vérifie si la longueur du tableau cartesVisibles est égale à 12. Dans ce contexte, cartesVisibles contient les cartes qui ont été correctement associées et sont maintenant visibles. Si sa longueur est de 12, cela signifie que toutes les paires de cartes ont été trouvées, car le jeu semble avoir 12 cartes en tout (6 paires).

5C = Utilise setTimeout pour retarder l'exécution du code suivant. Cela permet d'afficher le message de victoire après un court délai (800 millisecondes), donnant au joueur le temps de voir la dernière paire de cartes avant que le message apparaisse.

5D = Affiche une boîte de dialogue de confirmation avec le message "Victoire etc.". confirm retourne un booléen : true si l'utilisateur clique sur "OK" et false s'il clique sur "Annuler". Cette valeur est stockée dans la variable veutRejouer.

5E = Si l'utilisateur décide de rejouer (veutRejouer est true), location.reload() est appelé pour recharger la page, réinitialisant ainsi le jeu. Si l'utilisateur ne souhaite pas rejouer (veutRejouer est false), la fonction s'arrête simplement avec return;.

5F = Ces lignes marquent la fin de l'instruction setTimeout et de la condition if, ainsi que de la fonction recommencerJeu.

*/