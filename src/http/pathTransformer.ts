const REGEXP_FLAG_GMI = 'gmi';
const usersWithUuidRegexp = new RegExp('\\/users\\/([^\\/]+)(\\/$|$)', REGEXP_FLAG_GMI);

const transformRequestPathToEndpoint = (path: string): string => {
    let transformedPath = path;

    if (path.match(usersWithUuidRegexp)) {
        transformedPath = '/users/:id';
    }

    return transformedPath;
};

export { transformRequestPathToEndpoint };
