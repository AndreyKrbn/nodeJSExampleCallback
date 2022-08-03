var assert = require("assert");
var nodjsSearchFunction = require("./nodjsSearchFunction");

it("проверка на пустой результат", function (done) {
  var expectedResult = 0;
  nodjsSearchFunction.SearchBy2Fields("table3", "555", function ( err, returnValues ) {
    result=returnValues;
    if(result.count!==expectedResult){
      throw new Error(`Expected ${expectedResult}, but got ${result.count}`);     
  }
  done();
});  
});


it("проверка когда результирующий список = количество найденных записей", function (done) {
    var expectedResult = 1;
    nodjsSearchFunction.SearchBy2Fields("table2", "222", function ( err, returnValues ) {
      result=returnValues;
      if(result.count!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result.count}`);     
    }
    done();
  });
  });

  it("проверка когда результирующий список < количество найденных записей", function (done) {    
    nodjsSearchFunction.SearchBy2Fields("table3", "333", function ( err, returnValues ) {
      result=returnValues;
      assert.ok(result.data.length < result.count);
    done();
  });
});      
    
  
  
  
