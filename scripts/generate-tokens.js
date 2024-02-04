import StyleDictionary from 'style-dictionary'

const SOURCE = 'src/tokens/**/*.tokens.json'

const config = {
    source: [SOURCE],
    platforms: {
        css: {
            buildPath: 'src/styles/',
            transformGroup: 'scss',
            files: [
                {
                    format: 'scss/map-deep',
                    destination: 'variables.scss'
                }
            ]
        },
        js: {
            buildPath: 'src/constants/',
            transformGroup: 'js',
            files: [
                {
                    format: 'javascript/es6',
                    destination: 'index.js',
                }
            ]
        }
    }
}

const sd = StyleDictionary.extend(config)
sd.buildAllPlatforms()