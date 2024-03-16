//Категории которые не попадут после генерации
const invalidCategories = ['grid', 'font']
//Ключи типографии которые не попадут после генерации
const excludedTypographyStyles = [
    'paragraphIndent',
    'paragraphSpacing',
    'textCase'
]
export default function (token) {
    const category = token.attributes.category

    if(category === 'typography') {
        return !excludedTypographyStyles.includes(token.attributes.item)
    }

    return !invalidCategories.includes(category)
}