const REGEXP_FLAG_GMI = 'gmi';
const usersWithUuidRegexp = new RegExp('\\/users\\/([^\\/]+)(\\/$|$)', REGEXP_FLAG_GMI);

const transformRequestPathToEndpoint = (path: string): string => {
    let transformedPath = path;

    if (transformedPath.endsWith('/')) {
        transformedPath = transformedPath.slice(0, -1);
    }

    if (path.match(usersWithUuidRegexp)) {
        transformedPath = '/api/users/:id';
    }

    return transformedPath;
};

export { transformRequestPathToEndpoint };
