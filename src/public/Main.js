require.config({
    paths: {
        "react": "bower_components/react/react-with-addons",
        "JSXTransformer": "bower_components/react/JSXTransformer",
        "jsx": "bower_components/requirejs-react-jsx/jsx",
        "text": "bower_components/requirejs-text/text",
        "flux": "bower_components/flux/dist/Flux",
        "io": "/socket.io/socket.io",
        "events": "bower_components/eventemitter2/lib/eventemitter2"
    },

    shim : {
        "react": {
            "exports": "React"
        },
        "JSXTransformer": "JSXTransformer"
    },

    config: {
        jsx: {
            fileExtension: ".jsx",
            transformOptions: {
                harmony: true,
                stripTypes: false,
                inlineSourceMap: true
            },
            usePragma: false
        }
    }
});

require(['jsx!App'], function(App){
    var app = new App();
    app.init();
});