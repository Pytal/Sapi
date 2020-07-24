async function (user, ctx, cb) {
  const got = require('got@10.7.0');

  const { user_id: userID, email, picture: profilePicture } = user;

  const { ADMIN_SECRET, GRAPHQL_ENDPOINT } = configuration;

  const query = `
    mutation( $userID: String!, $email: String!, $profilePicture: String! ) {
      insert_profile(
        objects: [{
          user_id: $userID,
          email: $email,
          profile_picture: $profilePicture
        }],
        on_conflict: {
          constraint: profile_user_id_key,
          update_columns: [ email ]
        }
      ) {
        affected_rows
      }
    }
  `;

  const variables = { userID, email, profilePicture };

  const body = await got.post(
    GRAPHQL_ENDPOINT,
    {
      headers: { 'X-Hasura-Admin-Secret': ADMIN_SECRET },
      json: { query, variables }
    }
  ).json();

  cb(null, user, ctx);
}
