module.exports = (api) => {
    const isTest = api.env('test');
    console.log(
        `[INFO]\tConfig was run on ${isTest ? 'test' : 'NOT test'} environment!`
    );
    return {
        presets: [
            [
                '@babel/env',
                {
                    targets: {
                        browsers: ['>0.25%', 'not ie 11', 'not op_mini all'],
                    },
                    modules: isTest ? 'auto' : false,
                },
            ],
        ],
    };
};
