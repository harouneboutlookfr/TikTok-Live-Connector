const { TikTokScraper } = require('tiktok-scraper');

// Fonction pour extraire les informations d'une vidéo TikTok
async function getTikTokVideoInfo(videoUrl) {
  try {
    const videoData = await TikTokScraper.getVideoMeta(videoUrl);
    console.log('Informations de la vidéo :');
    console.log('Titre :', videoData.collector[0].text);
    console.log('Auteur :', videoData.authorMeta.name);
    console.log('Description :', videoData.collector[0].description);
    console.log('Likes :', videoData.collector[0].stats.diggCount);
    console.log('Partages :', videoData.collector[0].stats.shareCount);
    console.log('Commentaires :', videoData.collector[0].stats.commentCount);
  } catch (error) {
    console.error('Une erreur s\'est produite :', error);
  }
}

// Appel de la fonction avec l'URL de la vidéo TikTok
const videoUrl = 'https://www.tiktok.com/@kurorolucifer_75/video/7068665405388098821';
getTikTokVideoInfo(videoUrl);
