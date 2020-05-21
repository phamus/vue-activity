const data = {
  activities: {
    "1546968934": {
      id: "123456987654",
      title: "Learn Vue.js",
      notes: "I started today and it was not good.",
      progress: 0,
      category: "1546969049",
      createdAt: 1546969144391,
      updatedAt: 1546969144391
    },
    "1546969212": {
      id: "2wdf-0oih",
      title: "Read Witcher Books",
      notes: "These books are super nice",
      progress: 50,
      category: "1546969049",
      createdAt: 1546969144391,
      updatedAt: 1546969144391
    },
    "1546964319": {
      id: "2wdf-0oivh",
      title: "Read Witcher Books",
      notes: "These books are super nice",
      progress: 100,
      category: "1546969049",
      createdAt: 1546969144388,
      updatedAt: 1546969144388
    }
  },
  categories: {
    "1546969049": { text: "books", id: '1546969049' },
    "1546969225": { text: "movies", id: '1546969225' }
  }
}


class FakeApi {
  canContinue() {
    const rndNumber = Math.floor(Math.random() * 10)

    console.log(rndNumber)
    if (rndNumber > 2) {
      return true
    }

    return false
  }


  get(resource, { force }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (force || this.canContinue()) {
          resolve({ ...data[resource] })
        } else {
          reject('Cannot fetch ' + resource)
        }
      }, 500)
    })
  };

  post(resource, item) {
    return new Promise((resolve, reject) => {
      data[resource][item.id] = item
      resolve(item)
    })
  }
}

export default new FakeApi()
