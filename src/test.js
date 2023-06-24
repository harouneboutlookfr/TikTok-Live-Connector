const { WebcastPushConnection } = require('tiktok-live-connector');
const fs = require('fs');
const path = require('path');


// Username of someone who is currently live
  // Utilisation de la fonction
//const tableau = ["isabellematthieun90", "World", "JavaScript", "Array"];

const tableau = ["isabellematthieun90" ];

afficherElements(tableau);


// ...and more events described in the documentation below

function afficherElements(tableau) {
    tableau.forEach((element) => {
        // Create a new wrapper object and pass the username
        let tiktokLiveConnection = new WebcastPushConnection(element);

        // Connect to the chat (await can be used as well)
        tiktokLiveConnection.connect().then(state => {
            console.info(`Connected to roomId ${state.roomId}`);
        }).catch(err => {
            console.error('Failed to connect', err);
        })

        // Define the events that you want to handle
        // In this case we listen to chat messages (comments)
        tiktokLiveConnection.on('chat', data => {
            const contenu =  ` ${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`;

            console.log(element + " "+ contenu );
            ecrireDansFichier(element, contenu+"\n"); 
        })

        tiktokLiveConnection.on('member', data => {
          console.log(`${data.uniqueId} joins the stream!`);
          ecrireDansFichier(element, `${data.uniqueId} joins the stream!`);
      })
    });
}


//fichier
function ecrireDansFichier(nomFichier, contenu) {
    const cheminFichier = path.join(__dirname, 'log', nomFichier);

    const date = new Date();
    contenu = `${date.toLocaleString()} - ${contenu}\n`;


    fs.appendFile(cheminFichier, contenu, (err) => {
      if (err) {
        console.error(`Une erreur s'est produite lors de l'écriture dans le fichier ${nomFichier}:`, err);
      }  
    });
  }
  
 
  

