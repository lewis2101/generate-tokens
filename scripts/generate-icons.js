import SVGsprite from 'svg-sprite'
import * as path from 'path'
import * as fs from 'fs'

const ICONS_PATH = path.resolve(process.cwd(), 'src/assets/icons')
const OUTPUT_DIR = path.resolve(process.cwd(), 'src/styles/sprite')
const FILE_NAME = 'icon.sprite'

console.log('generating...')

const generateSvg = async () => {
    const sprite = new SVGsprite({
        dest: OUTPUT_DIR,
        shape: {
            dimension: {
                maxWidth: 200,
                maxHeight: 200,
                attributes: false
            },
            transform: ['svgo']
        },
        mode: {
            inline: true,
            symbol: {
                example: false,
                dest: '',
                sprite: `${FILE_NAME}.svg`
            }
        },
        svg: {
            namespaceClassnames: false
        }
    })

    const arrayIcons = fs.readdirSync(ICONS_PATH, { encoding: 'utf-8' })
    let arrayNames = []

    arrayIcons.forEach(file => {
        const filePath = path.resolve(ICONS_PATH, file)
        sprite.add(
            filePath,
            null,
            fs.readFileSync(filePath, {
                encoding: 'utf-8'
            })
        )
        arrayNames.push(file)
    })

    generateIconNames(arrayNames, OUTPUT_DIR, FILE_NAME)

    return new Promise((resolve, reject) => {
        sprite.compile((error, result) => {
            if(error) reject(error)

            try {
                Object.keys(result).forEach(mode => {
                    Object.keys(result[mode]).forEach(resource => {
                        fs.mkdirSync(path.dirname(result[mode][resource].path), { recursive: true });
                        fs.writeFileSync(result[mode][resource].path, result[mode][resource].contents);
                    })
                })
            } catch (e) {
                return reject(e)
            }
        });

        changeFill(FILE_NAME, OUTPUT_DIR)

        return resolve('SVG GENERATE SUCCESS')
    })
}

const generateIconNames = (names, dir, fileName) => {
    const NAMES = names.map(i => i.replace('.svg', ''))

    const headerComment = '//На прямую не редактировать Сгенерировано через скрипт generate-icons'

    const content = `${headerComment} \n\n export const names = ${JSON.stringify(NAMES, null , 2)} as const`
    fs.writeFileSync(path.join(dir, fileName + '.ts'), content, 'utf-8')
}

const changeFill = (fileName, dir) => {
    const PATH_FILE = path.resolve(dir, fileName + '.svg')
    const icon = fs.readFileSync(PATH_FILE, { encoding: 'utf-8' })
    const changedIcon = icon.replaceAll(/#[0-9A-Fa-f]{3}/g, 'currentColor').replaceAll(/#[0-9A-Fa-f]{6}/g, 'currentColor')
    fs.writeFileSync(PATH_FILE, changedIcon)
}

generateSvg().then(res => console.log(res))

