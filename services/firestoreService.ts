import { doc, getDoc, setDoc, updateDoc, collection, getDocs, query, orderBy, limit, serverTimestamp, writeBatch, arrayUnion, arrayRemove } from 'firebase/firestore';
import { User as FirebaseUser } from 'firebase/auth';
import { getToken } from 'firebase/messaging';
import { db, messaging } from '../firebase';
import { MODULES_DATA } from '../constants';
import type { User, Modules, RankingUser } from '../types';

/**
 * Get user profile and modules progress from Firestore.
 * @param uid The user's unique ID.
 * @returns User profile and modules data, or null if not found.
 */
export const getUserData = async (uid: string): Promise<{ profile: User, modules: Modules } | null> => {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        return null;
    }

    const profile = userSnap.data() as User;
    const progressCollectionRef = collection(db, 'users', uid, 'progress');
    const progressSnap = await getDocs(progressCollectionRef);

    const modules: Modules = { ...MODULES_DATA };
    if (progressSnap.empty) {
        // If no progress, maybe initialize it here? For now, we return default modules
    } else {
        progressSnap.forEach(doc => {
            if (modules[doc.id]) {
                modules[doc.id] = { ...modules[doc.id], ...doc.data() };
            }
        });
    }

    return { profile, modules };
};

/**
 * Create a new user profile in Firestore upon registration.
 * @param firebaseUser The Firebase Auth user object.
 * @returns The newly created user profile and initial modules data.
 */
export const createUserProfile = async (firebaseUser: FirebaseUser): Promise<{ profile: User, modules: Modules }> => {
    const userRef = doc(db, 'users', firebaseUser.uid);
    const newUser: User = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || 'Usuari Anònim',
        points: 0,
        badges: [],
        createdAt: serverTimestamp() as any,
    };
    await setDoc(userRef, newUser);
    // You could also initialize module progress here if needed
    return { profile: newUser, modules: MODULES_DATA };
};

/**
 * Update a user's profile data in Firestore.
 * @param uid The user's unique ID.
 * @param data The data to update.
 */
export const updateUserProfile = async (uid: string, data: Partial<User>) => {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, data);
};

/**
 * Update a specific module's progress for a user.
 * @param uid The user's unique ID.
 * @param moduleId The ID of the module.
 * @param data The progress data to update.
 */
export const updateModuleProgress = async (uid: string, moduleId: string, data: any) => {
    const progressRef = doc(db, 'users', uid, 'progress', moduleId);
    await setDoc(progressRef, data, { merge: true });
};

/**
 * Reset all progress for a user.
 * @param uid The user's unique ID.
 */
export const resetUserProgress = async (uid: string) => {
    // Reset user profile points and badges
    await updateUserProfile(uid, { points: 0, badges: [] });

    // Delete all documents in the progress subcollection
    const progressCollectionRef = collection(db, 'users', uid, 'progress');
    const progressSnap = await getDocs(progressCollectionRef);
    const batch = writeBatch(db);
    progressSnap.forEach(doc => {
        batch.delete(doc.ref);
    });
    await batch.commit();
};

/**
 * Get the top users for the ranking list.
 * @returns An array of top ranking users.
 */
export const getRankingList = async (): Promise<RankingUser[]> => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('points', 'desc'), limit(10));
    const querySnapshot = await getDocs(q);
    const ranking: RankingUser[] = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        ranking.push({
            id: doc.id,
            name: data.name,
            points: data.points
        });
    });
    return ranking;
};


// --- Firebase Cloud Messaging Service ---

/**
 * Handles push notification setup: requests permission and saves/removes token.
 * @param uid The user's unique ID.
 * @param enable Whether to enable or disable notifications.
 */
export const setupPushNotifications = async (uid: string, enable: boolean) => {
    if (!('Notification' in window)) {
        console.error('This browser does not support desktop notification');
        return;
    }

    const userRef = doc(db, "users", uid);
    const currentToken = await getToken(messaging, { vapidKey: 'BBQN2NKWx07SsuBBmMBlh_RJ60k95Vc-7YXB6T34Zy7d_C30HGvQRW6EZqOVN4trTvHThoJEJiuMGeZ-z4yCSY' }).catch(err => {
        console.error('An error occurred while retrieving token. ', err);
        return null;
    });

    if (enable) {
        if (Notification.permission === 'granted' && currentToken) {
            console.log('Permission granted. Saving token:', currentToken);
            await updateDoc(userRef, { fcmTokens: arrayUnion(currentToken) });
        } else if (Notification.permission === 'default') {
            const permission = await Notification.requestPermission();
            if (permission === 'granted' && currentToken) {
                console.log('Permission just granted. Saving token:', currentToken);
                await updateDoc(userRef, { fcmTokens: arrayUnion(currentToken) });
            } else {
                console.log('Permission was denied.');
            }
        } else {
            console.log('Permission is already denied.');
        }
    } else {
        if (currentToken) {
            console.log('Disabling notifications. Removing token:', currentToken);
            await updateDoc(userRef, { fcmTokens: arrayRemove(currentToken) });
        }
    }
};