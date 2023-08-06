// index.js
Page({
  data: {
    num: 10,
    person:{
      name:'curry',
      age: 35
    }
  },
  handleParent(e){
    console.log('parent');
    console.log(e.currentTarget.dataset.a);
    console.log(e.currentTarget.dataset.navindex);
    console.log(e);

  },
  handleChild(){
    console.log('child');
  }

})
