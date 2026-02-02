import { beforeEach, describe, expect, it } from "vitest";
import userReducer, { addUser, clearUsers, fetchUser, setCurrentUser } from '../src/store/userSlice'

describe('userSlice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      currentUser: null,
      users: [],
      loading: false,
      error: null,
    }
  })

  // Sync actions
  describe('sync actions', () => {
    it('should handle addUser action', () => {
      const newUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
      const action = addUser(newUser);
      const state = userReducer(initialState, action);

      expect(state.users).toHaveLength(1)
      expect(state.users[0]).toEqual(newUser)
    })

    it('should add multiple users', () => {
      let state = initialState;
      state = userReducer(state, addUser({ id: 1, name: 'User 1' }));
      state = userReducer(state, addUser({ id: 2, name: 'User 2' }));

      expect(state.users).toHaveLength(2);
      expect(state.users[1].name).toBe('User 2');
    });

    it('should handle clearUsers action', () => {
      const stateWithUsers = {
        ...initialState,
        users: [
          { id: 1, name: 'User 1' },
          { id: 2, name: 'User 2' }
        ],
        currentUser: { id: 1, name: 'User 1' }
      };

      const state = userReducer(stateWithUsers, clearUsers());

      expect(state.users).toHaveLength(0);
      expect(state.currentUser).toBeNull();
    });

    it('should handle setCurrentUser action', () => {
      const user = { id: 1, name: 'Jane Doe', email: 'jane@example.com' };
      const action = setCurrentUser(user);
      const state = userReducer(initialState, action);

      expect(state.currentUser).toEqual(user);
    });
  })

  // Async actions
  describe('fetchUser async action', () => {
    it('should set loading to true when fetchUser is pending', () => {
      const action = { type: fetchUser.pending.type };
      const state = userReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should update state when fetchUser is fulfilled', () => {
      const mockUser = { 
        id: 1, 
        name: 'John Doe', 
        email: 'john@example.com' 
      };
      const action = { 
        type: fetchUser.fulfilled.type, 
        payload: mockUser 
      };
      const state = userReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.currentUser).toEqual(mockUser);
      expect(state.users).toContainEqual(mockUser);
      expect(state.error).toBeNull();
    });

    it('should not add duplicate users when fetchUser is fulfilled', () => {
      const mockUser = { id: 1, name: 'John Doe' };
      const stateWithUser = {
        ...initialState,
        users: [mockUser]
      };
      
      const action = { 
        type: fetchUser.fulfilled.type, 
        payload: mockUser 
      };
      const state = userReducer(stateWithUser, action);

      expect(state.users).toHaveLength(1);
    });

    it('should set error when fetchUser is rejected', () => {
      const errorMessage = 'Failed to fetch user';
      const action = { 
        type: fetchUser.rejected.type, 
        payload: errorMessage 
      };
      const state = userReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.currentUser).toBeNull();
    });
  });
})
