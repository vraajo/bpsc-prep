import { db, doc, onSnapshot, updateDoc } from './firebase-config.js';

export const FirestoreSync = {
  unsubscribe: null,

  listenToUserData(uid, callback) {
    if (this.unsubscribe) this.unsubscribe();
    const userRef = doc(db, 'users', uid);
    this.unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data());
      }
    }, (err) => console.error("Firestore Listen Error:", err));
  },

  async updateUserField(uid, fieldData) {
    if (!uid) return;
    const userRef = doc(db, 'users', uid);
    try {
      await updateDoc(userRef, fieldData);
    } catch (err) {
      console.error(`Failed to update ${Object.keys(fieldData).join(',')}:`, err);
    }
  },

  async toggleBookmark(uid, currentBookmarks, item) {
    const exists = currentBookmarks.some(b => b.id === item.id);
    let updated = exists 
      ? currentBookmarks.filter(b => b.id !== item.id)
      : [...currentBookmarks, { ...item, savedAt: new Date().toISOString() }];
    
    await this.updateUserField(uid, { bookmarks: updated });
    return updated;
  },

  async saveTask(uid, currentTasks, task) {
    let updated;
    const idx = currentTasks.findIndex(t => t.id === task.id);
    if (idx > -1) {
      updated = [...currentTasks];
      updated[idx] = task;
    } else {
      updated = [...currentTasks, task];
    }
    await this.updateUserField(uid, { planner: updated });
  }
};
