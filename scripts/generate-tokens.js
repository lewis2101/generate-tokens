import StyleDictionary from 'style-dictionary'
import transformTokens from "./transform-tokens.js";
import validateToken from './validate-token.js'

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
                    filter: validateToken,
                    destination: 'variables.scss'
                }
            ],
            options: {
                fileHeader: 'header'
            }
        },
        js: {
            buildPath: 'src/constants/',
            transformGroup: 'js',
            files: [
                {
                    format: 'javascript/es6',
                    filter: validateToken,
                    destination: 'index.js'
                }
            ],
            options: {
                fileHeader: 'header'
            }
        }
    }
}

const sd = StyleDictionary.extend(config)

sd.registerTransform({
    name: 'transform-token',
    ...transformTokens
})

sd.registerTransformGroup({
    name: 'scss',
    transforms: [
        ...sd.transformGroup.css,
        'transform-token'
    ]
})

sd.registerFilter({
    name: 'validateToken',
    matcher: validateToken
})

sd.registerFileHeader({
    name: 'header',
    fileHeader: () => [
        'На прямую не редактировать',
        'Сгенерировано через скрипт generate-tokens'
    ]
})

sd.buildAllPlatforms()