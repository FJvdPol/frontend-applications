import questionFile from '../assets/data.json'

export default {
  key(key, search) {
    return (
      questionFile
        .filter(obj => search ? obj.question.toLowerCase().indexOf(search) > -1 : true)
        .map(question => question[key])
        .filter((category, firstTime, categories) => {
          if (categories.indexOf(category) == firstTime) return category
        })
    )
  },
  byType(search){
    const types = this.key('type', search)
    return types
      .map(type =>
        questionFile
          .filter((object) => object.type === type)
      )
      .map(questions =>
        this
          .byCategory(search, questions)
          .filter(category => category.length > 0)
      )
  },
  byCategory(search, questions = questionFile) {
    const categories = this.key('category', search)
    return categories.map(category =>
      questions
        .filter(obj => search ? obj.question.toLowerCase().indexOf(search) > -1 : true)
        .filter(obj => obj.category === category))
  }
}
