
const nameFixed = (name) => {

  let namePreFinished = name.split("");
  let nameFixed = []

  for (let i = 0; i < namePreFinished.length; i++) {
    nameFixed.push(namePreFinished[i]);
    nameFixed.push('|');


  }
  nameFixed.pop()
  return nameFixed.join("")

}

module.exports = {
  nameFixed
}