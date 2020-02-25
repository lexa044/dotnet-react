const users = [{id: 25, username: "admin@example.com", password: "admin", firstName: "Steve", lastName: "Mitchell", token: 'fake-jwt-token'}];

export function configureFakeBackend() {
    const realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                // authenticate
                if (url.endsWith('/connect/token') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.username === params.email && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        // if login details are valid return user details and fake jwt token
                        let user = filteredUsers[0];
                        let responseJson = {
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            token: 'fake-jwt-token'
                        };
                        
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                    } else {
                        // else return error
                        reject('Username or password is incorrect');
                    }

                    return;
                }

                if (url.endsWith('/connect/state') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);
                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.token === params.token;
                    });

                    if (filteredUsers.length) {
                        // if login details are valid return user details and fake jwt token
                        let user = filteredUsers[0];
                        let responseJson = {
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            token: 'fake-jwt-token'
                        };
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                    } else {
                        // else return error
                        reject('Username or password is incorrect');
                    }

                    return;
                }

                /*
                if (url.endsWith('/sports/overview') && opts.method === 'GET') {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify({timeEvents: timeEvents, topics: topics, events: events}))});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }
                    return;
                }
                if (url.endsWith('/sports/menu') && opts.method === 'GET') {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(sportTree))});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }
                    return;
                }
                if (url.endsWith('/sports/tennis') && opts.method === 'GET') {
                  // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                  if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                      resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(timeEventTennis))});
                  } else {
                      // return 401 not authorised if token is null or invalid
                      reject('Unauthorised');
                  }
                  return;
              }
              if (url.indexOf('sports')>-1 && opts.method === 'GET') {
                  // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                  if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                      resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(timeEventSportLines))});
                  } else {
                      // return 401 not authorised if token is null or invalid
                      reject('Unauthorised');
                  }
                  return;
              }*/

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}