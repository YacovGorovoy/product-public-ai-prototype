// Storage utilities for managing drafts and form state

const STORAGE_KEYS = {
  DRAFTS: 'procurement_drafts',
  CURRENT_DRAFT: 'procurement_current_draft',
  USER_PREFERENCES: 'procurement_user_preferences'
};

export const saveDraft = (draft) => {
  try {
    const drafts = getDrafts();
    const existingIndex = drafts.findIndex(d => d.id === draft.id);
    
    if (existingIndex >= 0) {
      drafts[existingIndex] = { ...draft, updatedAt: new Date().toISOString() };
    } else {
      drafts.push({ ...draft, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    
    localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));
    return true;
  } catch (error) {
    console.error('Error saving draft:', error);
    return false;
  }
};

export const getDrafts = () => {
  try {
    const drafts = localStorage.getItem(STORAGE_KEYS.DRAFTS);
    return drafts ? JSON.parse(drafts) : [];
  } catch (error) {
    console.error('Error getting drafts:', error);
    return [];
  }
};

export const getDraft = (id) => {
  const drafts = getDrafts();
  return drafts.find(d => d.id === id);
};

export const deleteDraft = (id) => {
  try {
    const drafts = getDrafts();
    const filteredDrafts = drafts.filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(filteredDrafts));
    return true;
  } catch (error) {
    console.error('Error deleting draft:', error);
    return false;
  }
};

export const saveCurrentDraft = (draft) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_DRAFT, JSON.stringify(draft));
    return true;
  } catch (error) {
    console.error('Error saving current draft:', error);
    return false;
  }
};

export const getCurrentDraft = () => {
  try {
    const draft = localStorage.getItem(STORAGE_KEYS.CURRENT_DRAFT);
    return draft ? JSON.parse(draft) : null;
  } catch (error) {
    console.error('Error getting current draft:', error);
    return null;
  }
};

export const clearCurrentDraft = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_DRAFT);
    return true;
  } catch (error) {
    console.error('Error clearing current draft:', error);
    return false;
  }
};

export const generateDraftId = () => {
  return `draft_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}; 