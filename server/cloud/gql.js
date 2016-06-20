/* global Parse */

Parse.Cloud.define('gql', function(request, response) {
  const generateExpressLikeRequest = function(parseCloudRequest) {
    return {
      user: request.user,
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: {
        ...request.params,
      }
    };
  };

  const generateExpressLikeResponse = function(parseCloudResponse) {
    return {
      write (data) {
        this.buffer = this.buffer || '';
        this.buffer = this.buffer + data;
      },

      end () {
        parseCloudResponse.success(JSON.parse(this.buffer));
      },

      setHeader () {}
    };
  };

  // Parse.Cloud.useMasterKey();

  console.log('@@ gql on the server');

  if (typeof Parse.graphqlHTTP !== 'undefined') {
    Parse.graphqlHTTP(generateExpressLikeRequest(request), generateExpressLikeResponse(response));
  }
});
