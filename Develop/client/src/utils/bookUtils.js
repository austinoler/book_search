
const SAVED_BOOK_IDS_KEY = 'saved_book_ids';

export function getSavedBookIds() {
  const savedBookIdsString = localStorage.getItem(SAVED_BOOK_IDS_KEY);

  
  return savedBookIdsString ? JSON.parse(savedBookIdsString) : [];
}
