/**
 * Parse une quantité et extrait le nombre
 * Ex: "500g" → 500, "2 cuillères" → 2, "1/2 tasse" → 0.5
 */
export const parseQuantity = (quantityStr) => {
  if (!quantityStr) return null;
  
  const str = quantityStr.trim();
  
  // Gère les fractions (1/2, 3/4, etc.)
  const fractionMatch = str.match(/^(\d+)\/(\d+)/);
  if (fractionMatch) {
    return parseFloat(fractionMatch[1]) / parseFloat(fractionMatch[2]);
  }
  
  // Extrait le premier nombre trouvé
  const numberMatch = str.match(/(\d+\.?\d*)/);
  if (numberMatch) {
    return parseFloat(numberMatch[1]);
  }
  
  return null;
};

export const calculateQuantity = (originalQuantity, originalServings, newServings) => {
  if (!originalQuantity || originalServings === 0) return originalQuantity;
  
  const ratio = newServings / originalServings;
  const quantity = parseQuantity(originalQuantity);
  
  if (quantity === null) {
    // Si on ne peut pas parser (ex: "À volonté", "Quelques feuilles"), retourne tel quel
    return originalQuantity;
  }
  
  const newQuantity = quantity * ratio;
  
  // Remplace le nombre dans la string originale
  const quantityStr = originalQuantity.replace(/(\d+\.?\d*)(\/\d+)?/, () => {
    // Arrondir intelligemment
    if (newQuantity < 1) {
      return newQuantity.toFixed(2).replace(/\.?0+$/, '');
    } else if (newQuantity < 10) {
      return newQuantity.toFixed(1).replace(/\.0$/, '');
    } else {
      return Math.round(newQuantity);
    }
  });
  
  return quantityStr;
};

/**
 * Format une date en français
 */
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

/**
 * Constantes
 */
export const DIFFICULTY_COLORS = {
  Facile: "bg-green-500/80",
  Moyen: "bg-orange-500/80",
  Difficile: "bg-red-500/80",
};

export const API_BASE_URL = "http://localhost:3000/api";