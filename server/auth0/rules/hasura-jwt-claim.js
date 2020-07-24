function (user, ctx, cb) {
  const { user_id: userID } = user;
  const namespace = 'https://hasura.io/jwt/claims';

  ctx.idToken[namespace] = {
    'X-Hasura-Default-Role': 'user',
    // add some custom logic to decide allowed roles
    'X-Hasura-Allowed-Roles': ['user'],
    'X-Hasura-User-Id': userID
  };

  cb(null, user, ctx);
}
