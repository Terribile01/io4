/**
 * Utility per gestire i percorsi delle immagini caricate.
 * Poiché le immagini in /public vengono servite dalla root in produzione,
 * questa funzione assicura il percorso corretto.
 */
export const getUploadPath = (filename: string): string => {
  if (!filename) return "";
  // Rimuove eventuali slash iniziali per evitare percorsi doppi
  const cleanName = filename.startsWith("/") ? filename.substring(1) : filename;
  return `/assets/uploads/${cleanName}`;
};

/**
 * Esempio di utilizzo:
 * <img src={getUploadPath("mio-logo.png")} alt="Logo" />
 */
