import { auth, db, googleProvider, signInWithPopup, signOut, onAuthStateChanged, doc, getDoc, setDoc, updateDoc } from './firebase-config.js';

export const AuthModule = {
  currentUser: null,

  init(onUserChanged) {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.currentUser = user;
        await this.syncUserData(user);
        this.updateAuthUI(user);
      } else {
        this.currentUser = null;
        this.updateAuthUI(null);
      }
      if (typeof onUserChanged === 'function') onUserChanged(this.currentUser);
    });
  },

  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await this.syncUserData(result.user);
      return result.user;
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Authentication failed: " + error.message);
    }
  },

  async logout() {
    try {
      await signOut(auth);
      localStorage.removeItem('bpsc_user_session');
      window.location.reload();
    } catch (error) {
      console.error("Logout Error:", error);
    }
  },

  async syncUserData(user) {
    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef);

    const now = new Date().toISOString();

    if (!docSnap.exists()) {
      const newUserDoc = {
        uid: user.uid,
        name: user.displayName || 'Aspirant',
        email: user.email,
        photoURL: user.photoURL || '',
        joinedDate: now,
        lastLogin: now,
        studyHours: 0,
        dailyTarget: 5,
        weeklyTarget: 35,
        monthlyTarget: 150,
        completedTopics: [],
        bookmarks: [],
        quizHistory: [],
        planner: [],
        notes: [],
        revisionProgress: 0,
        streak: 1,
        settings: { theme: 'dark', notifications: true }
      };
      await setDoc(userRef, newUserDoc);
    } else {
      await updateDoc(userRef, { lastLogin: now });
    }
  },

  updateAuthUI(user) {
    const greetingEl = document.getElementById('userGreeting');
    const userPhotoEl = document.getElementById('userPhoto');
    const authBtn = document.getElementById('authActionBtn');

    if (user) {
      const hour = new Date().getHours();
      let greetingTime = 'Good Morning';
      if (hour >= 12 && hour < 17) greetingTime = 'Good Afternoon';
      else if (hour >= 17) greetingTime = 'Good Evening';

      if (greetingEl) greetingEl.textContent = `${greetingTime}, ${user.displayName || 'Aspirant'} 👋`;
      if (userPhotoEl) {
        userPhotoEl.src = user.photoURL || 'https://via.placeholder.com/40';
        userPhotoEl.style.display = 'block';
      }
      if (authBtn) {
        authBtn.textContent = 'Logout';
        authBtn.onclick = () => this.logout();
      }
    } else {
      if (greetingEl) greetingEl.textContent = 'Welcome, Aspirant 👋';
      if (userPhotoEl) userPhotoEl.style.display = 'none';
      if (authBtn) {
        authBtn.textContent = 'Sign in with Google';
        authBtn.onclick = () => this.loginWithGoogle();
      }
    }
  }
};
