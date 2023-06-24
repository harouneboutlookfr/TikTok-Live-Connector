const fs = require('fs');

// Chemin du fichier JSON
const filePath = 'data.json';

// Lire le contenu du fichier JSON
function readData() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la lecture du fichier JSON:', error);
    return [];
  }
}

// Écrire les données dans le fichier JSON
function writeData(data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
    console.log('Les données ont été écrites avec succès dans le fichier JSON.');
  } catch (error) {
    console.error('Une erreur s\'est produite lors de l\'écriture dans le fichier JSON:', error);
  }
}

// Ajouter un nouvel élément
function createItem(item) {
  const data = readData();
  data.push(item);
  writeData(data);
}

// Lire tous les éléments
function readAllItems() {
  return readData();
}

// Lire un élément spécifique par son index
function readItem(index) {
  const data = readData();
  if (index >= 0 && index < data.length) {
    return data[index];
  }
  return null;
}

// Mettre à jour un élément spécifique par son index
function updateItem(index, newItem) {
  const data = readData();
  if (index >= 0 && index < data.length) {
    data[index] = newItem;
    writeData(data);
    console.log('L\'élément a été mis à jour avec succès.');
  } else {
    console.error('Index invalide. Impossible de mettre à jour l\'élément.');
  }
}

// Supprimer un élément spécifique par son index
function deleteItem(index) {
  const data = readData();
  if (index >= 0 && index < data.length) {
    data.splice(index, 1);
    writeData(data);
    console.log('L\'élément a été supprimé avec succès.');
  } else {
    console.error('Index invalide. Impossible de supprimer l\'élément.');
  }
}

// Exemple d'utilisation
createItem({ name: 'John Doe', age: 25 });
createItem({ name: 'Jane Smith', age: 30 });

console.log(readAllItems());

updateItem(0, { name: 'Updated John Doe', age: 26 });

console.log(readItem(0));

deleteItem(1);
