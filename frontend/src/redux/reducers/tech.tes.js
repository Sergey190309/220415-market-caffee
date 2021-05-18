// test.skip('tech in success', () => {
//   const mockSetToken = jest.fn()
//   const action = {
//     type: TECH_IN_SUCCESS,
//     payload: 'test_tech_token_value',
//   };
//   const expResultStore = {
//     ...testInitStore,
//     tech_token: action.payload,
//   };
//   expect(testInitStore).not.toEqual(expResultStore);
//   expect(auth(testInitStore, action, mockSetToken)).toEqual(expResultStore);
//   expect(mockSetToken).toHaveBeenCalledTimes(1);
//   expect(mockSetToken).toHaveBeenCalledWith(action.payload);
//   // console.log('tech in success ->', action.payload)
//   // console.log('tech in success ->', auth(testInitStore, action))
// });
// test.skip('tech in fail', () => {
//   const mockSetToken = jest.fn()
//   const action = {
//     type: TECH_IN_FAIL,
//   };
//   const expResult = {
//     // isAuthenticated: false,
//     loading: false,
//     isSignedUp: false,
//     isLoggedIn: false,
//   };
//   expect(testInitStore).not.toEqual(expResult);
//   // console.log(auth(testInitStore, action));
//   expect(auth(testInitStore, action, mockSetToken)).toEqual(expResult);
//   expect(mockSetToken).toHaveBeenCalledTimes(1);
//   expect(mockSetToken).toHaveBeenCalledWith(null);
// });
