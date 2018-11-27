import questionFile from '../assets/data.json'

export default {
  categories(search) {
    return (
      questionFile
        .filter(obj => search ? obj.question.toLowerCase().indexOf(search) > -1 : true)
        .map(question => {
          return question['category']
        })
        .filter((category, firstTime, categories) => {
          // return alleen unieke categorieën, geen dubbele
          if (categories.indexOf(category) == firstTime) {
            return category
          }
        })
    )
  },
  byCategory(search) {
    // get list of all categories
    const categories = this.categories(search)
    const questions = []
    // for every category, get all the questionObjects that have it's name as value of category key
    categories.forEach(category => {
      questions.push(
        questionFile
          .filter(obj => search ? obj.question.toLowerCase().indexOf(search) > -1 : true) // remove objects that don't contain searchquery in question key
          .filter((object) => object.category === category)
      )
    })
    return questions
  }
}
